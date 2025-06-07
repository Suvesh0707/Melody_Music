import React from "react";
import NewlyReleaseSong from "../components/NewlyReleaseSong";

function EnglishSongs() {
  return (
    <>
      <NewlyReleaseSong
        apiEndpoint="https://musicmelody.onrender.com/api/songs/english"
        title="🎵 English Songs"
      />
    </>
  );
}

export default EnglishSongs;
