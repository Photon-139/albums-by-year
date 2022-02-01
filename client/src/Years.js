import React from "react"
import Album from "./Album"
import * as Styles from "./styles.module.css"
export default function Years({ year, albums }) {
  return (
    <div>
      <p id={year} className={Styles.yearNumber}>
        {year} ({albums.length})
      </p>
      <div className={Styles.albumList}>
        {albums.map((album) => (
          <Album
            name={album.name}
            artist={album.artist}
            cover={album.cover}
            preview={album.preview}
          />
        ))}
      </div>
    </div>
  )
}
