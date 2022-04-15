import "./styles.css";
import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Login = () => {
  const history = useHistory();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const login = (ev) => {
    ev.preventDefault();
    axios.post("/user/signin", user).then((res) => {
      console.log(res.data);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("name", res.data.name);
      alert(res.data.message);
      history.push("/");
    });
  };

  return (
    <form className="login" onSubmit={login}>
      <h1>Login</h1>
      <input
        type="text"
        name="email"
        value={user.email}
        onChange={handleChange}
        placeholder="Enter your Email"
      ></input>
      <input
        type="password"
        name="password"
        value={user.password}
        onChange={handleChange}
        placeholder="Enter your Password"
      ></input>
      <button className="button">Login</button>
      <div>or</div>
      <button
        type="button"
        className="button"
        onClick={() => history.push("/register")}
      >
        Register
      </button>
    </form>
  );
};

export default Login;
