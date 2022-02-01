import React from "react"

export default function SideNavbar({ years }) {
  console.log(years)
  return (
    <div>
      {/* height: 100%; width: 0; position: fixed; z-index: 1; top: 0; left: 0;
      background-color: #111; overflow-x: hidden; transition: 0.5s; padding-top:
      60px; display: flex; align-items: center; flex-direction: column; */}
      <div
        style={{
          height: "100%",
          width: "0",
          position: "fixed",
          zIndex: "1",
          top: "0",
          left: "0",
          backgroundColor: "#111",
          transition: "0.5s",
        }}
      >
        <div>
          <ul>
            {Object.keys(years).map((year) => (
              <li>
                <a href={"#" + year}>{year}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div></div>
    </div>
  )
}
