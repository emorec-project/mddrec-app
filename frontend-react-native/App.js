

// import React, { useEffect, useState } from 'react';
// import {Text, View, Button, StyleSheet } from 'react-native';
// import RecordedSessions from './components/RecordSession';
// import Record from './components/Record';
// import UploadFiles from './components/Upload';

// export default function App() {
//   const [capturing, setCapturing] = useState(false);
//   const [recordingAudio, setRecordingAudio] = useState(false);
//   const [sessions, setSessions] = useState([]);

//   const addSession = (url) => {
//     console.log("A new session has been recorded", url);
//     setSessions(prev => [...prev, url]);
//   };

//   const toggleRecordingMode = () => {
//     setRecordingAudio(!recordingAudio);
//   };

//   useEffect(() => {
//     return () => {
//       sessions.forEach(URL.revokeObjectURL);
//     };
//   }, [sessions]);

//   return (
//     <View style={styles.container}>
//     <Text>dap</Text>
//       <Record 
//         capturing={capturing}
//         setCapturing={setCapturing}
//         recordingAudio={recordingAudio}
//         toggleRecordingMode={toggleRecordingMode}
//         addSession={addSession}
//       />
//       <UploadFiles></UploadFiles>
//       <RecordedSessions sessions={sessions} recordingAudio={recordingAudio} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     justifyContent: 'center',
//   },
// });

// App.js
// App.js


import React from 'react';
import { View } from 'react-native';
import Upload from './components/Upload'; // Import the Upload component

export default function App() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Upload /> 
    </View>
  );
}


