import React, { useState } from 'react';
import './Contact.css';

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  msg: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  msg?: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    msg: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const assuntoOptions = [
    { value: '', label: 'Selecione um assunto' },
    { value: 'm_lifting_sobrancelha', label: 'Micro lifting de sobrancelha' },
    { value: 'm_blef_superior', label: 'Micro blefaroplastia superior' },
    { value: 'm_blef_inferior', label: 'Micro blefaroplastia inferior' },
    { value: 'm_lift_deep_plane', label: 'Micro lifting deep plane' },
    { value: 'm_m_lift', label: 'Mini micro lifting' },
    { value: 'm_implante_sobrancelha', label: 'Micro implante de sobrancelha técnica exclusiva' },
    { value: 'm_otoplastia', label: 'Micro Otoplastia' },
    { value: 'm_lobuloplastia', label: 'Micro Lobuloplastia' },
    { value: 'c_m_cosmética', label: 'Consulta microcirurgia cosmética' }
  ];

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Nome validation
    if (!formData.name.trim()) {
      newErrors.name = 'O nome é obrigatório';
    } else if (formData.name.trim().length < 4) {
      newErrors.name = 'O nome deve ter pelo menos 4 caracteres';
    } else if (formData.name.trim().length > 20) {
      newErrors.name = 'O nome deve ter no máximo 20 caracteres';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'O email é obrigatório';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Por favor, insira um email válido';
    } else if (formData.email.length < 6 || formData.email.length > 35) {
      newErrors.email = 'O email deve ter entre 6 e 35 caracteres';
    }

    // Telefone validation (números apenas, 9-15 dígitos)
    const phoneRegex = /^\d{9,15}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = 'O telefone é obrigatório';
    } else if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Por favor, insira um telefone válido (apenas números, 9-15 dígitos)';
    }

    // Assunto validation
    if (!formData.subject || formData.subject === '') {
      newErrors.subject = 'O assunto é obrigatório';
    }

    // Mensagem validation
    if (!formData.msg.trim()) {
      newErrors.msg = 'A mensagem é obrigatória';
    } else if (formData.msg.trim().length < 1) {
      newErrors.msg = 'A mensagem deve ter pelo menos 1 caractere';
    } else if (formData.msg.trim().length > 1000) {
      newErrors.msg = 'A mensagem deve ter no máximo 1000 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
      // Create FormData object to match Flask's expected format
      const submitData = new FormData();
      submitData.append('name', formData.name);
      submitData.append('email', formData.email);
      submitData.append('phone', formData.phone);
      submitData.append('subject', formData.subject);
      submitData.append('msg', formData.msg);

      const response = await fetch('http://localhost:5000/', {
        method: 'POST',
        body: submitData,
        credentials: 'include', // Include cookies for CORS
      });

      const result = await response.json();

      if (result.success) {
        setIsSubmitted(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          msg: ''
        });
      } else {
        // Handle validation errors from backend
        if (result.errors) {
          setErrors(result.errors);
        } else {
          console.error('Submission failed:', result.message);
          alert('Erro ao enviar formulário: ' + (result.message || 'Erro desconhecido'));
        }
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Erro de conexão. Tente novamente mais tarde.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section className="contact">
        <div className="contact__container">
          <div className="contact__success">
            <div className="contact__success-icon">✓</div>
            <h2 className="contact__success-title">Mensagem Enviada!</h2>
            <p className="contact__success-text">
              Obrigado pelo seu contacto. A nossa equipa entrará em contacto consigo brevemente.
            </p>
            <button 
              className="contact__success-btn"
              onClick={() => setIsSubmitted(false)}
            >
              Enviar Nova Mensagem
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="contact">
      <div className="contact__container">
        {/* Left Side - Company Info */}
        <div className="contact__info">
          <div className="contact__logo">
            <div className="contact__logo-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path d="M6 3L2 12L6 21L18 21L22 12L18 3L6 3Z" stroke="#F4D03F" strokeWidth="2" fill="none"/>
                <path d="M12 8L16 12L12 16L8 12L12 8Z" fill="#F4D03F"/>
              </svg>
            </div>
            <span className="contact__logo-text">SANTICLINIC</span>
          </div>

          <div className="contact__description">
            <p>
              Tratamentos de beleza personalizados para 
              realçar a sua impressão cuidada pessoal.
            </p>
          </div>

          <div className="contact__details">
            <div className="contact__detail-group">
              <h3 className="contact__detail-title">Contacto</h3>
              <div className="contact__detail-items">
                <div className="contact__detail-item">
                  <span className="contact__detail-icon">📞</span>
                  <div className="contact__detail-content">
                    <a href="tel:+351915007427" className="contact__detail-link">+351 915 007 427</a>
                  </div>
                </div>
                <div className="contact__detail-item">
                  <span className="contact__detail-icon">✉️</span>
                  <div className="contact__detail-content">
                    <a href="mailto:info@santiclinic.pt" className="contact__detail-link">info@santiclinic.pt</a>
                  </div>
                </div>
                <div className="contact__detail-item">
                  <span className="contact__detail-icon">📍</span>
                  <div className="contact__detail-content">
                    <a 
                      href="https://maps.google.com/?q=Rua+da+Beleza,+123,+1000-001+Lisboa" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="contact__detail-link"
                    >
                      <span>Rua da Beleza, 123</span>
                      <span>1000-001 Lisboa</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact__detail-group">
              <h3 className="contact__detail-title">Políticas</h3>
              <div className="contact__detail-items">
                <a href="/politica-privacidade" className="contact__detail-link">Política de Privacidade</a>
                <a href="/politica-cookies" className="contact__detail-link">Política de Cookies</a>
                <a href="/termos-condicoes" className="contact__detail-link">Termos e Condições</a>
              </div>
            </div>
          </div>

          <div className="contact__social">
            <button 
              className="contact__social-btn"
              onClick={() => window.open('https://www.instagram.com/santi_clinic/?hl=en', '_blank')}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              Seguir no Instagram
            </button>
          </div>
        </div>

        {/* Right Side - Contact Form */}
        <div className="contact__form-section">
          <div className="contact__form-container">
            <div className="contact__form-header">
              <h2 className="contact__form-title">
                Agende a sua avaliação agora
              </h2>
              <p className="contact__form-subtitle">
                Por favor, preencha o formulário abaixo para 
                entrar em contacto com a nossa equipa.
              </p>
            </div>

            <form className="contact__form" onSubmit={handleSubmit} noValidate>
              <div className="contact__form-row">
                <div className="contact__form-group">
                  <label htmlFor="name" className="contact__form-label">
                    Seu nome *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`contact__form-input ${errors.name ? 'contact__form-input--error' : ''}`}
                    placeholder="Digite o seu nome completo"
                    required
                  />
                  {errors.name && (
                    <span className="contact__form-error">{errors.name}</span>
                  )}
                </div>
              </div>

              <div className="contact__form-row">
                <div className="contact__form-group">
                  <label htmlFor="email" className="contact__form-label">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`contact__form-input ${errors.email ? 'contact__form-input--error' : ''}`}
                    placeholder="exemplo@email.com"
                    required
                  />
                  {errors.email && (
                    <span className="contact__form-error">{errors.email}</span>
                  )}
                </div>

                <div className="contact__form-group">
                  <label htmlFor="phone" className="contact__form-label">
                    Telefone *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`contact__form-input ${errors.phone ? 'contact__form-input--error' : ''}`}
                    placeholder="915007427"
                    required
                  />
                  {errors.phone && (
                    <span className="contact__form-error">{errors.phone}</span>
                  )}
                </div>
              </div>

              <div className="contact__form-row">
                <div className="contact__form-group">
                  <label htmlFor="subject" className="contact__form-label">
                    Assunto *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className={`contact__form-select ${errors.subject ? 'contact__form-input--error' : ''}`}
                    required
                  >
                    {assuntoOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {errors.subject && (
                    <span className="contact__form-error">{errors.subject}</span>
                  )}
                </div>
              </div>

              <div className="contact__form-row">
                <div className="contact__form-group">
                  <label htmlFor="msg" className="contact__form-label">
                    Mensagem *
                  </label>
                  <textarea
                    id="msg"
                    name="msg"
                    value={formData.msg}
                    onChange={handleInputChange}
                    className={`contact__form-textarea ${errors.msg ? 'contact__form-input--error' : ''}`}
                    placeholder="Descreva o que procura ou as suas dúvidas..."
                    rows={5}
                    required
                  />
                  {errors.msg && (
                    <span className="contact__form-error">{errors.msg}</span>
                  )}
                </div>
              </div>

              <div className="contact__form-privacy">
                <p>
                  Ao enviar este formulário, aceita a nossa{' '}
                  <a href="/politica-privacidade" className="contact__form-privacy-link">
                    Política de Privacidade
                  </a>
                </p>
              </div>

              <button 
                type="submit" 
                className="contact__form-submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="contact__form-spinner"></span>
                    ENVIANDO...
                  </>
                ) : (
                  'ENVIAR MENSAGEM'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;