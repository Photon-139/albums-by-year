import React from "react"
import Album from "../Album/Album"
import "./decades.css"

export default function Decades({ data }) {
  let decadesData = {}
  Object.keys(data).forEach((year) => {
    if (decadesData[year.slice(0, 3) + "0s"]) {
      decadesData[year.slice(0, 3) + "0s"].push(...data[year])
    } else {
      decadesData[year.slice(0, 3) + "0s"] = [...data[year]]
    }
  })
  console.log(decadesData)
  return (
    <>
      {Object.keys(decadesData).map((decade) => (
        <div>
          <p className="decade">
            {decade} ({decadesData[decade].length})
          </p>
          <div className="albumList">
            {decadesData[decade].map((album) => (
              <Album
                name={album.name}
                artist={album.artist}
                cover={album.cover}
                preview={album.preview}
                dateAdded={album.dateAdded}
              />
            ))}
          </div>
        </div>
      ))}
    </>
  )
}
