import React, { useState, useEffect } from "react";
import './register.css';
export default function Login(props) {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: ""
  });
  useEffect(() => {
    const tok = window.localStorage.getItem('token');
    if(tok){
      window.location.href = '/';
    }
  }, [])
  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = user;
    fetch("http://localhost:4000/user/login-user", {
      mode : "no-cors",
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
          window.localStorage.setItem("token", data.data);
          window.location.href = "/";
        }else{
          setUser({
            email: "",
            password: "",
          })
          window.alert("Invalid Credentials");
        }
      });
  }
    return (
      <div className="sign">
      <img className="image" alt="robot" src="https://ouch-cdn2.icons8.com/llmYu0Ej8fl5HOWBIsRfph-9YMX4F-P9q5JOR355uns/rs:fit:256:338/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9wbmcvNjc2/L2Q1NDRiYTQxLTk3/M2MtNGMwNi04Yjlh/LWQwZmI3YThjZDg5/NC5wbmc.png"></img>
      <div className="signup">
      <form className="form" onSubmit={handleSubmit}>
      <h1 className="head" style={{"color":"#0008c1"}}>Sign In</h1>  

        <div>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            required
            value={user.email}
            onChange={(e) =>{
              user.email = e.target.value;
              setUser({...user});
            }}
          />
        </div>

        <div>
          <input
            required
            type="password"
            className="form-control"
            placeholder="Enter password"
            value = {user.password}
            onChange={(e) =>{
              user.password = e.target.value;
              setUser({...user});
            }}
          />
        </div>

        <div className="d-grid">
          <button type="submit" className="btn2">
            Submit
          </button>
        </div>
        <p className="forgot-password text-left">
          Don't have account <a href="/register-user"><strong>Sign Up</strong></a>
        </p>
      </form>
      </div>
      </div>
    );
}
