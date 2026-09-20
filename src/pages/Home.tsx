import Hero from '../components/Hero';
import Navbar from '../components/Navbar';
import About from '../components/About';
import WhyOurCompany from '../components/WhyOurCompany';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const Home = () => {
    return (
        <div>
            <Navbar />
            <Hero />
            <About />
            <WhyOurCompany />
            <Contact />
            <Footer />
        </div>
    );
};

export default Home;