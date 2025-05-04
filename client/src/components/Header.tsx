import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className={`fixed w-full bg-black bg-opacity-90 z-50 transition-all duration-300 ${scrolled ? 'py-2' : 'py-3'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <a href="#" className="text-2xl md:text-3xl font-poppins font-bold">
          <span className="text-[#39FF14]">BEAST</span><span className="text-white">MODE</span>
        </a>
        
        <div className="hidden md:flex items-center space-x-8">
          <nav>
            <ul className="flex space-x-6 font-poppins font-medium">
              <li><a href="#classes" className="hover:text-[#39FF14] transition-colors">Classes</a></li>
              <li><a href="#trainers" className="hover:text-[#39FF14] transition-colors">Trainers</a></li>
              <li><a href="#pricing" className="hover:text-[#39FF14] transition-colors">Pricing</a></li>
              <li><a href="#testimonials" className="hover:text-[#39FF14] transition-colors">Results</a></li>
              <li><a href="#facilities" className="hover:text-[#39FF14] transition-colors">Facilities</a></li>
            </ul>
          </nav>
          <a href="#join-now" className="bg-[#FF5500] hover:bg-orange-600 text-white font-poppins font-semibold px-6 py-2 rounded-md transition-all">Join Now</a>
        </div>
        
        <button className="md:hidden text-2xl" onClick={toggleMobileMenu}>
          <i className="fas fa-bars"></i>
        </button>
      </div>
      
      {/* Mobile Menu */}
      <motion.div 
        className={`bg-[#1A1A1A] md:hidden w-full absolute top-full left-0 p-4 shadow-lg ${mobileMenuOpen ? 'block' : 'hidden'}`}
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: mobileMenuOpen ? 'auto' : 0, opacity: mobileMenuOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <nav className="flex flex-col space-y-4 mb-4">
          <a href="#classes" className="text-lg py-2 px-4 hover:bg-black rounded transition-colors" onClick={() => setMobileMenuOpen(false)}>Classes</a>
          <a href="#trainers" className="text-lg py-2 px-4 hover:bg-black rounded transition-colors" onClick={() => setMobileMenuOpen(false)}>Trainers</a>
          <a href="#pricing" className="text-lg py-2 px-4 hover:bg-black rounded transition-colors" onClick={() => setMobileMenuOpen(false)}>Pricing</a>
          <a href="#testimonials" className="text-lg py-2 px-4 hover:bg-black rounded transition-colors" onClick={() => setMobileMenuOpen(false)}>Results</a>
          <a href="#facilities" className="text-lg py-2 px-4 hover:bg-black rounded transition-colors" onClick={() => setMobileMenuOpen(false)}>Facilities</a>
        </nav>
        <a href="#join-now" className="block w-full bg-[#FF5500] text-center text-white font-poppins font-semibold px-6 py-3 rounded-md" onClick={() => setMobileMenuOpen(false)}>Join Now</a>
      </motion.div>
    </header>
  );
};

export default Header;
