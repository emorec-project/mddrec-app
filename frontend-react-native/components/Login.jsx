import { Alert, Button, TextInput, View, StyleSheet, Image } from 'react-native';
import React, { useState } from 'react';


const LogIn=()=>{
    //const navigation = useNavigation();
    const [username, setusername] = useState("");
    const [password, setPassword] = useState("");

    function onLogin(username,password) {
        Alert.alert('Credentials', `${username.username} + ${password.password}`);
        //TODO: get validation from the server 
        // if(session.isLogin){
        //   return(
        //     <HomePage></HomePage>
        //   )
        // }else{
        //   <Login></Login>
        // }
        //navigation.navigate("CardsGrid");
        //navigation.canGoBack(false);
        //navigation.goBack();
      }

    return (
        <View style={styles.container}>
        <Image
        style={styles.logo}
        source={require('../temp-images/huge-icon.png')}
        ></Image>
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
    logo: {
     
    },
  });


  export default LogIn;