import React, {useState} from 'react';
import loginStyles from './Login.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {login} from '../../features/auth/authSlice'
import { populateMessage } from '../../features/notification/notification.Slice';



const Login = () => {
	const auth = useSelector((state) => state.auth.isAuth)
	const dispatch = useDispatch()
	const navigate = useNavigate()
	// console.log(auth)

	const initialValues = {
		email: '',
		password: ''
	}

	const [userCredentials, setUserCredentials] = useState(initialValues)

	const handleChange = (e) =>{
		setUserCredentials({
			...userCredentials, [e.target.name]: e.target.value
		  })
	}

	const handleSubmit = async (e) =>{
		e.preventDefault()
		axios.post('http://localhost:3032/api/login', userCredentials).then(({data})=>{
			dispatch(login(data))
			navigate('/overview')
			dispatch(populateMessage({message: 'You have login successfully', messageStatus: true, showNotification: true}))
		}).catch(err=>{
			console.log(err)
		})
	}
	


  return (
    <div className={loginStyles.content}>
		<h1>Store Name</h1>
      <form onSubmit={handleSubmit}>
		<h2>Login</h2>
        <label>Email:</label>
        <input type="email" name="email" value={userCredentials.email} onChange={handleChange}/>
        <label>Password:</label>
        <input type="password" name="password" value={userCredentials.password} onChange={handleChange}/>
        <button type='submit'>Login</button>
		<div className={loginStyles.forgot_password}>
			<button onClick={()=> navigate('/recover-password')}>Forgot password?</button>
		</div>
      </form>
    </div>
  );
};

export default Login;
