import React, { useState } from 'react';
import './UserPage.css';

const UserPage = ({ onLogout }) => {
  const [bookedTickets, setBookedTickets] = useState([]);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [bookingForm, setBookingForm] = useState({
    passengerName: '',
    email: '',
    phone: '',
    seats: 1
  });

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

  const handleBookFlight = (flight) => {
    setSelectedFlight(flight);
    setShowBookingForm(true);
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    
    if (bookingForm.passengerName && bookingForm.email && bookingForm.phone) {
      const newBooking = {
        id: Date.now(),
        flight: selectedFlight,
        ...bookingForm,
        totalPrice: selectedFlight.price * bookingForm.seats,
        bookingDate: new Date().toLocaleDateString(),
        bookingTime: new Date().toLocaleTimeString()
      };
      
      setBookedTickets([...bookedTickets, newBooking]);
      setShowBookingForm(false);
      setSelectedFlight(null);
      setBookingForm({
        passengerName: '',
        email: '',
        phone: '',
        seats: 1
      });
      
      alert('Ticket booked successfully!');
    } else {
      alert('Please fill all required fields');
    }
  };

  const handleInputChange = (e) => {
    setBookingForm({
      ...bookingForm,
      [e.target.name]: e.target.value
    });
  };

  const cancelBooking = (bookingId) => {
    setBookedTickets(bookedTickets.filter(booking => booking.id !== bookingId));
  };

  return (
    <div className="user-page">
      <div className="user-header">
        <h2>Welcome back! 🎉</h2>
        <p>You can now book tickets for your preferred flights.</p>
        <button className="logout-btn" onClick={onLogout}>
          Logout
        </button>
      </div>

      {showBookingForm && selectedFlight && (
        <div className="booking-modal">
          <div className="booking-form">
            <h3>Book Flight: {selectedFlight.airline} {selectedFlight.flightNumber}</h3>
            <form onSubmit={handleBookingSubmit}>
              <div className="form-group">
                <label>Passenger Name:</label>
                <input
                  type="text"
                  name="passengerName"
                  value={bookingForm.passengerName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={bookingForm.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Phone:</label>
                <input
                  type="tel"
                  name="phone"
                  value={bookingForm.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Number of Seats:</label>
                <input
                  type="number"
                  name="seats"
                  min="1"
                  max="5"
                  value={bookingForm.seats}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-actions">
                <button type="submit" className="book-btn">Book Ticket</button>
                <button 
                  type="button" 
                  className="cancel-btn"
                  onClick={() => setShowBookingForm(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="content-sections">
        <div className="flights-section">
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
                <button 
                  className="book-flight-btn"
                  onClick={() => handleBookFlight(flight)}
                >
                  Book Now
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bookings-section">
          <h3>My Bookings ({bookedTickets.length})</h3>
          {bookedTickets.length === 0 ? (
            <p className="no-bookings">No bookings yet. Book your first flight!</p>
          ) : (
            <div className="bookings-list">
              {bookedTickets.map((booking) => (
                <div key={booking.id} className="booking-card">
                  <div className="booking-header">
                    <h4>{booking.flight.airline} {booking.flight.flightNumber}</h4>
                    <span className="booking-id">#{booking.id}</span>
                  </div>
                  <div className="booking-details">
                    <p><strong>Passenger:</strong> {booking.passengerName}</p>
                    <p><strong>Route:</strong> {booking.flight.from} → {booking.flight.to}</p>
                    <p><strong>Date:</strong> {booking.flight.departure} - {booking.flight.arrival}</p>
                    <p><strong>Seats:</strong> {booking.seats}</p>
                    <p><strong>Total:</strong> ₹{booking.totalPrice}</p>
                    <p><strong>Booked on:</strong> {booking.bookingDate} at {booking.bookingTime}</p>
                  </div>
                  <button 
                    className="cancel-booking-btn"
                    onClick={() => cancelBooking(booking.id)}
                  >
                    Cancel Booking
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserPage; 