import React, { useState, useEffect } from "react";

const bgNames = ["bg1", "bg2", "bg3", "bg4", "bg5", "bg6"];

const Hero = () => {
  const [bg, setBg] = useState("bg1"); // default fallback

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * bgNames.length);
    setBg(bgNames[randomIndex]);
  }, []);

  return (
    <div>
      <section
        className="relative overflow-hidden rounded-3xl flex items-center justify-start bg-black mx-4 my-4 sm:mx-6 md:mx-8 mb-6 sm:mb-8 md:mb-10 h-[calc(100vh-2rem)] max-h-[750px]"
      >
        <img
          src={`${bg}.jpg`}
          alt="Music Background"
          className="hidden sm:block absolute inset-0 w-full h-full object-cover brightness-150"
        />

        <img
          src={`${bg}-mobile.jpg`}
          alt="Music Background Mobile"
          className="block sm:hidden absolute inset-0 w-full h-full object-cover brightness-125"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />

        <div className="relative z-10 text-white max-w-5xl px-6 sm:px-10 md:px-20 space-y-6 sm:space-y-8 text-left">
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-snug drop-shadow-lg tracking-wide">
            All The{" "}
            <span className="inline bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 bg-clip-text text-transparent drop-shadow-[0_2px_6px_rgba(219,39,119,0.7)]">
              Best Songs
            </span>{" "}
            <br />
            In One Place
          </h1>
          <p className="text-sm sm:text-lg md:text-xl text-white/90 leading-relaxed drop-shadow-md max-w-full md:max-w-3xl">
            Stream trending hits, timeless classics, and hidden gems — all in
            high quality and completely ad-free.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button
              onClick={() => {
                const el = document.getElementById("new-releases");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              className="cursor-pointer w-full sm:w-auto px-6 py-3 bg-pink-600 text-white rounded-md hover:bg-pink-500 transition text-center"
            >
              Explore Now
            </button>
            <button className="cursor-pointer w-full sm:w-auto px-5 py-3 border border-white hover:bg-white hover:text-black transition text-white font-medium rounded-lg shadow-lg text-center">
              Learn More
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
