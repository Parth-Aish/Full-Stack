import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Dockerized React!</h1>
        <p>
          This React application is served by an <strong>Nginx</strong> container.
        </p>
        <p>
          Built using a <strong>multi-stage Docker build</strong>.
        </p>
      </header>
    </div>
  );
}

export default App;