import React from "react"
import "./Toggle.css"

export default function Toggle({ onToggle }) {
  return (
    <label className="switch">
      <input type={"checkbox"} onChange={onToggle} />
      <span className="slider" />
    </label>
  )
}
