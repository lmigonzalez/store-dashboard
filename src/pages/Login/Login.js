import React from 'react';
import loginStyles from './Login.module.css';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {login, logout} from '../../features/auth/authSlice'


const Login = () => {
	const auth = useSelector((state) => state.auth.isAuth)
	const dispatch = useDispatch()
	const navigate = useNavigate()
	// console.log(auth)
	const handleSubmit = (e) =>{
		e.preventDefault()
		dispatch(login())
		navigate('/overview')
		console.log(auth)
	}

  return (
    <div className={loginStyles.content}>
		<h1>Store Name</h1>
      <form onSubmit={handleSubmit}>
		<h2>Login</h2>
        <label>Email:</label>
        <input type="email" name="email" value={''} />
        <label>Password:</label>
        <input type="password" name="password" value={''} />
        <button type='submit'>Login</button>
		<div className={loginStyles.forgot_password}>
        	<a href='/'>Forgot password?</a>
		</div>
      </form>
    </div>
  );
};

export default Login;
