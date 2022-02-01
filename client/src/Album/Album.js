import React from "react"
import * as albumStyles from "./album.module.css"

export default function Album({ name, artist, cover, preview, dateAdded }) {
  let playAudio, pauseAudio
  if (preview !== null) {
    const previewAudio = new Audio(preview)
    let audioPromise
    let audioTimeout
    playAudio = () => {
      audioPromise = previewAudio.play()
    }
    pauseAudio = () => {
      if (audioPromise !== undefined) {
        audioPromise.then((_) => {
          previewAudio.pause()
          previewAudio.currentTime = 0
        })
      }
    }
  }
  return (
    <div className={albumStyles.album}>
      {preview !== null ? (
        <img
          onMouseOver={playAudio}
          onMouseOut={pauseAudio}
          src={cover}
          alt={name}
        ></img>
      ) : (
        <img src={cover} alt={name}></img>
      )}
      <div>
        <p>{name}</p>
        <p>{artist}</p>
      </div>
    </div>
  )
}
