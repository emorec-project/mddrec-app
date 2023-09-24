// LoginPage.tsx
import { Form, message } from 'antd';
import axios, { AxiosResponse } from 'axios';
import React, { useState } from 'react';
import config from '../../config/config';
import styles from '../../style/LoginPage.module.css';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
import { User } from './User';


interface Props {
    onUserDetails: (user: User) => void;
    onUserLogin: (user: User) => void;
    language: 'en' | 'he';
    onLanguageChange?: (lang: 'en' | 'he') => void;
}

export const translations = {
    en: {
        signUp: 'Sign Up',
        goRegister: 'Don\'t have an account? Sign Up!',
        alreadyUser: 'Already a user? Login',
        login: 'Login',
        email: 'Email',
        password: 'Password',
        isTherapist: "Are you a therapist?",
        isPatient: "Are you a patient?",
        changeLanguage: "Change language",
        rememberMe: 'Remember Me',
        forgotPassword: 'Forgot Password?',
        invalidEmail: 'The input is not valid Email'
    },
    he: {
        signUp: 'הרשמה',
        goRegister: 'אין לך משתמש? הירשם',
        alreadyUser: 'כבר משתמש? התחבר',
        login: 'התחבר',
        email: 'דוא"ל',
        password: 'סיסמה',
        isTherapist: "האם הינך מטפל?",
        isPatient: "האם הינך מטופל?",
        changeLanguage: "החלף שפה",
        rememberMe: 'זכור אותי',
        forgotPassword: 'שכחת סיסמה?',
        invalidEmail: 'הקלט אינו דוא"ל חוקי',
    }
}

export const emailRules = (language) => [
    {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: translations[language].invalidEmail,
    },
];


export const LoginPage: React.FC<Props> = ({ onUserDetails, onUserLogin, language, onLanguageChange }) => {
    const [userType, setUserType] = useState<'therapist' | 'patient'>();
    const [selectedTherapist, setSelectedTherapist] = useState('');
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [form] = Form.useForm();

    const toggleLoginMode = () => {
        setIsLoginMode(!isLoginMode);
    };


    const handleGoogleSuccess = async (response: any) => {
        const userDetails = {
            email: response.profileObj.email,
            googleId: response.profileObj.googleId,
        };
        try {
            const res: AxiosResponse = await axios.post(
                `${config.backendURL}${config.registerEndpoint}`,
                userDetails
            );
            console.log(res.data);
        } catch (error) {
            message.error('Error during registration with Google');
        }
    };


    const handleGoogleFailure = () => {
        message.error('Google Sign In was unsuccessful. Try again later.');
    };

    const toggleLanguage = () => {
        if (onLanguageChange) {
            onLanguageChange(language === 'en' ? 'he' : 'en');
        }
    }


    return (
        <div dir={language === 'he' ? 'rtl' : 'ltr'} className={`${styles["login-container"]} ${language === 'he' ? styles.rtl : ''}`}>
            {isLoginMode ? (
                <LoginForm onUserLogin={onUserLogin}
                    language={language}
                    onToggleMode={toggleLoginMode}
                    onLanguageChange={onLanguageChange}
                    toggleLanguage={toggleLanguage}
                    toggleLoginMode={toggleLoginMode}
                    handleGoogleSuccess={handleGoogleSuccess}
                    handleGoogleFailure={handleGoogleFailure}
                />
            ) : (
                <RegisterForm onUserDetails={onUserDetails}
                    language={language}
                    onToggleMode={toggleLoginMode}
                    onLanguageChange={onLanguageChange}
                    toggleLanguage={toggleLanguage}
                    toggleLoginMode={toggleLoginMode}
                    handleGoogleSuccess={handleGoogleSuccess}
                    handleGoogleFailure={handleGoogleFailure}
                />
            )}
        </div>
    )
}
