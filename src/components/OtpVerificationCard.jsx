import React, { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import API from '../api';
import { ImSpinner8 } from 'react-icons/im'; // 🔄 Optional: Spinner icon

function OtpVerificationCard() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;
  if (email) localStorage.setItem('otpEmail', email);
  const otpEmail = email || localStorage.getItem('otpEmail');

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const finalOtp = otp.join('');

    if (finalOtp.length !== 6) {
      return toast.error("Please enter a valid 6-digit OTP");
    }

    try {
      setLoading(true); // 🔄 Start loading
      const res = await API.post('/otp/verify-otp', { otp: finalOtp });
      toast.success(res.data.message);

localStorage.setItem("user", JSON.stringify({
  ...res.data.user,
  token: res.data.token   // ✅ Include token from backend response
}));
      console.log("✅ USER SAVED:", res.data.user);

      navigate('/home', { replace: true });
      window.location.reload(); // 💥 force redirect
    } catch (err) {
      toast.error(err.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false); // 🔄 Stop loading
    }
  };

  return (
    <div
  className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[2rem] p-10 w-[90vw] max-w-[400px] lg:h-[340px] flex flex-col gap-6 items-center justify-center relative"
  style={{
    // backgroundImage: 'url(./signup.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    border: '1px solid rgba(255, 255, 255, 0.2)',
  }}
>
      <h1 className='text-2xl text-white font-semibold font-poppins'>
        Enter OTP
      </h1>

      {loading ? (
        <div className="flex items-center justify-center h-28">
          <ImSpinner8 className="animate-spin text-white text-4xl" />
        </div>
      ) : (
        <>
          <form onSubmit={handleVerify} className="flex gap-2 lg:gap-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                pattern="\d*"
                maxLength="1"
                className="lg:w-12 w-10 bg-center bg-cover h-12 lg:h-14 text-2xl text-center rounded-xl bg-white/25 text-white/90 outline-none focus:ring-2 focus:ring-white/50 backdrop-blur"
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              />
            ))}
          </form>

          <button
            onClick={handleVerify}
            className='cursor-pointer mt-4 bg-black text-white px-10 py-[10px] rounded-full hover:bg-black/90 active:scale-95 transition-all duration-150'
          >
            Verify
          </button>
        </>
      )}

      <p className='text-white/60 text-sm absolute bottom-4 font-helvetica'>
        OTP sent to your email
      </p>
    </div>
  );
}

export default OtpVerificationCard;
