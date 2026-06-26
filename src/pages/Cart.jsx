import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { cart, updateQty, removeFromCart, cartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="container empty-cart">
        <h2>Your Bag is Empty</h2>
        <p>Looks like you haven't added any items to your bag yet.</p>
        <Link to="/products" className="btn btn-primary">
          Explore Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="cart-header">
        <h1>Your Shopping Bag</h1>
      </div>
      <div className="cart-layout">
        <section className="cart-list">
          {cart.map((item) => (
            <div key={`${item.id}-${item.size}`} className="cart-item">
              <div className="cart-item-image">
                <img src={item.image} alt={item.name} />
              </div>
              <div className="cart-item-info">
                <div>
                  <div className="cart-item-details">
                    <h3 className="cart-item-name">{item.name}</h3>
                    <span className="cart-item-price">${item.price * item.qty}</span>
                  </div>
                  <div className="cart-item-meta">{item.category} &middot; Size: {item.size}</div>
                </div>

                <div className="cart-item-actions">
                  <div className="qty-counter">
                    <button
                      className="qty-counter-btn"
                      onClick={() => updateQty(item.id, item.size, item.qty - 1)}
                    >
                      &minus;
                    </button>
                    <span className="qty-counter-val">{item.qty}</span>
                    <button
                      className="qty-counter-btn"
                      onClick={() => updateQty(item.id, item.size, item.qty + 1)}
                    >
                      &#43;
                    </button>
                  </div>
                  <button
                    className="remove-btn"
                    onClick={() => removeFromCart(item.id, item.size)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </section>

        <aside className="cart-summary">
          <h2 className="summary-title font-sans">Order Summary</h2>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>${cartTotal}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>Calculated next step</span>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <span>${cartTotal}</span>
          </div>
          <Link to="/checkout" className="btn btn-primary" style={{ width: '100%', marginTop: '16px' }}>
            Proceed to Checkout
          </Link>
        </aside>
      </div>
    </div>
  );
}