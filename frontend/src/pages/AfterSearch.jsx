import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Playbar from "../components/PlayBar";
import { useAudioPlayer } from "../context/AudioPlayerContext";

function AfterSearch() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const searchTerm = params.get("search") || "";

  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { currentSong, isPlaying, playSong, pause } = useAudioPlayer();

  useEffect(() => {
    if (!searchTerm) {
      setSongs([]);
      return;
    }

    const fetchSongs = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `https://musicmelody.onrender.com/api/songs/getallsongs?search=${encodeURIComponent(
            searchTerm
          )}`
        );

        if (!res.ok) throw new Error("Failed to fetch songs");

        const data = await res.json();

        if (data.success) {
          setSongs(data.songs);
        } else {
          setSongs([]);
          setError("No songs found.");
        }
      } catch (err) {
        setError(err.message);
        setSongs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSongs();
  }, [searchTerm]);

  const handlePlayClick = (song) => {
    if (currentSong?._id === song._id && isPlaying) {
      pause();
    } else {
      playSong(song);
    }
  };

  return (
    <>
      <Navbar />
      <div className="p-6 max-w-6xl mx-auto mt-20">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600 transition"
        >
          &larr; Back
        </button>

        <h1 className="text-3xl font-bold mb-6">
          Search Results for: <span className="text-pink-500">{searchTerm}</span>
        </h1>

        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && songs.length === 0 && (
          <p>No songs found for "{searchTerm}".</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {songs.map((song) => (
            <div
              key={song._id}
              className="bg-[#1F1F1F] rounded-xl p-4 shadow-lg hover:bg-white/20 transition cursor-pointer flex flex-col"
            >
              <img
                src={song.coverImageUrl}
                alt={song.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-lg font-semibold truncate" title={song.title}>
                {song.title}
              </h3>
              <p
                className="text-gray-300 truncate"
                title={song.artistName || "Unknown Artist"}
              >
                {song.artistName || "Unknown Artist"}
              </p>
              {song.genre && (
                <p className="text-gray-400 text-sm mb-4">🎼 {song.genre}</p>
              )}

              <button
                onClick={() => handlePlayClick(song)}
                className={`mt-auto px-4 py-2 rounded text-white font-semibold transition
                  ${
                    currentSong?._id === song._id && isPlaying
                      ? "bg-pink-700 hover:bg-pink-800"
                      : "bg-pink-500 hover:bg-pink-600"
                  }
                `}
              >
                {currentSong?._id === song._id && isPlaying ? "Pause" : "Play"}
              </button>
            </div>
          ))}
        </div>
      </div>
      <Playbar />
    </>
  );
}

export default AfterSearch;
