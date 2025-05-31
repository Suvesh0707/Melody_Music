import React from "react";
import NewlyReleaseSong from "../components/NewlyReleaseSong";

function EnglishSongs() {
  return (
    <>
      <NewlyReleaseSong
        apiEndpoint="http://localhost:3000/api/songs/english"
        title="🎵 English Songs"
      />
    </>
  );
}

export default EnglishSongs;
