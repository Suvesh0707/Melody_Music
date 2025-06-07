import React from "react";
import NewlyReleaseSong from "../components/NewlyReleaseSong";

function MarathiSongs() {
  return (
    <>
      <NewlyReleaseSong
        apiEndpoint="https://musicmelody.onrender.com/api/songs/marathi"
        title="🎵 Marathi Songs"
      />
    </>
  );
}

export default MarathiSongs;
