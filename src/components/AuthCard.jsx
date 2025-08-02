import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import API from '../api';

function AuthCard() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });


const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
  };
  





  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!isValidEmail(formData.email)) {
    toast.error("Please enter a valid email address.");
    return;
  }

  try {
    // Step 1: register user
    const res = await API.post('/auth/register', formData);

    // ✅ Show success toast (non-blocking)
    toast.success(res.data.message || "Registered successfully!");

    // Step 2: send OTP (no need to wait before navigation)
    API.post('/otp/send-otp', { email: formData.email })
      .then(() => toast.success("OTP sent to email!"))
      .catch(() => toast.error("Failed to send OTP"));

    // ✅ Instantly navigate to /verify
    navigate('/verify', { state: { email: formData.email } });

  } catch (err) {
    console.error("❌ Registration error:", err);
    toast.error(err.response?.data?.message || "Registration failed");
  }
};



  return (
    <div className="bg-white/20 backdrop-blur-md border-2 border-black/20 lg:rounded-3xl mb-4 lg:mb-0 rounded-[8%] w-[93%] h-[55%] lg:px-8 px-15 p-8 lg:w-[28vw] lg:h-[49vh] flex gap-7 flex-col lg:gap-7 items-center justify-center shadow-lg relative">

      <h1 className='lg:text-2xl text-[8vw] text-white text-center' style={{ fontFamily: "Poppins" }}>Sign-up</h1>

      <form onSubmit={handleSubmit} className="w-full flex flex-col justify-center items-center gap-9  lg:gap-6">
        <input
          type="text"
          name="username"
          required
          placeholder='username'
          value={formData.username}
          onChange={handleChange}
          className='lg:w-[105%] w-[140%] outline-none text-white/70 lg:text-lg text-xl rounded-full lg:rounded-lg h-[10vw] lg:h-[2.8vw] bg-white/25 pb-1 backdrop-blur-md px-5'
        />
        <input
          type="text"
          name="email"
          required
          placeholder='email'
          value={formData.email}
          onChange={handleChange}
          className='w-[140%] lg:w-[105%] outline-none text-white/70 lg:text-lg text-xl rounded-full lg:rounded-lg h-[10vw] lg:h-[2.8vw] bg-white/25 pb-1 backdrop-blur-md px-5'
        />
        <input
          type="password"
          name="password"
          required
          placeholder='password'
          value={formData.password}
          onChange={handleChange}
          className='w-[140%] lg:w-[105%] outline-none active:text-black/40 text-white/70 lg:text-lg text-xl rounded-full lg:rounded-lg h-[10vw] lg:h-[2.8vw] bg-white/25 pb-1 backdrop-blur-md px-5'
        />
        <button
          type='submit'
          className='lg:px-10 rounded-full  px-10 py-2 lg:py-[10px] lg:text-lg text-xl text-white/90 font-normal cursor-pointer bg-black absolute bottom-[-5%] lg:bottom-[-1.3vw] active:bg-black/90'
        >
          SignUp
        </button>
      </form>

      <span className='text-white/70 font-normal text-sm lg:mt-0 mt-3 whitespace-nowrap lg:text-sm' style={{ fontFamily: "Helvetica" }}>
        Already have an account? <Link to={"/login"} className='text-blue-500 font-bold underline'>LOGIN</Link>
      </span>
    </div>
  );
}

export default AuthCard;
