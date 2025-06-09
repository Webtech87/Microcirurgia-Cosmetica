import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

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

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    // If not on home page, navigate to home first
    if (location.pathname !== '/') {
      navigate('/');
      return;
    }
    
    // If on home page, scroll to top
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    // Reset any scroll position memory
    if (window.history.scrollRestoration) {
      window.history.scrollRestoration = 'manual';
    }
  };

  // Function to handle smooth scrolling to sections
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 100; // Account for navbar height
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  // Function to handle navigation - go to home page first if needed, then scroll
  const handleSectionNavigation = (sectionId: string) => {
    closeMenu(); // Close mobile menu if open
    
    if (location.pathname !== '/') {
      // If not on home page, navigate to home page first
      navigate('/');
      // Wait for navigation to complete, then scroll
      setTimeout(() => {
        scrollToSection(sectionId);
      }, 100);
    } else {
      // If already on home page, just scroll
      scrollToSection(sectionId);
    }
  };

  // Navigation link handlers
  const handleTecnicasClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    handleSectionNavigation('why-choose'); // WhyChoose component section
  };

  const handleTratamentosClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    handleSectionNavigation('treatments'); // Treatments component section
  };

  const handleContactoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    handleSectionNavigation('contact'); // Contact component section
  };

  // Function to handle WhatsApp redirect
  const handleWhatsAppClick = () => {
    const phoneNumber = '351915007427'; // Portuguese country code + phone number
    const message = encodeURIComponent('Olá! Gostaria de marcar uma consulta na Santiclinic.');
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    
    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  // WhatsApp icon component
  const WhatsAppIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.89 3.488"/>
    </svg>
  );

  return (
    <nav className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__container">
        {/* Logo */}
        <div className="navbar__logo">
          <a 
            href="/" 
            className="navbar__logo-link"
            onClick={handleLogoClick}
          >
            <img 
              src="/images/logo-santiclinic.png" 
              alt="Santiclinic Logo" 
              className="navbar__logo-image"
            />
          </a>
        </div>

        {/* Desktop Navigation Links */}
        <div className="navbar__menu">
          <ul className="navbar__nav">
            <li className="navbar__item">
              <a 
                href="#why-choose" 
                className="navbar__link"
                onClick={handleTecnicasClick}
              >
                TECNICAS
              </a>
            </li>
            <li className="navbar__item">
              <a 
                href="#treatments" 
                className="navbar__link"
                onClick={handleTratamentosClick}
              >
                TRATAMENTOS
              </a>
            </li>
            <li className="navbar__item">
              <a 
                href="#contact" 
                className="navbar__link"
                onClick={handleContactoClick}
              >
                CONTACTO
              </a>
            </li>
          </ul>
        </div>

        {/* Right Section - CTA Button & Language Selector */}
        <div className="navbar__actions">
          <button className="navbar__cta-btn" onClick={handleWhatsAppClick}>
            <WhatsAppIcon />
            MARCAR CONSULTA
          </button>
          
          <div className="navbar__language">
            <button className="navbar__lang-btn">
              <img src='/images/flag-pt.png' className="flag-icon" />
              PT
            </button>
            <button className="navbar__lang-btn">
              <img src='/images/flag-gb.png' className="flag-icon" />
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
            <div 
              className="navbar__mobile-logo"
              onClick={() => {
                closeMenu();
                handleLogoClick({ preventDefault: () => {} } as React.MouseEvent<HTMLAnchorElement>);
              }}
              style={{ cursor: 'pointer' }}
            >
              <img 
                src="/images/logo-santiclinic.png" 
                alt="Santiclinic Logo" 
                className="navbar__mobile-logo-image"
              />
            </div>
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
              <a 
                href="#why-choose" 
                className="navbar__mobile-link" 
                onClick={handleTecnicasClick}
              >
                TECNICAS
              </a>
            </li>
            <li className="navbar__mobile-item">
              <a 
                href="#treatments" 
                className="navbar__mobile-link" 
                onClick={handleTratamentosClick}
              >
                TRATAMENTOS
              </a>
            </li>
            <li className="navbar__mobile-item">
              <a 
                href="#contact" 
                className="navbar__mobile-link" 
                onClick={handleContactoClick}
              >
                CONTACTO
              </a>
            </li>
          </ul>

          <div className="navbar__mobile-actions">
            <button 
              className="navbar__mobile-cta-btn" 
              onClick={() => {
                handleWhatsAppClick();
                closeMenu();
              }}
            >
              <WhatsAppIcon />
              MARCAR CONSULTA
            </button>
            
            <div className="navbar__mobile-language">
              <button className="navbar__mobile-lang-btn">
                <img src='/images/flag-pt.png' className="flag-icon" />
                PT
              </button>
              <button className="navbar__mobile-lang-btn">
                <img src='/images/flag-gb.png' className="flag-icon" />
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