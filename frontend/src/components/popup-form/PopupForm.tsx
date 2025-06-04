import React, { useState, useEffect } from 'react';
import './PopupForm.css';

interface FormData {
  nome: string;
  email: string;
  telefone: string;
}

interface FormErrors {
  nome?: string;
  email?: string;
  telefone?: string;
}

const PopupForm: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    email: '',
    telefone: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});

  // Show popup after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  // Close popup with Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isVisible) {
        closePopup();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isVisible]);

  // Prevent body scroll when popup is open
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isVisible]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Nome validation
    if (!formData.nome.trim()) {
      newErrors.nome = 'O nome é obrigatório';
    } else if (formData.nome.trim().length < 2) {
      newErrors.nome = 'O nome deve ter pelo menos 2 caracteres';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'O email é obrigatório';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Por favor, insira um email válido';
    }

    // Telefone validation
    const phoneRegex = /^[\d\s+()-]{9,}$/;
    if (!formData.telefone.trim()) {
      newErrors.telefone = 'O telefone é obrigatório';
    } else if (!phoneRegex.test(formData.telefone.replace(/\s/g, ''))) {
      newErrors.telefone = 'Por favor, insira um telefone válido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Popup form submitted:', formData);
      
      setIsSubmitted(true);
      
      // Auto-close after success
      setTimeout(() => {
        closePopup();
      }, 3000);
      
    } catch (error) {
      console.error('Error submitting popup form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const closePopup = () => {
    setIsVisible(false);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closePopup();
    }
  };

  if (!isVisible) return null;

  return (
    <div className="popup-form__overlay" onClick={handleOverlayClick}>
      <div className="popup-form__container">
        {/* Close Button */}
        <button 
          className="popup-form__close"
          onClick={closePopup}
          aria-label="Fechar formulário"
        >
          ×
        </button>

        {isSubmitted ? (
          /* Success State */
          <div className="popup-form__success">
            <div className="popup-form__success-icon">✓</div>
            <h2 className="popup-form__success-title">Obrigado!</h2>
            <p className="popup-form__success-text">
              Recebemos os seus dados. A nossa equipa entrará em contacto consigo brevemente para agendar a sua consulta gratuita.
            </p>
          </div>
        ) : (
          /* Form State */
          <div className="popup-form__content">
            <div className="popup-form__header">
              <div className="popup-form__icon">💎</div>
              <h2 className="popup-form__title">
                Agende a Sua Consulta!
              </h2>
              <p className="popup-form__subtitle">
                Reserve já a sua avaliação personalizada com os nossos especialistas. 
                <strong> Descubra o melhor tratamento para si.</strong>
              </p>
            </div>

            <form className="popup-form__form" onSubmit={handleSubmit} noValidate>
              <div className="popup-form__form-group">
                <input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleInputChange}
                  className={`popup-form__input ${errors.nome ? 'popup-form__input--error' : ''}`}
                  placeholder="O seu nome completo *"
                  required
                />
                {errors.nome && (
                  <span className="popup-form__error">{errors.nome}</span>
                )}
              </div>

              <div className="popup-form__form-group">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`popup-form__input ${errors.email ? 'popup-form__input--error' : ''}`}
                  placeholder="O seu melhor email *"
                  required
                />
                {errors.email && (
                  <span className="popup-form__error">{errors.email}</span>
                )}
              </div>

              <div className="popup-form__form-group">
                <input
                  type="tel"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleInputChange}
                  className={`popup-form__input ${errors.telefone ? 'popup-form__input--error' : ''}`}
                  placeholder="O seu número de telefone *"
                  required
                />
                {errors.telefone && (
                  <span className="popup-form__error">{errors.telefone}</span>
                )}
              </div>

              <button 
                type="submit" 
                className="popup-form__submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="popup-form__spinner"></span>
                    AGENDANDO...
                  </>
                ) : (
                  'AGENDAR CONSULTA'
                )}
              </button>

              <div className="popup-form__benefits">
                <div className="popup-form__benefit">
                  <span className="popup-form__benefit-icon">✓</span>
                  <span>Avaliação personalizada</span>
                </div>
                <div className="popup-form__benefit">
                  <span className="popup-form__benefit-icon">✓</span>
                  <span>Especialistas qualificados</span>
                </div>
                <div className="popup-form__benefit">
                  <span className="popup-form__benefit-icon">✓</span>
                  <span>Resultados garantidos</span>
                </div>
              </div>

              <p className="popup-form__privacy">
                🔒 Os seus dados estão seguros connosco. 
                <a href="#" className="popup-form__privacy-link">Política de Privacidade</a>
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default PopupForm;