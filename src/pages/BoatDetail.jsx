import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { BOATS } from '../data/boats';
import { useCart } from '../context/CartContext';

export default function BoatDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const boat = BOATS.find((b) => b.id === id);

  if (!boat) {
    return (
      <div className="container" style={{ padding: '80px 0', textAlign: 'center' }}>
        <h2>Vessel not found</h2>
        <p style={{ margin: '16px 0 32px', color: '#666' }}>The vessel you are looking for does not exist.</p>
        <Link to="/boats" className="btn btn-primary">
          Back to Boats
        </Link>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="detail-grid">
        <div className="detail-image-container">
          <img src={boat.image} alt={boat.name} className="detail-image" />
        </div>
        <div className="detail-info">
          <div className="detail-header">
            <span className="detail-category">{boat.category}</span>
            <h1 className="detail-name">{boat.name}</h1>
            <span className="detail-price">${boat.price.toLocaleString()}</span>
          </div>

          <p className="detail-desc">{boat.description}</p>

          <ul className="detail-features">
            {boat.features.map((feat, i) => (
              <li key={i}>{feat}</li>
            ))}
          </ul>

          <div className="detail-actions">
            <button
              className="btn btn-primary"
              style={{ flex: 1 }}
              onClick={() => addToCart(boat, 'Standard')}
            >
              Add to Cart
            </button>
            <Link to="/boats" className="btn btn-secondary">
              Continue Browsing
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
