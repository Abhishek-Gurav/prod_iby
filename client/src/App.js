// React Imports

import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components

import Navbar from "./components/Navbar";

// Pages

import Home from "./Pages/Home";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Logout from "./Pages/Logout";  
import TextAnalyzer from "./Pages/TextAnalyzer";
import Ghostmask from "./Pages/Ghostmask";
import Hand from "./Pages/Hands";
import Lipstick from "./Pages/Lipstick";

// Css

import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

function App() {
  var [token, setToken] = React.useState(true);

  useEffect(() => {
    setToken(true);
    var tok = window.localStorage.getItem("token");
    if(!tok){
      setToken(false);
    }
    console.log(token)
  },[]);
  return (
    <React.Fragment>
      <div style={{minHeight:"90vh"}} className="App">{token ? <Navbar /> : null}
      <Router>
        <Routes>
          <Route exact path="*" element={<Home />}></Route>
          {/* Auth routes */}

          <Route exact path="/login-user" element={<Login />}></Route>
          <Route exact path="/logout" element={<Logout />}></Route>
          <Route exact path="/register-user" element={<Register />}></Route>

          {/* ----------- */}

          {/* Pages */}

          // <Route exact path="/nlp" element={<TextAnalyzer />}></Route>
          <Route exact path="/ghostmask" element={<Ghostmask />}></Route>
          <Route exact path="/hand" element={<Hand />}></Route>
          <Route exact path="/lipstick" element={<Lipstick />}></Route>

          {/* Holistic is implimented but not using it as the api response takes too much time */}
          
          {/* <Route exact path="/holistic" element={<Holistics />}></Route> */}
          {/* ----- */}
        </Routes>
      </Router>
      </div>
    </React.Fragment>
  );
}

export default App;
