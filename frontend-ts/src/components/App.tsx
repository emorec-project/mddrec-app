import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import { RecordingPage } from "./RecordingPage";
import { LoginPage } from "./login/LoginPage";
import { User } from "./login/User";
import config from "../config/configLoader";
import { UserProvider, useAuth } from "./login/authContext"; // update the path accordingly

const App: React.FC = () => {
  const [language, setLanguage] = useState<"en" | "he">("en"); // default to 'en'

  const handleLanguageChange = (newLang: "en" | "he") => {
    setLanguage(newLang);
  };

  const InnerApp: React.FC = () => {
    const { state, dispatch } = useAuth();
    const handleUserLogin = async (
      userType: "therapist" | "patient",
      details: any
    ) => {
      try {
        const response = await axios.post(`${config.backendURL}/login`, {
          email: details.email,
          password: details.password,
          userType: userType,
        });

        if (response.status === 200) {
          const userData = response.data;
          dispatch({
            type: "LOGIN",
            payload: {
              name: userData.name,
              language: userData.language,
              userType: userData.userType,
              therapistName:
                userType === "patient" ? userData.therapistName : undefined,
              patients:
                userType === "therapist" ? userData.patients : undefined,
            },
          });
        } else {
          console.error("Login failed:", response.data);
        }
      } catch (error) {
        console.error("An error occurred during login:", error);
      }
    };
    return (
      <div className="app">
        <RecordingPage user={state.user!} />
        {/* {state.isAuthenticated ? (
          <RecordingPage user={state.user!} />
        ) : (
          <LoginPage
            onUserRegister={handleUserLogin}
            language={language}
            onLanguageChange={handleLanguageChange}
          />
        )} */}
      </div>
    );
  };

  return (
    <UserProvider>
      <InnerApp />
    </UserProvider>
  );
};

export default App;
