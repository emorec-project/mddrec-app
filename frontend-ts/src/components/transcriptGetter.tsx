import axios from 'axios';
import React from 'react';

export const getTranscript = async (sessionId: string) => {
    // `http://localhost:8000/get_transcript_by_id/${sessionId}`
    const transcript_response = await axios.get(`http://localhost:8000/get_transcript_by_id/fb04aea7-8b8e-4d59-ad04-9e92b4691b8d.mp4`, {
        headers: {
            'Accept': 'application/json'
        }
    });

    const video_response = await axios.get(`http://localhost:8000/get_video_by_id/fb04aea7-8b8e-4d59-ad04-9e92b4691b8d.mp4`, {
        headers: {
            'Accept': 'video/mp4'
        }, 
        responseType: 'blob'  // For binary data like videos
    });

    console.log(transcript_response);    

    return (
        <h1>
         {transcript_response} 
        </h1>
      );
    // return response;
}
