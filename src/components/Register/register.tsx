import React, { useState } from 'react'
import { Link} from 'react-router-dom'
import "./register.css"
import { useNavigate } from 'react-router-dom'
import {useContext} from "react"
import { LoginState } from '../../Context api/State';

interface userRegisterDataType {
  username:string,
  email:string,
  password:string,
  DOB:string,
  showSubmitError:boolean,
  errorMsg:string
}

const Register =()=> {
  const [state,setState]=useState<userRegisterDataType>({
    username: '',
    email:"",
    password: '',
    DOB:"",
    showSubmitError: false,
    errorMsg: '',
  })

  const Loggeduser:any = useContext(LoginState)

  const navigate=useNavigate()

  const onChangeUsername = (event: any) => {
    setState({ ...state,username: event.target.value })
  }

  const onChangePassword = (event: any) => {
    setState({ ...state,password: event.target.value })
  }

  const onChangeEmail=(event:any)=> {
    setState({...state,email:event.target.value})
  }

  const onChangeDOB=(event:any)=> {
    setState({...state,DOB:event.target.value})
  }

  const validateUsername=async()=> {
    const {username}=state
    const url = 'http://localhost:8080/users'
    const response = await fetch(url)
    const data=await response.json()
    const isRegistered=data.find((each: { username: string })=>each.username===username)
    if (isRegistered) {
      return(false)
    }return(true)
  }

  const validateEmail=async()=> {
    const {email}=state
    const url = 'http://localhost:8080/users'
    const response = await fetch(url)
    const data=await response.json()
    const isRegistered=data.find((each: { email: string })=>each.email===email)
    if ((/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) && (!(isRegistered))) {
      return (true)
    }
    return (false)
  }

  const validatePassword=()=> {
    const {password}=state
    var pass=/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/
    if (password.match(pass)) {
      return(true)
    }
    return(false)
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
          placeholder='Username'
          id="username"
          className="username-input-field"
          value={username}
          onChange={onChangeUsername}
        />
      </>
    )
  }

  const renderPasswordField = () => {
    const { password } = state
    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
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

  const renderEmailfeild=() =>{
    const { email } = state
    return(
      <>
        <label className="input-label" htmlFor="email">
          EMAIL
        </label>
        <input
          type="email"
          placeholder='Email'
          id="email"
          className="password-input-field"
          value={email}
          onChange={onChangeEmail}
        />
      </>
    )
  }

  const renderDOBField=()=> {
    const { DOB } = state
    return(
      <>
        <label className="input-label" htmlFor="dob">
          DOB
        </label>
        <input
          type="date"
          id="dob"
          placeholder='Date Of Birth'
          value={DOB}
          className="password-input-field"
          onChange={onChangeDOB}
        />
      </>
    )
  }

  const submitForm = async (event:any) => {
    event.preventDefault()
    const {username,email, password, DOB} = state
    if (username!=="" && email!=="" && password!=="" && DOB!=="") {
      if (await(validateEmail()) && validatePassword() && await(validateUsername())) {
        const userDetails = {username,email, password,DOB}
        setState({...state,showSubmitError:false})
        const url = 'http://localhost:8080/users'
        const options = {
          method: 'POST',
          headers:{
            "Content-Type":"application/json"
          },
          body: JSON.stringify(userDetails),
        }
        const response = await fetch(url, options)
        if (response.ok===true) {
          Loggeduser.setUser(username)
          navigate("/")
        }
      }
      else if (!(await(validateUsername()))) {
        setState({...state,showSubmitError:true,errorMsg:"Username taken!!"})
      }

      else if (!(await(validateEmail()))) {
        const {email}=state
        const url = 'http://localhost:8080/users'
        const response = await fetch(url)
        const data=await response.json()
        const isRegistered=data.find((each: { email: string })=>each.email===email)
        if (isRegistered) {
          setState({...state,showSubmitError:true,errorMsg:"Email Id already exists"})
        }
        else {
          setState({...state,showSubmitError:true,errorMsg:"Invalid email address!"})
        }
      }
      else if (!(validatePassword())) {
        setState({...state,password:"",showSubmitError:true,errorMsg:"Password must contain 8 to 15 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character"})
      }
    }
    else {
      setState({...state,showSubmitError:true,errorMsg:"Please fill all the details."})
    }
    
  }
  
    return (
      <div className="login-form-container">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Pluralsight_Logo.svg/1280px-Pluralsight_Logo.svg.png"
          className="login-image"
          alt="website login"
        />
        <form className="form-container" onSubmit={submitForm}>
          <h3 className="login-heading" aria-label='h3'>Register Here!</h3>
          <div className="input-container">{renderUsernameField()}</div>
          <div className='input-container'>{renderEmailfeild()}</div>
          <div className="input-container">{renderPasswordField()}</div>
          <div className="input-container">{renderDOBField()}</div>
          <div className='btn-cont'>
            <button type="submit" className='register button' data-testid="register">
              Register
            </button>
          </div>
          <Link to="/login" className="login-link" >
            <p className='forget-msg'>Wanna Login?</p>
          </Link>
          {state.showSubmitError && <p className="error-message">*{state.errorMsg}</p>}
        </form>
      </div>
    )
}

export default Register