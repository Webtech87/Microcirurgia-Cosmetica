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
import ScrollFadeWrapper from './components/scroll-fade-wrapper';
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
              {/* Hero - animate once since it's the first section */}
              <ScrollFadeWrapper animateOnce={true}>
                <Hero />
              </ScrollFadeWrapper>
              
              {/* Main sections - bidirectional animations */}
              <ScrollFadeWrapper id='why-choose' delay={0} direction="up">
                <WhyChoose />
              </ScrollFadeWrapper>
              
              <ScrollFadeWrapper id='treatments' delay={0} direction="up">
                <Treatments />
              </ScrollFadeWrapper>
              
              <ScrollFadeWrapper delay={0} direction="up">
                <VideoTestimonials />
              </ScrollFadeWrapper>
              
              <ScrollFadeWrapper delay={0} direction="up">
                <Testimonials />
              </ScrollFadeWrapper>
              
              <ScrollFadeWrapper id='contact' delay={0} direction="up">
                <Contact />
              </ScrollFadeWrapper>
              
              {/* Footer - animate once since it's the last section */}
              <ScrollFadeWrapper delay={0} direction="up" animateOnce={true}>
                <Footer />
              </ScrollFadeWrapper>
              <WhatsAppFloat />
              <PopupForm />
              <CookiesBanner />
            </>
          } />
          
          {/* Privacy Policy Route */}
          <Route path="/politica-privacidade" element={
            <>
              <Navbar />
              <ScrollFadeWrapper>
                <PrivacyPolicy />
              </ScrollFadeWrapper>
              <ScrollFadeWrapper delay={200} animateOnce={true}>
                <Footer />
              </ScrollFadeWrapper>

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
              <ScrollFadeWrapper>
                <CookiesPolicy />
              </ScrollFadeWrapper>
              <ScrollFadeWrapper delay={200} animateOnce={true}>
                <Footer />
              </ScrollFadeWrapper>
              <WhatsAppFloat />
              <CookiesBanner />
            </>
          } />

          {/* Terms & Conditions Route - THIS WAS MISSING! */}
          <Route path="/termos-condicoes" element={
            <>
              <Navbar />
              <ScrollFadeWrapper>
                <TermsConditions />
              </ScrollFadeWrapper>
              <ScrollFadeWrapper delay={200} animateOnce={true}>
                <Footer />
              </ScrollFadeWrapper>
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