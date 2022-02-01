import React, { useEffect, useState } from "react"
import SpotifyWebApi from "spotify-web-api-node"
import axios from "axios"
import Years from "../Years/Years"
import * as Styles from "./styles.module.css"

const initialize = () => {
  setInterval(() => {
    axios
      .post("https://localhost:5000/refresh", {
        refreshToken: localStorage.getItem("refreshToken"),
      })
      .then((data) => {
        localStorage.setItem("accessToken", data.data.accessToken)
        localStorage.setItem("expiresIn", data.data.expiresIn)
      })
      .catch((err) => console.log(err))
  }, (3600 - 600) * 1000)
}

export default function Dashboard() {
  window.history.pushState({}, null, "/")
  initialize()
  const spotifyApi = new SpotifyWebApi({
    clientId: "***REMOVED***",
    redirectUri: "http://localhost:5000/callback",
    refreshToken: localStorage.getItem("refreshToken"),
    accessToken: localStorage.getItem("accessToken"),
  })
  let [albums, setAlbums] = useState([])
  let [loading, setLoading] = useState(true)

  useEffect(() => {
    let needMoreAlbums = false
    let moreAlbums = 0
    let albumData = {}
    spotifyApi.getMySavedAlbums({ offset: 0, limit: 50 }).then(
      (data) => {
        if (data.body.total > 50) {
          needMoreAlbums = true
          moreAlbums = data.body.total
        }
        data.body.items.forEach((album) => {
          if (album.album.type === "album") {
            let year = album.album.release_date.slice(0, 4)
            if (albumData[year]) {
              albumData[year].push({
                name: album.album.name,
                artist: album.album.artists[0].name,
                cover: album.album.images[1].url,
                preview: album.album.tracks.items[0].preview_url,
                albumLink: album.album.external_urls.spotify,
                artistLink: album.album.artists[0].external_urls.spotify,
                dateAdded: album.added_at,
              })
            } else {
              albumData[year] = [
                {
                  name: album.album.name,
                  artist: album.album.artists[0].name,
                  cover: album.album.images[1].url,
                  preview: album.album.tracks.items[0].preview_url,
                  albumLink: album.album.external_urls.spotify,
                  artistLink: album.album.artists[0].external_urls.spotify,
                  dateAdded: album.added_at,
                },
              ]
            }
          }
        })
        if (!needMoreAlbums) {
          setAlbums(albumData)
          setLoading(false)
        } else if (needMoreAlbums) {
          for (let i = 51; i < moreAlbums; i += 50) {
            spotifyApi.getMySavedAlbums({ offset: i, limit: 50 }).then(
              (data) => {
                data.body.items.forEach((album) => {
                  if (album.album.type === "album") {
                    let year = album.album.release_date.slice(0, 4)
                    if (albumData[year]) {
                      albumData[year].push({
                        name: album.album.name,
                        artist: album.album.artists[0].name,
                        cover: album.album.images[1].url,
                        preview: album.album.tracks.items[0].preview_url,
                        albumLink: album.album.external_urls.spotify,
                        artistLink:
                          album.album.artists[0].external_urls.spotify,
                        dateAdded: album.added_at,
                      })
                    } else {
                      albumData[year] = [
                        {
                          name: album.album.name,
                          artist: album.album.artists[0].name,
                          cover: album.album.images[1].url,
                          preview: album.album.tracks.items[0].preview_url,
                          albumLink: album.album.external_urls.spotify,
                          artistLink:
                            album.album.artists[0].external_urls.spotify,
                          dateAdded: album.added_at,
                        },
                      ]
                    }
                  }
                })
                setAlbums(albumData)
                setLoading(false)
              },
              (err) => console.log(err)
            )
          }
        }
      },
      (err) => console.log(err)
    )
  }, [])

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className={Styles.dashboard}>
          <main>
            {Object.keys(albums).map((year) => (
              <Years key={year} year={year} albums={albums[year]} />
            ))}
          </main>
        </div>
      )}
    </>
  )
}
