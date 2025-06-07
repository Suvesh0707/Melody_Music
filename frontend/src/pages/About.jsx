import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaPhone } from 'react-icons/fa';

function About() {
  return (
    <div
      id="aboutus"
      className="bg-[#1a1a1a] text-white py-10 px-4 sm:px-6 lg:px-24 xl:px-32 2xl:px-48"
    >
      <div className="max-w-screen-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">

        <div className="lg:col-span-2">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">About</h2>
          <p className="text-gray-300 mb-4 text-sm sm:text-base leading-relaxed">
            <span className="text-pink-500 font-semibold">Melodies</span> has been live for over
            <span className="text-pink-400 font-semibold"> 5 months</span> and has become one of the most popular music player websites globally.
          </p>
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
            You can enjoy music and downloads for free. For an ad-free experience and more features,
            consider getting our <span className="text-blue-400 font-semibold">premium pass</span>.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4 border-b border-gray-500 w-fit">Melodies</h2>
          <ul className="space-y-2 text-gray-300 text-sm sm:text-base">
            <li className="hover:text-white transition">Songs</li>
            <li className="hover:text-white transition">Radio</li>
            <li className="hover:text-white transition">Podcast</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4 border-b border-gray-500 w-fit">Access</h2>
          <ul className="space-y-2 text-gray-300 text-sm sm:text-base">
            <li className="hover:text-white transition">Explore</li>
            <li className="hover:text-white transition">Artists</li>
            <li className="hover:text-white transition">Playlists</li>
            <li className="hover:text-white transition">Albums</li>
            <li className="hover:text-white transition">Trending</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4 border-b border-gray-500 w-fit">Contact</h2>
          <ul className="space-y-2 text-gray-300 text-sm sm:text-base">
            <li className="hover:text-white transition">About</li>
            <li className="hover:text-white transition">Policy</li>
            <li className="hover:text-white transition">Social Media</li>
            <li className="hover:text-white transition">Support</li>
          </ul>
        </div>
      </div>

      <div className="mt-12 pt-6 border-t border-gray-700 flex flex-col sm:flex-row justify-between items-center gap-6">
        <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">
          Melody Music
        </h1>
        <div className="flex gap-5 text-lg sm:text-xl text-white">
          <FaFacebookF className="hover:text-blue-500 transition cursor-pointer" />
          <FaInstagram className="hover:text-pink-400 transition cursor-pointer" />
          <FaTwitter className="hover:text-sky-400 transition cursor-pointer" />
          <FaPhone className="hover:text-green-400 transition cursor-pointer" />
        </div>
      </div>
    </div>
  );
}

export default About;
