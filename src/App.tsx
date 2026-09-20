import { useEffect } from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css'
import Home from './pages/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import About from './pages/About';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Services from './components/Services';
import TeamsPage from './pages/TeamsPage';
import LoginPage from './pages/LoginPage';
import CreateBlogPage from './pages/CreateBlog';


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
    <BrowserRouter>
      <Navbar />
      <Routes>
        

        <Route path="/" element={<Home />} />

        <Route path="/about" element={<About />} />

        <Route path="/services" element={<Services />} />

        <Route path="/teams" element={<TeamsPage />} />

        <Route path="/login" element={<LoginPage />} />

        <Route path="/create-blog" element={<CreateBlogPage />}/>

      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
