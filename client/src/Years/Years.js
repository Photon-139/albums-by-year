import React from "react"
import Album from "../Album/Album"
import * as yearsStyles from "./years.module.css"
export default function Years({ year, albums }) {
  return (
    <div>
      <p id={year} className={yearsStyles.yearNumber}>
        {year} ({albums.length})
      </p>
      <div className={yearsStyles.albumList}>
        {albums.map((album) => (
          <Album
            key={`${album.artist} - ${album.name}(${album.dateAdded})`}
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
