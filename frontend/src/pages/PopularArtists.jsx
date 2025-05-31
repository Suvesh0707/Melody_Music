import React, { useEffect, useState } from "react";
import axios from "axios";

export default function PopularArtists() {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(8);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/artist");
        setArtists(res.data);
      } catch (error) {
        console.error("Error fetching artists:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArtists();
  }, []);

  const loadMore = () => {
    setVisibleCount((prev) => prev + 8);
  };

  if (loading) return <p className="text-center text-gray-400">Loading artists...</p>;
  if (!artists.length) return <p className="text-center text-gray-400">No artists found.</p>;

  const visibleArtists = artists.slice(0, visibleCount);

  return (
    <section className="px-6 py-8 max-w-7xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-white">🎤 Popular Artists</h2>

      {/* Grid with max 5 cols on smallest, 6 on sm, 8 on md/lg */}
      <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 gap-6">
        {visibleArtists.map((artist) => (
          <div key={artist._id} className="flex flex-col items-center">
            <div className="w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-gray-800 flex items-center justify-center overflow-hidden shadow-lg">
              {artist.imageUrl ? (
                <img
                  src={artist.imageUrl}
                  alt={artist.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-gray-500 text-xs text-center px-1">
                  No Image
                </div>
              )}
            </div>
            <p
              className="mt-2 text-xs sm:text-sm md:text-base text-white text-center truncate max-w-[56px] sm:max-w-[120px] md:max-w-[144px]"
              title={artist.name}
            >
              {artist.name}
            </p>
          </div>
        ))}
      </div>

      {visibleCount < artists.length && (
        <div className="flex justify-center mt-8">
          <button
            onClick={loadMore}
            className="cursor-pointer px-6 py-2 bg-pink-600 rounded-full text-white font-semibold hover:bg-pink-700 transition"
            aria-label="View more artists"
          >
            + View All
          </button>
        </div>
      )}
    </section>
  );
}
