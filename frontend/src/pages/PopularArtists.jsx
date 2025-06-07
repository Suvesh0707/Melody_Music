import React, { useState } from "react";

const indianArtists = [
  {
    _id: "1",
    name: "Arijit Singh",
    imageUrl: "https://i.scdn.co/image/ab6761610000e5eb5ba2d75eb08a2d672f9b69b7",
  },
  {
    _id: "2",
    name: "Neha Kakkar",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSf4FY9QEJ99XnudwrztdCABWKcip2EKlsArg&s",
  },
  {
    _id: "3",
    name: "Shreya Ghoshal",
    imageUrl: "https://i.scdn.co/image/ab6761610000e5eb59303d54ce789210e745e1a9",
  },
  {
    _id: "4",
    name: "Honey Singh",
    imageUrl: "https://static.toiimg.com/photo/59841716.cms",
  },
  {
    _id: "5",
    name: "Adarsh Shinde",
    imageUrl: "https://i.scdn.co/image/ab6761610000e5eb9ea1de1826f0f77c9d36f923",
  },
  {
    _id: "6",
    name: "Armaan Malik",
    imageUrl: "https://i.scdn.co/image/ab6761610000e5ebc5911f22814f270d5004ae53",
  },
  {
    _id: "7",
    name: "Ajay Atul",
    imageUrl: "https://i.scdn.co/image/ab6761610000e5eb155a680a466ced2ee6679e54",
  },
  {
    _id: "8",
    name: "Shubh",
    imageUrl: "https://i1.sndcdn.com/avatars-GBhEb4pyHIRKyPfO-9aDwAw-t240x240.jpg",
  },
];

export default function PopularArtists() {
  const [visibleCount, setVisibleCount] = useState(8);

  const loadMore = () => {
    setVisibleCount((prev) => prev + 8);
  };

  const visibleArtists = indianArtists.slice(0, visibleCount);

  return (
    <section className="px-6 py-8 max-w-7xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-white">🎤 Popular Indian Artists</h2>

      <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 gap-6">
        {visibleArtists.map((artist) => (
          <div key={artist._id} className="flex flex-col items-center">
            <div className="w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-gray-800 flex items-center justify-center overflow-hidden shadow-lg">
              <img
                src={artist.imageUrl}
                alt={artist.name}
                className="w-full h-full object-cover"
              />
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

      {visibleCount < indianArtists.length && (
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
