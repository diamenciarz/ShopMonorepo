import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';

const SIZES = ['S', 'M', 'L', 'XL'];

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState('M');

  const product = PRODUCTS.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="container" style={{ padding: '80px 0', textAlign: 'center' }}>
        <h2>Product not found</h2>
        <p style={{ margin: '16px 0 32px', color: '#666' }}>The product you are looking for does not exist.</p>
        <Link to="/products" className="btn btn-primary">
          Back to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="detail-grid">
        <div className="detail-image-container">
          <img src={product.image} alt={product.name} className="detail-image" />
        </div>
        <div className="detail-info">
          <div className="detail-header">
            <span className="detail-category">{product.category}</span>
            <h1 className="detail-name">{product.name}</h1>
            <span className="detail-price">${product.price}</span>
          </div>

          <p className="detail-desc">{product.description}</p>

          <ul className="detail-features">
            {product.features.map((feat, i) => (
              <li key={i}>{feat}</li>
            ))}
          </ul>

          <div className="size-selector">
            <h3>Select Size</h3>
            <div className="size-options">
              {SIZES.map((size) => (
                <button
                  key={size}
                  className={`size-btn${selectedSize === size ? ' active' : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="detail-actions">
            <button
              className="btn btn-primary"
              style={{ flex: 1 }}
              onClick={() => addToCart(product, selectedSize)}
            >
              Add to Bag
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}