import React, { useState, useEffect, useRef } from 'react';
import './Testimonials.css';
import {useTranslation} from "react-i18next";

interface Testimonial {
  id: number;
  name: string;
  text: string;
  rating: number;
  date: string;
}

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Maria João Silva',
      text: 'A Dra. Wilsa é uma verdadeira artista! Fiz o micro lifting de sobrancelha e o resultado é incrível - completamente natural. A técnica da Santiclinic é revolucionária, sem dor e com recuperação rápida. Recomendo vivamente!',
      rating: 5,
      date: 'há 2 semanas'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      text: 'Dr. Wilsa is absolutely amazing! I had a micro blepharoplasty and the results are incredible. The technique is so precise and natural-looking. The whole team at Santiclinic made me feel comfortable throughout the entire process.',
      rating: 5,
      date: 'há 1 mês'
    },
    {
      id: 3,
      name: 'Ana Carvalho',
      text: 'Fiz a micro blefaroplastia inferior com a Dra. Wilsa e estou absolutamente encantada! O profissionalismo é excepcional e a técnica minimamente invasiva da Santiclinic é fantástica. Sem hematomas, sem dor - resultado perfeito!',
      rating: 5,
      date: 'há 3 semanas'
    },
    {
      id: 4,
      name: 'Patricia Rodrigues',
      text: 'A Dra. Wilsa transformou completamente o meu olhar com o micro lifting deep plane. A experiência na Santiclinic superou todas as expectativas - técnica exclusiva, resultados naturais e duradouros. Sinto-me rejuvenescida!',
      rating: 5,
      date: 'há 2 meses'
    },
    {
      id: 5,
      name: 'Emma Roberts',
      text: 'Outstanding experience with Dr. Wilsa! I had a micro facelift and the results are phenomenal. The technique is so advanced and the healing process was incredibly smooth. Santiclinic truly offers the best in cosmetic microsurgery.',
      rating: 5,
      date: 'há 1 semana'
    },
    {
      id: 6,
      name: 'Cristina Mendes',
      text: 'O mini micro lifting com a Dra. Wilsa foi a melhor decisão que tomei! A técnica é tão precisa que ninguém percebe que fiz algo - parece que rejuvenesci naturalmente. A Santiclinic é referência em microcirurgia!',
      rating: 5,
      date: 'há 4 semanas'
    },
    {
      id: 7,
      name: 'Beatriz Costa',
      text: 'Realizei o micro implante de sobrancelha com a técnica exclusiva da Dra. Wilsa. O resultado é impressionante - sobrancelhas perfeitas e naturais! A experiência na Santiclinic foi impecável do início ao fim.',
      rating: 5,
      date: 'há 5 semanas'
    },
    {
      id: 8,
      name: 'James Miller',
      text: 'Dr. Wilsa is a true professional! I had a micro otoplasty and the precision of the technique is remarkable. The results look completely natural and the recovery was much faster than expected. Highly recommend Santiclinic!',
      rating: 5,
      date: 'há 3 meses'
    },
    {
      id: 9,
      name: 'Sofia Ferreira',
      text: 'A micro lobuloplastia com a Dra. Wilsa foi perfeita! A atenção aos detalhes e o cuidado personalizado da Santiclinic são únicos. Recuperação rápida, sem dor e resultados naturais - simplesmente fantástico!',
      rating: 5,
      date: 'há 6 semanas'
    },
    {
      id: 10,
      name: 'Carla Oliveira',
      text: 'A consulta de microcirurgia cosmética com a Dra. Wilsa esclareceu todas as minhas dúvidas. A sua expertise e as técnicas inovadoras da Santiclinic deram-me total confiança. Já marquei o meu tratamento!',
      rating: 5,
      date: 'há 1 semana'
    }
  ];
  const {t} = useTranslation();
  const itemsPerView = 3;
  const totalSlides = Math.max(0, testimonials.length - itemsPerView + 1);

  // Auto-slide functionality
  useEffect(() => {
    if (!isHovered) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex >= totalSlides - 1 ? 0 : prevIndex + 1
        );
      }, 4000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isHovered, totalSlides]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span 
        key={index} 
        className={`testimonials__star ${index < rating ? 'testimonials__star--filled' : ''}`}
      >
        ★
      </span>
    ));
  };

  return (
    <section className="testimonials">
      <div className="testimonials__container">
        <div className="testimonials__header">
          <h2 className="testimonials__title">
            {t("s5.title")}
          </h2>
          <p className="testimonials__subtitle">
            {t("s5.p")}
          </p>
        </div>

        <div 
          className="testimonials__carousel"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div 
            className="testimonials__track"
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`
            }}
          >
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="testimonials__card">
                <div className="testimonials__card-header">
                  <div className="testimonials__google-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                  </div>
                  <div className="testimonials__rating">
                    {renderStars(testimonial.rating)}
                  </div>
                </div>

                <div className="testimonials__card-body">
                  <p className="testimonials__text">
                    {testimonial.text}
                  </p>
                </div>

                <div className="testimonials__card-footer">
                  <div className="testimonials__author">
                    <span className="testimonials__name">{testimonial.name}</span>
                    <span className="testimonials__date">{testimonial.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots indicator */}
        <div className="testimonials__dots">
          {Array.from({ length: totalSlides }, (_, index) => (
            <button
              key={index}
              className={`testimonials__dot ${currentIndex === index ? 'testimonials__dot--active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;