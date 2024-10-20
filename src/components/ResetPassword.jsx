import { useState, useRef } from 'react'
// import './css/style.css';
import backgroundImage from '../assets/background.webp'
import { useNavigate } from 'react-router-dom'
import { Toast } from 'primereact/toast'

const ResetPassword = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [tempPassword, setTempPassword] = useState('')

  const navigate = useNavigate()
  const toast = useRef(null)

  async function loginUserAndGetInfo(loginUrl, credentials) {
    try {
      // Step 1: Login to get the token
      const loginResponse = await fetch(loginUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      })

      if (!loginResponse.ok) {
        throw new Error('Reset Password Failed!.')
      }

      // Step 2: Use the token to get user info
      toast.current.show({
        severity: 'success',
        summary: 'Info',
        detail: 'Login successful.',
      })

      return loginResponse
    } catch (error) {
      console.error('Error:', error)
      throw new Error(`Reset Password Failed - ${error}`)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const loginUrl = `${import.meta.env.VITE_GLR_CRM_URL}/user/reset-password`
    const credentials = {
      email: email,
      password: password,
      tempPassword: tempPassword,
    }

    loginUserAndGetInfo(loginUrl, credentials).then((userInfo) => {
      if (userInfo) {
        toast.current.show({
          severity: 'success',
          summary: 'Info',
          detail: 'Login successful.',
        })
        navigate('/')
      } else {
        toast.current.show({
          severity: 'error',
          summary: 'Info',
          detail: 'Reset password failed. Please try again later.',
        })
      }
    })
  }

  const updateEmail = (e) => {
    setEmail(e.target.value)
  }

  const updatePassword = (e) => {
    setPassword(e.target.value)
  }

  const updateTempPass = (e) => {
    setTempPassword(e.target.value)
  }

  const goToUsageDocumentation = () => {
    navigate('/guide')
  }

  return (
    <html lang="en">
      <head>
        <title>GLR REPORTING</title>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Lato:300,400,700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
        />
        <link rel="stylesheet" href="css/style.css" />
      </head>
      <body
        className="img js-fullheight"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <Toast ref={toast} />
        <div className="text-right">
          <button
            className="btn btn-primary submit px-1"
            onClick={goToUsageDocumentation}
          >
            Read Usage Documentation
          </button>
        </div>
        {/* Header section */}
        <section className="ftco-section">
          <div className="container">
            {/* Add the 'Read Usage Documentation' button */}

            <div className="row justify-content-center">
              <div className="col-md-6 text-center mb-5">
                <h2 className="heading-section">GLR REPORTING</h2>
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
                        type="text"
                        className="form-control"
                        placeholder="Temp Password"
                        required
                        onChange={updateTempPass}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        id="password-field"
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        required
                        onChange={updatePassword}
                      />
                      <span
                        className="fa fa-fw fa-eye field-icon toggle-password"
                        toggle="#password-field"
                      ></span>
                    </div>
                    <div className="form-group">
                      <button
                        type="submit"
                        className="form-control btn btn-primary submit px-3"
                        onClick={handleSubmit}
                      >
                        Reset Password
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </body>
    </html>
  )
}

export default ResetPassword
