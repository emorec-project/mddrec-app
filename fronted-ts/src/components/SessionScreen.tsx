import React, { useState } from 'react';
import './App.css';
import { Alert } from 'antd';
import { RecordedSessions } from './RecordedSessions';
import { Record } from './Record';
import { UploadFiles } from './Upload';


const SessionScreen: React.FC = () => {
    const [capturing, setCapturing] = useState(false);
    const [recordingAudio, setRecordingAudio] = useState(false);
    const [sessions, setSessions] = useState<string[]>([]);
  
    const addSession = (url: string) => {
      setSessions(prev => [...prev, url]);
    };
  
    const toggleRecordingMode = () => {
      setRecordingAudio(!recordingAudio);
    }
  
    return (
    <div>
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
      <RecordedSessions sessions={sessions} recordingAudio={recordingAudio} />
    </div>
  )
}

export default SessionScreen;