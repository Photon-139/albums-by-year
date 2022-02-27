import React from "react"
import "./album.css"

export default function Album({ name, artist, cover, preview, dateAdded }) {
  let playAudio, pauseAudio
  if (preview !== null) {
    const previewAudio = new Audio(preview)
    let audioPromise
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
    <div className="album">
      <div className="album-cover">
        {preview !== null ? (
          <img
            onMouseOver={playAudio}
            onMouseOut={pauseAudio}
            src={cover}
            alt={name}
            data-content={dateAdded}
          ></img>
        ) : (
          <img src={cover} alt={name} data-content={dateAdded}></img>
        )}
      </div>
      <div>
        <p>{name}</p>
        <p>{artist}</p>
        <p>Added to library on {dateAdded.slice(0, 10)}</p>
      </div>
    </div>
  )
}
