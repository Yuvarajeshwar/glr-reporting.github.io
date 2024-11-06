import React, { useState, useRef } from 'react';
import './css/style.css';
import backgroundImage from '../src/assets/background.webp';
import { useNavigate } from 'react-router-dom';
import { Toast } from 'primereact/toast';
import { ProgressSpinner } from 'primereact/progressspinner';

const Login10 = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false); // New state for password visibility
  const navigate = useNavigate();
  const toast = useRef(null);

  async function loginUserAndGetInfo(loginUrl, userInfoUrl, credentials) {
    try {
      const loginResponse = await fetch(loginUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!loginResponse.ok) {
        throw new Error('Login failed');
      }

      const loginData = await loginResponse.json();
      const token = loginData.token;

      const userInfoResponse = await fetch(userInfoUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!userInfoResponse.ok) {
        throw new Error('Failed to retrieve user info');
      }

      const userInfo = await userInfoResponse.json();
      toast.current.show({ severity: 'success', summary: 'Info', detail: 'Login successful.' });

      return userInfo;
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const loginUrl = `${import.meta.env.VITE_GLR_CRM_URL}/user/login`;
    const userInfoUrl = `${import.meta.env.VITE_GLR_CRM_URL}/user/precheck`;
    const credentials = {
      email: email,
      password: password,
    };

    loginUserAndGetInfo(loginUrl, userInfoUrl, credentials).then((userInfo) => {
      if (userInfo) {
        setIsLoading(false);
        toast.current.show({ severity: 'success', summary: 'Info', detail: 'Login successful.' });
        navigate('/glrTracker', { state: userInfo });
      } else {
        setIsLoading(false);
        toast.current.show({ severity: 'error', summary: 'Info', detail: 'Login Failed. Please try again later.' });
      }
    });
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const goToUsageDocumentation = () => {
    navigate('/guide');
  };

  const resetPassword = () => {
    navigate('/reset-password');
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <html lang="en">
      <head>
        <title>GLR TRACKER</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <link href="https://fonts.googleapis.com/css?family=Lato:300,400,700&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
        <link rel="stylesheet" href="css/style.css" />
      </head>
      <body className="img js-fullheight" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <Toast ref={toast} />
        {isLoading && (
          <div className="fullscreen-loader">
            <ProgressSpinner />
          </div>
        )}
        <div className="text-right">
          <button className="btn btn-primary submit px-1" onClick={goToUsageDocumentation}>
            Read Usage Documentation
          </button>
        </div>
        {/* Header section */}
        <section className="ftco-section">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-6 text-center mb-5">
                <h2 className="heading-section">GLR TRACKER</h2>
                <h6>{import.meta.env.VITE_APP_VERSION}</h6>
              </div>
            </div>

            <div className="row justify-content-center">
              <div className="col-md-6 col-lg-4">
                <div className="login-wrap p-0">
                  <form action="#" className="signin-form">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Username"
                        required
                        onChange={updateEmail}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        id="password-field"
                        type={passwordVisible ? 'text' : 'password'} // Toggle between text and password
                        className="form-control"
                        placeholder="Password"
                        required
                        onChange={updatePassword}
                      />
                      <span
                        className="fa fa-fw fa-eye field-icon toggle-password"
                        onClick={togglePasswordVisibility} // Add click event handler
                      ></span>
                    </div>
                    <div className="form-group">
                      <button type="submit" className="form-control btn btn-primary submit px-3" onClick={handleSubmit}>
                        Sign In
                      </button>
                    </div>
                    <button type="submit" className="form-control btn btn-primary submit px-1" onClick={resetPassword}>
                      Reset Password
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </body>
    </html>
  );
};

export default Login10;
