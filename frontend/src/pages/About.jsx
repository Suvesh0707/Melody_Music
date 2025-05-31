import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaPhone } from 'react-icons/fa';

function About() {
  return (
    <div className="bg-[#1a1a1a] text-white px-6 md:px-16 py-12 shadow-white shadow-2xl">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">
        <div className="md:col-span-2">
          <h2 className="text-xl font-bold mb-4">About</h2>
          <p className="text-gray-300 mb-2">
            Melodies is a website that has been created for over <span className="text-pink-500 font-semibold">5 Month's</span> now and it is one of the most famous music player website’s in the world.
          </p>
          <p className="text-gray-300 mb-2">
            In this website you can listen and download songs for free. Also if you want no limitation you can buy our <span className="text-blue-400 font-semibold">premium pass’s</span>.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4 border-b border-white w-fit">Melodies</h2>
          <ul className="space-y-2 text-gray-300">
            <li>Songs</li>
            <li>Radio</li>
            <li>Podcast</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4 border-b border-white w-fit">Access</h2>
          <ul className="space-y-2 text-gray-300">
            <li>Explor</li>
            <li>Artists</li>
            <li>Playlists</li>
            <li>Albums</li>
            <li>Trending</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4 border-b border-white w-fit">Contact</h2>
          <ul className="space-y-2 text-gray-300">
            <li>About</li>
            <li>Policy</li>
            <li>Social Media</li>
            <li>Support</li>
          </ul>
        </div>
      </div>

      <div className="mt-12 border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">
          Melody Music
        </h1>
        <div className="flex gap-4 mt-4 md:mt-0 text-xl text-white">
          <FaFacebookF />
          <FaInstagram />
          <FaTwitter />
          <FaPhone />
        </div>
      </div>
    </div>
  );
}

export default About;
