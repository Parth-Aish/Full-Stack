import React, { useState } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    setData(null);
    try {
      // In production, this '/api/data' path will be routed by the
      // AWS Application Load Balancer to the backend.
      // In local dev, the 'proxy' in package.json handles this.
      const response = await fetch('/api/data');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      setData(result);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Full-Stack AWS App with Load Balancing</h1>
      </header>
      
      <p>Click the button to fetch data from the backend.</p>
      
      <button onClick={fetchData} disabled={loading}>
        {loading ? 'Loading...' : 'Fetch Data from Backend'}
      </button>

      <div className="response-container">
        {loading && <p>Contacting backend server...</p>}
        
        {error && (
          <div>
            <p className="error">Error fetching data:</p>
            <pre>{error}</pre>
          </div>
        )}
        
        {data && (
          <div>
            <p><strong>Success! Got data from the backend:</strong></p>
            <pre>{JSON.stringify(data, null, 2)}</pre>
            <p>Check the <strong>"instance"</strong> field. If you refresh and click again, you might see it change!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;