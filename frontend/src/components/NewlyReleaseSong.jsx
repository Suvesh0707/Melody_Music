import React, { useEffect, useState } from "react";
import axios from "axios";
import { Play, Pause, Loader2 } from "lucide-react";
import { useAudioPlayer } from "../context/AudioPlayerContext";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

function NewlyReleaseSong({
  apiEndpoint = "https://musicmelody.onrender.com/api/songs/getsongs",
  title = "🎵 New Release Songs",
}) {
  const [songs, setSongs] = useState([]);
  const [loadingSongs, setLoadingSongs] = useState(true);
  const [visibleCount, setVisibleCount] = useState(5);
  const [selectedSong, setSelectedSong] = useState(null);

  const { user } = useUser(); 
  const {
    playSong,
    currentSong,
    isPlaying,
    isBuffering,
    pauseSong,
    addSongs,
  } = useAudioPlayer();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const res = await axios.get(apiEndpoint);
        setSongs(res.data);
        addSongs(res.data);
      } catch (error) {
        console.error("Error fetching songs:", error);
      } finally {
        setLoadingSongs(false);
      }
    };

    fetchSongs();
  }, [apiEndpoint]);

  const loadMore = () => {
    setVisibleCount((prev) => prev + 5);
  };

  const handlePlayLimitCheck = () => {
    if (!user) {
      let playCount = parseInt(localStorage.getItem("playCount") || "0", 10);
      playCount++;
      localStorage.setItem("playCount", playCount);
      if (playCount > 10) {
        alert("You reached your free play limit. Please login to continue.");
        navigate("/login");
        return false;
      }
    }
    return true;
  };

  const visibleSongs = songs.slice(0, visibleCount);

  return (
    <section
      id="new-releases"
      className="px-4 sm:px-6 py-12 mt-16 text-white max-w-7xl mx-auto overflow-x-hidden"
    >
      <h2 className="text-2xl sm:text-3xl font-extrabold mb-8 sm:mb-10 tracking-wide">
        {title}
      </h2>

      {loadingSongs ? (
        <p className="text-center text-gray-400">Loading...</p>
      ) : songs.length === 0 ? (
        <p className="text-center text-gray-400">No songs available.</p>
      ) : selectedSong ? (
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 bg-[#1f1f1f] p-8 rounded-2xl shadow-xl max-w-4xl mx-auto text-gray-200">
            <img
              src={selectedSong.coverImageUrl}
              alt={selectedSong.title}
              className="w-[400px] h-[400px] object-cover rounded-xl mb-6 shadow-lg justify-center mx-auto"
            />
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-3xl font-extrabold tracking-tight text-white">
                {selectedSong.title}
              </h3>
              <button
                onClick={() => {
                  if (!handlePlayLimitCheck()) return;
                  currentSong?._id === selectedSong._id && isPlaying
                    ? pauseSong()
                    : playSong(selectedSong);
                }}
                className="bg-gradient-to-r from-pink-600 to-pink-400 p-3 rounded-full hover:scale-110 transition-transform shadow-lg"
                aria-label={
                  currentSong?._id === selectedSong._id && isPlaying
                    ? "Pause"
                    : "Play"
                }
              >
                {isBuffering && currentSong?._id === selectedSong._id ? (
                  <Loader2 className="animate-spin w-6 h-6 text-white" />
                ) : currentSong?._id === selectedSong._id && isPlaying ? (
                  <Pause className="w-6 h-6 text-white" />
                ) : (
                  <Play className="w-6 h-6 text-white" />
                )}
              </button>
            </div>

            <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-gray-300 text-sm">
              <div>
                <p className="font-semibold text-pink-400">Artist</p>
                <p>{selectedSong.artistName || "Unknown Artist"}</p>
              </div>
              <div>
                <p className="font-semibold text-pink-400">Album</p>
                <p>
                  {selectedSong.albumName ||
                    selectedSong.album ||
                    "Unknown Album"}
                </p>
              </div>
              <div>
                <p className="font-semibold text-pink-400">Genre</p>
                <p>{selectedSong.genre || "Unknown Genre"}</p>
              </div>
              <div>
                <p className="font-semibold text-pink-400">Release Year</p>
                <p>{selectedSong.releaseYear || "N/A"}</p>
              </div>
              <div>
                <p className="font-semibold text-pink-400">Duration</p>
                <p>
                  {Math.floor(selectedSong.duration / 60)}:
                  {String(selectedSong.duration % 60).padStart(2, "0")} min
                </p>
              </div>
              <div>
                <p className="font-semibold text-pink-400">Copyright</p>
                <p>{selectedSong.copyright || "Unknown"}</p>
              </div>
              <div>
                <p className="font-semibold text-pink-400">Play Count</p>
                <p>{selectedSong.playCount || 0}</p>
              </div>
            </div>

            <button
              onClick={() => setSelectedSong(null)}
              className="mt-8 w-full py-3 text-pink-500 border border-pink-500 rounded-lg hover:bg-pink-500 hover:text-white transition"
            >
              ← Back to all songs
            </button>
          </div>

          <div className="w-full lg:w-1/3 max-h-[850px] overflow-y-auto pr-2 space-y-4 scrollbar-hide">
            {songs
              .filter((song) => song._id !== selectedSong._id)
              .map((song) => (
                <div
                  key={song._id}
                  onClick={() => setSelectedSong(song)}
                  className="flex items-center gap-4 bg-[#2A2A2A] p-3 rounded-lg hover:bg-white/10 cursor-pointer"
                >
                  <img
                    src={song.coverImageUrl}
                    className="w-14 h-14 object-cover rounded"
                    alt={song.title}
                  />
                  <div>
                    <h4 className="text-sm font-semibold">{song.title}</h4>
                    <p className="text-xs text-gray-400">
                      {song.artistName || "Unknown Artist"}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ) : (
        <>
          <div className="grid gap-y-6 gap-x-4 sm:gap-x-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {visibleSongs.map((song) => {
              const isCurrent = currentSong?._id === song._id;

              return (
                <div
                  key={song._id}
                  onClick={() => setSelectedSong(song)}
                  className="bg-[#1f1f1f] backdrop-blur-md rounded-xl p-4 sm:p-5 hover:bg-white/20 transition duration-300 shadow-lg flex flex-col w-full max-w-[300px] mx-auto cursor-pointer"
                >
                  <div className="relative rounded-lg overflow-hidden mb-4 group">
                    <img
                      src={song.coverImageUrl}
                      alt={song.title}
                      className="w-full h-44 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!handlePlayLimitCheck()) return;
                        if (isCurrent && isPlaying) {
                          pauseSong();
                        } else {
                          playSong(song);
                        }
                      }}
                      disabled={isBuffering && isCurrent}
                      className="cursor-pointer absolute bottom-3 right-3 bg-pink-600 text-white p-2.5 sm:p-3 rounded-full shadow-lg opacity-90 hover:opacity-100 hover:scale-110 transition transform disabled:opacity-60"
                    >
                      {isBuffering && isCurrent ? (
                        <Loader2 className="animate-spin w-5 h-5" />
                      ) : isCurrent && isPlaying ? (
                        <Pause className="w-5 h-5" />
                      ) : (
                        <Play className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  <h3
                    className="font-semibold text-base sm:text-lg truncate mb-1"
                    title={song.title}
                  >
                    {song.title}
                  </h3>
                  <p
                    className="text-xs sm:text-sm text-gray-300 truncate mb-3"
                    title={song.artistName || "Unknown Artist"}
                  >
                    {song.artistName || "Unknown Artist"}
                  </p>

                  <div className="text-xs text-gray-400 space-y-1 mt-auto">
                    {song.genre && <p>🎼 {song.genre}</p>}
                    {song.copyright && <p>© {song.copyright}</p>}
                  </div>
                </div>
              );
            })}
          </div>

          {visibleCount < songs.length && (
            <div className="flex justify-center mt-6 sm:mt-8">
              <button
                onClick={loadMore}
                className="px-4 sm:px-5 py-2 sm:py-2.5 bg-pink-600 rounded-full text-white font-semibold hover:bg-pink-700 transition cursor-pointer"
              >
                + View All
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}

export default NewlyReleaseSong;
