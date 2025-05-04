import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="bg-black pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <a href="#" className="text-2xl md:text-3xl font-poppins font-bold mb-6 inline-block">
              <span className="text-[#39FF14]">BEAST</span><span className="text-white">MODE</span>
            </a>
            <p className="text-gray-400 mb-6">Transforming bodies and minds since 2023. Our mission is to help you achieve your fitness goals in a motivating environment.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-poppins font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#classes" className="text-gray-400 hover:text-[#39FF14] transition-colors">Classes</a></li>
              <li><a href="#trainers" className="text-gray-400 hover:text-[#39FF14] transition-colors">Trainers</a></li>
              <li><a href="#pricing" className="text-gray-400 hover:text-[#39FF14] transition-colors">Membership</a></li>
              <li><a href="#testimonials" className="text-gray-400 hover:text-[#39FF14] transition-colors">Success Stories</a></li>
              <li><a href="#facilities" className="text-gray-400 hover:text-[#39FF14] transition-colors">Facilities</a></li>
              <li><a href="#faq" className="text-gray-400 hover:text-[#39FF14] transition-colors">FAQ</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-poppins font-bold mb-6">Hours</h4>
            <ul className="space-y-3 text-gray-400">
              <li className="flex justify-between">
                <span>Monday - Friday:</span>
                <span>24 Hours</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday:</span>
                <span>24 Hours</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday:</span>
                <span>24 Hours</span>
              </li>
              <li className="mt-4">
                <span className="text-sm">Staffed Hours:</span>
                <p className="text-sm">6am-10pm (Mon-Fri)</p>
                <p className="text-sm">8am-8pm (Sat-Sun)</p>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-poppins font-bold mb-6">Newsletter</h4>
            <p className="text-gray-400 mb-4">Subscribe to get workout tips, health advice, and exclusive promotions.</p>
            <form className="space-y-3">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="w-full bg-[#1A1A1A] border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-[#39FF14] focus:border-transparent outline-none transition-all"
              />
              <motion.button 
                type="submit" 
                className="w-full bg-[#39FF14] text-black font-poppins font-semibold px-4 py-3 rounded-lg hover:bg-green-400 transition-colors"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Subscribe
              </motion.button>
            </form>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
          <p>&copy; 2023 BEASTMODE Fitness. All rights reserved.</p>
          <div className="flex justify-center space-x-6 mt-3">
            <a href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
