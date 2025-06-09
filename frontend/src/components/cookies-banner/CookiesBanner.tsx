import React, { useState, useEffect } from 'react';
import './CookiesBanner.css';
import {useTranslation} from "react-i18next";

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
}

const CookiesBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true, // Always true, can't be disabled
    analytics: true,
    marketing: true,
    functional: true
  });
  const {t} = useTranslation();

  useEffect(() => {
    // Check if user has already made a choice
    const cookieConsent = localStorage.getItem('santiclinic-cookies-consent');
    if (!cookieConsent) {
      // Show banner after a short delay for better UX
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    const consent = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true,
      timestamp: new Date().toISOString(),
      version: '1.0'
    };
    
    localStorage.setItem('santiclinic-cookies-consent', JSON.stringify(consent));
    setIsVisible(false);
    
    // Here you would initialize your analytics, marketing tools, etc.
    initializeAllCookies();
  };

  const handleAcceptSelected = () => {
    const consent = {
      ...preferences,
      timestamp: new Date().toISOString(),
      version: '1.0'
    };
    
    localStorage.setItem('santiclinic-cookies-consent', JSON.stringify(consent));
    setIsVisible(false);
    
    // Initialize only selected cookie types
    initializeSelectedCookies(preferences);
  };

  const handleRejectNonEssential = () => {
    const consent = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false,
      timestamp: new Date().toISOString(),
      version: '1.0'
    };
    
    localStorage.setItem('santiclinic-cookies-consent', JSON.stringify(consent));
    setIsVisible(false);
    
    // Initialize only necessary cookies
    initializeNecessaryCookies();
  };

  const handlePreferenceChange = (type: keyof CookiePreferences) => {
    if (type !== 'necessary') { // Necessary cookies can't be disabled
      setPreferences(prev => ({
        ...prev,
        [type]: !prev[type]
      }));
    }
  };

  const initializeAllCookies = () => {
    console.log('Initializing all cookies: Analytics, Marketing, Functional');
    // Here you would add:
    // - Google Analytics initialization
    // - Facebook Pixel initialization
    // - Marketing automation tools
    // - Functional cookies for enhanced features
  };

  const initializeSelectedCookies = (prefs: CookiePreferences) => {
    console.log('Initializing selected cookies:', prefs);
    // Initialize based on user preferences
    if (prefs.analytics) {
      // Initialize analytics
    }
    if (prefs.marketing) {
      // Initialize marketing tools
    }
    if (prefs.functional) {
      // Initialize functional features
    }
  };

  const initializeNecessaryCookies = () => {
    console.log('Initializing only necessary cookies');
    // Only essential cookies for basic functionality
  };

  if (!isVisible) return null;

  return (
    <div className="cookies-banner">
      <div className="cookies-banner__container">
        <div className="cookies-banner__content">
          <div className="cookies-banner__header">
            <div className="cookies-banner__icon">🍪</div>
            <h3 className="cookies-banner__title">
              {t("cookers_baner.title")}
            </h3>
          </div>

          <div className="cookies-banner__text">
            <p>
            {t("cookers_baner.p")}
            </p>
          </div>

          {showDetails && (
            <div className="cookies-banner__details">
              <div className="cookies-banner__categories">
                <div className="cookies-banner__category">
                  <div className="cookies-banner__category-header">
                    <label className="cookies-banner__checkbox-label">
                      <input
                        type="checkbox"
                        checked={preferences.necessary}
                        disabled={true}
                        className="cookies-banner__checkbox"
                      />
                      <span className="cookies-banner__checkmark"></span>
                      <strong>Cookies Necessários</strong>
                      <span className="cookies-banner__required">(Obrigatório)</span>
                    </label>
                  </div>
                  <p className="cookies-banner__category-description">
                    Essenciais para o funcionamento básico do site, incluindo navegação e acesso a áreas seguras.
                  </p>
                </div>

                <div className="cookies-banner__category">
                  <div className="cookies-banner__category-header">
                    <label className="cookies-banner__checkbox-label">
                      <input
                        type="checkbox"
                        checked={preferences.analytics}
                        onChange={() => handlePreferenceChange('analytics')}
                        className="cookies-banner__checkbox"
                      />
                      <span className="cookies-banner__checkmark"></span>
                      <strong>Cookies de Análise</strong>
                    </label>
                  </div>
                  <p className="cookies-banner__category-description">
                    Ajudam-nos a compreender como utiliza o nosso site, permitindo melhorar a experiência do utilizador.
                  </p>
                </div>

                <div className="cookies-banner__category">
                  <div className="cookies-banner__category-header">
                    <label className="cookies-banner__checkbox-label">
                      <input
                        type="checkbox"
                        checked={preferences.marketing}
                        onChange={() => handlePreferenceChange('marketing')}
                        className="cookies-banner__checkbox"
                      />
                      <span className="cookies-banner__checkmark"></span>
                      <strong>Cookies de Marketing</strong>
                    </label>
                  </div>
                  <p className="cookies-banner__category-description">
                    Utilizados para mostrar publicidade relevante e medir a eficácia das nossas campanhas.
                  </p>
                </div>

                <div className="cookies-banner__category">
                  <div className="cookies-banner__category-header">
                    <label className="cookies-banner__checkbox-label">
                      <input
                        type="checkbox"
                        checked={preferences.functional}
                        onChange={() => handlePreferenceChange('functional')}
                        className="cookies-banner__checkbox"
                      />
                      <span className="cookies-banner__checkmark"></span>
                      <strong>Cookies Funcionais</strong>
                    </label>
                  </div>
                  <p className="cookies-banner__category-description">
                    Permitem funcionalidades avançadas como chat ao vivo, formulários e preferências personalizadas.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="cookies-banner__actions">
            <div className="cookies-banner__primary-actions">
              <button
                className="cookies-banner__btn cookies-banner__btn--accept"
                onClick={handleAcceptAll}
              >
                {t("cookers_baner.lt.0")}
              </button>
              
              {showDetails && (
                <button
                  className="cookies-banner__btn cookies-banner__btn--accept-selected"
                  onClick={handleAcceptSelected}
                >
                   {t("cookers_baner.lt.1")}
                </button>
              )}
            </div>

            <div className="cookies-banner__secondary-actions">
              <button
                className="cookies-banner__btn cookies-banner__btn--settings"
                onClick={() => setShowDetails(!showDetails)}
              >
                {showDetails ? 'Ocultar Detalhes' : 'Personalizar'}
              </button>
              
              <button
                className="cookies-banner__btn cookies-banner__btn--reject"
                onClick={handleRejectNonEssential}
              >
                {t("cookers_baner.lt.2")}
              </button>
            </div>
          </div>

          <div className="cookies-banner__footer">
            <p>
               {t("cookers_baner.bottom.0")}{' '}
              <a href="/politica-privacidade" className="cookies-banner__link">
                {t("cookers_baner.bottom.1")}
              </a>
              {' '}{t("cookers_baner.bottom.2")}{' '}
              <a href="/politica-cookies" className="cookies-banner__link">
                {t("cookers_baner.bottom.3")}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookiesBanner;