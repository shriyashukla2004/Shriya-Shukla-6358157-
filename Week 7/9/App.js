import React, { useState } from 'react';
import './App.css';
import ListofPlayers from './components/ListofPlayers';
import IndianPlayers from './components/IndianPlayers';

function App() {
  const [flag, setFlag] = useState(true);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Cricket App</h1>
        <button onClick={() => setFlag(!flag)}>
          Toggle Flag (Current: {flag.toString()})
        </button>
      </header>
      
      <main>
        {flag ? (
          <div>
            <h2>Output: When Flag=true</h2>
            <ListofPlayers />
          </div>
        ) : (
          <div>
            <h2>When Flag=false</h2>
            <IndianPlayers />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
