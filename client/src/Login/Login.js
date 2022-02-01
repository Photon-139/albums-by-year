import React from "react"

const AUTH_URL = "http://localhost:5000/login"

export default function Login() {
  return <a href={AUTH_URL}>Login with Spotify</a>
}
