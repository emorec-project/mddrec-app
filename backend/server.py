from fastapi import FastAPI, UploadFile, Form, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.security import OAuth2PasswordRequestForm
from dtos import Document
from pathlib import Path
import shutil
import data.mongo as repo
import os
import pathlib
from login import register_user, handle_login, oauth2_scheme, google_login
from config_loader import *
from pydantic import BaseModel
from typing import Optional, List
from app_types.user_types import UserDetails
from data import mongo
from stt_transcript import get_transript_file, get_video_file

if os.getenv('PROFILE') == 'prod':
    from stt_model import get_stt_from_path
    
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

BASE_DIR = Path(__file__).resolve().parent
CHUNKS_DIR = BASE_DIR / 'tmp' / 'chunks'
UPLOADS_DIR = BASE_DIR / 'uploads'
STT_DIR = BASE_DIR / 'stt_files'

@app.post("/insert_doc/")
async def create_item(doc: Document):
    return repo.insert_doc(doc)

@app.post("/insert_docs/")
async def create_items(docs: list[Document]):
    return repo.insert_docs(docs)

@app.get("/find_doc_by_id/{doc_id}")
async def find_doc_by_id(doc_id: str):
    return repo.find_doc_by_id(doc_id)

@app.get("/get_transcript_by_id/{doc_id}")
async def get_transcript_by_id(doc_id: str):
    return get_transript_file(doc_id)

@app.get("/get_video_by_id/{video_id}")
async def get_video_by_id(video_id: str):
    return get_video_file(video_id)

@app.post("/blobs_manager/upload/")
async def upload(file: UploadFile = Form(...),
                 filename: str = Form(...),
                 sessionId: str = Form(...),
                 chunkIndex: int = Form(...),
                 chunksCount: int = Form(...)):

    # Temporary location to store chunks
    CHUNKS_DIR.mkdir(parents=True, exist_ok=True)
    chunk_filename = CHUNKS_DIR / f"{sessionId}_chunk_{chunkIndex}"

    # Write the chunk to a temporary file
    with chunk_filename.open("wb") as buffer:
        buffer.write(await file.read())

    # Check if all chunks have been received
    if len(list(CHUNKS_DIR.iterdir())) == chunksCount:
        # Create the uploads directory if it doesn't exist
        UPLOADS_DIR.mkdir(parents=True, exist_ok=True)

        # If all chunks are received, combine them into the final file
        final_file_name = f"{sessionId}{pathlib.Path(filename).suffix}"
        final_file_path = UPLOADS_DIR / final_file_name

        with final_file_path.open("wb") as final_file:
            for i in range(chunksCount):
                chunk_file_path = CHUNKS_DIR / f"{sessionId}_chunk_{i}"
                with chunk_file_path.open("rb") as chunk_file:
                    final_file.write(chunk_file.read())
                # Delete chunk file after it has been written to the final file
                chunk_file_path.unlink()

        # Delete the temporary chunks directory
        shutil.rmtree(CHUNKS_DIR.parent)
        
        # STT Process   
        print('started STT proccess...')
        stt_file = get_stt_from_path(path=final_file_path, is_escaped=False)
        print('finished STT proccess... ')

        # Create the stt_files directory if it doesn't exist
        STT_DIR.mkdir(parents=True, exist_ok=True)
        stt_file_path = STT_DIR / final_file_name
        stt_file_to_mongo = Document(
            _id = final_file_name,
            text = stt_file['text'],
            segments = stt_file['segments'],
            language = stt_file['language']
        )
        
        convert_stt_to_mongo_format(stt_file_to_mongo)
        # save_file(stt_file, stt_file_path)
        file_saved = save_to_mongo(stt_file_to_mongo)
        print(f"saved {file_saved} file successfully")

        loaded_from_mongo = get_transript_file(file_saved['insertedDoc'])
        print(str(loaded_from_mongo.id))
        
        return JSONResponse(content={"file_url": str(final_file_path), "message": "File uploaded successfully."})

    return JSONResponse(content={"message": "Chunk received."})

def save_file(file_to_save, path):
    with open(f'{path}.txt', 'w') as file:
        file.write(file_to_save)

@app.post("/register/")
async def register_endpoint(user: UserDetails):
    return await register_user(user)

@app.post("/token/")
async def login_endpoint(form_data: OAuth2PasswordRequestForm = Depends()):
    return await handle_login(form_data)

@app.post("/google_login/")
async def google_login_endpoint(token: str):
    return await google_login(token)
        
def save_to_mongo(file_to_save: Document):
    return mongo.insert_doc(file_to_save)

def convert_stt_to_mongo_format(stt_file):
    mongoDoc = dict(stt_file)
    mongoDoc['segments'] = [dict(segment) for segment in mongoDoc['segments']]
    return mongoDoc