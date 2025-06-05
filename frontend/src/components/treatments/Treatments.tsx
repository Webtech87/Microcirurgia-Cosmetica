import React, { useState } from 'react';
import './Treatments.css';

interface Treatment {
  id: number;
  title: string;
  description: string;
  subtypes?: { name: string; description: string }[];
}

const Treatments: React.FC = () => {
  const [activeItem, setActiveItem] = useState<number | null>(null);

  const treatments: Treatment[] = [
    {
      id: 1,
      title: 'Micro Transplante Sobrancelha',
      description: 'A microcirurgia de transplante de sobrancelha é um procedimento estético que visa restaurar, preencher ou definir as sobrancelhas, utilizando folículos capilares retirados de outra parte do corpo, geralmente da parte de trás da cabeça. O resultado final é geralmente natural, com fios mais preenchidos e bem alinhados ao formato desejado.',
      subtypes: [
        {
          name: 'Transplante Completo',
          description: 'Para quem sofreu uma perda total dos folículos capilares, esta cirurgia visa implantar a sobrancelha completa.'
        },
        {
          name: 'Transplante Filling',
          description: 'Para quem perdeu parcialmente os folículos capilares, esta cirurgia irá preencher as falhas existentes.'
        }
      ]
    },
    {
      id: 2,
      title: 'Micro Lifting',
      description: 'Procedimentos cirúrgicos estéticos destinados a rejuvenescer diferentes áreas do rosto, reduzindo rugas e flacidez com técnicas minimamente invasivas.',
      subtypes: [
        {
          name: 'Micro Lifting Facial',
          description: 'Procedimento cirúrgico estético destinado a rejuvenescer a aparência do rosto, reduzindo rugas e flacidez, especialmente na área das bochechas, maxilares e pescoço.'
        },
        {
          name: 'Micro Lifting Sobrancelhas',
          description: 'Procedimento estético menos invasivo que se foca na área das sobrancelhas e testa, proporcionando um efeito de elevação sutil e natural. Corrige ligeiramente a flacidez na região das sobrancelhas e suaviza as linhas da testa.'
        },
        {
          name: 'Micro Lifting Lábio Superior',
          description: 'Visa encurtar a distância entre o lábio e o nariz, tornando o lábio superior mais proeminente e rejuvenescendo a área. O lábio superior ganha uma aparência mais cheia e definida, sem a necessidade de preenchimentos.'
        }
      ]
    },
    {
      id: 3,
      title: 'Micro Cervicoplastia',
      description: 'Procedimento estético destinado a eliminar o excesso de gordura acumulada na área da papada, criando um contorno mais definido do queixo e pescoço. Este procedimento é recomendado para pessoas que têm uma papada devido a acúmulo de gordura, e não devido a flacidez excessiva da pele ou a alterações musculares significativas. A recuperação é relativamente rápida, e a maioria dos pacientes consegue retomar as suas atividades diárias em poucos dias.'
    },
    {
      id: 4,
      title: 'Micro Blefaroplastia',
      description: 'Procedimentos estéticos minimamente invasivos focados na área dos olhos, visando corrigir sinais de envelhecimento como excesso de pele e gordura nas pálpebras.',
      subtypes: [
        {
          name: 'Micro Blefaroplastia Superior',
          description: 'Este procedimento visa corrigir sinais de envelhecimento ao redor dos olhos, como excesso de pele nas pálpebras superiores e excesso de gordura.'
        },
        {
          name: 'Micro Blefaroplastia Inferior',
          description: 'Procedimento que visa melhorar o aspeto das bolsas de gordura nas pálpebras inferiores e excesso de pele.'
        },
        {
          name: 'Micro Blefaroplastia Superior e Inferior',
          description: 'Procedimento estético minimamente invasivo focado na remoção de excesso de pele, gordura ou ambos das pálpebras superiores e inferiores, com o objetivo de rejuvenescer a área dos olhos.'
        }
      ]
    },
    {
      id: 5,
      title: 'Micro Otoplastia',
      description: 'Visa corrigir as orelhas proeminentes, aproximando-as da cabeça, e melhorar a forma ou contorno das orelhas, com o objetivo de melhorar a aparência e o posicionamento das orelhas, tornando-as mais harmoniosas em relação ao rosto. Os resultados são permanentes, pois as orelhas mantêm-se na nova posição e formato devido às dobras e suturas realizadas na cartilagem.'
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
              Descubra soluções personalizadas de microcirurgia 
              que se adaptam às suas necessidades estéticas e ao 
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
                      
                      {/* Subtypes */}
                      {treatment.subtypes && (
                        <div className="treatments__subtypes">
                          {treatment.subtypes.map((subtype, index) => (
                            <div key={index} className="treatments__subtype">
                              <h4 className="treatments__subtype-title">
                                {subtype.name}
                              </h4>
                              <p className="treatments__subtype-description">
                                {subtype.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
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
                alt="Tratamentos Microcirurgia Santiclinic - Antes e Depois" 
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