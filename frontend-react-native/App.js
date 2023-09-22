

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


import React, { useEffect, useState } from 'react';
import HomePage from './components/HomePage';
import CardsGrid from './components/CardsGrid';

export default function App() {
  return(
    <HomePage></HomePage>
  );
}

// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import { View, Text, SafeAreaView, SectionList, StyleSheet } from 'react-native';
// import Results from './components/Results';

// const Stack = createStackNavigator();

// const DATA = [
//   {
//     title: 'Section 1',
//     data: Array(50).fill(null).map((_, i) => `Item ${i + 1}`),
//   },
// ];

// function dap() {
//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <SectionList
//         sections={DATA}
//         keyExtractor={(item, index) => index.toString()}
//         renderItem={({ item }) => (
//           <View style={styles.item}>
//             <Text>{item}</Text>
//           </View>
//         )}
//       />
//     </SafeAreaView>
//   );
// }

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="CardsGrid">
//         <Stack.Screen name="CardsGrid" component={dap} options={{ headerTitle: "Home" }} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//   },
//   item: {
//     padding: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//   },
// });



