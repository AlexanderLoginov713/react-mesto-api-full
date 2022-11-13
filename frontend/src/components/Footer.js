import React from 'react';

function Footer() {
  return (
    <section className="footer">
      <p className="footer__copyright">&copy; {new Date().getFullYear()} Mesto Russia</p>
    </section>
  );
}
export default Footer;

