import React, { useState, useEffect } from 'react';
import { View, Button, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Video from 'react-native-video';

export default function Upload() {
   const [selectedVideoUri, setSelectedVideoUri] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need media library permissions to make this work!');
      }
    })();
  }, []);

  const pickVideo = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedVideoUri(result.assets[0].uri);
    }
  };


  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {selectedVideoUri ? (
        <View>
          <Text>The file has been uploaded </Text>
          {/* <Video
            source={{ uri: selectedVideoUri }}
            style={{ width: 300, height: 200 }}
            controls={true}
          /> */}
        </View>
      ) : (
        <Button title="Pick a Video from Gallery" onPress={pickVideo} />
      )}
    </View>
  );
}


