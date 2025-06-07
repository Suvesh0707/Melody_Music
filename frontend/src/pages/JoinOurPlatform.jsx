import React, { useEffect, useRef, useState } from "react";

export default function JoinOurPlatform() {
  const discoRef = useRef(null);
  const [discoTiles, setDiscoTiles] = useState(() => generateDiscoTiles());

  useEffect(() => {
    let rotation = 0;
    const animate = () => {
      rotation += 0.6;
      if (discoRef.current) {
        discoRef.current.style.transform = `rotate(${rotation}deg)`;
      }
      requestAnimationFrame(animate);
    };
    animate();
  }, []);

  function generateDiscoTiles() {
    const tiles = [];
    const gridSize = 12;
    for (let i = 0; i < gridSize * gridSize; i++) {
      const shineOpacity = 0.3 + Math.random() * 0.5;
      const hueShift = Math.floor(Math.random() * 360); 
      tiles.push(
        <div
          key={i + "-" + Math.random()} 
          className="disco-tile"
          style={{
            backgroundColor: `hsl(${hueShift}, 80%, 60%)`,
            opacity: shineOpacity,
            boxShadow: `0 0 6px 1px hsla(${hueShift}, 80%, 75%, ${shineOpacity}) inset`,
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        />
      );
    }
    return tiles;
  }

  const handleColorChange = () => {
    setDiscoTiles(generateDiscoTiles());
  };

  return (
    <main className="relative min-h-screen bg-black flex flex-col justify-center items-center px-6 text-white overflow-hidden select-none">
      {/* Glowing Circles */}
      <div className="absolute -top-44 -left-40 w-[700px] h-[700px] rounded-full bg-pink-600 opacity-30 blur-[180px] animate-flicker-slow"></div>
      <div className="absolute -bottom-48 -right-48 w-[700px] h-[700px] rounded-full bg-purple-600 opacity-30 blur-[180px] animate-flicker-slow delay-4000"></div>

      {/* Disco Ball */}
      <div
        ref={discoRef}
        className="relative w-72 h-72 rounded-full grid grid-cols-12 grid-rows-12 cursor-pointer hover:scale-110 transition-transform duration-500"
        style={{
          background: "radial-gradient(circle at center, #ff1493 30%, #000 90%)",
          border: "6px solid #ff1493",
          boxShadow:
            "0 0 60px 15px rgba(255, 20, 147, 0.9), inset 0 0 30px 5px rgba(255, 20, 147, 0.8)",
          overflow: "hidden",
        }}
      >
        {discoTiles}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: 70,
            height: 70,
            background:
              "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.6), transparent 70%)",
            borderRadius: "50%",
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
            mixBlendMode: "screen",
          }}
        />
      </div>

      {/* Button to Change Colors */}
      <button
        onClick={handleColorChange}
        className="glitch-btn mt-10 px-16 py-4 bg-pink-600 text-xl uppercase font-bold tracking-widest rounded-full relative overflow-hidden transition-transform hover:scale-110 drop-shadow-lg"
      >
        Don't Click
      </button>

      {/* Title */}
      <h1 className="relative mt-16 text-7xl font-extrabold uppercase tracking-widest text-pink-500 drop-shadow-[0_0_20px_rgba(255,20,147,0.9)] glitch">
        MusicMelody
      </h1>

      {/* Description */}
      <p className="mt-6 max-w-xl text-center text-pink-300 font-semibold text-lg tracking-wide">
        Get lost in the rhythm of life. Join the ultimate music revolution.
      </p>

      {/* Sound Wave Bars */}
      <div className="absolute bottom-20 flex space-x-1">
        {[...Array(30)].map((_, i) => {
          const hue = 300 + (i * 8) % 60;
          return (
            <div
              key={i}
              className="w-1 rounded-full animate-wave"
              style={{
                height: `${10 + (i % 6) * 8}px`,
                backgroundColor: `hsl(${hue}, 80%, 65%)`,
                animationDelay: `${i * 0.1}s`,
                animationDuration: `${1 + (i % 5) * 0.4}s`,
              }}
            />
          );
        })}
      </div>

    
      {/* Styles */}
      <style>{`
        @keyframes wave {
          0%, 100% { transform: scaleY(0.3); opacity: 0.6; }
          50% { transform: scaleY(1); opacity: 1; }
        }
        .animate-wave {
          animation-name: wave;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
          transform-origin: bottom;
          display: inline-block;
        }
        @keyframes flicker {
          0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% {
            opacity: 0.3;
          }
          20%, 22%, 24%, 55% {
            opacity: 0.7;
          }
        }
        .animate-flicker-slow {
          animation: flicker 7s infinite;
        }
        /* Glitch effect for title */
        .glitch {
          position: relative;
          color: #ff1493;
        }
        .glitch::before,
        .glitch::after {
          content: attr(class);
          position: absolute;
          left: 0;
          right: 0;
          opacity: 0.8;
          clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%);
        }
        .glitch::before {
          animation: glitchTop 1s infinite linear alternate-reverse;
          color: #ff77bb;
          z-index: -1;
        }
        .glitch::after {
          animation: glitchBottom 1s infinite linear alternate;
          color: #cc0077;
          top: 5px;
          clip-path: polygon(0 55%, 100% 55%, 100% 100%, 0 100%);
          z-index: -1;
        }
        @keyframes glitchTop {
          0% {
            transform: translate(0);
          }
          20% {
            transform: translate(-3px, -3px);
          }
          40% {
            transform: translate(-3px, 3px);
          }
          60% {
            transform: translate(3px, -3px);
          }
          80% {
            transform: translate(3px, 3px);
          }
          100% {
            transform: translate(0);
          }
        }
        @keyframes glitchBottom {
          0% {
            transform: translate(0);
          }
          20% {
            transform: translate(3px, 3px);
          }
          40% {
            transform: translate(3px, -3px);
          }
          60% {
            transform: translate(-3px, 3px);
          }
          80% {
            transform: translate(-3px, -3px);
          }
          100% {
            transform: translate(0);
          }
        }
        /* Glitch effect for button */
        .glitch-btn::before,
        .glitch-btn::after {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          border-radius: 9999px;
          mix-blend-mode: screen;
          pointer-events: none;
        }
        .glitch-btn::before {
          border: 2px solid #ff1493;
          animation: glitch-border 2s infinite linear alternate;
        }
        .glitch-btn::after {
          border: 2px solid #cc0077;
          animation: glitch-border 2s infinite linear alternate-reverse;
        }
        @keyframes glitch-border {
          0% {
            clip-path: polygon(0 0, 100% 0, 100% 50%, 0 50%);
          }
          50% {
            clip-path: polygon(0 50%, 100% 50%, 100% 100%, 0 100%);
          }
          100% {
            clip-path: polygon(0 0, 100% 0, 100% 50%, 0 50%);
          }
        }
        /* Disco ball tile style */
        .disco-tile {
          width: 100%;
          height: 100%;
          transition: opacity 0.3s ease;
          will-change: opacity, box-shadow;
          border-radius: 1px;
        }
        .disco-tile:hover {
          opacity: 1 !important;
          box-shadow: 0 0 12px 3px rgba(255, 20, 147, 0.8) inset;
        }
      `}</style>
    </main>
  );
}
