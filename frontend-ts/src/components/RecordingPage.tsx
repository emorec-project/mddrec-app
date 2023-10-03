import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import { Alert } from 'antd';
import { RecordedSessions } from './RecordedSessions';
import { Record } from './Record';
import { UploadFiles } from './Upload';
import {User} from "./login/User";
import { v4 as uuidv4 } from 'uuid';
import { getTranscript } from './transcriptGetter'
import TEditor from './transcriptEditor/TranscriptEditor';
import DEMO_TRANSCRIPT from "../data/transcriptExampleData.json"
const DEMO_TITLE ="TED Talk | Kate Darling - Why we have an emotional connection to robots"
const DEMO_MEDIA_URL = "https://download.ted.com/talks/KateDarling_2018S-950k.mp4"

interface Props {
  user: User;
}

export const RecordingPage: React.FC<Props> = ({user}) => {
  const [capturing, setCapturing] = useState(false);
  const [recordingAudio, setRecordingAudio] = useState(false);
  const [sessions, setSessions] = useState<object[]>([]);
  const [transcriptEditorWindow, setTranscriptEditorWindow] = useState(false);
  const [currentSessionId,setCurrentSessionId] = useState('')
  const addSession = (url: string) => {
    console.log("A new session has been recorded", url)
    const generatedId = uuidv4();
    const sessionObject = { id: generatedId, url };
    console.log(sessionObject);
    setSessions(prev => [...prev, sessionObject]);
  };

  const toggleRecordingMode = () => {
    setRecordingAudio(!recordingAudio);
  }
  useEffect(() => {
    return () => {
        sessions.forEach(session => URL.revokeObjectURL);        
    };
}, []);

  return (
    <div className="container">
      <Record 
        capturing={capturing}
        setCapturing={setCapturing}
        recordingAudio={recordingAudio}
        toggleRecordingMode={toggleRecordingMode}
        addSession={addSession}
      />
      <UploadFiles 
        addSession={addSession}
      />
      <RecordedSessions 
        sessions={sessions}         
        recordingAudio={recordingAudio} 
        onButtonClick={(session)=>{setTranscriptEditorWindow(prev => !prev);
        setCurrentSessionId(session.id);
      }}/>
      {transcriptEditorWindow && getTranscript(currentSessionId)}
    </div>

  );
};
