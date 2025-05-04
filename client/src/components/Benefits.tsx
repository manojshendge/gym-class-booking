import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import { Benefit } from '@/lib/types';
import { slideFromLeft, slideFromRight, slideFromTop, slideFromBottom, cardHover } from '@/lib/animations';

const benefits: Benefit[] = [
  {
    icon: "fas fa-clock",
    iconColor: "text-[#39FF14]",
    title: "24/7 Access",
    description: "Work out on your schedule with unlimited access to our facilities day or night.",
    animation: slideFromLeft
  },
  {
    icon: "fas fa-dumbbell",
    iconColor: "text-[#0066FF]",
    title: "Premium Equipment",
    description: "Train with the latest fitness technology and top-of-the-line equipment.",
    animation: slideFromTop
  },
  {
    icon: "fas fa-user-friends",
    iconColor: "text-[#FF5500]",
    title: "Expert Trainers",
    description: "Get guidance from certified fitness professionals who know how to maximize your results.",
    animation: slideFromBottom
  },
  {
    icon: "fas fa-mobile-alt",
    iconColor: "text-[#FF3A3A]",
    title: "Mobile App",
    description: "Track workouts, book classes, and monitor your progress from anywhere.",
    animation: slideFromRight
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const titleVariants = {
  hidden: { opacity: 0, y: -30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10
    }
  }
};

const Benefits = () => {
  const controls = useAnimation();

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('benefits');
      if (element) {
        const rect = element.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
        if (isVisible) {
          controls.start('visible');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial visibility

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [controls]);

  return (
    <section className="py-20 bg-[#1A1A1A] overflow-hidden" id="benefits">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-poppins font-bold mb-4"
            variants={titleVariants}
          >
            WHY CHOOSE <motion.span 
              className="text-[#39FF14]"
              whileHover={{ 
                scale: 1.1, 
                textShadow: "0 0 10px rgba(57, 255, 20, 0.7)" 
              }}
              transition={{ duration: 0.2 }}
            >
              BEAST
            </motion.span>MODE
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-300 max-w-3xl mx-auto"
            variants={titleVariants}
          >
            We combine state-of-the-art equipment, expert coaching, and a motivating atmosphere to help you achieve results faster than ever before.
          </motion.p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          viewport={{ once: true, amount: 0.1 }}
        >
          {benefits.map((benefit, index) => (
            <motion.div 
              key={index} 
              className="benefit-card bg-[#121212] rounded-lg p-8 transition-all duration-300 h-full"
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              whileHover="hover"
              animate="rest"
              variants={{
                hidden: benefit.animation.hidden,
                visible: benefit.animation.visible,
                hover: cardHover.hover,
                rest: cardHover.rest
              }}
            >
              <motion.div 
                className={`${benefit.iconColor} text-4xl mb-4`}
                whileHover={{ 
                  scale: 1.2, 
                  rotate: [0, -10, 10, -5, 0],
                  transition: { duration: 0.5 }
                }}
              >
                <i className={benefit.icon}></i>
              </motion.div>
              <motion.h3 
                className="text-xl font-poppins font-bold mb-3"
                whileHover={{ 
                  color: benefit.iconColor.replace('text-', ''), 
                  transition: { duration: 0.2 } 
                }}
              >
                {benefit.title}
              </motion.h3>
              <p className="text-gray-300">{benefit.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Benefits;
