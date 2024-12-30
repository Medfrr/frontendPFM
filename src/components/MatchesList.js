import React from 'react';
import './MatchesList.css';

function MatchesList({ matches }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <section className="matches-list" aria-labelledby="match-list-heading">
      <h2 id="match-list-heading">Matches</h2>
      {matches.length === 0 ? (
        <p>No matches available for the selected date and league.</p>
      ) : (
        matches.map((match) => (
          <article key={`${match.teamA}-${match.teamB}-${match.date}`} className="match-card">
            <p className="match-date">{formatDate(match.date)}</p>
            <p className="match-teams">
              {match.teamA} vs {match.teamB}
            </p>
            <p className="match-score">{match.score || 'Not yet played'}</p>
            <p className="match-league">{match.league}</p>
          </article>
        ))
      )}
    </section>
  );
}

export default MatchesList;
