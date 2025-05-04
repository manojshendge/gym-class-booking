import { useState } from 'react';
import { motion } from 'framer-motion';
import { ContactFormData } from '@/lib/types';
import { apiRequest } from '@/lib/queryClient';
import { useMutation } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';

const JoinNow = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    goal: ''
  });
  const [termsAccepted, setTermsAccepted] = useState(false);

  const submitContact = useMutation({
    mutationFn: async (data: ContactFormData) => {
      const response = await apiRequest('POST', '/api/contact', data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "Thank you for joining! We will contact you shortly to confirm your free trial.",
        variant: "default",
      });
      setFormData({ name: '', email: '', phone: '', goal: '' });
      setTermsAccepted(false);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (termsAccepted) {
      submitContact.mutate(formData);
    } else {
      toast({
        title: "Please accept terms",
        description: "You must accept the terms and conditions to proceed.",
        variant: "destructive",
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  return (
    <section className="py-20 bg-[#121212] reveal" id="join-now">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-poppins font-bold mb-6">READY TO <span className="text-[#FF5500]">TRANSFORM</span> YOUR BODY?</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">Join now and start your fitness journey with our 7-day free trial. No commitment required.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <motion.div 
            className="flex flex-col justify-center"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="bg-[#1A1A1A] rounded-xl p-8 mb-8">
              <h3 className="text-2xl font-poppins font-bold mb-6 flex items-center">
                <i className="fas fa-map-marker-alt text-[#FF3A3A] mr-3"></i> Find Us
              </h3>
              <div className="mb-6 bg-gray-800 rounded-lg overflow-hidden">
                <div className="h-64 w-full">
                  <img src="https://images.unsplash.com/photo-1569336415962-a4bd9f69c07a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=400&q=80" alt="Map of gym location" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="space-y-3">
                <p className="flex items-start">
                  <i className="fas fa-location-arrow text-[#39FF14] mt-1 mr-3"></i>
                  <span>123 Fitness Street, Downtown, City, 12345</span>
                </p>
                <p className="flex items-start">
                  <i className="fas fa-phone-alt text-[#39FF14] mt-1 mr-3"></i>
                  <span>(555) 123-4567</span>
                </p>
                <p className="flex items-start">
                  <i className="fas fa-envelope text-[#39FF14] mt-1 mr-3"></i>
                  <span>info@beastmodegym.com</span>
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <a href="#" className="flex items-center justify-center bg-[#FF3A3A] hover:bg-red-600 text-white font-medium py-3 px-4 rounded-lg transition-colors">
                <i className="fab fa-instagram mr-2"></i> Instagram
              </a>
              <a href="#" className="flex items-center justify-center bg-[#0066FF] hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors">
                <i className="fab fa-facebook-f mr-2"></i> Facebook
              </a>
              <a href="#" className="flex items-center justify-center bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors">
                <i className="fab fa-whatsapp mr-2"></i> WhatsApp
              </a>
            </div>
          </motion.div>
          
          <motion.div 
            className="bg-[#1A1A1A] rounded-xl p-8"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-poppins font-bold mb-6 flex items-center">
              <i className="fas fa-dumbbell text-[#FF5500] mr-3"></i> Join Now or Get a Free Trial
            </h3>
            <form id="join-form" className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
                <input 
                  type="text" 
                  id="name" 
                  className="w-full bg-[#121212] border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-[#39FF14] focus:border-transparent outline-none transition-all" 
                  placeholder="Your name" 
                  required
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full bg-[#121212] border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-[#39FF14] focus:border-transparent outline-none transition-all" 
                  placeholder="your@email.com" 
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">Phone Number</label>
                <input 
                  type="tel" 
                  id="phone" 
                  className="w-full bg-[#121212] border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-[#39FF14] focus:border-transparent outline-none transition-all" 
                  placeholder="(555) 123-4567" 
                  required
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              
              <div>
                <label htmlFor="goal" className="block text-sm font-medium text-gray-300 mb-1">Your Primary Fitness Goal</label>
                <select 
                  id="goal" 
                  className="w-full bg-[#121212] border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-[#39FF14] focus:border-transparent outline-none transition-all" 
                  required
                  value={formData.goal}
                  onChange={handleChange}
                >
                  <option value="" disabled>Select your primary goal</option>
                  <option value="weight-loss">Weight Loss</option>
                  <option value="muscle-gain">Muscle Gain</option>
                  <option value="strength">Increase Strength</option>
                  <option value="endurance">Improve Endurance</option>
                  <option value="general">General Fitness</option>
                </select>
              </div>
              
              <div>
                <label className="flex items-start">
                  <input 
                    type="checkbox" 
                    className="mt-1 mr-3" 
                    required
                    checked={termsAccepted}
                    onChange={() => setTermsAccepted(prev => !prev)}
                  />
                  <span className="text-sm text-gray-300">I agree to the <a href="#" className="text-[#39FF14] hover:underline">terms and conditions</a> and <a href="#" className="text-[#39FF14] hover:underline">privacy policy</a>.</span>
                </label>
              </div>
              
              <motion.button 
                type="submit" 
                className="w-full bg-[#FF5500] hover:bg-orange-600 text-white font-poppins font-semibold text-lg px-6 py-4 rounded-lg transition-all cta-pulse"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={submitContact.isPending}
              >
                {submitContact.isPending ? "PROCESSING..." : "START YOUR FREE TRIAL"}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default JoinNow;
