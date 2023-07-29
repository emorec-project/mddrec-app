import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import { Button, Upload, message, Alert, Collapse } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const App: React.FC = () => {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [capturing, setCapturing] = useState(false);
  const [recordingAudio, setRecordingAudio] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [timer, setTimer] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [sessions, setSessions] = useState<string[]>([]);
  const [isCollapsibleOpen, setIsCollapsibleOpen] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);

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

  useEffect(() => {
    if (videoRef.current && mediaStream) {
      videoRef.current.srcObject = mediaStream;
    }
  }, [mediaStream]);

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

  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadedAudio, setUploadedAudio] = useState<File | null>(null);

  const handleUpload = (file: any) => {
    const fileType = file.type.split('/')[0];
  
    if (fileType === 'audio') {
      setUploadedAudio(file);
    } else if (fileType === 'video') {
      setUploadedFile(file);
    }

    return false;
  }


  useEffect(() => {
    if (uploadedFile) {
      const url = URL.createObjectURL(uploadedFile);
      setSessions(prev => [...prev, url]);
    }

    if (uploadedAudio) {
      const url = URL.createObjectURL(uploadedAudio);
      setSessions(prev => [...prev, url]);
    }
  }, [uploadedFile, uploadedAudio]);

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

  const toggleCollapsible = () => {
    setIsCollapsibleOpen(!isCollapsibleOpen);
  }

  return (
    <div>
      {error && <Alert message={`Error: ${error}`} type="error" />}

      {mediaStream && !recordingAudio && <video ref={videoRef} autoPlay muted></video>}

      {capturing && recordingAudio && <Alert message="Recording..." type="info" />}

      <Upload
      accept="video/mp4"
      beforeUpload={handleUpload}
      showUploadList={false}
    >
      <Button icon={<UploadOutlined />}>Upload an MP4 file</Button>
    </Upload>

    <Upload
      accept="audio/mp3"
      beforeUpload={handleUpload}
      showUploadList={false}
    >
      <Button icon={<UploadOutlined />}>Upload an MP3 file</Button>
    </Upload>
      <Button 
        style={{fontSize: '3rem', backgroundColor: capturing ? 'red' : 'green'}}
        onClick={() => setCapturing(!capturing)}
      >
        {capturing ? 'Stop Recording' : 'Start Recording'}
      </Button>

      <Button 
        style={{fontSize: '2rem'}}
        onClick={toggleRecordingMode}
      >
        {recordingAudio ? 'Switch to Video' : 'Switch to Audio'}
      </Button>

      <Alert
        type="info"
        message={recordingAudio ? 'Currently in Audio Mode' : 'Currently in Video Mode'}
      />

      <Alert
        type={capturing ? "success" : "warning"}
        message={capturing ? 'Currently Recording' : 'Currently Not Recording'}
      />

      <p>Recording Time: {timer} seconds</p>

      <div className='sessionsContainer'>
        <Collapse>
          <Collapse.Panel header={`Recorded Sessions (${sessions.length})`} key="1">
            {sessions.map((session, index) => (
              <div key={index}>
                {recordingAudio ? 
                  <audio src={session} controls></audio> : 
                  <video src={session} controls></video>
                }
              </div>
            ))}
          </Collapse.Panel>
        </Collapse>
      </div>
    </div>

  );
};

export default App;
