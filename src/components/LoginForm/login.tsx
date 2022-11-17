import React, { useState } from 'react'
import { Link} from 'react-router-dom'
import "./login.css"
import {useNavigate} from "react-router-dom";
import {useContext} from "react"
import { LoginState } from '../../Context api/State';

interface userDataType {
  username:string,
  password:string,
  showSubmitError:boolean,
  errorMsg:string
}


const LoginForm=()=>{
  const [state,setState]=useState<userDataType>(
   { username: '',
    password: '',
    showSubmitError: false,
    errorMsg: ''
  })

  const Loggeduser:any = useContext(LoginState)
  const navigate=useNavigate();


  const onChangeUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({...state,username:event.target.value})
  }

 const onChangePassword = (event: any) => {
    setState({...state,password:event.target.value})
  }

  const renderUsernameField = () => {
    const { username } = state
    return (
      <>
        <label className="input-label" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          placeholder='Username'
          className="username-input-field"
          value={username}
          onChange={onChangeUsername}
        />
      </>
    )
  }

 const  renderPasswordField = () => {
    const { password } = state
    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          required
          type="password"
          placeholder='Password'
          id="password"
          className="password-input-field"
          value={password}
          onChange={onChangePassword}
        />
      </>
    )
  }

  const submitForm = async (event:any) => {

    event.preventDefault()
    const {username,password}=state
    const url = 'http://localhost:8080/users'
    const response = await fetch(url)
    const data=await response.json()
    const isRegistered=data.find((each: { username: string })=>each.username===username)
    if (isRegistered) {
      if (isRegistered.username===username && isRegistered.password===password) {
        navigate("/")
        setState({...state,showSubmitError:false})
        Loggeduser.setUser(username);
        
      }
      else {
        setState({...state,showSubmitError:true,errorMsg:"Incorrect username or password"})
      }
    }
    else {
      setState({...state,showSubmitError:true,errorMsg:"User not found, Please register!!!"})
    }
  }


  return(
    <div className="login-form-container">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Pluralsight_Logo.svg/1280px-Pluralsight_Logo.svg.png"
          className="login-image"
          alt="website login"
        />
        <form className="form-container" onSubmit={submitForm}>
          <h3 aria-label='heading' className="login_heading">Login</h3>
          <div className="input-container">{renderUsernameField()}</div>
          <div className="input-container">{renderPasswordField()}</div>
          <div className='forgot-password'>
            <Link to="/forgot" className="forgot-password">
            <p className='forget-msg'>Forgot password?</p>
            </Link>
            
          </div>
          <div className='btn-cont'>
            <button type="submit" className="login button" data-testid="login-test" >
              Login
            </button>
            <Link to="/register" className="link" >

              <button type="button" className='register button' data-testid="register-test" >
                Register
              </button>
            </Link>
          </div>
          
          {state.showSubmitError && <p className="error-message">*{state.errorMsg}</p>}
        </form>
      </div>
  )
  
}

export default LoginForm