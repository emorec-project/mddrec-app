from fastapi import FastAPI, UploadFile, Form
from fastapi.responses import JSONResponse
from pathlib import Path
import shutil
import os
import pathlib

app = FastAPI()

BASE_DIR = Path(__file__).resolve().parent
CHUNKS_DIR = BASE_DIR / 'tmp' / 'chunks'
UPLOADS_DIR = BASE_DIR / 'uploads'


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

        return JSONResponse(content={"file_url": str(final_file_path), "message": "File uploaded successfully."})

    return JSONResponse(content={"message": "Chunk received."})
