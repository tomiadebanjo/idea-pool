import React, { useState } from "react";
import { Router } from "@reach/router";

import WrapperContainer from "./components/WrapperContainer";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

import Dashboard from "./pages/Dashboard";
import AuthContext from "./context/AuthContext";
import "./App.css";

function App() {
  const authHook = useState(false);

  return (
    <AuthContext.Provider value={authHook}>
      <WrapperContainer>
        <Router>
          <Dashboard path="/" default />
          <Login path="/login" />
          <SignUp path="/register" />
        </Router>
      </WrapperContainer>
    </AuthContext.Provider>
  );
}

export default App;
