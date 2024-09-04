import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import './login.css';
import { useNavigate } from 'react-router-dom';

import React, { useState } from 'react';
import { Form, Field } from 'react-final-form';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import Header from '../components/Header';

const Login = () => {
    
    const navigate = useNavigate();

    // Step 2: Handle input changes
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };


    // Function to log in and get user info
async function loginUserAndGetInfo(loginUrl, userInfoUrl, credentials) {
    // setisLoggedIn(false)
    try {
        // Step 1: Login to get the token
        const loginResponse = await fetch(loginUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        });

        // Check if the login response is successful
        if (!loginResponse.ok) {
            throw new Error('Login failed');
        }

        // Get the token from the login response
        const loginData = await loginResponse.json();
        const token = loginData.token; // Adjust this based on your API response structure

        console.log(token)

        // Step 2: Use the token to get user info
        const userInfoResponse = await fetch(userInfoUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`, // Use the token in the Authorization header
                'Content-Type': 'application/json'
            }
        });
        console.log(userInfoResponse)
        // Check if the user info response is successful
        if (!userInfoResponse.ok) {
            throw new Error('Failed to retrieve user info');
        }

        // Get user info from the response
        const userInfo = await userInfoResponse.json();

        // Return user info
        return userInfo;

    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}




    const validate = (data) => {
        let errors = {};

        if (!data.email) {
            errors.email = 'Email is required.';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
            errors.email = 'Invalid email address. E.g. example@email.com';
        }

        if (!data.password) {
            errors.password = 'Password is required.';
        }

        if (!data.accept) {
            errors.accept = 'You need to agree to the terms and conditions.';
        }

        return errors;
    };

    const onSubmit = (data, form) => {
    console.log(data)
        // Example usage
    const loginUrl = 'https://glr-staged.infantsurya.in/v1/user/login';
    const userInfoUrl = 'https://glr-staged.infantsurya.in/v1//user/precheck';
    const credentials = {
        email: 'sd2@gmail.com',
        password: 'test123'
    };

        loginUserAndGetInfo(loginUrl, userInfoUrl, credentials)
        .then(userInfo => {
        if (userInfo) {
            console.log('User Info:', userInfo);
            // setisLoggedIn(true)
            navigate('/glrTracker', { state: userInfo });
        } else {
            console.log('Failed to get user info');
        }
    });

    };

    const isFormFieldValid = (meta) => !!(meta.touched && meta.error);
    const getFormErrorMessage = (meta) => {
        return isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>;
    };

    return (
        <>
        
            <div className="form-demo" style={{ marginTop: '30px' }}>
                <div className="flex justify-content-center">
                    <div className="card">
                        <Header loggedin={false} />
                        <h5 className="text-center">LOGIN</h5>
                        <Form onSubmit={onSubmit} initialValues={{ email: '', password: '', accept: false }} validate={validate} render={({ handleSubmit }) => (
                            <form onSubmit={handleSubmit} className="p-fluid">
                                <Field name="email" render={({ input, meta }) => (
                                    <div className="field">
                                        <span className="p-float-label">
                                            <InputText id="email" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                            <label htmlFor="email" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Email*</label>
                                        </span>
                                        {getFormErrorMessage(meta)}
                                    </div>
                                )} />
                                <Field name="password" render={({ input, meta }) => (
                                    <div className="field">
                                        <span className="p-float-label">
                                            <Password id="password" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })}/>
                                            <label htmlFor="password" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Password*</label>
                                        </span>
                                        {getFormErrorMessage(meta)}
                                    </div>
                                )} />
                                {/* <Field name="accept" type="checkbox" render={({ input, meta }) => (
                                    <div className="field-checkbox">
                                        <Checkbox inputId="accept" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                        <label htmlFor="accept" className={classNames({ 'p-error': isFormFieldValid(meta) })}>I agree to the terms and conditions*</label>
                                    </div>
                                )} /> */}
                                <div className="button-container">
                                    <Button type="submit" label="Submit" className="mt-2" onClick={onSubmit}/>
                                </div>
                            </form>
                        )} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
