import React from 'react';
import './Hero.css';
import {useTranslation} from "react-i18next";

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
  const {t} = useTranslation();
  return (
    <section className="hero">
      <div className="hero__container">
        {/* Left Content */}
        <div className="hero__content">
          <div className="hero__text">
            <h1 className="hero__title">
              {t("s1.title")}
            </h1>
            
            <h2 className="hero__subtitle">
              {t("s1.subtitle")}
            </h2>
            
            <p className="hero__description">
              {t("s1.p")}
            </p>
            
            <button 
              className="hero__cta-btn"
              onClick={handleCTAClick}
            >
              {t("s1.btn")}
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