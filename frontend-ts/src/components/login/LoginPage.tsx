// LoginPage.tsx
import React, { useState } from 'react';
import CryptoJS from 'crypto-js';
import { Input, Button, Checkbox, Radio, Dropdown, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import styles from '../../style/LoginPage.module.css';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import axios from 'axios';
import { message } from 'antd';

interface Props {
    onUserRegister?: (userType: 'therapist' | 'patient', details: any) => void;
    language: 'en' | 'he';
    onLanguageChange?: (lang: 'en' | 'he') => void;
}

export const LoginPage: React.FC<Props> = ({ onUserRegister, language, onLanguageChange  }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState<'therapist' | 'patient'>();
    const [selectedTherapist, setSelectedTherapist] = useState('');
    
    const menu = (
        <Menu onClick={(e) => setSelectedTherapist(e.key.toString())}>
            {/* Sample list of therapists. Ideally, this should come from a dynamic source or state */}
            <Menu.Item key="Therapist 1">Therapist 1</Menu.Item>
            <Menu.Item key="Therapist 2">Therapist 2</Menu.Item>
        </Menu>
    );

    const handleRegister = async () => {
        if (onUserRegister && userType) {
            // Hash the password
            const hashedPassword = CryptoJS.SHA256(password).toString();
            try {
                const response = await axios.post('/register/', {
                    user_type: userType,
                    details: { email, password: hashedPassword, selectedTherapist }
                });
                console.log(response.data);
            } catch (error) {
                message.error("Error during registration");
            }
        } else {
            message.error("User type is not selected");
        }
    }    
    
    const handleLogin = async () => {
        try {
            const response = await axios.post('/token/', {
                username: email,
                password
            });
            console.log(response.data);
            // Here you can save the token to local storage or state and navigate the user to another page
        } catch (error) {
            message.error("Error during login");
        }
    }
     
    const handleGoogleSuccess = async (response: any) => {
        // We'll get the user details from Google and can send them to your backend to create or authenticate a user.
        const userDetails = {
            email: response.profileObj.email,
            googleId: response.profileObj.googleId
        };
        try {
            const res = await axios.post('/register_with_google/', userDetails);
            console.log(res.data);
            // Here you can save the token to local storage or state and navigate the user to another page
        } catch (error) {
            message.error("Error during registration with Google");
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


    const translations = {
        en: {
            signUp: 'Sign Up',
            login: 'Already a user? Login',
            email: 'Email',
            password: 'Password',
            isTherapist: "Are you a therapist?",
            isPatient: "Are you a patient?",
            changeLanguage: "Change language",
            rememberMe: 'Remember Me',
            forgotPassword: 'Forgot Password?'
        },
        he: {
            signUp: 'הרשמה',
            login: 'כבר משתמש? התחבר',
            email: 'דוא"ל',
            password: 'סיסמה',
            isTherapist: "האם הינך מטפל?",
            isPatient: "האם הינך מטופל?",
            changeLanguage: "החלף שפה",
            rememberMe: 'זכור אותי',
            forgotPassword: 'שכחת סיסמה?'
        }
    }

    return (
        <div dir={language === 'he' ? 'rtl' : 'ltr'} className={`${styles["login-container"]} ${language === 'he' ? styles.rtl : ''}`}>
            <Input placeholder={translations[language].email} value={email} onChange={e => setEmail(e.target.value)} />
            <Input placeholder={translations[language].password} type="password" value={password} onChange={e => setPassword(e.target.value)} />
    
            <Radio.Group onChange={e => setUserType(e.target.value)} value={userType}>
                <Radio value="therapist">{translations[language].isTherapist}</Radio>
                <Radio value="patient">{translations[language].isPatient}</Radio>
            </Radio.Group>
    
            {userType === "patient" && (
                <Dropdown overlay={menu} trigger={['click']}>
                    <a href="selection" className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                        {selectedTherapist || 'Select Therapist'} <DownOutlined />
                    </a>
                </Dropdown>
            )}
    
            <div className={styles["inline-elements"]}>
                <button onClick={handleRegister}>{translations[language].signUp}</button>
                <Button onClick={toggleLanguage}>{translations[language].changeLanguage}</Button>
            </div>
    
            <GoogleOAuthProvider clientId="YOUR CLIENT ID">
                <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={handleGoogleFailure}
                    // buttonText={translations[language].googleSignUp}
                />
            </GoogleOAuthProvider>
    
            <div className={styles["inline-elements"]}>
                <button onClick={handleLogin}>{translations[language].login}</button>
                <Checkbox>{translations[language].rememberMe}</Checkbox>
            </div>
    
            <button>{translations[language].forgotPassword}</button>    
        </div>
    )
}
