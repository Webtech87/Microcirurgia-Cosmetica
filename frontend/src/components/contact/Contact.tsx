import React, { useState } from 'react';
import './Contact.css';

interface FormData {
  nome: string;
  email: string;
  telefone: string;
  assunto: string;
  mensagem: string;
}

interface FormErrors {
  nome?: string;
  email?: string;
  telefone?: string;
  assunto?: string;
  mensagem?: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    email: '',
    telefone: '',
    assunto: '',
    mensagem: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const assuntoOptions = [
    { value: '', label: 'Selecione um assunto' },
    { value: 'consulta', label: 'Agendar Consulta' },
    { value: 'micro-lifting-sobrancelha', label: 'Micro lifting de sobrancelha' },
    { value: 'micro-bichectomia-superior', label: 'Micro bichectomia superior' },
    { value: 'micro-bichectomia-inferior', label: 'Micro bichectomia inferior' },
    { value: 'micro-lifting-deep-face', label: 'Micro lifting deep face' },
    { value: 'mini-mass-lifting', label: 'Mini mass lifting' },
    { value: 'micro-implante-sobrancelha', label: 'Micro implante de sobrancelha' },
    { value: 'micro-rinoplastia', label: 'Micro rinoplastia' },
    { value: 'informacoes', label: 'Informações Gerais' },
    { value: 'outro', label: 'Outro' }
  ];

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

    // Assunto validation
    if (!formData.assunto) {
      newErrors.assunto = 'O assunto é obrigatório';
    }

    // Mensagem validation
    if (!formData.mensagem.trim()) {
      newErrors.mensagem = 'A mensagem é obrigatória';
    } else if (formData.mensagem.trim().length < 10) {
      newErrors.mensagem = 'A mensagem deve ter pelo menos 10 caracteres';
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
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would normally send data to your backend
      console.log('Form submitted:', formData);
      
      setIsSubmitted(true);
      setFormData({
        nome: '',
        email: '',
        telefone: '',
        assunto: '',
        mensagem: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
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
                    <span>+351 912 345 678</span>
                  </div>
                </div>
                <div className="contact__detail-item">
                  <span className="contact__detail-icon">✉️</span>
                  <div className="contact__detail-content">
                    <span>info@santiclinic.pt</span>
                  </div>
                </div>
                <div className="contact__detail-item">
                  <span className="contact__detail-icon">📍</span>
                  <div className="contact__detail-content">
                    <span>Rua da Beleza, 123</span>
                    <span>1000-001 Lisboa</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact__detail-group">
              <h3 className="contact__detail-title">Políticas</h3>
              <div className="contact__detail-items">
                <a href="#" className="contact__detail-link">Política de Privacidade</a>
                <a href="#" className="contact__detail-link">Política de Cookies</a>
                <a href="#" className="contact__detail-link">Termos e Condições</a>
              </div>
            </div>
          </div>

          <div className="contact__social">
            <button className="contact__social-btn">
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
                  <label htmlFor="nome" className="contact__form-label">
                    Seu nome *
                  </label>
                  <input
                    type="text"
                    id="nome"
                    name="nome"
                    value={formData.nome}
                    onChange={handleInputChange}
                    className={`contact__form-input ${errors.nome ? 'contact__form-input--error' : ''}`}
                    placeholder="Digite o seu nome completo"
                    required
                  />
                  {errors.nome && (
                    <span className="contact__form-error">{errors.nome}</span>
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
                  <label htmlFor="telefone" className="contact__form-label">
                    Telefone *
                  </label>
                  <input
                    type="tel"
                    id="telefone"
                    name="telefone"
                    value={formData.telefone}
                    onChange={handleInputChange}
                    className={`contact__form-input ${errors.telefone ? 'contact__form-input--error' : ''}`}
                    placeholder="+351 912 345 678"
                    required
                  />
                  {errors.telefone && (
                    <span className="contact__form-error">{errors.telefone}</span>
                  )}
                </div>
              </div>

              <div className="contact__form-row">
                <div className="contact__form-group">
                  <label htmlFor="assunto" className="contact__form-label">
                    Assunto *
                  </label>
                  <select
                    id="assunto"
                    name="assunto"
                    value={formData.assunto}
                    onChange={handleInputChange}
                    className={`contact__form-select ${errors.assunto ? 'contact__form-input--error' : ''}`}
                    required
                  >
                    {assuntoOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {errors.assunto && (
                    <span className="contact__form-error">{errors.assunto}</span>
                  )}
                </div>
              </div>

              <div className="contact__form-row">
                <div className="contact__form-group">
                  <label htmlFor="mensagem" className="contact__form-label">
                    Mensagem *
                  </label>
                  <textarea
                    id="mensagem"
                    name="mensagem"
                    value={formData.mensagem}
                    onChange={handleInputChange}
                    className={`contact__form-textarea ${errors.mensagem ? 'contact__form-input--error' : ''}`}
                    placeholder="Descreva o que procura ou as suas dúvidas..."
                    rows={5}
                    required
                  />
                  {errors.mensagem && (
                    <span className="contact__form-error">{errors.mensagem}</span>
                  )}
                </div>
              </div>

              <div className="contact__form-privacy">
                <p>
                  Ao enviar este formulário, aceita a nossa{' '}
                  <a href="#" className="contact__form-privacy-link">
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