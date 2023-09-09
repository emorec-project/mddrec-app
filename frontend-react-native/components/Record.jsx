import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
// import { RNCamera } from 'react-native-camera';
import uuid from 'react-native-uuid';
import { uploadFile } from './fileUploader';

const Record = ({ capturing, setCapturing, recordingAudio, toggleRecordingMode, addSession }) => {
  const cameraRef = useRef(null);
  const [recordedVideoUri, setRecordedVideoUri] = useState(null);
  const [timer, setTimer] = useState(0);
  const [sessionId, setSessionId] = useState("");

  const handleStopRecording = async () => {
    if (cameraRef.current) {
      const { uri } = await cameraRef.current.stopRecording();
      setRecordedVideoUri(uri);
      uploadFile(uri, sessionId, uploadedUrl => {
        console.log("Uploaded recorded chunks:", uploadedUrl);
        addSession(uploadedUrl);
      });
    }
  };

  const startRecording = async () => {
    if (cameraRef.current) {
      try {
        await cameraRef.current.recordAsync();
      } catch (error) {
        console.error("Recording error:", error);
      }
    }
  };

  useEffect(() => {
    if (capturing) {
      setSessionId(uuid.v4());
      startRecording();
    } else if (recordedVideoUri) {
      handleStopRecording();
    }
  }, [capturing]);

  useEffect(() => {
    let interval;
    if (capturing) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer + 1);
      }, 1000);
    } else {
      setTimer(0);
    }
    return () => clearInterval(interval);
  }, [capturing]);

  return (
    <View style={{ flex: 1 }}>
      {/* <RNCamera ref={cameraRef} style={{ flex: 1 }} type={RNCamera.Constants.Type.back} />
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <Button title={capturing ? 'Stop Recording' : 'Start Recording'} onPress={() => setCapturing(!capturing)} />
        <Button title={recordingAudio ? 'Switch to Video' : 'Switch to Audio'} onPress={toggleRecordingMode} />
      </View> */}
      <Text>{recordingAudio ? 'Currently in Audio Mode' : 'Currently in Video Mode'}</Text>
      <Text>{capturing ? 'Currently Recording' : 'Currently Not Recording'}</Text>
      <Text>Recording Time: {timer} seconds</Text>
    </View>
  );
};

export default Record