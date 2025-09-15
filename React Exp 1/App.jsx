import React from 'react';
import ProductCard from './ProductCard'; // Import the new component
import './App.css'; // We'll add some styles here

function App() {
  // Sample product data
  const products = [
    { id: 1, name: 'Wireless Mouse', price: 25.99, inStock: true },
    { id: 2, name: 'Mechanical Keyboard', price: 79.50, inStock: false },
    { id: 3, name: '4K Monitor', price: 349.00, inStock: true },
    { id: 4, name: 'Webcam', price: 45.00, inStock: true }
  ];

  return (
    <div className="App">
      <h1>Our Products</h1>
      <div className="products-container">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            productName={product.name}
            price={product.price}
            inStock={product.inStock}
          />
        ))}
      </div>
    </div>
  );
}

export default App;