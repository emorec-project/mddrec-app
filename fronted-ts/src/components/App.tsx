import React, { useEffect, useRef, useState } from 'react';

const App: React.FC = () => {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [capturing, setCapturing] = useState(false);
  const [recordingAudio, setRecordingAudio] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [timer, setTimer] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [sessions, setSessions] = useState<string[]>([]);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleDataAvailable = (e: BlobEvent) => {
    setRecordedChunks((prev) => prev.concat(e.data));
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      handleStopRecording();
    }
  }

  useEffect(() => {
    const startMediaRecorder = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: recordingAudio, video: !recordingAudio });
        setMediaStream(stream);
        const mediaRecorder = new MediaRecorder(stream, { mimeType: recordingAudio ? 'audio/webm' : 'video/webm' });
        mediaRecorder.ondataavailable = handleDataAvailable;
        mediaRecorderRef.current = mediaRecorder;
  
        if (capturing) {
          mediaRecorderRef.current.start(5000);
        }
      } catch (err) {
        setError(`Error accessing media devices: ${(err as Error).message}`);
      }
    };
  
    if(capturing) {
      startMediaRecorder();
    }
  
    return () => {
      mediaStream?.getTracks().forEach((track) => track.stop());
      setMediaStream(null);
    }
  }, [capturing]);

  useEffect(() => {
    if (videoRef.current && mediaStream) {
      videoRef.current.srcObject = mediaStream;
    }
  }, [mediaStream]);

  const handleStopRecording = async () => {
    if (recordedChunks.length) {
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

  return (
    <div>
      {error ? <div>Error: {error}</div> : null}
      <video ref={videoRef} autoPlay muted></video>
      <button 
        style={{fontSize: '3rem', backgroundColor: capturing ? 'red' : 'green'}}
        onClick={() => setCapturing(!capturing)}
      >
        {capturing ? 'Stop Recording' : 'Start Recording'}
      </button>
      <button 
        style={{fontSize: '2rem'}}
        onClick={() => setRecordingAudio(!recordingAudio)}
      >
        {recordingAudio ? 'Switch to Video' : 'Switch to Audio'}
      </button>
      <button 
        style={{backgroundColor: capturing ? 'red' : 'gray'}}
      >
        {capturing ? 'Currently Recording' : 'Currently Not Recording'}
      </button>
      <p>Recording Time: {timer} seconds</p>
      <h2>Recorded Sessions</h2>
      {sessions.map((session, index) => (
        <div key={index}>
          {recordingAudio ? 
            <audio src={session} controls></audio> : 
            <video src={session} controls></video>
          }
        </div>
      ))}
    </div>
  );
};

export default App;
