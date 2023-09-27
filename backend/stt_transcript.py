from data import mongo
from convert_to_transcript_format import convert_to_transcript_doc
import os
from fastapi import HTTPException
from fastapi.responses import FileResponse

def get_transript_file(id):
    mongo_doc = mongo.find_doc_by_id(id)
    return convert_to_transcript_doc(mongo_doc)

VIDEOS_FOLDER = "uploads"  

def get_video_file(video_id):
    # Construct file path based on video_id
    video_path = os.path.join(VIDEOS_FOLDER, f"{video_id}")
    
    # Check if the video exists
    if not os.path.exists(video_path):
        raise HTTPException(status_code=404, detail="Video not found")
    
    # Send the video file as response
    return FileResponse(video_path, media_type="video/mp4")
    