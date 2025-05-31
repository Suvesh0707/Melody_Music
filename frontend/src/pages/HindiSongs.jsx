import React from 'react'
import NewlyReleaseSong from '../components/NewlyReleaseSong'

function HindiSongs() {
  return (
    <>
    <NewlyReleaseSong
  apiEndpoint="http://localhost:3000/api/songs/hindi"
  title="🎵 Hindi Songs"
/>

    </>
  )
}

export default HindiSongs