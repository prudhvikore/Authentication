import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'




interface forgot_pass {
    username:string,
    DOB:string,
    newPassword:string,
    confirmPassword:string,
    showError:boolean,
    error:string
}


const ForgotPassword=()=> {
    const [state,setState]=useState<forgot_pass>({
        username:"",
        DOB:"",
        newPassword:"",
        confirmPassword:"",
        showError:false,
        error:"",
    })

    const navigate=useNavigate()

    const onChangeUsername = (event: any) => {
        setState({ ...state,username: event.target.value })
    }

    const onChangePassword = (event: any) => {
        setState({ ...state,newPassword: event.target.value })
    }

    const onChangeDOB=(event:any)=> {
        setState({...state,DOB:event.target.value})
    }

    const onChangeCP=(event:any)=> {
        setState({...state,confirmPassword:event.target.value})
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
              data-testid="username"
              className="username-input-field"
              value={username}
              onChange={onChangeUsername}
            />
          </>
        )
      }
    
      const renderPasswordField = () => {
        const { newPassword } = state
        return (
          <>
            <label className="input-label" htmlFor="password">
              NEW PASSWORD
            </label>
            <input
              type="password"
              placeholder='New Password'
              id="password"
              className="password-input-field"
              value={newPassword}
              onChange={onChangePassword}
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
              value={DOB}
              className="password-input-field"
              onChange={onChangeDOB}
            />
          </>
        )
      }

      const renderConfirmPasswordField=()=> {
        const {confirmPassword}=state
        return(
            <>
              <label className="input-label" htmlFor="newPassword">
                CONFIRM PASSWORD
              </label>
              <input
                type="password"
                placeholder='Confirm Password'
                id="newPassword"
                value={confirmPassword}
                className="password-input-field"
                onChange={onChangeCP}
              />
            </>
          )
      }

      let isRegistered:any;

      const checkUsername=async()=> {
        const {username}=state
        const url = 'http://localhost:8080/users'
        const response = await fetch(url)
        const data=await response.json()
        isRegistered=data.find((each: { username: string })=>each.username===username)
        if (isRegistered) {
          return(true)
        }return(false)
      }

      const confirmDOB=()=> {
        const {DOB}=state
        if (isRegistered.DOB===DOB) {
            return(true)
        }return(false)
      }

      const validatePassword=()=> {
        const {newPassword,confirmPassword}=state
        var pass=/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/
        if (newPassword.match(pass) && newPassword===confirmPassword) {
          return(true)
        }
        return(false)
      }

      const submitForm = async (event:any) => {
        event.preventDefault()
        const {username, newPassword, DOB, confirmPassword} = state
        if (username!=="" && newPassword!=="" && DOB!=="") {
          if (validatePassword() && await(checkUsername()) && confirmDOB() ) {
            const userDetails = {username, password:newPassword,DOB}
            const url = `http://localhost:8080/users/${isRegistered.id}`
            const options = {
              method: 'PATCH',
              headers:{
                "Content-Type":"application/json"
              },
              body: JSON.stringify(userDetails),
            }
            const response = await fetch(url, options)
            if (response.ok===true) {
              alert("Password Reset Successful, Please Login!!")
              navigate("/login")
              setState({...state,showError:false})
            }
          }
          else if (!(await(checkUsername()))) {
            setState({...state,showError:true,error:"Username not found, Please register"})
          }
    
          else if (!(confirmDOB())) {
            setState({...state,showError:true,error:"DOB did not match"})
          }
          else if (!(validatePassword())){
            if (newPassword===confirmPassword) {
                setState({...state,newPassword:"",confirmPassword:"",showError:true,error:"Password must contain 8 to 15 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character"})
            }
            else {
                setState({...state,newPassword:"",confirmPassword:"",showError:true,error:"Password did not match with confirm password!!"})
            }
          }
        }
        else {
          setState({...state,showError:true,error:"Please fill all the details."})
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
              <h3 aria-label='heading' className="login_heading">Password Reset</h3>
              <div className="input-container">{renderUsernameField()}</div>
              <div className="input-container">{renderDOBField()}</div>
              <div className="input-container">{renderPasswordField()}</div>
              <div className="input-container">{renderConfirmPasswordField()}</div>

              <div className='btn-cont'>
                <button type="submit" className="login button" data-testid="reset-test" >
                  Reset
                </button>
              </div>
              
              {state.showError && <p className="error-message">*{state.error}</p>}

            </form>
        </div>
      )
}

export default ForgotPassword