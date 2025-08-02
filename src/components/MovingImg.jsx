import React from 'react';
import SingleMvImg from './SingleMvImg';

function MovingImg() {
  return (
    <div className="flex items-center gap-2 justify-evenly w-full px-18 pb-10">
  
      <SingleMvImg
        image="./3rd.jpg"
        className="rotate-[14deg] animate-[pixelJitter_2s_infinite_linear]"
      />

      <SingleMvImg
        image="./4th.jpg"
        style={{ marginTop: '-9vw' }}
        className="rotate-[-14deg] animate-[pixelJitter_3s_infinite_ease-in-out]"
      />


      <SingleMvImg
        image="./6th.jpg"
        className="rotate-[11deg] animate-[pixelJitter_2.2s_infinite_ease-in] [animation-delay:0.3s]"
      />

      <SingleMvImg
        image="./7th.jpg"
        style={{ marginTop: '-9vw' }}
        className="rotate-[-9deg] animate-[pixelJitter_1.8s_infinite_linear] [animation-delay:0.1s]"
      />


      <SingleMvImg
        image="./8th.jpg"
        className="rotate-[14deg] animate-[pixelJitter_2.5s_infinite_ease] [animation-delay:0.2s]"
      />
    </div>
  );
}

export default MovingImg;
