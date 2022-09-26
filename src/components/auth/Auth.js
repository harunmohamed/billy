import "./auth.css"
import React, { useState } from "react"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import BillyIcon from "../../assets/logos/billysmall-favicon.png"

export default function Auth() {
    const [name, setName] = useState(null)
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState(null)
    const [error, setError] = useState(null)
    const [ cookies, setCookie, removeCookie] = useCookies(null)
    const [authMode, setAuthMode] = useState("signin")
    const changeAuthMode = () => { setAuthMode(authMode === "signin" ? "signup" : "signin") }

    console.log(name, email, password, "<---------------")

    let navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {

            let config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }

            // ADD BACKEND URI TO .env FILE
            const response = await axios.post(`${process.env.REACT_APP_BACKEND}/auth/${authMode == "signup" ? 'register' : 'login'}`, { name, email, password }, config)

            setCookie('AuthToken', response.data.token)
            setCookie('UserId', response.userId)

            const success = response.status === 200
            if (success) navigate ('/')

            window.location.reload()

        } catch (error) {
            setError(error)
            console.log(error)
        }

    }

  if (authMode === "signin") {
    return (
      <div className="Auth-form-container">
        <form className="Auth-form" onSubmit={handleSubmit}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">
            <img src={BillyIcon} className="me-auto" alt="Billy Logo" style={{height: 30}}/>
            {" "}
                Sign In
            </h3>
            <div className="text-center">
              Not registered yet?{" "}
              <span className="link-success" onClick={changeAuthMode}>
                Sign Up
              </span>
            </div>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                name="email"
                type="email"
                className="form-control mt-1"
                placeholder="Enter email"
                required={true}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                name="password"
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
                required={true}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-success">
                Submit
              </button>
            </div>
            <p className="text-center mt-2">
              Forgot <a href="#">password?</a>
            </p>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={handleSubmit}>
        <div className="Auth-form-content">
        <h3 className="Auth-form-title">
            <img src={BillyIcon} className="me-auto" alt="Billy Logo" style={{height: 30}}/>
            {" "}
                Sign Up
            </h3>
          <div className="text-center">
            Already registered?{" "}
            <span className="link-success" onClick={changeAuthMode}>
              Sign In
            </span>
          </div>
          <div className="form-group mt-3">
            <label>Full Name</label>
            <input
              name="name"
              type="text"
              className="form-control mt-1"
              placeholder="e.g Harun Mohamed"
              required={true}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              name="email"
              type="email"
              className="form-control mt-1"
              placeholder="Email Address"
              required={true}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              name="password"
              type="password"
              className="form-control mt-1"
              placeholder="Password"
              required={true}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-success">
              Submit
            </button>
          </div>
          <p className="text-center mt-2">
            Forgot <a href="#">password?</a>
          </p>
        </div>
      </form>
    </div>
  )
}
