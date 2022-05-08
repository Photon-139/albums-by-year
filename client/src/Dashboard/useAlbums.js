import { useState, useEffect } from "react"
import SpotifyWebApi from "spotify-web-api-node"

export default function useAlbums() {
  let [albums, setAlbums] = useState([])
  let [loading, setLoading] = useState(true)

  useEffect(() => {
    const spotifyApi = new SpotifyWebApi({
      clientId: process.env.REACT_APP_CLIENT_ID,
      redirectUri: process.env.REACT_APP_SERVER + "/callback",
      refreshToken: localStorage.getItem("refreshToken"),
      accessToken: localStorage.getItem("accessToken"),
    })
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
                previewTrackName: album.album.tracks.items[0].name,
                // preview:
                //   album.album.tracks.items[
                //     Math.floor(Math.random() * album.album.tracks.items.length)
                //   ].preview_url,
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
                  previewTrackName: album.album.tracks.items[0].name,
                  // preview:
                  //  album.album.tracks.items[
                  //    Math.floor(
                  //      Math.random() * album.album.tracks.items.length
                  //    )
                  //  ].preview_url,
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
                        previewTrackName: album.album.tracks.items[0].name,
                        // preview:
                        //  album.album.tracks.items[
                        //    Math.floor(
                        //      Math.random() * album.album.tracks.items.length
                        //    )
                        //  ].preview_url,
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
                          previewTrackName: album.album.tracks.items[0].name,
                          // preview:
                          //  album.album.tracks.items[
                          //    Math.floor(
                          //      Math.random() * album.album.tracks.items.length
                          //    )
                          //  ].preview_url,
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

  return [albums, loading]
}
