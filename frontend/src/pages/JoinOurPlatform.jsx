import React from 'react';
import { Mail, User, Phone } from 'lucide-react';

function JoinOurPlatform() {
  return (
    <section className=" text-white py-20 px-4 sm:px-10 flex flex-col lg:flex-row justify-center items-center gap-20">
      <div className="max-w-xl">
        <h2 className="text-4xl sm:text-5xl font-extrabold mb-6 leading-tight">
          Join Our Platform
        </h2>
        <p className="text-lg sm:text-xl text-gray-200">
          You can be one of the <span className="text-pink-500 font-semibold">members</span> of our platform by just adding some necessarily information. If you already have an account on our website, you can just hit the <span className="text-sky-400 font-semibold">Login button</span>.
        </p>
      </div>

      <div className="bg-[#40003A] p-8 sm:p-10 rounded-3xl w-full max-w-lg text-white shadow-lg">
        <div className="flex space-x-8 mb-6 text-xl font-semibold border-b border-pink-500 pb-2">
          <span className="text-pink-500 border-b-2 border-pink-500 pb-1">Sign Up</span>
          <span className="text-gray-400 cursor-pointer hover:text-pink-400">Login</span>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="w-full">
            <label className="block mb-1 font-medium">Name</label>
            <div className="flex items-center border border-white/50 rounded px-3 py-2">
              <User className="w-5 h-5 mr-2 text-gray-300" />
              <input
                type="text"
                placeholder="Enter Your Name"
                className="bg-transparent w-full text-white placeholder:text-gray-400 focus:outline-none"
              />
            </div>
          </div>
          <div className="w-full">
            <label className="block mb-1 font-medium">Number</label>
            <div className="flex items-center border border-white/50 rounded px-3 py-2">
              <Phone className="w-5 h-5 mr-2 text-gray-300" />
              <input
                type="text"
                placeholder="Enter Your Number"
                className="bg-transparent w-full text-white placeholder:text-gray-400 focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="mb-6">
          <label className="block mb-1 font-medium">E-Mail</label>
          <div className="flex items-center border border-white/50 rounded px-3 py-2">
            <Mail className="w-5 h-5 mr-2 text-gray-300" />
            <input
              type="email"
              placeholder="Enter Your E-Mail"
              className="bg-transparent w-full text-white placeholder:text-gray-400 focus:outline-none"
            />
          </div>
        </div>

        <button className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 rounded-lg transition mb-4">
          Sign Up
        </button>

        <div className="flex items-center justify-center text-sm text-gray-300 mb-4">
          <span className="flex-grow border-t border-white/30" />
          <span className="px-3">Or</span>
          <span className="flex-grow border-t border-white/30" />
        </div>

        <button className="w-full border border-white/50 flex items-center justify-center py-3 rounded-lg hover:bg-white/10 transition">
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5 mr-2" />
          <span>Sign Up With Google</span>
        </button>
      </div>
    </section>
  );
}

export default JoinOurPlatform;
