import React from 'react';
import { Router } from '@reach/router';

import WrapperContainer from './components/WrapperContainer';
import Login from './pages/Login';

import './App.css';

function App() {
  return (
    <div>
      <WrapperContainer>
        <Router>
          <Login path="/" />
        </Router>
      </WrapperContainer>
    </div>
  );
}

export default App;
