import React from "react";
import { useHistory } from "react-router-dom";
import "./homepage.css";
import { useEffect } from "react";

const Homepage = () => {
  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem("token")
    if(!token) history.push("/login");
  }, []);

  return (
    <div className="homepage">
      <h1>Hello {localStorage.getItem("name")}</h1>
      <h1>Welcome to Dashboard</h1>
      <div
        className="button"
        onClick={() => {
          localStorage.removeItem("token");
          history.push("/login");
        }}
      >
        Logout
      </div>
    </div>
  );
};

export default Homepage;
