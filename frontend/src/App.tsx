// frontend/src/App.tsx
import React from 'react';
import Navbar from './components/navbar';
import Hero from './components/hero';
import WhyChoose from './components/why-choose';
import Treatments from './components/treatments';
import Testimonials from './components/testimonials';
import Contact from './components/contact';
import Footer from './components/footer';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <WhyChoose />
      <Treatments />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;