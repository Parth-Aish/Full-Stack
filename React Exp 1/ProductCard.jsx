import React from 'react';

function ProductCard({ productName, price, inStock }) {
  // This component receives productName, price, and inStock as props.
  return (
    <div className="product-card">
      <h2>{productName}</h2>
      <p>Price: ${price}</p>
      <p className={inStock ? 'stock-status in-stock' : 'stock-status out-of-stock'}>
        {inStock ? 'In Stock' : 'Out of Stock'}
      </p>
    </div>
  );
}

export default ProductCard;