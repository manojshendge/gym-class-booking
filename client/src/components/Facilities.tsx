import { motion } from 'framer-motion';
import { Facility } from '@/lib/types';

const facilities: Facility[] = [
  {
    image: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80",
    alt: "Strength Zone"
  },
  {
    image: "https://images.unsplash.com/photo-1570440828762-37451b7e813d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80",
    alt: "Cardio Deck"
  },
  {
    image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80",
    alt: "Functional Training Area"
  },
  {
    image: "https://images.unsplash.com/photo-1591291621164-2c6367723315?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80",
    alt: "Group Class Studio"
  },
  {
    image: "https://images.unsplash.com/photo-1576678927484-cc907957088c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80",
    alt: "Stretch Zone"
  },
  {
    image: "https://images.unsplash.com/photo-1598136490929-292a0a7890c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80",
    alt: "Recovery Area"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 }
};

const Facilities = () => {
  return (
    <section className="py-20 bg-[#121212] reveal" id="facilities">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-poppins font-bold mb-4">OUR <span className="text-[#0066FF]">FACILITIES</span></h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">Explore our state-of-the-art gym equipped with premium equipment and specialized training zones.</p>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {facilities.map((facility, index) => (
            <motion.div 
              key={index} 
              className="facility-card overflow-hidden rounded-lg"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
            >
              <img 
                src={facility.image} 
                alt={facility.alt} 
                className="w-full h-64 object-cover hover:scale-110 transition-transform duration-500"
              />
            </motion.div>
          ))}
        </motion.div>
        
        <div className="mt-12 text-center">
          <motion.a 
            href="#" 
            className="bg-[#1A1A1A] px-8 py-4 rounded-lg font-poppins font-semibold text-white hover:bg-gray-800 transition-colors inline-flex items-center"
            whileHover={{ y: -5 }}
            whileTap={{ y: 0 }}
          >
            <i className="fas fa-vr-cardboard mr-2"></i> Take Virtual Tour
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default Facilities;
