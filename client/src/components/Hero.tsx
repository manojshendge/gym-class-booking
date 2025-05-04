import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="hero-gradient min-h-screen flex items-center relative pt-20">
      <div className="container mx-auto px-4 py-16 md:py-32">
        <motion.div 
          className="max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-poppins font-extrabold mb-6 leading-tight">
            UNLEASH THE <span className="text-[#39FF14]">BEAST</span> WITHIN
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">Transform your body, elevate your mind, and push beyond your limits with our cutting-edge equipment and expert trainers.</p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <motion.a 
              href="#join-now" 
              className="bg-[#FF5500] hover:bg-orange-600 text-white text-center font-poppins font-semibold text-lg px-8 py-4 rounded-md transition-all cta-pulse"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              GET 7-DAY FREE TRIAL
            </motion.a>
            <motion.a 
              href="#pricing" 
              className="bg-transparent border-2 border-white hover:border-[#39FF14] hover:text-[#39FF14] text-center font-poppins font-semibold text-lg px-8 py-4 rounded-md transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              VIEW MEMBERSHIP PLANS
            </motion.a>
          </div>
          
          <div className="flex flex-wrap items-center gap-6 text-lg">
            <div className="flex items-center">
              <i className="fas fa-clock mr-2 text-[#39FF14]"></i>
              <span>24/7 Access</span>
            </div>
            <div className="flex items-center">
              <i className="fas fa-dumbbell mr-2 text-[#39FF14]"></i>
              <span>Premium Equipment</span>
            </div>
            <div className="flex items-center">
              <i className="fas fa-user-friends mr-2 text-[#39FF14]"></i>
              <span>Expert Trainers</span>
            </div>
          </div>
        </motion.div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white scroll-indicator">
        <div className="flex flex-col items-center">
          <span className="mb-2 text-sm uppercase tracking-wider">Scroll Down</span>
          <i className="fas fa-chevron-down text-2xl"></i>
        </div>
      </div>
    </section>
  );
};

export default Hero;
