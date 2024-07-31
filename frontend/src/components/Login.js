import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../features/auth/auth-slice';
import '../styles/login.css'
import toastr from 'toastr';
import { useNavigate } from 'react-router-dom';  
const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();  // Initialize useNavigate

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(loginUser({ email, password }));
      toastr.success('Login successful!', 'Success');
      setTimeout(() => {
        navigate('/');  // Redirect to the desired route
      }, 2000); // 2 seconds delay
    } catch (error) {
      toastr.error('Login failed. Please try again.', 'Error');
      setTimeout(() => {
        navigate('/login');  // Redirect to the desired route
      }, 2000); // 2 seconds delay
    }
  };

  return (
    <div className='login-container'>
    <form onSubmit={onSubmit} className='login-form'>
      <h3 className='login-title'>Login Form</h3>
      <input className='login-input' type="email" name="email" value={email} onChange={onChange} placeholder="Email" required />
      <input className='login-input' type="password" name="password" value={password} onChange={onChange} placeholder="Password" required />
      <button className='login-button' type="submit">Login</button>
    </form>
    </div>
  );
};

export default Login;
