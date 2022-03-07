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
      axios
        .post(process.env.REACT_APP_SERVER + "/refresh", {
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
  let [showInstructions, setShowInstructions] = useState(true)

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="dashboard">
          {showInstructions ? (
            <>
              <div
                id="instruction-overlay"
                onClick={() => setShowInstructions(false)}
              ></div>
              <div id="instructions">
                <button
                  id="close-instructions"
                  onClick={() => setShowInstructions(false)}
                >
                  x
                </button>
                <p>
                  Toggle to change how you want to view the albums, year-by-year
                  or decade-by-decade
                  <br />
                  Hover over an album to play a preview
                  <br />
                  Enjoy!
                </p>
              </div>
            </>
          ) : null}
          <div id="toggle-between">
            <p>Years</p>
            <Toggle onToggle={() => setToShowYears(!toShowYears)} />
            <p>Decades</p>
          </div>
          <div id="albums">
            {toShowYears ? (
              Object.keys(albums).map((year) => (
                <Years key={year} year={year} albums={albums[year]} />
              ))
            ) : (
              <Decades data={albums} />
            )}
          </div>
        </div>
      )}
    </>
  )
}
