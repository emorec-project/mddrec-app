// LoginPage.tsx
import React, { useState } from 'react';
import CryptoJS from 'crypto-js';
import { Input, Button, Form, Checkbox, Radio, Dropdown, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import styles from '../../style/LoginPage.module.css';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import axios from 'axios';
import { message } from 'antd';
import config from '../../config/config';

interface Props {
    onUserRegister?: (userType: 'therapist' | 'patient', details: any) => void;
    language: 'en' | 'he';
    onLanguageChange?: (lang: 'en' | 'he') => void;
}

const translations = {
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

export const LoginPage: React.FC<Props> = ({ onUserRegister, language, onLanguageChange }) => {
    const [userType, setUserType] = useState<'therapist' | 'patient'>();
    const [selectedTherapist, setSelectedTherapist] = useState('');
    const [isLoginMode, setIsLoginMode] = useState(false);
    const [form] = Form.useForm();

    const emailRules = [
        {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: translations[language].invalidEmail,
        },
    ];

    const toggleLoginMode = () => {
        setIsLoginMode(!isLoginMode);
    };

    const menu = (
        <Menu onClick={(e) => setSelectedTherapist(e.key.toString())}>
            {/* Sample list of therapists. Ideally, this should come from a dynamic source or state */}
            <Menu.Item key="Therapist 1">Therapist 1</Menu.Item>
            <Menu.Item key="Therapist 2">Therapist 2</Menu.Item>
        </Menu>
    );

    const handleRegister = async () => {
        const values = form.getFieldsValue();
        const { email, password, userType, rememberMe } = values;

        if (onUserRegister && userType) {
            // Hash the password
            const hashedPassword = CryptoJS.SHA256(password).toString();
            try {
                const response = await axios.post(`${config.backendURL}${config.registerEndpoint}`, {
                    user_type: userType,
                    details: {
                        email: email,
                        password: hashedPassword,
                        selectedTherapist: selectedTherapist
                    }
                });
                // Call onUserRegister after successful registration
                // onUserRegister(userType, { email, password: hashedPassword });
            } catch (error) {
                message.error("Error during registration");
            }
        } else {
            message.error("User type is not selected");
        }
    }

    const handleLogin = async () => {
        const values = form.getFieldsValue();
        const email = values.email;
        const password = values.password;

        try {
            const response = await axios.post(`${config.backendURL}${config.tokenEndpoint}`, {
                username: email,
                password
            });
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
            const res = await axios.post(`${config.backendURL}${config.registerEndpoint}`, userDetails);
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


    return (
        <div dir={language === 'he' ? 'rtl' : 'ltr'} className={`${styles["login-container"]} ${language === 'he' ? styles.rtl : ''}`}>
            <Form form={form} style={{ marginBottom: "0px" }} onFinish={isLoginMode ? handleLogin : handleRegister} layout="vertical">
                <Form.Item name="email" rules={emailRules}>
                    <Input placeholder={translations[language].email} />
                </Form.Item>

                <Form.Item name="password">
                    <Input.Password placeholder={translations[language].password} />
                </Form.Item>

                {!isLoginMode && (
                    <>
                        <Form.Item name="userType">
                            <Radio.Group onChange={e => setUserType(e.target.value)} value={userType}>
                                <Radio value="therapist">{translations[language].isTherapist}</Radio>
                                <Radio value="patient">{translations[language].isPatient}</Radio>
                            </Radio.Group>
                        </Form.Item>

                        {userType === "patient" && (
                            <Form.Item name="selectedTherapist">
                                <Dropdown overlay={menu} trigger={['click']}>
                                    <a href="selection" className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                        {selectedTherapist || 'Select Therapist'} <DownOutlined />
                                    </a>
                                </Dropdown>
                            </Form.Item>
                        )}
                    </>
                )}

                <Form.Item>
                    <Button type="primary" htmlType="submit" block>{isLoginMode ? translations[language].login : translations[language].signUp}</Button>
                </Form.Item>

                <Form.Item className={styles["inline-elements"]}>
                    <Button onClick={toggleLanguage} block>{translations[language].changeLanguage}</Button>
                    <Button onClick={toggleLoginMode} block>{isLoginMode ? translations[language].goRegister : translations[language].alreadyUser}</Button>
                </Form.Item>

                <Form.Item className={styles["inline-elements"]}>
                    <Checkbox name="rememberMe" defaultChecked={false}>
                        {translations[language].rememberMe}
                    </Checkbox>
                    <Button type="link">{translations[language].forgotPassword}</Button>
                </Form.Item>

                <Form.Item>
                    <GoogleOAuthProvider clientId="YOUR CLIENT ID">
                        <GoogleLogin onSuccess={handleGoogleSuccess} onError={handleGoogleFailure} />
                    </GoogleOAuthProvider>
                </Form.Item>
            </Form>

        </div>
    )
}
