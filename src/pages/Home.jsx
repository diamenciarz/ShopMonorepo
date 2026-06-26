import React from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../data/products';

export default function Home() {
  const featured = PRODUCTS.slice(0, 3);

  return (
    <div>
      <section className="hero">
        <div className="container">
          <h1>Modern Essentials.<br />Built for Longevity.</h1>
          <p>Carefully constructed silhouettes from heavy, sustainably sourced materials.</p>
          <Link to="/products" className="btn btn-primary">
            Explore Collection
          </Link>
        </div>
      </section>

      <section className="featured-section container">
        <h2 className="section-title">New Arrivals</h2>
        <div className="products-grid">
          {featured.map((p) => (
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
  );
}