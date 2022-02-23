import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { login } from '../../store/session';
import * as sessionActions from '../../store/session';
import DemoButton from './DemoButton'
import './LoginForm.css'
import Cubeagram2 from "../../img/Cubeagram2.png"

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='main-login-div'>
      <div className='login-div'>
        <img id='cube-logo-login' src={Cubeagram2} alt='logo' />
        <form onSubmit={onLogin}>
          <div className='errors-login'>
            {errors.map((error, ind) => (
              <div id='errors-login' key={ind}>{error}</div>
            ))}
          </div>
          <div>
            <label id='email-login-label' htmlFor='email'>Email</label>
            <input
              id='email-input-login'
              required={true}
              name='email'
              type='text'
              placeholder='Email'
              value={email}
              onChange={updateEmail}
            />
          </div>
          <div>
            <label id='password-login-label' htmlFor='password'>Password</label>
            <input
              id='password-input-login'
              required={true}
              name='password'
              type='password'
              placeholder='Password'
              value={password}
              onChange={updatePassword}
            />
          </div>
          <button id='login-button-login' type='submit'>Login</button>
          <DemoButton />
          <div className='sign-up-account-link'>
            <p id='dont-have-account'>Don't Have an Account? </p>
            <Link id='signup-click' to='/sign-up'>Sign Up</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
