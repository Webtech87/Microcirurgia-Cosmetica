import React from 'react';
import './Hero.css';

const Hero: React.FC = () => {
  const handleCTAClick = () => {
    // Scroll to Contact section
    const contactElement = document.getElementById('contact');
    if (contactElement) {
      const offsetTop = contactElement.offsetTop - 100; // Account for navbar height
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
    console.log('CTA clicked - QUERO SABER MAIS - Scrolling to Contact');
  };

  return (
    <section className="hero">
      <div className="hero__container">
        {/* Left Content */}
        <div className="hero__content">
          <div className="hero__text">
            <h1 className="hero__title">
              Microcirurgia
              <br />
              Coméstica.
            </h1>
            
            <h2 className="hero__subtitle">
              Resultado Natural
            </h2>
            
            <p className="hero__description">
              Técnicas minimamente invasivas, 
              exclusivas da Santiclinic, desenvolvidas 
              com segurança, precisão e discrição.
            </p>
            
            <button 
              className="hero__cta-btn"
              onClick={handleCTAClick}
            >
              QUERO SABER MAIS
            </button>
          </div>
        </div>

        {/* Right Image Section */}
        <div className="hero__image-section">
          <div className="hero__image-container">
            {/* Before/After Image */}
            <div className="hero__image-wrapper">
              <img 
                src="/images/homem.jpg" 
                alt="Microcirurgia Coméstica - Resultado Natural" 
                className="hero__image"
              />
            </div>
            
            {/* Yellow Accent Background */}
            <div className="hero__accent-bg"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;