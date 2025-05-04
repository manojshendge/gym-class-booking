import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { formatTime } from '@/lib/utils';

const PromoBanner = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prevTime => {
        let { hours, minutes, seconds } = prevTime;
        
        if (seconds > 0) {
          seconds -= 1;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes -= 1;
          } else {
            minutes = 59;
            if (hours > 0) {
              hours -= 1;
            } else {
              clearInterval(interval);
              return { hours: 0, minutes: 0, seconds: 0 };
            }
          }
        }
        
        return { hours, minutes, seconds };
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.section 
      className="bg-[#FF3A3A] py-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <i className="fas fa-fire-alt text-2xl mr-3"></i>
            <span className="font-poppins font-bold text-lg text-center md:text-left">LIMITED OFFER: 50% OFF FIRST MONTH + NO JOINING FEE</span>
          </div>
          <div className="flex items-center space-x-6">
            <div>
              <span className="text-sm">Offer ends in:</span>
              <div className="font-mono font-bold">
                {formatTime(timeLeft.hours, timeLeft.minutes, timeLeft.seconds)}
              </div>
            </div>
            <motion.a 
              href="#join-now" 
              className="bg-white text-[#FF3A3A] hover:bg-gray-100 font-poppins font-semibold px-6 py-2 rounded-md transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Claim Now
            </motion.a>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default PromoBanner;
