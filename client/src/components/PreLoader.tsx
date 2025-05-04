import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PreLoader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500); // 2.5 seconds loader display

    return () => clearTimeout(timer);
  }, []);

  // Animation variants
  const containerVariants = {
    initial: { opacity: 1 },
    exit: { 
      opacity: 0,
      transition: { 
        duration: 0.8, 
        ease: "easeInOut",
        when: "afterChildren"
      }
    }
  };

  const logoVariants = {
    initial: { opacity: 0, scale: 0.8, y: 20 },
    animate: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    exit: {
      scale: 1.2,
      opacity: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  const barContainerVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: 0.3, 
        duration: 0.5 
      }
    },
    exit: {
      opacity: 0,
      y: 20,
      transition: {
        duration: 0.3
      }
    }
  };

  const dumbellVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 0.7,
      transition: { 
        delay: 0.5, 
        duration: 0.5 
      }
    }
  };

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-black to-[#121212]"
          variants={containerVariants}
          initial="initial"
          exit="exit"
        >
          <div className="relative flex flex-col items-center">
            {/* Main Logo Animation */}
            <motion.div
              className="mb-12"
              variants={logoVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <div className="text-5xl md:text-7xl font-poppins font-extrabold preloader-glow">
                <span className="text-[#39FF14]">BEAST</span>
                <span className="text-white">MODE</span>
              </div>
              
              {/* Fitness tagline */}
              <motion.div 
                className="text-center mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <span className="text-sm text-gray-400 tracking-widest">FITNESS REDEFINED</span>
              </motion.div>
            </motion.div>

            {/* Loading Bar */}
            <motion.div
              className="w-64 md:w-96 h-2 bg-gray-800 rounded-full overflow-hidden"
              variants={barContainerVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <motion.div
                className="h-full preloader-bar rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ 
                  duration: 2,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
            
            {/* Loading Text */}
            <motion.p
              className="mt-4 text-gray-400 text-sm tracking-widest uppercase"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0.5, 1, 0.5],
                transition: { 
                  repeat: Infinity,
                  duration: 1.5
                }
              }}
            >
              UNLEASHING THE BEAST
            </motion.p>

            {/* Background Elements */}
            <div className="absolute top-[-120px] right-[-50px]">
              <motion.div
                className="preloader-float"
                variants={dumbellVariants}
                initial="initial"
                animate="animate"
              >
                <i className="fas fa-dumbbell text-[#FF5500] text-5xl opacity-30"></i>
              </motion.div>
            </div>
            
            <div className="absolute bottom-[-80px] left-[-100px]">
              <motion.div
                className="preloader-float"
                variants={dumbellVariants}
                initial="initial"
                animate="animate"
                style={{ animationDelay: "0.3s" }}
              >
                <i className="fas fa-dumbbell text-[#39FF14] text-4xl opacity-30"></i>
              </motion.div>
            </div>
            
            <div className="absolute top-[-50px] left-[-80px]">
              <motion.div
                className="preloader-float"
                variants={dumbellVariants}
                initial="initial"
                animate="animate"
                style={{ animationDelay: "0.6s" }}
              >
                <i className="fas fa-running text-[#0066FF] text-4xl opacity-30"></i>
              </motion.div>
            </div>
            
            <div className="absolute bottom-[-60px] right-[-70px]">
              <motion.div
                className="preloader-float"
                variants={dumbellVariants}
                initial="initial"
                animate="animate"
                style={{ animationDelay: "0.9s" }}
              >
                <i className="fas fa-heartbeat text-[#FF3A3A] text-4xl opacity-30"></i>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PreLoader;