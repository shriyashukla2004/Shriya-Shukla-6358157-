import React, { useState } from 'react';

const INR_TO_EURO = 0.011;
const EURO_TO_INR = 90.91;

function App() {
  const [count, setCount] = useState(5);
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('INR');
  const [result, setResult] = useState('');

  const increment = () => setCount(prev => prev + 1);

  const sayHello = () => alert("localhost:3000 says: \nhello member");

  const handleIncrement = () => {
    increment();
    sayHello();
  };

  const handleDecrement = () => setCount(prev => prev - 1);

  const handleWelcome = (msg) => alert(`localhost:3000 says\n${msg}`);

  const handleOnPress = (event) => {
    alert('localhost:3000 says\nI was clicked');

  };

  const handleCurrencySubmit = (e) => {
    e.preventDefault();
    let output = '';
    if (currency === 'INR') {
      const euro = (parseFloat(amount) * INR_TO_EURO).toFixed(2);
      output = `Converting to Euro amount is €${euro}`;
    } else {
      const inr = (parseFloat(amount) * EURO_TO_INR).toFixed(2);
      output = `Converting to Rupees amount is ₹${inr}`;
    }
    alert(`localhost:3000 says\n${output}`);
    setResult(output);
  };

  return (
    <div style={{ margin: 20, fontFamily: 'Arial' }}>
      {/* Counter and Buttons */}
      <div>
        <button onClick={handleIncrement} style={{ marginRight: 5 }}>Increment</button>
        <button onClick={handleDecrement} style={{ marginRight: 5 }}>Decrement</button>
        <button onClick={() => handleWelcome('welcome')} style={{ marginRight: 5 }}>Say welcome</button>
        <button onClick={handleOnPress} style={{ marginRight: 5 }}>Click on me!</button>
        <br /><br />
        <span style={{ fontWeight: 'bold', fontSize: 18 }}>{count}</span>
      </div>

      {/* Currency Converter Section */}
      <h2 style={{ color: 'green', marginTop: 38 }}>Currency Convertor!!!</h2>
      <form onSubmit={handleCurrencySubmit}>
        <label>
          Amount:<input
            type="number"
            min="0"
            required
            value={amount}
            onChange={e => setAmount(e.target.value)}
            style={{ marginLeft: 6, marginRight: 12 }}
          />
        </label>
        <label>
          Currency:
          <select value={currency}
                  onChange={e => setCurrency(e.target.value)}
                  style={{ marginLeft: 6, marginRight: 12 }}>
            <option value="INR">INR</option>
            <option value="EURO">EURO</option>
          </select>
        </label>
        <button type="submit">Submit</button>
      </form>
      {/* Show result text below */}
      {result && (
        <p style={{ color: '#555', marginTop: 12 }}>{result}</p>
      )}
    </div>
  );
}

export default App;
