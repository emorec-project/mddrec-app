import React from 'react';
import { View, ScrollView } from 'react-native';
import { List } from 'react-native-paper';
// import Video from 'react-native-video';

const RecordedSessions = ({ sessions, recordingAudio }) => {
  return (
    <ScrollView style={{ padding: 10 }}>
      <List.Accordion
        title={`Recorded Sessions (${sessions.length})`}
      >
        {sessions.map((session, index) => (
          <View key={index} style={{ marginVertical: 10 }}>
            {/* <Video
              source={{ uri: session }} // Can be a URL or a local file.
              style={{ width: '100%', height: recordingAudio ? 50 : 200 }} // Set height to 50 for audio, and more for video.
              controls={true}
              resizeMode="contain"
              audioOnly={recordingAudio} // Set to true if it's audio
            /> */}
          </View>
        ))}
      </List.Accordion>
    </ScrollView>
  );
};

export default RecordedSessions;