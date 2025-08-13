import React from 'react';
import './GuestPage.css';

const GuestPage = ({ onLogin }) => {
  const flights = [
    {
      id: 1,
      airline: 'Air India',
      flightNumber: 'AI-101',
      from: 'Mumbai',
      to: 'Delhi',
      departure: '10:00 AM',
      arrival: '12:00 PM',
      price: 4500,
      seats: 45
    },
    {
      id: 2,
      airline: 'IndiGo',
      flightNumber: '6E-202',
      from: 'Delhi',
      to: 'Bangalore',
      departure: '02:30 PM',
      arrival: '05:00 PM',
      price: 3800,
      seats: 32
    },
    {
      id: 3,
      airline: 'SpiceJet',
      flightNumber: 'SG-303',
      from: 'Chennai',
      to: 'Kolkata',
      departure: '08:15 AM',
      arrival: '10:45 AM',
      price: 3200,
      seats: 28
    },
    {
      id: 4,
      airline: 'Vistara',
      flightNumber: 'UK-404',
      from: 'Hyderabad',
      to: 'Pune',
      departure: '11:45 AM',
      arrival: '01:15 PM',
      price: 2800,
      seats: 38
    },
    {
      id: 5,
      airline: 'GoAir',
      flightNumber: 'G8-505',
      from: 'Ahmedabad',
      to: 'Jaipur',
      departure: '03:20 PM',
      arrival: '04:50 PM',
      price: 2200,
      seats: 25
    }
  ];

  return (
    <div className="guest-page">
      <div className="guest-header">
        <h2>Welcome to Flight Ticket Booking</h2>
        <p>Browse available flights below. Please login to book tickets.</p>
        <button className="login-btn" onClick={onLogin}>
          Login to Book Tickets
        </button>
      </div>
      
      <div className="flights-container">
        <h3>Available Flights</h3>
        <div className="flights-grid">
          {flights.map((flight) => (
            <div key={flight.id} className="flight-card">
              <div className="flight-header">
                <h4>{flight.airline}</h4>
                <span className="flight-number">{flight.flightNumber}</span>
              </div>
              <div className="flight-route">
                <div className="route-info">
                  <span className="city">{flight.from}</span>
                  <span className="time">{flight.departure}</span>
                </div>
                <div className="route-arrow">→</div>
                <div className="route-info">
                  <span className="city">{flight.to}</span>
                  <span className="time">{flight.arrival}</span>
                </div>
              </div>
              <div className="flight-details">
                <div className="price">₹{flight.price}</div>
                <div className="seats">Seats: {flight.seats}</div>
              </div>
              <div className="booking-notice">
                <p>Login required to book this flight</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GuestPage; 