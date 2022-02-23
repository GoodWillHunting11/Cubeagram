import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, Link } from 'react-router-dom';
import { signUp } from '../../store/session';
import Cubeagram2 from "../../img/Cubeagram2.png"
import "./SignUpForm.css"

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [imageUrl, setImageUrl] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password, imageUrl));
      // if(!email.includes('https' || 'http')) setErrors(["Enter a Valid Image URL"])
      if (data) {
        setErrors(data)
      }
    } else {
      setErrors(["Passwords Don't Match"])
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updateImageUrl = (e) => {
    setImageUrl(e.target.value)
  }

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='main-login-div'>
      <div className='login-div'>
        <img id='cube-logo-login' src={Cubeagram2} alt='logo' />
        <form onSubmit={onSignUp}>
          <div>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <div>
            <label id='username-signup' >User Name</label>
            <input
              id='input-signup-page'
              required={true}
              type='text'
              name='username'
              onChange={updateUsername}
              value={username}
            ></input>
          </div>
          <div>
            <label id='email-signup'>Email</label>
            <input
              id='input-signup-page'
              required={true}
              type='email'
              name='email'
              onChange={updateEmail}
              value={email}
            ></input>
          </div>
          <div>
            <label id='profile-pic-signup'>Profile Picture</label>
            <input
              id='input-signup-page'
              required={true}
              type='text'
              name='imageUrl'
              onChange={updateImageUrl}
              value={imageUrl}
            ></input>
          </div>
          <div>
            <label id='password-signup'>Password</label>
            <input
              id='input-signup-page'
              required={true}
              type='password'
              name='password'
              onChange={updatePassword}
              value={password}
            ></input>
          </div>
          <div>
            <label id='repeat-signup'>Confirm Password</label>
            <input
              id='input-signup-page'
              type='password'
              name='repeat_password'
              onChange={updateRepeatPassword}
              value={repeatPassword}
              required={true}
            ></input>
          </div>
          <button id='login-button-signup' type='submit'>Sign Up</button>
          <div className='sign-up-account-link'>
            <p id='have-account'>Already Have an Account? </p>
            <Link id='signup-click' to='/login'>Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
