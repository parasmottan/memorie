import React from 'react';
import OtpVerificationCard from '../components/OtpVerificationCard';

function otpPage() {
  return (
  <div className="min-h-[100dvh] w-full flex items-center justify-center bg-cover bg-center relative overflow-hidden" style={{backgroundImage: 'url(/signup.jpg)'}}>
  {/* Blur overlay */}
  <div className="absolute inset-0 bg-black/20 backdrop-blur-sm z-0"></div>

  {/* Content above blur */}
  <div className="z-10">
    <OtpVerificationCard />
  </div>
</div>
  )
}

export default otpPage