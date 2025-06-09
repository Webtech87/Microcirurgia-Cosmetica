import React from 'react';
import './WhyChoose.css';
import {useTranslation} from "react-i18next";

const WhyChoose: React.FC = () => {
  const {t} = useTranslation();
  const features = [
    {
      icon: '🔧',
      title: t("s2.lt.0.title"),
      description:  t("s2.lt.0.p")
    },
    {
      icon: '👥',
      title: t("s2.lt.1.title"),
      description: t("s2.lt.1.p")
    },
    {
      icon: '⚡',
      title: t("s2.lt.2.title"),
      description: t("s2.lt.2.p")
    },
    {
      icon: '✨',
      title: t("s2.lt.3.title"),
      description: t("s2.lt.3.p")
    }
  ];

  return (
    <section id="why-choose" className="why-choose">
      <div className="why-choose__container">
        {/* Left Image Section */}
        <div className="why-choose__image-section">
          <div className="why-choose__image-container">
            <div className="why-choose__image-wrapper">
              <img 
                src="/images/Storiea.jpg" 
                alt="Mulher satisfeita com tratamento Santiclinic" 
                className="why-choose__image"
              />
            </div>
            {/* Yellow curved background */}
            <div className="why-choose__accent-bg"></div>
          </div>
        </div>

        {/* Right Content Section */}
        <div className="why-choose__content">
          <div className="why-choose__text">
            <h2 className="why-choose__title">
              {t("s2.title")}
            </h2>
            
            <p className="why-choose__subtitle">
              {t("s2.p")}
            </p>

            {/* Features List */}
            <div className="why-choose__features">
              {features.map((feature, index) => (
                <div key={index} className="why-choose__feature">
                  <div className="why-choose__feature-icon">
                    {feature.icon}
                  </div>
                  <div className="why-choose__feature-content">
                    <h3 className="why-choose__feature-title">
                      {feature.title}
                    </h3>
                    <p className="why-choose__feature-description">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;