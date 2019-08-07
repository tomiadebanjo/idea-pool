import React from 'react';
import { Router } from '@reach/router';

import WrapperContainer from './components/WrapperContainer';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

import './App.css';

function App() {
  return (
    <div>
      <WrapperContainer>
        <Router>
          <Login path="/login" />
          <SignUp path="/register" default />
        </Router>
      </WrapperContainer>
    </div>
  );
}

export default App;
