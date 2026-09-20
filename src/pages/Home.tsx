import Hero from '../components/Hero';
import Navbar from '../components/Navbar';
import About from '../components/About';
import WhyOurCompany from '../components/WhyOurCompany';

import Contact from '../components/Contact';


const Home = () => {
    return (
        <div>
            <Navbar />
            <Hero />
            <About />
            <WhyOurCompany />
            <Contact />
            
        </div>
    );
};

export default Home;