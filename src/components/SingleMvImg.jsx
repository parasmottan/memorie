import React from 'react'

function SingleMvImg(props) {
  console.log(props.image);
  
  return (
    <>
      <style>{`
  @keyframes pixelJitter {
    0%   { transform: translate(0px, 0px), ; }
    25%  { transform: translate(2px, -2px); }
    50%  { transform: translate(-4px, 4px); }
    75%  { transform: translate(2px, -2px); }
    100% { transform: translate(0px, 0px) ; }
  }
`}</style>
    <div className={`w-[5.5vw] h-[5.5vw] bg-cover ${props.className} bg-center rounded-2xl ${props.className}`} style={{backgroundImage: `url(${props.image})`, ...props.style}}>



    </div>
    </>
  )
}

export default SingleMvImg