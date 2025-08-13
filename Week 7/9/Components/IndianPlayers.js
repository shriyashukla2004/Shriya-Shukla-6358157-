import React from 'react';

const IndianPlayers = () => {
  // Array of Indian players with positions
  const indianPlayers = [
    { position: 'First', name: 'Sachin1' },
    { position: 'Second', name: 'Dhoni2' },
    { position: 'Third', name: 'Virat3' },
    { position: 'Fourth', name: 'Rohit4' },
    { position: 'Fifth', name: 'Yuvaraj5' },
    { position: 'Sixth', name: 'Raina6' }
  ];

  // Destructuring to separate odd and even players
  const [first, second, third, fourth, fifth, sixth] = indianPlayers;
  const oddPlayers = [first, third, fifth];
  const evenPlayers = [second, fourth, sixth];

  // Two arrays for T20 and Ranji Trophy players
  const t20Players = [
    'Mr. First Player',
    'Mr. Second Player',
    'Mr. Third Player'
  ];

  const ranjiTrophyPlayers = [
    'Mr. Fourth Player',
    'Mr. Fifth Player',
    'Mr. Sixth Player'
  ];

  // Merge the two arrays using ES6 spread operator
  const mergedPlayers = [...t20Players, ...ranjiTrophyPlayers];

  return (
    <div>
      <h2>Odd Players:</h2>
      <ul>
        {oddPlayers.map((player, index) => (
          <li key={index}>{player.position} : {player.name}</li>
        ))}
      </ul>

      <h2>Even Players:</h2>
      <ul>
        {evenPlayers.map((player, index) => (
          <li key={index}>{player.position} : {player.name}</li>
        ))}
      </ul>

      <h2>List of Indian Players Merged:</h2>
      <ul>
        {mergedPlayers.map((player, index) => (
          <li key={index}>{player}</li>
        ))}
      </ul>
    </div>
  );
};

export default IndianPlayers; 