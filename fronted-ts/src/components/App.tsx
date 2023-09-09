import React, { useState } from 'react';
import './App.css';
import { RecordedSessions } from './RecordedSessions';
import { Record } from './Record';
import { UploadFiles } from './Upload';
import Grid from '@material-ui/core/Grid';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import Results from './Results';
import SessionScreen from './SessionScreen';
import CardsGrid from './CardsGrid';

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
    <div>
      <Grid container>

        <Grid item xs={12}>
          <BrowserRouter>
          <Routes>
          <Route path='/' element={<CardsGrid />} />
          <Route path='resultsPage' element={<Results/>}/>
          <Route path='newInterview' element={<SessionScreen />}/>
          <Route path='cards_grid' element={<CardsGrid />}/>
        </Routes>
        </BrowserRouter>
        </Grid>

      </Grid>
    </div>
   
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