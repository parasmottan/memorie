import React from 'react'
import { IoMdAdd } from "react-icons/io";




function CenterBox(props) {
  return (
        <div className='w-[30vw] h-[35vh] absolute left-[35%] bottom-44 lg:bottom-[32%] z-20 flex flex-col items-center justify-center' style={{...props.style}}>
          <h1 className='lg:text-2xl text-2xl whitespace-nowrap text-white selection:text-amber-300' style={{ fontFamily: "Calligraffitti" }}>create your first memory</h1>
          <img src="./line.png" alt="" className='lg:h-23 h-19 left-25 lg:left-28 top-[-6%] lg:top-[-5%] relative selection:text-2xl' />
          
          {/* 🔄 Spinning Icon */}
          <IoMdAdd className='text-[27vw] lg:text-[7vw] text-white relative top-[-26%] lg:top-[-29%] spin-pause cursor-pointer' onClick={props.onClick}/>
        </div>
  )
}

export default CenterBox