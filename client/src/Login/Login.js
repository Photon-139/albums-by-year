import React from "react"
import "./login.css"

const AUTH_URL = process.env.REACT_APP_SERVER + "/login"

export default function Login() {
  return <a href={AUTH_URL}>Login with Spotify</a>
}
