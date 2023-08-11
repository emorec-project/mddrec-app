import React, { useEffect, useRef, useState } from 'react';
import { Alert, Button } from 'antd';
import '../style/Record.module.css';

interface RecordProps {
  capturing: boolean;
  setCapturing: (capturing: boolean) => void;
  recordingAudio: boolean;
  toggleRecordingMode: () => void;
  addSession: (url: string) => void;
}

export const Record: React.FC<RecordProps> = ({ capturing, setCapturing, recordingAudio, toggleRecordingMode, addSession }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    if (videoRef.current && mediaStream) {
      videoRef.current.srcObject = mediaStream;
    }
  }, [mediaStream]);

  const handleDataAvailable = (e: BlobEvent) => {
    setRecordedChunks((prev) => prev.concat(e.data));
  }

  const handleStopRecording = () => {
    if (mediaRecorderRef.current && recordedChunks.length) {
      const blob = new Blob(recordedChunks, { type: recordingAudio ? 'audio/webm' : 'video/webm' });
      const url = URL.createObjectURL(blob);
      addSession(url);
      setRecordedChunks([]);
    }
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
    } catch (err: any) {
      console.error("Error accessing media devices:", err.message);
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
      {mediaStream && !recordingAudio && <video className={"video"} ref={videoRef} autoPlay muted></video>}
      {capturing && recordingAudio && <Alert className={"alert"} message="Recording..." type="info" />}
      <Button 
        type="primary"
        className={capturing ? "stopRecordingButton" : "startRecordingButton"}
        onClick={() => setCapturing(!capturing)}
      >
        {capturing ? 'Stop Recording' : 'Start Recording'}
      </Button>
      <Button 
        className={"toggleRecordingModeButton"}
        onClick={toggleRecordingMode}
      >
        {recordingAudio ? 'Switch to Video' : 'Switch to Audio'}
      </Button>
      <Alert
        className={"infoAlert"}
        type="info"
        message={recordingAudio ? 'Currently in Audio Mode' : 'Currently in Video Mode'}
      />
      <Alert
        className={capturing ? "successAlert" : "warningAlert"}
        type={capturing ? "success" : "warning"}
        message={capturing ? 'Currently Recording' : 'Currently Not Recording'}
      />
      <p className={"recordingTime"}>Recording Time: {timer} seconds</p>
    </div>
  );
};
