import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../features/auth/auth-slice';
import '../styles/register.css';
import toastr from 'toastr';
import { useNavigate } from 'react-router-dom';  // Import useNavigate hook

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role:1,
  });

  const { username, email, password , role} = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();  // Initialize useNavigate

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(registerUser({ username, email, password , role })).unwrap();
      toastr.success('Registration successful!', 'Success');
      setTimeout(() => {
        navigate('/login');  // Redirect to the desired route
      }, 2000); // 2 seconds delay
    } catch (error) {
      toastr.error('Registration failed. Please try again.', 'Error');
      setTimeout(() => {
        navigate('/register');  // Redirect to the desired route
      }, 2000); // 2 seconds delay
    }
  };

  return (
    <section className='register'>
    <div className='register-container'>
    <form onSubmit={onSubmit} className='register-form'>
      <h3 className='register-title'>Register Form</h3>
      <input className='register-input' type="text" name="username" value={username} onChange={onChange} placeholder="Username" required />
      <input className='register-input' type="email" name="email" value={email} onChange={onChange} placeholder="Email" required />
      <input className='register-input' type="password" name="password" value={password} onChange={onChange} placeholder="Password" required />
  
      <select className='register-input' name="role" value={role} onChange={onChange} required>
          <option value={1}>User</option>
          <option value={2}>Chef</option>
        </select>
      <button className='register-button' type="submit">Register</button>
    </form>
    </div>
    </section>
  );
};

export default Register;
