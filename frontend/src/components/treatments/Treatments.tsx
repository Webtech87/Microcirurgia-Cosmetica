import React, { useState } from 'react';
import './Treatments.css';

interface Treatment {
  id: number;
  title: string;
  description: string;
}

const Treatments: React.FC = () => {
  const [activeItem, setActiveItem] = useState<number | null>(null);

  const treatments: Treatment[] = [
    {
      id: 1,
      title: 'Micro lifting de sobrancelha',
      description: 'Procedimento de elevação das caudas de sobrancelha com microcirurgia regenerativa com células estaminais. Técnica inovadora que oferece elasticidade e densifica permanente. Processo que permite um aspeto mais jovem sem anestesia geral e tempo de recuperação muito reduzido.'
    },
    {
      id: 2,
      title: 'Micro bichectomia superior',
      description: 'Procedimento minimamente invasivo que remove o excesso de gordura das bochechas superiores, criando um contorno facial mais definido e elegante. Realizado com técnicas avançadas que garantem resultados naturais e tempo de recuperação reduzido.'
    },
    {
      id: 3,
      title: 'Micro bichectomia inferior',
      description: 'Técnica refinada para remoção da gordura das bochechas inferiores, proporcionando um aspeto mais esculpido e harmonioso ao rosto. Procedimento realizado com precisão cirúrgica e cuidados pós-operatórios personalizados.'
    },
    {
      id: 4,
      title: 'Micro lifting deep face',
      description: 'Lifting profundo que atua nas camadas mais profundas da face, restaurando a firmeza e elasticidade da pele. Técnica inovadora que proporciona resultados duradouros com aspeto completamente natural.'
    },
    {
      id: 5,
      title: 'Mini mass lifting',
      description: 'Procedimento de rejuvenescimento que combina várias técnicas para um lifting global do rosto. Ideal para quem procura resultados significativos com menor invasividade e recuperação mais rápida.'
    },
    {
      id: 6,
      title: 'Micro implante de sobrancelha - técnica exclusiva Santi Clinic',
      description: 'Técnica exclusiva desenvolvida pela Santi Clinic para implante de pelos nas sobrancelhas, criando um resultado completamente natural. Procedimento personalizado que respeita o crescimento natural dos pelos.'
    },
    {
      id: 7,
      title: 'Micro rinoplastia',
      description: 'Rinoplastia minimamente invasiva que corrige pequenas imperfeições do nariz sem necessidade de cirurgia tradicional. Técnica refinada que permite ajustes precisos com recuperação muito mais rápida.'
    }
  ];

  const toggleItem = (id: number) => {
    setActiveItem(activeItem === id ? null : id);
  };

  return (
    <section id="treatments" className="treatments">
      <div className="treatments__container">
        {/* Left Content Section */}
        <div className="treatments__content">
          <div className="treatments__text">
            <h2 className="treatments__title">
              Escolha o
              <br />
              tratamento ideal
              <br />
              para si
            </h2>
            
            <p className="treatments__subtitle">
              Descubra soluções personalizadas que se 
              adaptam às suas necessidades estéticas e ao 
              seu ritmo de vida.
            </p>

            {/* Accordion List */}
            <div className="treatments__accordion">
              {treatments.map((treatment) => (
                <div 
                  key={treatment.id} 
                  className={`treatments__item ${activeItem === treatment.id ? 'treatments__item--active' : ''}`}
                >
                  <button 
                    className="treatments__item-header"
                    onClick={() => toggleItem(treatment.id)}
                    aria-expanded={activeItem === treatment.id}
                    aria-controls={`treatment-${treatment.id}`}
                  >
                    <span className="treatments__item-number">
                      {treatment.id.toString().padStart(2, '0')}
                    </span>
                    <span className="treatments__item-title">
                      {treatment.title}
                    </span>
                    <span className={`treatments__item-arrow ${activeItem === treatment.id ? 'treatments__item-arrow--active' : ''}`}>
                      ▼
                    </span>
                  </button>
                  
                  <div 
                    id={`treatment-${treatment.id}`}
                    className={`treatments__item-content ${activeItem === treatment.id ? 'treatments__item-content--active' : ''}`}
                  >
                    <div className="treatments__item-description">
                      {treatment.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Image Section */}
        <div className="treatments__image-section">
          <div className="treatments__image-container">
            <div className="treatments__image-wrapper">
              <img 
                src="/images/claudia.PNG" 
                alt="Tratamentos Santiclinic - Antes e Depois" 
                className="treatments__image"
              />
            </div>
            {/* Yellow curved background */}
            <div className="treatments__accent-bg"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Treatments;