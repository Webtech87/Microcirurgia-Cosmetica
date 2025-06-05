import React from 'react';
import './WhyChoose.css';

const WhyChoose: React.FC = () => {
  const features = [
    {
      icon: '🔧',
      title: 'Técnicas exclusivas e refinadas',
      description: 'Use only of dental care is responsible and compromised above a premium budget.'
    },
    {
      icon: '👥',
      title: 'Equipa especializada',
      description: 'Use only of dental care is responsible and compromised above a premium budget.'
    },
    {
      icon: '⚡',
      title: 'Recuperação rápida e discreta',
      description: 'Use only of dental care is responsible and compromised above a premium budget.'
    },
    {
      icon: '✨',
      title: 'Resultados visíveis e duradouros',
      description: 'Use only of dental care is responsible and compromised above a premium budget.'
    }
  ];

  return (
    <section className="why-choose">
      <div className="why-choose__container">
        {/* Left Image Section */}
        <div className="why-choose__image-section">
          <div className="why-choose__image-container">
            <div className="why-choose__image-wrapper">
              <img 
                src="/images/Storiea - 3.PNG" 
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
              Porquê escolher a
              <br />
              Santiclinic?
            </h2>
            
            <p className="why-choose__subtitle">
              Técnicas modernas, resultados naturais e um 
              acompanhamento totalmente personalizado.
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