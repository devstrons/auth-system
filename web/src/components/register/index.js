import "./styles.css";
import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Register = () => {
  const history = useHistory();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    reEnterPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  function ValidateEmail(inputText) {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (inputText.value.match(mailformat)) {
      document.form1.text1.focus();
      alert("Valid email address!");
      return true;
    }
    else {
      alert("You have entered an invalid email address!");
      document.form1.text1.focus();
      return false;
    }
  }

  const register = (ev) => {
    ev.preventDefault();
    const { name, email, password, reEnterPassword } = user;
    if (name && email && password && password === reEnterPassword) {
      axios.post("/user/signup", user).then((res) => {
        alert(res.data.message);
        history.push("/login");
      });
    } else {
      alert("invlid input");
    }
  };

  return (
    <>
      <body onload='document.form1.text1.focus()'>
        <div class="mail">
          <form name="form1" action="#" className="register" onSubmit={register}>
            {console.log("User", user)}
            <h1>Register</h1>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              placeholder="Enter your Name"
            ></input>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              placeholder="Enter your Email"
              onclick={() => ValidateEmail(document.form1.email)}

            ></input>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              placeholder="Enter your Password"
            ></input>
            <input
              type="password"
              name="reEnterPassword"
              value={user.reEnterPassword}
              onChange={handleChange}
              placeholder="Re-Enter your Password"
            ></input>
            <button type="submit" className="button">
              Sign Up
            </button>
            <div>or</div>
            <button
              type="button"
              className="button"
              onClick={() => history.push("/login")}
            >
              Login
            </button>
          </form>
        </div>
      </body>
    </>
  );
};

export default Register;
