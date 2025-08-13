import React from 'react';
import picture1 from './assets/picture1.jpg';
import picture2 from './assets/picture2.jpg';
import picture3 from './assets/picture3.jpg';

// List of office data as objects
const offices = [
  {
    id: 1,
    name: 'DBS',
    rent: 50000,
    address: 'Chennai',
    image: picture1,
  },
  {
    id: 2,
    name: 'Regus',
    rent: 65000,
    address: 'Bangalore',
    image: picture2,
  },
  {
    id: 3,
    name: 'WeWork',
    rent: 55000,
    address: 'Mumbai',
    image: picture3,
  }
];

// Create style for rent dynamically
const getRentStyle = (rent) => ({
  color: rent <= 60000 ? 'red' : 'green',
  fontWeight: 'bold',
  fontSize: '22px',
  marginTop: '8px',
});

// Style objects for reuse
const headingStyle = {
  textAlign: 'center',
  marginTop: '40px',
  fontWeight: 'bold',
  fontSize: '2rem',
};
const cardStyle = {
  margin: '30px auto',
  padding: '22px',
  border: '1px solid #eee',
  borderRadius: '12px',
  maxWidth: '430px',
  boxShadow: '0 4px 10px #ddd',
};
const imageStyle = {
  display: 'block',
  margin: '0 auto 18px',
  width: '68%',
  height: '170px',
  objectFit: 'cover',
  borderRadius: '9px',
};
const nameStyle = {
  fontWeight: 'bold',
  fontSize: '1.4rem',
  marginTop: '5px',
};
const addressStyle = {
  marginTop: '10px',
  fontWeight: 'bold',
};

function App() {
  return (
    <div style={{ margin: '0 auto', maxWidth: '900px', padding: '35px 0' }}>
      {/* Heading element */}
      <h1 style={headingStyle}>Office Space , at Affordable Range</h1>

      {/* Loop through the offices list */}
      {offices.map(office => (
        <div key={office.id} style={cardStyle}>
          {/* Attribute to display image of the office space */}
          <img src={office.image} alt={office.name} style={imageStyle} />
          {/* Display office details with proper styles */}
          <div style={nameStyle}>Name: {office.name}</div>
          {/* Display Rent with conditional styling */}
          <div style={getRentStyle(office.rent)}>Rent: Rs. {office.rent}</div>
          <div style={addressStyle}>Address: {office.address}</div>
        </div>
      ))}
    </div>
  );
}

export default App;
