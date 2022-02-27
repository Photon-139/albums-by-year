import React, { useEffect, useState } from "react"
import axios from "axios"
import Years from "../Years/Years"
import "./dashboard.css"
import Toggle from "../Toggle/Toggle"
import Decades from "../Decades/Decades"
import useAlbums from "./useAlbums"

export default function Dashboard() {
  window.history.pushState({}, null, "/")

  useEffect(() => {
    setInterval(() => {
      console.log("Refresh")
      axios
        .post("http://localhost:5000/refresh", {
          refreshToken: localStorage.getItem("refreshToken"),
        })
        .then((data) => {
          localStorage.setItem("accessToken", data.data.accessToken)
          localStorage.setItem("expiresIn", data.data.expiresIn)
        })
        .catch((err) => console.log(err))
    }, (3600 - 600) * 1000)
  }, [])

  let [albums, loading] = useAlbums()
  let [toShowYears, setToShowYears] = useState(true)

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="dashboard">
          <div id="toggle-between">
            <p>Years</p>
            <Toggle onToggle={() => setToShowYears(!toShowYears)} />
            <p>Decades</p>
          </div>
          <main>
            {toShowYears ? (
              Object.keys(albums).map((year) => (
                <Years key={year} year={year} albums={albums[year]} />
              ))
            ) : (
              <Decades data={albums} />
            )}
          </main>
        </div>
      )}
    </>
  )
}
