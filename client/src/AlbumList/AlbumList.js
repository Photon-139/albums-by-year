import React from "react"
import "./albumlist.css"
import Album from "../Album/Album"

const convertToDecades = (albumdata) => {
  let decadesData = {}
  Object.keys(albumdata).forEach((year) => {
    if (decadesData[year.slice(0, 3) + "0s"]) {
      decadesData[year.slice(0, 3) + "0s"].push(...albumdata[year])
    } else {
      decadesData[year.slice(0, 3) + "0s"] = [...albumdata[year]]
    }
  })
  return decadesData
}

const AlbumList = ({ data, toShowYear }) => {
  if (!toShowYear) {
    data = convertToDecades(data)
  }
  return (
    <div id="albums">
      {/* <div id="navigation">
        <div>
          <ul>
            {Object.keys(data).map((year) => (
              <li>
                <a href={"#" + year}>{year}</a>
              </li>
            ))}
          </ul>
        </div>
       </div> */}
      <div>
        {Object.keys(data).map((timeFrame) => (
          <div id={timeFrame}>
            <p className="time-frame">
              {timeFrame} ({data[timeFrame].length})
            </p>
            <div className="timeframe-albums">
              {data[timeFrame].map((album) => (
                <Album
                  name={album.name}
                  artist={album.artist}
                  cover={album.cover}
                  preview={album.preview}
                  dateAdded={album.dateAdded}
                  previewTrackName={album.previewTrackName}
                  key={`${album.name} - ${album.dateAdded}`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AlbumList
