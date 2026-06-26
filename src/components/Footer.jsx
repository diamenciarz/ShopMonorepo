import React from 'react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-col">
          <div className="footer-logo">THREADLY</div>
          <p>Carefully constructed garments designed for the contemporary wardrobe.</p>
        </div>
        <div className="footer-col">
          <h4>Collection</h4>
          <ul>
            <li>Tops</li>
            <li>Bottoms</li>
            <li>Outerwear</li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Support</h4>
          <ul>
            <li>Sizing Guide</li>
            <li>Shipping & Shipping</li>
            <li>Returns & Exchanges</li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Social</h4>
          <ul>
            <li>Instagram</li>
            <li>Pinterest</li>
            <li>Discord</li>
          </ul>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>&copy; {new Date().getFullYear()} Threadly Studio Inc. All rights reserved.</p>
      </div>
    </footer>
  );
}