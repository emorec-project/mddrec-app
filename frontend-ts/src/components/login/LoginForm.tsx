import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { Button, Checkbox, Form, Input, message } from 'antd';
import axios, { AxiosResponse } from 'axios';
import React from 'react';
import config from '../../config/config';
import styles from '../../style/LoginPage.module.css';
import { emailRules, translations } from "./LoginPage";
import { User } from './User';

interface LoginFormProps {
    onUserLogin: (user: User) => void;
    language: 'en' | 'he';
    onToggleMode: () => void;
    onLanguageChange?: (lang: 'en' | 'he') => void;
    toggleLanguage: () => void;
    toggleLoginMode: () => void;
    handleGoogleSuccess: (response: any) => Promise<void>;
    handleGoogleFailure: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onUserLogin, language, onToggleMode, onLanguageChange, toggleLanguage, toggleLoginMode, handleGoogleFailure, handleGoogleSuccess }) => {
    const [form] = Form.useForm();

    const handleLogin = async () => {
        try {
            const values = await form.validateFields();
            const email = values.email;
            const password = values.password;

            const form_data = new FormData();
            form_data.append('username', email);
            form_data.append('password', password);

            const response: AxiosResponse = await axios.post(
                `${config.backendURL}${config.tokenEndpoint}`,
                form_data
            );
            localStorage.setItem('token', response.data.access_token);
            const loggedUser: User = {
                email: email,
                language: language,
                userType: response.data.userType
            };
            onUserLogin(loggedUser);
        } catch (error) {
            message.error('Error during login');
        }
    };


    return (
            <Form form={form} style={{ marginBottom: "0px" }} onFinish={handleLogin} layout="vertical">
                <Form.Item name="email" rules={emailRules(language)}>
                    <Input placeholder={translations[language].email} />
                </Form.Item>

                <Form.Item name="password">
                    <Input.Password placeholder={translations[language].password} />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" block>{translations[language].login}</Button>
                </Form.Item>

                <Form.Item className={styles["inline-elements"]}>
                    <Button onClick={toggleLanguage} block>{translations[language].changeLanguage}</Button>
                    <Button onClick={toggleLoginMode} block>{translations[language].goRegister}</Button>
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
    );
}
