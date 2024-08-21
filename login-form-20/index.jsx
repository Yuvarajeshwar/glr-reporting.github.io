import React from 'react';
import { useState } from 'react';
import './css/style.css'; // Assuming you have a CSS file for additional styles
// import backgroundImage from './images/bg.jpg'
import backgroundImage from '../src/assets/background.webp'
import { useNavigate } from 'react-router-dom';
import GLR from '../src/assets/GLR.png';

const Login10 = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")

  const navigate = useNavigate();


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


  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior for single-page applications

    // Here you can perform further logic such as validation or submitting data to a server
    console.log("Email:", email);
    console.log("Password:", password);

    const loginUrl = 'https://glr-staged.infantsurya.in/v1/user/login';
    const userInfoUrl = 'https://glr-staged.infantsurya.in/v1//user/precheck';
    const credentials = {
      email: email,
      password: password
    };

    loginUserAndGetInfo(loginUrl, userInfoUrl, credentials)
      .then(userInfo => {
        if (userInfo) {
          console.log('User Info:', userInfo);
          // setisLoggedIn(true)
          navigate('/tracker', { state: userInfo });
        } else {
          console.log('Failed to get user info');
        }
      });

  }

  const updateEmail = (e) => {
    setEmail(e.target.value);
  }

  const updatePassword = (e) => {
    setPassword(e.target.value);
  }

  return (
    <html lang="en">
      <head>
        <React.Fragment>
          <img src={GLR} />
        </React.Fragment>
        <title>GLR REPORTING</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <link href="https://fonts.googleapis.com/css?family=Lato:300,400,700&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
        <link rel="stylesheet" href="css/style.css" />
      </head>
      <body className="img js-fullheight"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <section className="ftco-section">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-6 text-center mb-5">
                <h2 className="heading-section">GLR REPORTING</h2>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-md-6 col-lg-4">
                <div className="login-wrap p-0">
                  <h3 className="mb-4 text-center">Have an account?</h3>
                  <form action="#" className="signin-form">
                    <div className="form-group">
                      <input type="text" className="form-control" placeholder="Username" required onChange={updateEmail} />
                    </div>
                    <div className="form-group">
                      <input id="password-field" type="password" className="form-control" placeholder="Password" required onChange={updatePassword} />
                      <span className="fa fa-fw fa-eye field-icon toggle-password" toggle="#password-field"></span>
                    </div>
                    <div className="form-group">
                      <button type="submit" className="form-control btn btn-primary submit px-3" onClick={handleSubmit}>Sign In</button>
                    </div>
                    <div className="form-group d-md-flex">
                      <div className="w-50">
                        <label className="checkbox-wrap checkbox-primary">Remember Me
                          <input type="checkbox" defaultChecked />
                          <span className="checkmark"></span>
                        </label>
                      </div>
                      <div className="w-50 text-md-right">
                        <a href="#" style={{ color: '#fff' }}>Forgot Password</a>
                      </div>
                    </div>
                  </form>
                  <p className="w-100 text-center">&mdash; Or Sign In With &mdash;</p>
                  <div className="social d-flex text-center">
                    <a href="#" className="px-2 py-2 mr-md-1 rounded"><span className="ion-logo-facebook mr-2"></span> Facebook</a>
                    <a href="#" className="px-2 py-2 ml-md-1 rounded"><span className="ion-logo-twitter mr-2"></span> Twitter</a>
                  </div>
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
