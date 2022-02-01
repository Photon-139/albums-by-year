import Dashboard from "./Dashboard"
import Login from "./Login"

function checkLocal() {
  if (
    !localStorage.getItem("accessToken") ||
    !localStorage.getItem("refreshToken") ||
    !localStorage.getItem("expiresIn") ||
    new Date().getTime() > localStorage.getItem("expiresIn")
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
  return checkLocal() || checkParams() ? <Dashboard /> : <Login />
}

export default App
