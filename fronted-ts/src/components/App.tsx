import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import { Alert } from 'antd';
import { RecordedSessions } from './RecordedSessions';
import { Record } from './Record';
import { UploadFiles } from './Upload';

const App: React.FC = () => {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [capturing, setCapturing] = useState(false);
  const [recordingAudio, setRecordingAudio] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [timer, setTimer] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [sessions, setSessions] = useState<string[]>([]);

  const handleDataAvailable = (e: BlobEvent) => {
    setRecordedChunks((prev) => prev.concat(e.data));
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
  }

  const startMediaRecorder = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: recordingAudio, video: !recordingAudio });
      setMediaStream(stream);
      const mediaRecorder = new MediaRecorder(stream, { mimeType: recordingAudio ? 'audio/webm' : 'video/webm' });
      mediaRecorder.ondataavailable = handleDataAvailable;
      mediaRecorder.onstop = handleStopRecording;
      mediaRecorderRef.current = mediaRecorder;

      if (capturing) {
        mediaRecorderRef.current.start(5000);
      }
    } catch (err) {
      setError(`Error accessing media devices: ${(err as Error).message}`);
    }
  };

  useEffect(() => {
    if(capturing) {
      startMediaRecorder();
    } else if(mediaRecorderRef.current) {
      stopRecording();
    }
  
    return () => {
      mediaStream?.getTracks().forEach((track) => track.stop());
      setMediaStream(null);
    }
  }, [capturing]);

  const handleStopRecording = () => {
    if (mediaRecorderRef.current && recordedChunks.length) {
      const blob = new Blob(recordedChunks, { type: recordingAudio ? 'audio/webm' : 'video/webm' });
      const url = URL.createObjectURL(blob);
      setSessions(prev => [...prev, url]);
      setRecordedChunks([]);
    }
  }

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (capturing) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    } else {
      setTimer(0);
    }
    return () => clearInterval(interval);
  }, [capturing]);  

  const addSession = (url: string) => {
    setSessions(prev => [...prev, url]);
  };

  const toggleRecordingMode = () => {
    if (capturing) {
      stopRecording();
      setCapturing(false);
    }
    setRecordingAudio(!recordingAudio);
    if (mediaStream) {
      mediaStream.getTracks().forEach((track) => track.stop());
    }
    setMediaStream(null);
  }

  return (
    <div>
      {error && <Alert message={`Error: ${error}`} type="error" />}
      <Record 
        capturing={capturing}
        setCapturing={setCapturing}
        recordingAudio={recordingAudio}
        timer={timer}
        toggleRecordingMode={toggleRecordingMode}
        mediaStream={mediaStream}
      />
      <UploadFiles 
        addSession={addSession}
      />
      <RecordedSessions sessions={sessions} recordingAudio={recordingAudio} />
    </div>
  );
};

export default App;
