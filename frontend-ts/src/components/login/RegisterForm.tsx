import { DownOutlined } from '@ant-design/icons';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { Button, Checkbox, Dropdown, MenuProps, Form, Input, Menu, Radio, message } from 'antd';
import axios, { AxiosResponse } from 'axios';
import React, { useState } from 'react';
import config from '../../config/config';
import styles from '../../style/LoginPage.module.css';
import { emailRules, translations } from "./LoginPage";
import { User, UserDetails } from './User';

interface RegisterFormProps {
    onUserDetails: (user: User) => void;
    language: 'en' | 'he';
    onToggleMode: () => void;
    onLanguageChange?: (lang: 'en' | 'he') => void;
    toggleLanguage: () => void;
    toggleLoginMode: () => void;
    handleGoogleSuccess: (response: any) => Promise<void>;
    handleGoogleFailure: () => void;

}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onUserDetails, language, onToggleMode, onLanguageChange, toggleLanguage, toggleLoginMode, handleGoogleFailure, handleGoogleSuccess }) => {
    const [form] = Form.useForm();
    const [userType, setUserType] = useState<'therapist' | 'patient'>();
    const [selectedTherapist, setSelectedTherapist] = useState('');

    // const menu = (
    //     <Menu onClick={(e) => setSelectedTherapist(e.key.toString())}>
    //         {/* Sample list of therapists. Ideally, this should come from a dynamic source or state */}
    //         <Menu.Item key="Therapist 1">Therapist 1</Menu.Item>
    //         <Menu.Item key="Therapist 2">Therapist 2</Menu.Item>
    //     </Menu>
    // );

    const therapistItems: MenuProps['items'] = [
        {
            key: "Therapist 1",
            label: "Therapist 1"
        },
        {
            key: "Therapist 2",
            label: "Therapist 2"
        }
    ];

    const handleRegister = async () => {
        try {
            const values = await form.validateFields();
            const { email, password, userType, rememberMe } = values;

            if (userType) {
                const userDetails: UserDetails = {
                    user_type: userType,
                    email: email,
                    password: password
                };

                if (userType === 'patient') {
                    userDetails.selected_therapist = selectedTherapist;
                }

                const response: AxiosResponse = await axios.post(
                    `${config.backendURL}${config.registerEndpoint}`,
                    userDetails
                );
                const registeredUser: User = {
                    email: email,
                    language: language,
                    userType: userType,
                    therapistName: selectedTherapist
                };
                onUserDetails(registeredUser);
            } else {
                message.error('User type is not selected');
            }
        } catch (error) {
            message.error('Error during registration');
        }
    };

    return (
        <Form form={form} style={{ marginBottom: "0px" }} onFinish={handleRegister} layout="vertical">
            <Form.Item name="email" rules={emailRules(language)}>
                <Input placeholder={translations[language].email} />
            </Form.Item>

            <Form.Item name="password">
                <Input.Password placeholder={translations[language].password} />
            </Form.Item>

            <Form.Item name="userType">
                <Radio.Group onChange={e => setUserType(e.target.value)} value={userType}>
                    <Radio value="therapist">{translations[language].isTherapist}</Radio>
                    <Radio value="patient">{translations[language].isPatient}</Radio>
                </Radio.Group>
            </Form.Item>

            {userType === "patient" && (
                <Form.Item name="selectedTherapist">
                    <Dropdown menu={{ items: therapistItems, onClick: (e) => setSelectedTherapist(e.key.toString()) }}>
                        <a onClick={(e) => e.preventDefault()}>
                            {selectedTherapist || 'Select Therapist'} <DownOutlined />
                        </a>
                    </Dropdown>
                </Form.Item>
            )}

            <Form.Item>
                <Button type="primary" htmlType="submit" block>{translations[language].signUp}</Button>
            </Form.Item>

            <Form.Item className={styles["inline-elements"]}>
                <Button onClick={toggleLanguage} block>{translations[language].changeLanguage}</Button>
                <Button onClick={toggleLoginMode} block>{translations[language].alreadyUser}</Button>
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
