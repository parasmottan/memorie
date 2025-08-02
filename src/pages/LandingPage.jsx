import React from 'react';
import MovingImg from '../components/MovingImg';
import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <>
      <style>{`
        /* ... Shine button styles remain the same ... */
      `}</style>

      <div className="relative h-[100dvh] w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center blur-[1.5px] scale-105 z-0"
          style={{ backgroundImage: "url('./LandingPageBg.jpg')" }}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>

        <div className="relative z-20 flex flex-col items-center justify-between lg:justify-center w-full h-full gap-4 px-4 py-16 text-center lg:py-0">
          
          {/* AboutUs Button - Bada kiya gaya */}
          <Link to={"/about"}>
            <button className='absolute right-3 top-3 lg:right-5 lg:top-5 text-white text-sm lg:text-sm backdrop-blur-2xl bg-white/20 p-3 px-6 lg:p-2 lg:px-4 cursor-pointer rounded-full'>
              AboutUs
            </button>
          </Link>
          
          <div className="w-40 h-40 flex gap-10 lg:w-[100vw] lg:h-auto">
              <MovingImg />
          </div>

          
        
          <h1
            className=" text-white leading-[13vw] lg:mt-0 mt-20 lg:pt-0 bottom-[58vw] left-1/2 transform -translate-x-[51.5%] 
               lg:bottom-[2vw] lg:left-1/2 lg:translate-x-[-78%]  text-[16.5vw] lg:text-[12vw] font-bold relative lg:leading-[8vw]"
            style={{

              fontFamily: "Lalezar",
              fontWeight: 400,
              fontStyle: "normal",
            }}
          >
            Designed for{" "}
            
            <span
              className="hidden lg:absolute lg:h-[5vw] lg:w-[4.1vw] lg:rounded-3xl lg:left-6 lg:top-[8.4px] lg:inline-block lg:align-middle lg:bg-cover lg:bg-center"
              style={{ backgroundImage: "url(./1st.jpg)" }}
            ></span>
            
            <span
              className="hidden lg:absolute lg:h-[4.5vw] lg:w-[3.8vw] lg:rounded-3xl lg:right-[89px] lg:top-[20px] lg:inline-block lg:align-middle lg:bg-cover lg:bg-center"
              style={{ backgroundImage: "url(./2nd.jpg)" }}
            ></span>
            
            <span
              className="hidden lg:absolute lg:h-[2.6vw] lg:w-[2.6vw] lg:rounded-full lg:left-[18.9vw] lg:top-[-2.4vw] lg:inline-block lg:align-middle lg:bg-cover lg:bg-center"
              style={{ backgroundImage: "url(./5th.jpg)" }}
            ></span>
            
            <br />
            Your{" "}
            <span
              style={{
                fontFamily: "League Gothic",
                fontWeight: 400,
                fontStyle: "normal",
                color: "#00FFB2",
              }}
            >
              Memoire
            </span>
          </h1>

          {/* Subheading - Badi ki gayi */}
          <h3 className='text-white text-2xl whitespace-nowrap lg:text-4xl absolute bottom-[83vw] left-1/2 transform -translate-x-1/2 
               lg:bottom-[9vw] lg:left-1/2 lg:translate-x-[-50%]  ' style={{ fontFamily: "Italianno" }}>
            “Crafted To Hold What Matters”
          </h3>

          {/* Create Memory Button - Bada kiya gaya */}
          <Link to={"/signup"}>
         <button
  className='absolute bottom-[61vw] left-1/2 transform -translate-x-1/2 
               lg:bottom-[4vw] lg:left-1/2 lg:translate-x-[-50%] active:bg-white/50  lg:mt-4  shine-button text-white/45 text-sm lg:text-sm px-5 whitespace-nowrap py-3 lg:px-10 lg:py-4 rounded-full backdrop-blur-md bg-white/20 border-2 cursor-pointer hover:border-white/40 shadow-md border-none outline-none'
  style={{ fontFamily: "Helvetica" }}
>
  Create your first memory
</button>

          </Link>
        </div>
      </div>
    </>
  );
}

export default LandingPage;