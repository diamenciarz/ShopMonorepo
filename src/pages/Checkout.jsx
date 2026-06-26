import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Checkout() {
  const { cart, cartTotal, clearCart } = useCart();
  const [complete, setComplete] = useState(false);
  const [form, setForm] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zip: '',
    cardName: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    clearCart();
    setComplete(true);
  };

  if (complete) {
    return (
      <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}>
        <h2 style={{ fontSize: '32px', marginBottom: '16px' }}>Order Confirmed!</h2>
        <p style={{ color: '#666', maxWidth: '500px', margin: '0 auto 32px', lineHeight: '1.6' }}>
          Thank you for your purchase. We are preparing elements of your order and will email confirmation details shortly.
        </p>
        <Link to="/" className="btn btn-primary">
          Back to Home
        </Link>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="container" style={{ padding: '80px 0', textAlign: 'center' }}>
        <h2>Bag is empty</h2>
        <p style={{ margin: '16px 0 32px' }}>Please add products to your bag first.</p>
        <Link to="/products" className="btn btn-primary">
          Explore Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="checkout-grid">
        <div className="checkout-form-container">
          <div className="checkout-section">
            <h3>Contact Information</h3>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                required
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="form-input"
              />
            </div>
          </div>

          <div className="checkout-section">
            <h3>Shipping Address</h3>
            <div className="form-group-row">
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  required
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  required
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input
                required
                type="text"
                id="address"
                name="address"
                value={form.address}
                onChange={handleChange}
                className="form-input"
              />
            </div>
            <div className="form-group-row">
              <div className="form-group">
                <label htmlFor="city">City</label>
                <input
                  required
                  type="text"
                  id="city"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label htmlFor="zip">ZIP / Postal Code</label>
                <input
                  required
                  type="text"
                  id="zip"
                  name="zip"
                  value={form.zip}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
            </div>
          </div>

          <div className="checkout-section">
            <h3>Card Information</h3>
            <div className="form-group">
              <label htmlFor="cardName">Name on Card</label>
              <input
                required
                type="text"
                id="cardName"
                name="cardName"
                value={form.cardName}
                onChange={handleChange}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="cardNumber">Card Number</label>
              <input
                required
                pattern="[0-9]{13,19}"
                maxLength="19"
                placeholder="0000 0000 0000 0000"
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={form.cardNumber}
                onChange={handleChange}
                className="form-input"
              />
            </div>
            <div className="form-group-row">
              <div className="form-group">
                <label htmlFor="cardExpiry">Expiration Date</label>
                <input
                  required
                  placeholder="MM/YY"
                  maxLength="5"
                  type="text"
                  id="cardExpiry"
                  name="cardExpiry"
                  value={form.cardExpiry}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label htmlFor="cardCvc">CVC</label>
                <input
                  required
                  pattern="[0-9]{3,4}"
                  maxLength="4"
                  placeholder="123"
                  type="text"
                  id="cardCvc"
                  name="cardCvc"
                  value={form.cardCvc}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
            </div>
          </div>
        </div>

        <aside className="cart-summary" style={{ position: 'sticky', top: '100px' }}>
          <h2 className="summary-title">Your Order</h2>
          <div className="order-items-summary">
            {cart.map((item) => (
              <div key={`${item.id}-${item.size}`} className="order-item-mini">
                <div className="order-item-mini-info">
                  <span className="order-item-mini-name">{item.name}</span>
                  <span className="order-item-mini-meta">
                    Size: {item.size} &middot; Qty: {item.qty}
                  </span>
                </div>
                <span>${item.price * item.qty}</span>
              </div>
            ))}
          </div>
          <div className="summary-row" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
            <span>Subtotal</span>
            <span>${cartTotal}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <span>${cartTotal}</span>
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '16px' }}>
            Place Order
          </button>
        </aside>
      </form>
    </div>
  );
}