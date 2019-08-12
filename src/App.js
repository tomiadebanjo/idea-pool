import React, { useState } from "react";
import { Router } from "@reach/router";

import WrapperContainer from "./components/WrapperContainer";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import AuthRoute from "./components/AuthRoute";
import UnprotectedRoute from "./components/UnprotectedRoute";

import Dashboard from "./pages/Dashboard";
import AuthContext from "./context/AuthContext";
import "./App.css";

function App() {
  const authHook = useState(false);

  return (
    <AuthContext.Provider value={authHook}>
      <WrapperContainer>
        <Router>
          <AuthRoute path="/" component={Dashboard} />
          <UnprotectedRoute path="/login" component={Login} />
          <UnprotectedRoute path="/register" component={SignUp} />
        </Router>
      </WrapperContainer>
    </AuthContext.Provider>
  );
}

export default App;
