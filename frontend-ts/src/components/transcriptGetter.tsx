import axios from 'axios';
import React from 'react';
import TEditor from './transcriptEditor/TranscriptEditor';
import DEMO_TRANSCRIPT from "../data/transcriptExampleData.json"
const DEMO_TITLE ="TED Talk | Kate Darling - Why we have an emotional connection to robots"
const DEMO_MEDIA_URL = "https://download.ted.com/talks/KateDarling_2018S-950k.mp4"


export const getTranscript = (sessionId: string) => {
    // //`http://localhost:8000/get_video_by_id/${sessionId}`
    // const transcript_response = await axios.get(`http://localhost:8000/get_transcript_by_id/fb04aea7-8b8e-4d59-ad04-9e92b4691b8d.mp4`, {
    //     headers: {
    //         'Accept': 'application/json'
    //     }
    // });
    // const videoUrl = `http://localhost:8000/get_video_by_id/${sessionId}`
    
    return (
       <TEditor transcriptJson={DEMO_TRANSCRIPT} videoLink={DEMO_MEDIA_URL} videoTitle={DEMO_TITLE}/>
       //TODO: change to this:
       //        <TEditor transcriptJson={transcript_response} videoLink={videoUrl} videoTitle={sessionId}/>

      );
    // return response;
}
