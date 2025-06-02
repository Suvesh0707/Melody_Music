import React from 'react';

const LoginPage = () => {
  const handleLogin = () => {
    window.location.href = 'http://localhost:3000/auth/github';
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-gray-900 to-purple-900 text-white font-sans px-6">
      <img
        src="/logo2.jpg"
        alt="Melody Logo"
        className="w-20 h-20 rounded-full shadow-lg mb-6"
      />

      <h1 className="text-5xl font-extrabold text-pink-500 mb-4 animate-pulse">
        Welcome to Melody
      </h1>

      <p className="text-lg text-gray-300 mb-10 text-center max-w-md">
        Discover and listen to trending songs across the globe. Sign in with GitHub to get started!
      </p>

      <button
        onClick={handleLogin}
        className="cursor-pointer flex items-center gap-3 bg-white text-black hover:scale-105 transition-transform duration-300 font-bold px-6 py-3 rounded-xl shadow-xl hover:bg-gray-100"
      >
        <svg
          className="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M8 0C3.58 0 0 3.58 0 8a8 8 0 005.47 7.59c.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2 0-2.48-.49-2.64-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.7 7.7 0 012.01-.27 7.7 7.7 0 012.01.27c1.53-1.03 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.28.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8 8 0 0016 8c0-4.42-3.58-8-8-8z" />
        </svg>
        Continue with GitHub
      </button>

      <p className="mt-12 text-sm text-gray-500">&copy; {new Date().getFullYear()} Melody. All rights reserved.</p>
    </div>
  );
};

export default LoginPage;
