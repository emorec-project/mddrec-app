import axios from 'axios';
import React, { useState } from 'react';
import './App.css';
import { RecordingPage } from './RecordingPage';
import { LoginPage } from './login/LoginPage';
import {User} from "./login/User";

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const handleUserLogin = async (userType: 'therapist' | 'patient', details: any) => {
    try {
      // For this example, I'm assuming you send the login details to your backend API, 
      // and in return, you get a user DTO if the authentication is successful.
      const response = await axios.post("http://your-backend-url/login", {
        email: details.email,
        password: details.password, // Remember, this should be hashed!
        userType: userType,
      });

      if (response.status === 200) {
        const userData = response.data;
        setUser({
          name: userData.name,
          language: userData.language,
          userType: userData.userType,
          therapistName: userType === 'patient' ? userData.therapistName : undefined,
          patients: userType === 'therapist' ? userData.patients : undefined
        });

        setIsLoggedIn(true);
      } else {
        // Handle any error messages or statuses returned by your backend
        console.error("Login failed:", response.data);
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
    }
  };

  return (
    <div className="app">
      {isLoggedIn ? <RecordingPage user={user!} /> : <LoginPage onUserRegister={handleUserLogin} language="en" />}
    </div>
  );
};

export default App;
