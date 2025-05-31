import React from "react";
import NewlyReleaseSong from "../components/NewlyReleaseSong";

function MarathiSongs() {
  return (
    <>
      <NewlyReleaseSong
        apiEndpoint="http://localhost:3000/api/songs/marathi"
        title="🎵 Marathi Songs"
      />
    </>
  );
}

export default MarathiSongs;
