import Dashboard from "./Dashboard/Dashboard";
import Login from "./Login/Login";
import "./App.css";
import axios from "axios";

function refreshAccessToke() {
    axios
        .post(process.env.REACT_APP_SERVER + "/refresh", {
            refreshToken: localStorage.getItem("refreshToken"),
        })
        .then((data) => {
            localStorage.setItem("accessToken", data.data.accessToken);
            localStorage.setItem("expiresIn", data.data.expiresIn);
        })
        .catch((err) => console.log(err));
}

function checkLocal() {
    if (new Date().getTime() > parseInt(localStorage.getItem("expiresIn")) && localStorage.getItem("refreshToken")) {
        refreshAccessToke();
        return true;
    }
    if (
        !localStorage.getItem("accessToken") ||
        !localStorage.getItem("refreshToken") ||
        !localStorage.getItem("expiresIn") ||
        new Date().getTime() > parseInt(localStorage.getItem("expiresIn"))
    ) {
        return false;
    }
    return true;
}

function checkParams() {
    const params = new URLSearchParams(window.location.search);
    console.log(new Date().getTime() + parseInt(params.get("expiresIn")) * 1000);
    if (params.get("accessToken") && params.get("refreshToken") && params.get("expiresIn")) {
        localStorage.setItem("accessToken", params.get("accessToken"));
        localStorage.setItem("refreshToken", params.get("refreshToken"));
        localStorage.setItem("expiresIn", new Date().getTime() + parseInt(params.get("expiresIn")) * 1000);
        return true;
    }
    return false;
}

function App() {
    return <div>{checkLocal() || (checkParams() && new Date().getTime() < parseInt(localStorage.getItem("expiresIn"))) ? <Dashboard /> : <Login />}</div>;
}

export default App;
