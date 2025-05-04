import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CookieBanner = () => {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const cookieChoice = localStorage.getItem('cookieChoice');
    if (!cookieChoice) {
      setShown(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookieChoice', 'accepted');
    setShown(false);
  };

  const rejectCookies = () => {
    localStorage.setItem('cookieChoice', 'rejected');
    setShown(false);
  };

  return (
    <AnimatePresence>
      {shown && (
        <motion.div 
          className="fixed bottom-0 left-0 right-0 bg-[#1A1A1A] p-4 shadow-lg z-50"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
            <p className="text-sm text-gray-300 mb-4 md:mb-0">This website uses cookies to ensure you get the best experience. <a href="#" className="text-[#39FF14] hover:underline">Learn more</a></p>
            <div className="flex space-x-4">
              <motion.button 
                id="accept-cookies" 
                className="bg-[#39FF14] text-black px-4 py-2 rounded-lg font-medium"
                onClick={acceptCookies}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Accept All
              </motion.button>
              <motion.button 
                id="reject-cookies" 
                className="bg-transparent border border-gray-500 text-white px-4 py-2 rounded-lg font-medium"
                onClick={rejectCookies}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Reject Non-Essential
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieBanner;
