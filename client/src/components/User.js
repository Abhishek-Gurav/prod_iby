import React, { useState, useEffect } from "react";
import Button from "./Button";
import image from "../Images/Selfie.png";
import "./user.css";
export default function UserDetails(props) {
  const [user, setUser] = useState({
    userData: "",
  });
  const [token, setToken] = useState(true);
  useEffect(() => {
    const tok = window.localStorage.getItem("token");
    if (!tok) {
      setToken(false);
    }
    fetch("https://iby-project.onrender.com/user/userDetails", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setUser({
          userData: data.data,
        });
      });
  }, []);
  return (
    <div>
      <div className="user">
        <div className="user__text">
          {token ? (
            <>
              <h1 className="hero_head">Hi, {user.userData.username}!</h1>
              <p className="hero_para">
                AI has power to change the world and <br /> 
                we are here to help you
              </p>
            </>
          ) : (
            <>
              <h1 className="hero_head">Hello, User</h1>
              <p className="hero_para">
                This website is made for having fun with <strong>friends & family</strong> by applying filters on each other and also has feature to analyze any paragraph.<br></br>
                <i>Please <strong>Login</strong> to continue.</i>
              </p>
            </>
          )}
          {token ? (
            <>
              <Button
                text="Ghost Mask"
                cls="btn_hero1"
                var="dark"
                link="/ghostmask"
              />
              <Button
                text="Text Analyzer"
                cls="btn_hero btn-outline-primary"
                var=""
                link="/nlp"
              />
            </>
          ) : (
            <Button
              text="Login"
              cls="btn_hero1"
              var="dark"
              link="/login-user"
            />
          )}
        </div>
        <img className="landing_img" src={image} alt="Landing Page"></img>
      </div>
    </div>
  );
}
