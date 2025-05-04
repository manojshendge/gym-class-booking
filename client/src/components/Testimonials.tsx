import { motion } from 'framer-motion';
import { Testimonial } from '@/lib/types';

const testimonials: Testimonial[] = [
  {
    beforeImage: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=500&q=80",
    afterImage: "https://images.unsplash.com/photo-1558612846-a14f37189a06?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=500&q=80",
    quote: "I lost 65 pounds in 8 months at BEASTMODE. The trainers designed a program specifically for me, and the supportive community kept me accountable every step of the way.",
    name: "Michael T.",
    duration: "Member for 1 year",
    rating: 5
  },
  {
    beforeImage: "https://images.unsplash.com/photo-1558611848-73f7eb4001a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=500&q=80",
    afterImage: "https://images.unsplash.com/photo-1615214759398-6b345c9a9b27?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=500&q=80",
    quote: "After having my second child, I struggled to get back in shape. The HIIT classes at BEASTMODE helped me lose 30 pounds and gain more energy than I've ever had before!",
    name: "Jennifer R.",
    duration: "Member for 2 years",
    rating: 5
  }
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-[#1A1A1A] reveal" id="testimonials">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-poppins font-bold mb-4">SUCCESS <span className="text-[#FF3A3A]">STORIES</span></h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">Real people, real results. See how BEASTMODE has transformed the lives of our members.</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={index} 
              className="testimonial-card bg-[#121212] rounded-xl overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/2 relative">
                  <div className="before-after-container relative h-full">
                    <img src={testimonial.beforeImage} alt="Before transformation" className="w-full h-full object-cover" />
                    <div className="absolute top-0 left-0 bg-[#FF5500] text-white text-sm font-bold px-3 py-1">BEFORE</div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black opacity-50"></div>
                    <div className="absolute bottom-0 right-0 w-1/2 h-full">
                      <img src={testimonial.afterImage} alt="After transformation" className="w-full h-full object-cover" />
                      <div className="absolute top-0 right-0 bg-[#39FF14] text-white text-sm font-bold px-3 py-1">AFTER</div>
                    </div>
                  </div>
                </div>
                <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <i key={i} className="fas fa-star text-[#FF5500]"></i>
                    ))}
                  </div>
                  <p className="text-gray-200 italic mb-6">"{testimonial.quote}"</p>
                  <div>
                    <h4 className="font-poppins font-bold text-lg">{testimonial.name}</h4>
                    <p className="text-gray-400">{testimonial.duration}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <motion.a 
            href="#" 
            className="inline-flex items-center text-xl font-poppins font-medium text-white hover:text-[#FF3A3A] transition-colors"
            whileHover={{ x: 5 }}
          >
            View More Success Stories <i className="fas fa-arrow-right ml-2"></i>
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
