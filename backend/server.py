from fastapi import FastAPI, UploadFile, Form
from fastapi.responses import JSONResponse
from dtos import Document
from pathlib import Path
import shutil
import data.mongo as repo
import os

app = FastAPI()

BASE_DIR = Path(__file__).resolve().parent
CHUNKS_DIR = BASE_DIR / 'tmp' / 'chunks'
UPLOADS_DIR = BASE_DIR / 'uploads'
UNHANDELED_EXCEPTION_MSG = "unhandaled exception accurred"

@app.post("/insert_doc/")
async def create_item(doc: Document):
    return repo.insert_doc(doc)

@app.post("/insert_docs/")
async def create_items(docs: list[Document]):
    return repo.insert_docs(docs)

@app.get("/find_doc_by_id/{doc_id}")
async def find_doc_by_id(doc_id: str):
    return repo.find_doc_by_id(doc_id)


@app.post("/blobs_manager/upload/")
async def upload(file: UploadFile = Form(...),
                 filename: str = Form(...),
                 chunkIndex: int = Form(...),
                 chunksCount: int = Form(...)):

    # Temporary location to store chunks
    CHUNKS_DIR.mkdir(parents=True, exist_ok=True)
    chunk_filename = CHUNKS_DIR / f"{filename}_chunk_{chunkIndex}"

    # Write the chunk to a temporary file
    with chunk_filename.open("wb") as buffer:
        buffer.write(await file.read())

    # Check if all chunks have been received
    if len(list(CHUNKS_DIR.iterdir())) == chunksCount:
        # Create the uploads directory if it doesn't exist
        UPLOADS_DIR.mkdir(parents=True, exist_ok=True)

        # If all chunks are received, combine them into the final file
        final_file_path = UPLOADS_DIR / filename

        with final_file_path.open("wb") as final_file:
            for i in range(chunksCount):
                chunk_file_path = CHUNKS_DIR / f"{filename}_chunk_{i}"
                with chunk_file_path.open("rb") as chunk_file:
                    final_file.write(chunk_file.read())
                # Delete chunk file after it has been written to the final file
                chunk_file_path.unlink()

        # Delete the temporary chunks directory
        shutil.rmtree(CHUNKS_DIR.parent)

        return JSONResponse(content={"file_url": str(final_file_path)})

    return JSONResponse(content={"message": "Chunk received."})
