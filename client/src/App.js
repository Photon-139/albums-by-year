import Dashboard from "./Dashboard/Dashboard"
import Login from "./Login/Login"
import "./App.css"

function checkLocal() {
  if (
    !localStorage.getItem("accessToken") ||
    !localStorage.getItem("refreshToken") ||
    !localStorage.getItem("expiresIn") ||
    new Date().getTime() > parseInt(localStorage.getItem("expiresIn"))
  ) {
    return false
  }
  return true
}

function checkParams() {
  const params = new URLSearchParams(window.location.search)
  if (
    params.get("accessToken") &&
    params.get("refreshToken") &&
    params.get("expiresIn")
  ) {
    localStorage.setItem("accessToken", params.get("accessToken"))
    localStorage.setItem("refreshToken", params.get("refreshToken"))
    localStorage.setItem(
      "expiresIn",
      new Date().getTime() + parseInt(params.get("expiresIn")) * 1000
    )
    return true
  }
  return false
}

function App() {
  return <div>{checkLocal() || checkParams() ? <Dashboard /> : <Login />}</div>
}

export default App
