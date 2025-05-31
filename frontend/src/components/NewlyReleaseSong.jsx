import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Play, Pause, Loader2 } from 'lucide-react';
import { useAudioPlayer } from '../context/AudioPlayerContext';

function NewlyReleaseSong({ apiEndpoint = 'http://localhost:3000/api/songs/getsongs', title = "🎵 New Release Songs" }) {
  const [songs, setSongs] = useState([]);
  const [loadingSongs, setLoadingSongs] = useState(true);
  const [visibleCount, setVisibleCount] = useState(5);

  const { playSong, currentSong, isPlaying, isBuffering } = useAudioPlayer();

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const res = await axios.get(apiEndpoint);
        setSongs(res.data);
      } catch (error) {
        console.error('Error fetching songs:', error);
      } finally {
        setLoadingSongs(false);
      }
    };

    fetchSongs();
  }, [apiEndpoint]);

  const loadMore = () => {
    setVisibleCount((prev) => prev + 5);
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
      ) : (
        <>
          <div className="grid gap-y-6 gap-x-4 sm:gap-x-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {visibleSongs.map((song) => {
              const isCurrent = currentSong?._id === song._id;

              return (
                <div
                  key={song._id}
                  className="bg-[#1F1F1F] backdrop-blur-md rounded-xl p-4 sm:p-5 hover:bg-white/20 transition duration-300 shadow-lg flex flex-col w-full max-w-[300px] mx-auto"
                >
                  <div className="relative rounded-lg overflow-hidden mb-4 group">
                    <img
                      src={song.coverImageUrl}
                      alt={song.title}
                      className="w-full h-44 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                    />
                    <button
                      onClick={() => playSong(song)}
                      disabled={isBuffering && isCurrent}
                      className=" cursor-pointer absolute bottom-3 right-3 bg-pink-600 text-white p-2.5 sm:p-3 rounded-full shadow-lg opacity-90 hover:opacity-100 hover:scale-110 transition transform disabled:opacity-60"
                      aria-label={`Play ${song.title}`}
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
                  <h3 className="font-semibold text-base sm:text-lg truncate mb-1" title={song.title}>
                    {song.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-300 truncate mb-3" title={song.artistName || 'Unknown Artist'}>
                    {song.artistName || 'Unknown Artist'}
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
