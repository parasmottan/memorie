import React from 'react'
import CardHole from '../components/CardHole'
import AuthCard from '../components/AuthCard'
import LoginCard from '../components/LoginCard'

function Login() {
  return (
     <div className='relative h-[100dvh] w-full overflow-hidden' >
      
      <div className='absolute inset-0 bg-cover bg-center blur-[1.5px] scale-105 z-0' style={{ backgroundImage: "url('./signup.jpg", filter: 'blur(2px) brightness(0.8)' }}>
      
        
      
      
      
      
      
      </div>
  <div className='relative z-20 flex flex-col md:flex-row items-center justify-center w-full h-full gap-[40vw]'>

  
  <div className="hidden lg:block">
    <CardHole />
  </div>

  <LoginCard />

</div>

    </div>
  )
}

export default Login