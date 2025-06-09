import React from 'react';
import './WhyChoose.css';

const WhyChoose: React.FC = () => {
  const features = [
    {
      icon: '🔧',
      title: 'Técnicas exclusivas e refinadas',
      description: 'Procedimentos minimamente invasivos com máxima precisão.'
    },
    {
      icon: '👥',
      title: 'Equipa especializada',
      description: 'Profissionais experientes, dedicados ao seu bem-estar.'
    },
    {
      icon: '⚡',
      title: 'Recuperação rápida e discreta',
      description: 'Volte à sua rotina com confiança e conforto'
    },
    {
      icon: '✨',
      title: 'Resultados visíveis e duradouros',
      description: 'Transformações reais, com efeitos que se mantêm no tempo.'
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