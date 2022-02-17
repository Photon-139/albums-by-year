const express = require("express")
const cors = require("cors")
const app = express()
app.use(express.json())
app.use(cors())
const SpotifyWebApi = require("spotify-web-api-node")
const url = require("url")
const querystring = require("querystring")

const spotifyApi = new SpotifyWebApi({
  clientId: "***REMOVED***",
  clientSecret: "***REMOVED***",
  redirectUri: "http://localhost:5000/callback",
})

app.get("/login", (req, res) => {
  const AUTH_URL =
    "https://accounts.spotify.com/authorize?client_id=***REMOVED***&response_type=code&redirect_uri=http://localhost:5000/callback&scope=user-library-read&state=34fFs29kd09"
  res.redirect(AUTH_URL)
})

app.get("/callback", (req, res) => {
  spotifyApi.authorizationCodeGrant(req.query.code).then(
    (data) => {
      const query = querystring.stringify({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in,
      })
      res.redirect(url.format(new URL(`http://localhost:3000/?${query}`)))
    },
    (err) => {
      console.log(err)
    }
  )
})

app.post("/refresh", (req, res) => {
  const spotifyApi = new SpotifyWebApi({
    clientId: "***REMOVED***",
    clientSecret: "***REMOVED***",
    redirectUri: "http://localhost:5000/callback",
    refreshToken: req.body.refreshToken,
  })
  spotifyApi.refreshAccessToken().then(
    (data) => {
      console.log(data)
      res.json({
        accessToken: data.body.access_token,
        expiresIn: data.body.expires_in,
      })
    },
    (err) => res.sendStatus(500)
  )
})

app.listen(5000, () => console.log("Listening on Port 5000"))
