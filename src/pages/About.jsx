import React from 'react'
import { Link } from 'react-router-dom'


function About() {
  return (
     <div className='relative h-[100dvh] w-full overflow-hidden' >
      
      <div className='absolute inset-0 bg-cover bg-center blur-[1.9px] scale-105 z-0' style={{ backgroundImage: "url('./aboutus.jpg", filter: 'blur(2px) brightness(0.8)' }}>
      
        
      
      
      
      
      
      </div>
      <div className='relative z-20 flex items-start flex-col  justify-center w-full h-full pl-25 gap-10 '>
        
        <h1 style={{fontFamily: "Helvetica"}} className='text-5xl md:text-[5vw] text-[#00FFB2] text-start whitespace-nowrap ml-[-19vw] md:ml-[0vw] md:mr-0 md:pb-7'>About-Us</h1>

        <h2 style={{ fontFamily: "Helvetica" }} className='ml-[-20vw] md:ml-[0vw] text-md md:text-[1.8vw] text-start text-white'>We don’t just preserve pictures, we protect emotions.<br/> <span className='text-[#00FFB2] text-xl md:text-[3vw]' style={{fontFamily: "Italianno"}}>Memoire </span>was born from a simple idea — every memory deserves a place to<br/> live, breathe, and be remembered.<br/> Whether it's a childhood photo, a voice message from a loved one, or a<br/> story that shaped you — we give you a space to hold it all, forever.<br/>
Crafted to hold what matters.</h2>
        

        <h2 style={{  fontFamily: "Amita",}} className='text-white text-[3vw] whitespace-nowrap md:text-2xl md:ml-0 ml-[-19vw]' >"Because memories aren’t just moments — they’re pieces of you”</h2>

        <Link to={"/"}>
        
   <button
            className=' mt-5 shine-button absolute left-[39vw]  md:left-[50%] bottom-20 text-white/45 text-sm px-6 py-3 rounded-3xl backdrop-blur-md bg-white/20 border-2 cursor-pointer hover:border-white/40 shadow-md border-none outline-none'
            style={{ fontFamily: "Helvetica" }}
          >
         Home
          </button>
        </Link>



</div>

    </div>
  )
}

export default About