import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import API from '../api'; // ✅ must have baseURL and withCredentials set

function LoginCard() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post('/auth/login', formData); // ✅ token comes here

      toast.success(res.data.message || "Login successful");

      if (res.data.user && res.data.token) {
        // ✅ Combine user and token
        const fullUser = { ...res.data.user, token: res.data.token };
        localStorage.setItem('user', JSON.stringify(fullUser));

        // ✅ Optional: attach to axios
        API.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;

        navigate('/home', { state: { user: fullUser } });
      } else {
        toast.error("No user data returned from server");
      }

    } catch (err) {
      console.error("❌ Login error:", err);
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="bg-white/20 backdrop-blur-md border-2 border-black/20 lg:rounded-3xl mb-3 lg:mb-0 rounded-[8%] w-[84%] h-[45%] lg:px-8 px-15 p-8 lg:w-[28vw] lg:h-[49vh] flex gap-7 flex-col lg:gap-7  items-center justify-center shadow-lg relative">
      <h1 className='lg:text-2xl text-[8vw]  text-white text-center' style={{ fontFamily: "Poppins" }}>Login</h1>

      <form onSubmit={handleSubmit} className="w-full flex flex-col justify-center items-center gap-9  lg:gap-6">
        <input
          type="text"
          name="email"
          required
          placeholder='email'
          value={formData.email}
          onChange={handleChange}
          className='lg:w-[105%] w-[140%] outline-none text-white/70 lg:text-lg text-xl rounded-full lg:rounded-lg h-[10vw] lg:h-[2.8vw] bg-white/25 pb-1 backdrop-blur-md px-5'
        />
        <input
          type="password"
          name="password"
          required
          placeholder='password'
          value={formData.password}
          onChange={handleChange}
          className='w-[140%] lg:w-[105%] outline-none text-white/70 lg:text-lg text-xl rounded-full lg:rounded-lg h-[10vw] lg:h-[2.8vw] bg-white/25 pb-1 backdrop-blur-md px-5'
        />
        <button type='submit' className='lg:px-10 rounded-full px-10 py-2 lg:py-[10px] lg:text-lg text-xl text-white/90 font-normal cursor-pointer bg-black absolute bottom-[-5%] lg:bottom-[-1.3vw] active:bg-black/90'>
          Login
        </button>
      </form>

      <span className='text-white/70 font-normal text-sm lg:text-sm' style={{ fontFamily: "Helvetica" }}>
        New user here? <Link to="/signup" className='text-blue-500 font-bold underline'>Register</Link>
      </span>
    </div>
  );
}

export default LoginCard;
