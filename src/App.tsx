import { useEffect } from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import About from './components/About';
import WhyOurCompany from './components/WhyOurCompany';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: false,
      offset: 100
    });
  }, []);
  return (
    <div>
      <Navbar />
      <Hero />
      <About />
      <WhyOurCompany />
      <Services />
      <Contact />
      <Footer />
    </div>
  )
}

export default App
