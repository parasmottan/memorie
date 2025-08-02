import React from 'react';

function CardHole() {
  const cards = [
    { src: "./1stCard.png", delay: 0, duration: 10, rotate: -3 },
    { src: "./2ndCard.png", delay: 2, duration: 11, rotate: 2 },
    { src: "./3rdCard.png", delay: 4, duration: 12, rotate: -4 },
    { src: "./4thCard.png", delay: 6, duration: 9, rotate: 3 },
    { src: "./5thCard.png", delay: 8, duration: 10.5, rotate: -2 },
    { src: "./1stCard.png", delay: 10, duration: 11.2, rotate: 1 },
    { src: "./2ndCard.png", delay: 12, duration: 10.8, rotate: -5 },
    { src: "./3rdCard.png", delay: 14, duration: 12.3, rotate: 2 },
    { src: "./4thCard.png", delay: 16, duration: 10, rotate: -1 },
    { src: "./5thCard.png", delay: 18, duration: 11.5, rotate: 4 },
  ];

  return (
    <div className='w-[35%] h-[80%] relative pb-[40vw] mb-50 mr-20'>

      {/* Blackhole background */}
      <div className='absolute bottom-[5%] left-[25%] w-[28vw] h-[4vw] rounded-[50%] 
        bg-black opacity-80 z-10
        [mask-image:radial-gradient(ellipse_at_center,rgba(0,0,0,0)_30%,rgba(0,0,0,1)_100%)] 
        blur-[20px] pointer-events-none'>
      </div>

      {/* Floating cards */}
      <div className='absolute bottom-[7%] left-[31%] w-[25vw] h-[80vw] z-20 overflow-hidden rounded-[20%]'>

        {cards.map((card, i) => (
          <div
            key={i}
            className='w-[18vw] h-[6vw] absolute bottom-[-6vw] left-11 float'
            style={{
              animationDelay: `${card.delay}s`,
              animationDuration: `${card.duration}s`,
              '--card-rotate': `${card.rotate}deg`,
            }}
          >
            <img src={card.src} alt={`card-${i}`} className='w-full h-full object-cover rounded-md' />
          </div>
        ))}
      </div>

      {/* Animation */}
 <style>{`
        @keyframes float {
          0% {
            transform: translateY(100%) rotate(var(--card-rotate));
            opacity: 0;
          }
          10% {
            opacity: 1;
            transform: translateY(70%) rotate(var(--card-rotate));
          }
          40% {
            opacity: 1;
            transform: translateY(-20%) rotate(var(--card-rotate));
          }
          85% {
            opacity: 1;
            transform: translateY(-200%) rotate(var(--card-rotate));
          }
          100% {
            transform: translateY(-260%) rotate(var(--card-rotate));
            opacity: 0;
          }
        }

        .float {
          animation-name: float;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }
      `}</style>


    </div>
  );
}

export default CardHole;
