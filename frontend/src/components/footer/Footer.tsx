import React from 'react';
import './Footer.css';
import {useTranslation} from "react-i18next";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation();
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__content">
          <p className="footer__copyright">
            © {currentYear} {t("bf")}.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;