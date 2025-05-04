import { motion } from 'framer-motion';

const AppPromo = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-[#121212] to-[#0066FF] reveal">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <motion.div 
            className="md:w-1/2 mb-10 md:mb-0"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-poppins font-bold mb-6">TRACK YOUR PROGRESS WITH OUR <span className="text-[#39FF14]">MOBILE APP</span></h2>
            <p className="text-xl text-gray-200 mb-8">Book classes, track workouts, connect with trainers, and monitor your progress - all from your smartphone.</p>
            <ul className="space-y-4 mb-10">
              <li className="flex items-start">
                <i className="fas fa-check-circle text-[#39FF14] text-xl mt-1 mr-4"></i>
                <span>Book and manage your class schedule</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-check-circle text-[#39FF14] text-xl mt-1 mr-4"></i>
                <span>Track workout history and personal records</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-check-circle text-[#39FF14] text-xl mt-1 mr-4"></i>
                <span>Connect with trainers and receive feedback</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-check-circle text-[#39FF14] text-xl mt-1 mr-4"></i>
                <span>Access workout plans and video tutorials</span>
              </li>
            </ul>
            <div className="flex space-x-4">
              <motion.a 
                href="#" 
                className="transition-transform hover:scale-105"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Download_on_the_App_Store_Badge.svg/1000px-Download_on_the_App_Store_Badge.svg.png" alt="Download on the App Store" className="h-12" />
              </motion.a>
              <motion.a 
                href="#" 
                className="transition-transform hover:scale-105"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/1000px-Google_Play_Store_badge_EN.svg.png" alt="Get it on Google Play" className="h-12" />
              </motion.a>
            </div>
          </motion.div>
          <motion.div 
            className="md:w-1/2 flex justify-center"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <motion.img 
                src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=800&q=80" 
                alt="BEASTMODE Mobile App" 
                className="w-64 h-auto rounded-3xl shadow-2xl"
                initial={{ y: 0 }}
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              />
              <motion.div 
                className="absolute -right-16 -bottom-12 opacity-90"
                initial={{ y: 0 }}
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 0.5 }}
              >
                <img src="https://images.unsplash.com/photo-1550945771-515f118cef86?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=800&q=80" alt="BEASTMODE Mobile App" className="w-48 h-auto rounded-2xl shadow-2xl" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AppPromo;
