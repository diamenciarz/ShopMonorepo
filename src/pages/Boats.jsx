import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BOATS } from '../data/boats';

export default function Boats() {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Yachts', 'Motor Boats', 'Sailboats', 'Jet Skis'];

  const filteredBoats = activeCategory === 'All'
    ? BOATS
    : BOATS.filter((b) => b.category === activeCategory);

  return (
    <div className="container">
      <div className="products-layout">
        <aside className="filters">
          <div className="filter-group">
            <h3>Categories</h3>
            {categories.map((cat) => (
              <button
                key={cat}
                className={`filter-btn${activeCategory === cat ? ' active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </aside>

        <section>
          <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '24px' }}>
            {activeCategory} Collection
          </h2>
          <div className="products-grid">
            {filteredBoats.map((b) => (
              <Link key={b.id} to={`/boat/${b.id}`} className="product-card">
                <div className="product-image-container">
                  <img src={b.image} alt={b.name} className="product-image" loading="lazy" />
                </div>
                <div className="product-info">
                  <span className="product-category">{b.category}</span>
                  <span className="product-name">{b.name}</span>
                  <span className="product-price">${b.price.toLocaleString()}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
