import React, { useState } from 'react';
import './App.css';
import GuestPage from './components/GuestPage';
import UserPage from './components/UserPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>✈️ Flight Ticket Booking</h1>
      </header>
      <main>
        {isLoggedIn ? (
          <UserPage onLogout={handleLogout} />
        ) : (
          <GuestPage onLogin={handleLogin} />
        )}
      </main>
    </div>
  );
}

export default App;
