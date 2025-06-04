import React, { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__container">
        {/* Logo */}
        <div className="navbar__logo">
          <a href="/" className="navbar__logo-link">
            Santiclinic
          </a>
        </div>

        {/* Desktop Navigation Links */}
        <div className="navbar__menu">
          <ul className="navbar__nav">
            <li className="navbar__item">
              <a href="#santoline" className="navbar__link">
                SANTICLINIC
              </a>
            </li>
            <li className="navbar__item">
              <a href="#tratamentos" className="navbar__link">
                TRATAMENTOS
              </a>
            </li>
            <li className="navbar__item">
              <a href="#contacto" className="navbar__link">
                CONTACTO
              </a>
            </li>
          </ul>
        </div>

        {/* Right Section - CTA Button & Language Selector */}
        <div className="navbar__actions">
          <button className="navbar__cta-btn">
            MARCAR CONSULTA
          </button>
          
          <div className="navbar__language">
            <button className="navbar__lang-btn">
              <span className="flag-icon flag-icon--pt"></span>
              PT
            </button>
            <button className="navbar__lang-btn">
              <span className="flag-icon flag-icon--en"></span>
              EN
            </button>
          </div>
        </div>

        {/* Mobile Hamburger Button */}
        <button 
          className={`navbar__hamburger ${isMenuOpen ? 'navbar__hamburger--active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Mobile Menu Overlay */}
        <div 
          className={`navbar__overlay ${isMenuOpen ? 'navbar__overlay--active' : ''}`}
          onClick={closeMenu}
        ></div>

        {/* Mobile Menu */}
        <div className={`navbar__mobile-menu ${isMenuOpen ? 'navbar__mobile-menu--active' : ''}`}>
          <div className="navbar__mobile-header">
            <div className="navbar__mobile-logo">Santiclinic</div>
            <button 
              className="navbar__close-btn"
              onClick={closeMenu}
              aria-label="Close navigation menu"
            >
              ×
            </button>
          </div>
          
          <ul className="navbar__mobile-nav">
            <li className="navbar__mobile-item">
              <a href="#santoline" className="navbar__mobile-link" onClick={closeMenu}>
                SANTICLINIC
              </a>
            </li>
            <li className="navbar__mobile-item">
              <a href="#tratamentos" className="navbar__mobile-link" onClick={closeMenu}>
                TRATAMENTOS
              </a>
            </li>
            <li className="navbar__mobile-item">
              <a href="#contacto" className="navbar__mobile-link" onClick={closeMenu}>
                CONTACTO
              </a>
            </li>
          </ul>

          <div className="navbar__mobile-actions">
            <button className="navbar__mobile-cta-btn" onClick={closeMenu}>
              MARCAR CONSULTA
            </button>
            
            <div className="navbar__mobile-language">
              <button className="navbar__mobile-lang-btn">
                <span className="flag-icon flag-icon--pt"></span>
                PT
              </button>
              <button className="navbar__mobile-lang-btn">
                <span className="flag-icon flag-icon--en"></span>
                EN
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;