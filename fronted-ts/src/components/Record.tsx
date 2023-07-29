import React, { useEffect, useRef, useState } from 'react';
import { Alert, Button } from 'antd';
import '../style/Record.module.css';

interface RecordProps {
  capturing: boolean;
  setCapturing: (capturing: boolean) => void;
  recordingAudio: boolean;
  timer: number;
  toggleRecordingMode: () => void;
  mediaStream: MediaStream | null;
}

export const Record: React.FC<RecordProps> = ({ capturing, setCapturing, recordingAudio, timer, toggleRecordingMode, mediaStream }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current && mediaStream) {
      videoRef.current.srcObject = mediaStream;
    }
  }, [mediaStream]);

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
