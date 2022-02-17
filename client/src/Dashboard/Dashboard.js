import React, { useState } from "react"
import axios from "axios"
import Years from "../Years/Years"
import * as Styles from "./styles.module.css"
import Toggle from "../Toggle/Toggle"
import Decades from "../Decades/Decades"
import useAlbums from "./useAlbums"

const initialize = () => {
  setInterval(() => {
    console.log("Refresh")
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
  let [albums, loading] = useAlbums()
  let [toShowYears, setToShowYears] = useState(true)

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className={Styles.dashboard}>
          <div id={Styles["toggle-between"]}>
            <p>Years</p>
            <Toggle onToggle={() => setToShowYears(!toShowYears)} />
            <p>Decades</p>
          </div>
          {/* <div style={{ float: "right", width: "100px", height: "100vh" }}>
            <div>
              <ul>
                {Object.keys(albums).map((year) => (
                  <li>
                    <a href={"#" + year}>{year}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div> */}
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
