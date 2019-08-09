import React from 'react';
import { Router } from '@reach/router';

import WrapperContainer from './components/WrapperContainer';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

import './App.css';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <div>
      <WrapperContainer>
        <Router>
          <Dashboard path="/" default />
          <Login path="/login" />
          <SignUp path="/register" />
        </Router>
      </WrapperContainer>
    </div>
  );
}

export default App;
