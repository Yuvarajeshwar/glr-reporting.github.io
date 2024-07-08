import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import 'primereact/resources/themes/saga-blue/theme.css'; // Import theme
import 'primereact/resources/primereact.min.css'; // PrimeReact CSS
import 'primeicons/primeicons.css'; // PrimeIcons
import 'primeflex/primeflex.css'; // PrimeFlex CSS
import './Login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Perform login logic here
        console.log(`Username: ${username}, Password: ${password}`);
    };

    return (
        <div className="flex align-items-center justify-content-center min-h-screen">
            <Card title="Login" className="p-card-shadow">
                <div className="p-fluid">
                    <div className="p-field">
                        <label htmlFor="username">Username</label>
                        <InputText
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            autoComplete="username"
                            placeholder="Enter your username"
                        />
                    </div>
                    <div className="p-field">
                        <label htmlFor="password">Password</label>
                        <Password
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            feedback={false}
                            autoComplete="current-password"
                            placeholder="Enter your password"
                        />
                    </div>
                    <Button label="Login" icon="pi pi-sign-in" onClick={handleLogin} className="p-mt-3" />
                    <Divider />
                    <p className="p-text-center">Don't have an account? <a href="/register">Register</a></p>
                </div>
            </Card>
        </div>
    );
};

export default Login;
