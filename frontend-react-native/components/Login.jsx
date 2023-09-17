import { Alert, Button, TextInput, View, StyleSheet } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';


function onLogin(username,password) {
    Alert.alert('Credentials', `${username.username} + ${password.password}`);
  }

const Login=()=>{
    const [username, setusername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <View style={styles.container}>
          <TextInput
            value={username}
            onChangeText={(username) => setusername( {username} )}
            placeholder={'Username'}
            style={styles.input}
          />
          <TextInput
            value={password}
            onChangeText={(password) => setPassword({ password })}
            placeholder={'Password'}
            secureTextEntry={true}
            style={styles.input}
          />
          
          <Button
            title={'Login'}
            style={styles.input}
            onPress={()=>onLogin(username, password)}
          />
        </View>
      );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#ecf0f1',
    },
    input: {
      width: 200,
      height: 44,
      padding: 10,
      borderWidth: 1,
      borderColor: 'black',
      marginBottom: 10,
    },
  });


  export default Login;