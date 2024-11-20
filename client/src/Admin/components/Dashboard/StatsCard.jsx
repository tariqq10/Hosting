import React from 'react';

const StatsCard = ({ label, count }) => {
  return (
    <div className="stats-card">
      <h3>{label}</h3>
      <p>{count} Donations</p>
    </div>
  );
};

export default StatsCard; 
