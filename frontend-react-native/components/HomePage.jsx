//import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Config from "react-native-config";
import React, {useState } from 'react';
import CardsGrid from './CardsGrid';
import Results from './Results';
import Upload from './Upload';
import LogIn from './LogIn';
import SignIn from './SignIn';
import ScreensState from '../configs/ScreensState'

const Stack = createStackNavigator();
//const [session, setSession] = useState(false);

export default function HomePage() {
  const [session, setSession] = useState(true);
  return session?(//TODO: add the check if session.login = false or session.user == therapist,patient 
    <NavigationContainer>
      <Stack.Navigator initialRouteName="CardsGrid">
      <Stack.Screen name="CardsGrid" options={{ headerTitle: null }}>
          {props => <CardsGrid {...props} cardProps={ScreensState.patientLogin} />}
        </Stack.Screen>
        <Stack.Screen name="ResultsPage" component={Results} />
        <Stack.Screen name="NewInterview" component={Upload} />
      </Stack.Navigator>
    </NavigationContainer>
    
    
  ):(<NavigationContainer>
    <Stack.Navigator initialRouteName="CardsGrid">
      <Stack.Screen name="CardsGrid" options={{ headerTitle: null }}>
          {props => <CardsGrid {...props} cardProps={ScreensState.notLogin} />}
        </Stack.Screen>
      <Stack.Screen name="LogIn" component={LogIn} />
      <Stack.Screen name="SignIn" component={SignIn} />
    </Stack.Navigator>
  </NavigationContainer>);
}