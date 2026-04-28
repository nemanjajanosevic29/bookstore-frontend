import React from 'react';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
          <span>Bookstore App</span>
          <span className="footer-sep">·</span>
          <span>Advanced Web Development</span>
          <span className="footer-sep">·</span>
          <span>{new Date().getFullYear()}</span>
        </div>
    </footer>
  );
}

export default Footer;