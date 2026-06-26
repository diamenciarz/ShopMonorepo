import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../data/products';

export default function Products() {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Tops', 'Bottoms', 'Outerwear'];

  const filteredProducts = activeCategory === 'All'
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === activeCategory);

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
            {activeCategory} Products
          </h2>
          <div className="products-grid">
            {filteredProducts.map((p) => (
              <Link key={p.id} to={`/product/${p.id}`} className="product-card">
                <div className="product-image-container">
                  <img src={p.image} alt={p.name} className="product-image" loading="lazy" />
                </div>
                <div className="product-info">
                  <span className="product-category">{p.category}</span>
                  <span className="product-name">{p.name}</span>
                  <span className="product-price">${p.price}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}