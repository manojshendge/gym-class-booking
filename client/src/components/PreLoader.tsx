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

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { 
              duration: 0.8, 
              ease: "easeInOut" 
            }
          }}
        >
          <div className="relative flex flex-col items-center">
            {/* Main Logo Animation */}
            <motion.div
              className="mb-12"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                transition: {
                  duration: 0.5
                }
              }}
            >
              <motion.div
                className="text-5xl md:text-7xl font-poppins font-extrabold"
                animate={{ 
                  textShadow: [
                    "0 0 0px rgba(57, 255, 20, 0)",
                    "0 0 20px rgba(57, 255, 20, 0.8)",
                    "0 0 5px rgba(57, 255, 20, 0.5)"
                  ]
                }}
                transition={{ 
                  repeat: Infinity,
                  duration: 2,
                  repeatType: "reverse"
                }}
              >
                <span className="text-[#39FF14]">BEAST</span>
                <span className="text-white">MODE</span>
              </motion.div>
            </motion.div>

            {/* Loading Bar */}
            <motion.div
              className="w-60 md:w-80 h-2 bg-gray-800 rounded-full overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                transition: { delay: 0.3, duration: 0.5 }
              }}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-[#39FF14] to-[#FF5500]"
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

            {/* Animated Dumbbells */}
            <div className="absolute -top-20 right-0">
              <motion.div
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  y: [0, -10, 0]
                }}
                transition={{ 
                  repeat: Infinity,
                  duration: 2.5,
                  ease: "easeInOut"
                }}
              >
                <i className="fas fa-dumbbell text-[#FF5500] text-4xl opacity-70"></i>
              </motion.div>
            </div>
            <div className="absolute -bottom-16 -left-10">
              <motion.div
                animate={{ 
                  rotate: [0, -10, 10, 0],
                  y: [0, 10, 0]
                }}
                transition={{ 
                  repeat: Infinity,
                  duration: 3,
                  ease: "easeInOut"
                }}
              >
                <i className="fas fa-dumbbell text-[#39FF14] text-3xl opacity-70"></i>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PreLoader;