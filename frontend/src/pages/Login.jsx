import React from 'react';

const LoginPage = () => {
  const handleGitHubLogin = () => {
    window.location.href = 'https://musicmelody.onrender.com/auth/github';
  };

  const handleGoogleLogin = () => {
    window.location.href = 'https://musicmelody.onrender.com/auth/google';
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-900 via-black to-gray-900 flex items-center justify-center relative">
      {/* Background Blur Circles */}
      <div className="absolute w-72 h-72 bg-pink-500 rounded-full opacity-20 blur-3xl top-10 left-10" />
      <div className="absolute w-72 h-72 bg-purple-600 rounded-full opacity-20 blur-3xl bottom-10 right-10" />

      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl shadow-2xl p-8 sm:p-12 max-w-sm w-full text-white relative z-10">
        <div className="flex flex-col items-center text-center">
          <img
            src="/logo2.jpg"
            alt="Melody Logo"
            className="w-20 h-20 rounded-full shadow-lg mb-6 border border-white/30"
          />

          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Welcome to <span className="text-pink-400">Melody</span>
          </h1>
          <p className="text-sm text-gray-300 mb-8">
            Sign in to explore trending music and create your own vibe.
          </p>

          <div className="space-y-4 w-full">
            {/* Google Button */}
            <button
              onClick={handleGoogleLogin}
              className="cursor-pointer flex items-center justify-center gap-3 w-full bg-white text-black font-medium py-2.5 px-4 rounded-lg hover:bg-gray-100 transition"
            >
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
              Continue with Google
            </button>

            {/* GitHub Button */}
            <button
              onClick={handleGitHubLogin}
              className="cursor-pointer flex items-center justify-center gap-3 w-full bg-gray-900 text-white border border-gray-700 font-medium py-2.5 px-4 rounded-lg hover:bg-gray-800 transition"
            >
              <svg
  className="w-5 h-5"
  fill="currentColor"
  viewBox="0 0 16 16"
  xmlns="http://www.w3.org/2000/svg"
>
  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.54 5.47 7.59.4.07.55-.17.55-.38
  0-.19-.01-.82-.01-1.49-2 .37-2.48-.49-2.64-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53
  .63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95
  0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.68 7.68 0 012.01-.27c.68 0 1.36.09
  2.01.27 1.53-1.03 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.28.82 2.15 0 3.07-1.87 3.75-3.65
  3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
</svg>

              Continue with GitHub
            </button>
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-gray-400">
          &copy; {new Date().getFullYear()} Melody. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
