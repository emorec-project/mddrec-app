import React, { useState } from 'react';
import './App.css';
import { Alert } from 'antd';
import { RecordedSessions } from './RecordedSessions';
import { Record } from './Record';
import { UploadFiles } from './Upload';

import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import PageRouter from './PageRouter';
import Results from './Results';
import SessionScreen from './SessionScreen';

const App: React.FC = () => {
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
    <Router>
      <Routes>
        <Route path='/' element={<PageRouter />} />
        <Route path='results' element={<Results />}/>
        <Route path='sessions_recorder' element={<SessionScreen />}/>
      </Routes>
    </Router>
  )

  // return (
  //   <div>
  //     <Record 
  //       capturing={capturing}
  //       setCapturing={setCapturing}
  //       recordingAudio={recordingAudio}
  //       toggleRecordingMode={toggleRecordingMode}
  //       addSession={addSession}
  //     />
  //     <UploadFiles 
  //       addSession={addSession}
  //     />
  //     <RecordedSessions sessions={sessions} recordingAudio={recordingAudio} />
  //   </div>
  // );
};

export default App;