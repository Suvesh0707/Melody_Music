import React, { useState, useEffect, useRef } from 'react';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const searchRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
  }, [isOpen]);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSongs([]);
      setError(null);
      return;
    }

    const delayDebounce = setTimeout(async () => {
      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams();
        params.append('search', searchTerm);

        const res = await fetch(`/api/songs/getsongs?${params.toString()}`);
        if (!res.ok) throw new Error('Failed to fetch songs');

        const data = await res.json();
        setSongs(data);
      } catch (err) {
        setError(err.message);
        setSongs([]);
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSongs([]);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-transparent">
      <div className="relative max-w-7xl mx-auto px-6 py-3 flex items-center justify-between mt-6">
        <div className="flex items-center gap-4">
          <img src="logo2.jpg" alt="Logo" className="h-10 w-auto rounded-full" />

          <div className="hidden sm:block relative" ref={searchRef}>
            <input
              type="text"
              placeholder="Search songs, artists..."
              className="px-4 py-2 rounded-md bg-white/10 border border-white/30 text-white text-base placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-pink-500 backdrop-blur-md w-48 sm:w-64 lg:w-72 transition"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            {(loading || error || songs.length > 0) && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-black bg-opacity-90 backdrop-blur-md rounded-md shadow-lg max-h-60 overflow-auto z-50">
                {loading && <div className="text-white px-4 py-2">Loading...</div>}
                {error && <div className="text-red-500 px-4 py-2">{error}</div>}
                {!loading && !error && songs.length === 0 && (
                  <div className="text-white px-4 py-2">No songs found.</div>
                )}
                {!loading && !error && songs.map((song) => (
                  <div
                    key={song._id}
                    className="px-4 py-2 text-white hover:bg-pink-600 cursor-pointer"
                  >
                    {song.title} - {song.artist}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex space-x-10">
          <a href="#home" className="text-white text-lg font-medium hover:text-pink-500 transition">
            Home
          </a>
          <a href="#aboutus" className="text-white text-lg font-medium hover:text-pink-500 transition">
            About Us
          </a>
          <a href="#contact" className="text-white text-lg font-medium hover:text-pink-500 transition">
            Contact
          </a>
        </div>

        <div className="hidden md:flex items-center space-x-6">
          <button className="text-white text-base font-medium hover:text-pink-500 transition">Login</button>
          <button className="px-5 py-2 bg-pink-600 hover:bg-pink-500 text-white rounded-md text-base font-medium transition shadow-md">
            Sign Up
          </button>
        </div>

        <div className="md:hidden z-50">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative w-8 h-8 flex flex-col justify-between items-center"
            aria-label="Toggle menu"
          >
            <span
              className={`h-1 w-full bg-white rounded transform transition duration-300 ease-in-out ${
                isOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`h-1 w-full bg-white rounded transition duration-300 ease-in-out ${
                isOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`h-1 w-full bg-white rounded transform transition duration-300 ease-in-out ${
                isOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>
        </div>
      </div>

      <div
        className={`fixed top-0 left-0 w-full h-screen bg-black bg-opacity-90 backdrop-blur-md transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-y-0' : '-translate-y-full'
        } md:hidden`}
      >
        <div className="px-6 py-20 flex flex-col items-center space-y-5">
          <a onClick={() => setIsOpen(false)} href="#home" className="text-white text-xl hover:text-pink-500 transition">
            Home
          </a>
          <a onClick={() => setIsOpen(false)} href="#aboutus" className="text-white text-xl hover:text-pink-500 transition">
            About Us
          </a>
          <a onClick={() => setIsOpen(false)} href="#contact" className="text-white text-xl hover:text-pink-500 transition">
            Contact
          </a>
          <hr className="w-1/2 border-white/20 my-4" />
          <button onClick={() => setIsOpen(false)} className="text-white hover:text-pink-500 text-lg transition">
            Login
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="px-5 py-2 bg-pink-600 hover:bg-pink-500 text-white rounded-md text-lg font-medium transition shadow"
          >
            Sign Up
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
