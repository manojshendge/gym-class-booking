import { motion } from 'framer-motion';
import { Benefit } from '@/lib/types';

const benefits: Benefit[] = [
  {
    icon: "fas fa-clock",
    iconColor: "text-[#39FF14]",
    title: "24/7 Access",
    description: "Work out on your schedule with unlimited access to our facilities day or night."
  },
  {
    icon: "fas fa-dumbbell",
    iconColor: "text-[#0066FF]",
    title: "Premium Equipment",
    description: "Train with the latest fitness technology and top-of-the-line equipment."
  },
  {
    icon: "fas fa-user-friends",
    iconColor: "text-[#FF5500]",
    title: "Expert Trainers",
    description: "Get guidance from certified fitness professionals who know how to maximize your results."
  },
  {
    icon: "fas fa-mobile-alt",
    iconColor: "text-[#FF3A3A]",
    title: "Mobile App",
    description: "Track workouts, book classes, and monitor your progress from anywhere."
  }
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const Benefits = () => {
  return (
    <section className="py-20 bg-[#1A1A1A] reveal" id="benefits">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-poppins font-bold mb-4">WHY CHOOSE <span className="text-[#39FF14]">BEAST</span>MODE</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">We combine state-of-the-art equipment, expert coaching, and a motivating atmosphere to help you achieve results faster than ever before.</p>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {benefits.map((benefit, index) => (
            <motion.div 
              key={index} 
              className="benefit-card bg-[#121212] rounded-lg p-8 transition-all duration-300"
              variants={itemVariants}
            >
              <div className={`${benefit.iconColor} text-4xl mb-4`}>
                <i className={benefit.icon}></i>
              </div>
              <h3 className="text-xl font-poppins font-bold mb-3">{benefit.title}</h3>
              <p className="text-gray-300">{benefit.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Benefits;
