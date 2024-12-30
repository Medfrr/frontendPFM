import React, { useState, useEffect, useCallback, useMemo } from 'react';
import MatchesList from '../components/MatchesList';
import mockMatchesData from '../mockMatchesData';
import './HomePage.css';

function HomePage() {
  const [selectedLeague, setSelectedLeague] = useState('Ligue 1');
  const [groupedMatches, setGroupedMatches] = useState({
    today: [],
    yesterday: [],
    tomorrow: [],
  });
  const [dateFilter, setDateFilter] = useState('today');

  const getDateString = (date) => date.toISOString().split('T')[0];


  const today = useMemo(() => getDateString(new Date()), []);
  const yesterday = useMemo(() => getDateString(new Date(new Date().setDate(new Date().getDate() - 1))), []);
  const tomorrow = useMemo(() => getDateString(new Date(new Date().setDate(new Date().getDate() + 1))), []);
  

  const categorizeMatches = useCallback((league) => {
    const filteredMatches = mockMatchesData.filter(
      (match) => match.league.toLowerCase() === league.toLowerCase()
    );

    const categorized = {
      today: [],
      yesterday: [],
      tomorrow: [],
    };

    filteredMatches.forEach((match) => {
      const matchDate = getDateString(new Date(match.date));
      if (matchDate === today) {
        categorized.today.push(match);
      } else if (matchDate === yesterday) {
        categorized.yesterday.push(match);
      } else if (matchDate === tomorrow) {
        categorized.tomorrow.push(match);
      }
    });

    setGroupedMatches(categorized);
  }, [today, yesterday, tomorrow]);

  useEffect(() => {
    categorizeMatches(selectedLeague);
  }, [selectedLeague, categorizeMatches]);

  const matchesToShow = groupedMatches[dateFilter];

  const handleLeagueChange = (e) => {
    setSelectedLeague(e.target.value);
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Welcome to ScoreArena</h1>
        <p>Track all your football matches with ease</p>
      </header>

      <div className="select-container">
        <select value={selectedLeague} onChange={handleLeagueChange} className="league-select">
          <option value="Ligue 1">Ligue 1</option>
          <option value="Premier League">Premier League</option>
          <option value="La Liga">La Liga</option>
          <option value="Serie A">Serie A</option>
          <option value="Bundesliga">Bundesliga</option>
        </select>
      </div>
      <div className="filter-buttons">
        <button onClick={() => setDateFilter('today')}>Today</button>
        <button onClick={() => setDateFilter('yesterday')}>Yesterday</button>
        <button onClick={() => setDateFilter('tomorrow')}>Tomorrow</button>
      </div>
      <div className="matches-container">
        {matchesToShow.length > 0 ? (
          <MatchesList matches={matchesToShow} />
        ) : (
          <p className="no-matches">No matches available for the selected league and date.</p>
        )}
      </div>

      <footer className="home-footer">
        <p>© 2024 ScoreArena. All rights reserved.</p>
        <p>For inquiries, contact us at support@scorearena.com</p>
      </footer>
    </div>
  );
}

export default HomePage;
