import React, { useState, useEffect } from "react";
import './register.css';
export default function SignUp (props) {
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
  
  const handleSubmit = e => {
    e.preventDefault();
    const { username, email, password } = user;
    fetch("http://localhost:4000/user/register-user", {
      mode: "no-cors",
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "https://iby-project.onrender.com",
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        window.location.href = "/login-user";
      });
  }
    return (
      <div className="sign">
      <img className="image" alt = "sign" src="https://ouch-cdn2.icons8.com/llmYu0Ej8fl5HOWBIsRfph-9YMX4F-P9q5JOR355uns/rs:fit:256:338/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9wbmcvNjc2/L2Q1NDRiYTQxLTk3/M2MtNGMwNi04Yjlh/LWQwZmI3YThjZDg5/NC5wbmc.png"></img>
      <div className="signup">
      <form className="form" onSubmit={handleSubmit}>
      
        <h1 className="head" style={{"color":"#273b98"}}>Sign Up</h1>  

        <div >
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            required
            onChange={(e) => {
              user.username = e.target.value;
              setUser({...user});
            }}
          />
        </div>

        <div >
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            required
            onChange={(e) =>{
              user.email = e.target.value;
              setUser({...user});
            }}
          />
        </div>

        <div >
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            required
            onChange={(e) => {
              user.password = e.target.value;
              setUser({...user}); 
            }}
          />
        </div>

        <div>
          <button type="submit" className="btn2">
            Sign Up
          </button>
        </div>
        <p className="forgot-password text-left">
          Already registered <a href="/login-user"><strong>sign in?</strong></a>
        </p>
      </form>
      </div>
      </div>
    );
}
