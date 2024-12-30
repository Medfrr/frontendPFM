import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Update this for routing
import './App.css';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import heyImage from './hey.jpg';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [selectedLeague, setSelectedLeague] = useState('Ligue 1');
  const [message, setMessage] = useState('');

  const handleLogin = (user) => {
    setUsername(user.username);
    setIsLoggedIn(true);
    setMessage(`Welcome, ${user.username}!`);
    setTimeout(() => setMessage(''), 3000);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setMessage('You have successfully logged out.');
    setTimeout(() => setMessage(''), 3000);
  };

  const handleLeagueChange = (event) => {
    setSelectedLeague(event.target.value);
  };

  return (
    <div className="App" style={{ backgroundImage: `url(${heyImage})` }}>
      

      {message && <div className="message">{message}</div>}

      <Router>
        <Routes>
          <Route path="/" element={<LoginPage onLogin={handleLogin} />} />
          <Route path="/home" element={
            isLoggedIn ? (
              <>
                <button className="logout-btn" onClick={handleLogout}>
                  Logout
                </button>
                <HomePage 
                  selectedLeague={selectedLeague} 
                  onLeagueChange={handleLeagueChange} 
                />
              </>
            ) : (
              <LoginPage onLogin={handleLogin} />
            )
          } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
