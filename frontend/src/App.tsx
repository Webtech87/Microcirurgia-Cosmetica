// frontend/src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Hero from './components/hero';
import WhyChoose from './components/why-choose';
import Treatments from './components/treatments';
import Testimonials from './components/testimonials';
import Contact from './components/contact';
import Footer from './components/footer';
import WhatsAppFloat from './components/whatsapp-float';
import PopupForm from './components/popup-form';
import CookiesBanner from './components/cookies-banner';
import PrivacyPolicy from './pages/privacy-policy';
import CookiesPolicy from './pages/cookies-policy';
import TermsConditions from './pages/terms-conditions/TermsConditions';
import VideoTestimonials from './components/videoslider';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Main Website Route */}
          <Route path="/" element={
            <>
              <Navbar />
              <Hero />
              <WhyChoose />
              <Treatments />
              <VideoTestimonials /> 
              <Testimonials />
              <Contact />
              <Footer />
              <WhatsAppFloat />
              <PopupForm />
              <CookiesBanner />
            </>
          } />
          
          {/* Privacy Policy Route */}
          <Route path="/politica-privacidade" element={
            <>
              <Navbar />
              <PrivacyPolicy />
              <Footer />
              <WhatsAppFloat />
              <CookiesBanner />
            </>
          } />
          
          {/* Cookies Policy Route */}
          <Route path="/politica-cookies" element={
            <>
              <Navbar />
              <CookiesPolicy />
              <Footer />
              <WhatsAppFloat />
              <CookiesBanner />
            </>
          } />

          {/* Terms & Conditions Route - THIS WAS MISSING! */}
          <Route path="/termos-condicoes" element={
            <>
              <Navbar />
              <TermsConditions />
              <Footer />
              <WhatsAppFloat />
              <CookiesBanner />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;