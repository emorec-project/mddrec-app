import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { RecordingPage } from "./RecordingPage";
import { LoginPage } from "./login/LoginPage";
import { User } from "./login/User";
import config from "../config/configLoader";
import { UserProvider, useAuth } from "./login/authContext";
import { BrowserRouter, useNavigate } from 'react-router-dom';

const App: React.FC = () => {
  const [language, setLanguage] = useState<"en" | "he">("en"); // default to 'en'

  const handleLanguageChange = (newLang: "en" | "he") => {
    setLanguage(newLang);
  };

  const InnerApp: React.FC = () => {
    const { state, dispatch } = useAuth();

    const navigate = useNavigate();

    useEffect(() => {
      if (state.isAuthenticated) {
        navigate('/recording');  // Navigate to the RecordingPage
      } else {
        navigate('/login');
      }
    }, [state.isAuthenticated, navigate]);

    const handleUserLogin = (userData: User) => {
      dispatch({
        type: "LOGIN",
        payload: {
          email: userData.email,
          name: userData.name,
          language: userData.language,
          userType: userData.userType,
          therapistName: userData.userType === "patient" ? userData.therapistName : undefined,
          patients: userData.userType === "therapist" ? userData.patients : undefined,
        },
      });
    };
    return (
      <div className="app">
        {true ? (
          <RecordingPage user={state.user!} />
        ) : (
          <LoginPage
            onUserDetails={handleUserLogin}
            onUserLogin={handleUserLogin}
            language={language}
            onLanguageChange={handleLanguageChange}
          />
        )}
      </div>
    );
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
  }

  return (
    <BrowserRouter>
      <UserProvider>
        <InnerApp />
      </UserProvider>
    </BrowserRouter>
  );
};

export default App;
