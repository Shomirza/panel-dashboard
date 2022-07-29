import React, { useState } from "react";
import { IoIosPeople } from "react-icons/io";

function Login({ setLog }) {
  const User = {
    login: "qwert",
    password: "1234",
  };
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [errorLogin, setErrorLogin] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  function Submit() {
    if (login === User.login && password === User.password) {
      setLog("false");
    }
    if (login !== User.login) {
      setErrorLogin("Login error");
    } else {
      setErrorLogin("");
    }
    if (password !== User.password) {
      setErrorPassword("Password error");
    } else {
      setErrorPassword("");
    }
  }

  return (
    <div className="loginPage d-flex justify-content-center align-items-center" exit="out">
      <div className="col-md-3 col-8">
       <h1 className="text-center text-white display-1"> <IoIosPeople /></h1>
          <form>
            <input
              className=" form-control login-input"
              type="text"
              placeholder={"qwert"}
              onChange={(e) => setLogin(e.target.value)}
            />{" "}
            <br />
            <span style={{ color: "red" }}>{errorLogin}</span>
            <input
              className=" form-control login-input"
              type="password"
              placeholder={"1234"}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span style={{ color: "red" }}>{errorPassword}</span>
            <button className="form-control mt-4" onClick={Submit}>
              Submit
            </button>
          </form>
      </div>
    </div>
  );
}
export default Login;
