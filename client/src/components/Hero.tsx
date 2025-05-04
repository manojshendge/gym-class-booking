import { motion } from 'framer-motion';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
      duration: 0.8
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10
    }
  }
};

const featureVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (index: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: 1.2 + (index * 0.2),
      type: "spring",
      stiffness: 100
    }
  })
};

const scrollIconVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { 
    opacity: 1,
    y: 0,
    transition: {
      delay: 2,
      duration: 0.5
    }
  },
  bounce: {
    y: [0, -8, 0],
    transition: {
      repeat: Infinity,
      repeatType: "reverse" as const,
      duration: 1.5
    }
  }
};

const Hero = () => {
  const features = [
    { icon: "fas fa-clock", text: "24/7 Access" },
    { icon: "fas fa-dumbbell", text: "Premium Equipment" },
    { icon: "fas fa-user-friends", text: "Expert Trainers" }
  ];

  return (
    <section className="hero-gradient min-h-screen flex items-center relative pt-20 overflow-hidden">
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ scale: 1.1, opacity: 0.5 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        {/* Background animation overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50"></div>
      </motion.div>
      
      <div className="container mx-auto px-4 py-16 md:py-32 relative z-10">
        <motion.div 
          className="max-w-3xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-poppins font-extrabold mb-6 leading-tight"
            variants={itemVariants}
          >
            UNLEASH THE <motion.span 
              className="text-[#39FF14]"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: 1, 
                scale: [0.8, 1.2, 1],
                textShadow: [
                  "0 0 0px rgba(57, 255, 20, 0.5)",
                  "0 0 20px rgba(57, 255, 20, 0.8)",
                  "0 0 5px rgba(57, 255, 20, 0.5)"
                ]
              }}
              transition={{ 
                delay: 0.8, 
                duration: 0.8,
                times: [0, 0.5, 1]
              }}
            >
              BEAST
            </motion.span> WITHIN
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl mb-8 text-gray-200"
            variants={itemVariants}
          >
            Transform your body, elevate your mind, and push beyond your limits with our cutting-edge equipment and expert trainers.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 mb-12"
            variants={itemVariants}
          >
            <motion.a 
              href="#join-now" 
              className="bg-[#FF5500] hover:bg-orange-600 text-white text-center font-poppins font-semibold text-lg px-8 py-4 rounded-md transition-all cta-pulse"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 15px rgba(255, 85, 0, 0.7)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              GET 7-DAY FREE TRIAL
            </motion.a>
            <motion.a 
              href="#pricing" 
              className="bg-transparent border-2 border-white hover:border-[#39FF14] hover:text-[#39FF14] text-center font-poppins font-semibold text-lg px-8 py-4 rounded-md transition-all"
              whileHover={{ 
                scale: 1.05,
                borderColor: "#39FF14",
                color: "#39FF14",
                textShadow: "0 0 8px rgba(57, 255, 20, 0.5)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              VIEW MEMBERSHIP PLANS
            </motion.a>
          </motion.div>
          
          <div className="flex flex-wrap items-center gap-6 text-lg">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                custom={index}
                variants={featureVariants}
                initial="hidden"
                animate="visible"
                className="flex items-center"
              >
                <motion.i 
                  className={`${feature.icon} mr-2 text-[#39FF14]`}
                  whileHover={{ 
                    rotate: [0, -10, 10, -10, 0],
                    scale: 1.2,
                    transition: { duration: 0.5 }
                  }}
                ></motion.i>
                <span>{feature.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white scroll-indicator"
        initial={{ opacity: 0, y: -10 }}
        animate={{ 
          opacity: 1, 
          y: 0 
        }}
        transition={{
          delay: 2,
          duration: 0.5
        }}
      >
        <div className="flex flex-col items-center">
          <span className="mb-2 text-sm uppercase tracking-wider">Scroll Down</span>
          <motion.i 
            className="fas fa-chevron-down text-2xl"
            animate={{ y: [0, 5, 0] }}
            transition={{ 
              repeat: Infinity, 
              duration: 1.5, 
              ease: "easeInOut" 
            }}
          ></motion.i>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
