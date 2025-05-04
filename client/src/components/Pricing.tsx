import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import { PricingPlan } from '@/lib/types';
import { slideFromBottom, pulseAnimation } from '@/lib/animations';

const plans: PricingPlan[] = [
  {
    title: "Basic",
    price: 39,
    description: "Perfect for beginners looking to start their fitness journey.",
    features: {
      included: [
        "24/7 Gym Access",
        "Standard Equipment Use",
        "Locker Room Access"
      ],
      excluded: [
        "Group Classes",
        "Personal Training Sessions",
        "Nutrition Coaching"
      ]
    }
  },
  {
    title: "Premium",
    price: 69,
    description: "Our most popular choice for dedicated fitness enthusiasts.",
    features: {
      included: [
        "Everything in Basic",
        "Unlimited Group Classes",
        "Advanced Equipment Access",
        "Mobile App Premium Features",
        "1 Personal Training Session/Month"
      ],
      excluded: [
        "Nutrition Coaching"
      ]
    },
    popular: true
  },
  {
    title: "Elite",
    price: 129,
    description: "The ultimate fitness experience for maximum results.",
    features: {
      included: [
        "Everything in Premium",
        "Weekly Personal Training",
        "Customized Nutrition Plan",
        "Monthly Body Composition Analysis",
        "Recovery Zone Access",
        "Priority Class Booking"
      ],
      excluded: []
    }
  }
];

// Animation variants
const headerVariants = {
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

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 12,
      delay: index * 0.2
    }
  }),
  hover: { 
    y: -15,
    boxShadow: "0 20px 30px rgba(0, 0, 0, 0.2), 0 0 10px rgba(57, 255, 20, 0.2)",
    transition: {
      duration: 0.3
    }
  }
};

const featureItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (delay: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: delay * 0.05,
      duration: 0.3
    }
  })
};

const footerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.8,
      duration: 0.5
    }
  }
};

// Animation for checkmark and cross icons
const checkIconVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: (delay: number) => ({
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 15,
      delay: delay * 0.05
    }
  }),
  hover: {
    scale: 1.2,
    color: "#39FF14",
    transition: { duration: 0.2 }
  }
};

const crossIconVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: (delay: number) => ({
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 15,
      delay: delay * 0.05
    }
  }),
  hover: {
    scale: 1.2,
    color: "#FF3A3A",
    transition: { duration: 0.2 }
  }
};

const Pricing = () => {
  const controls = useAnimation();

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('pricing');
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
    <section className="py-20 bg-[#121212] overflow-hidden" id="pricing">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-poppins font-bold mb-4"
            variants={headerVariants}
          >
            MEMBERSHIP <motion.span 
              className="text-[#39FF14]"
              whileHover={{ 
                scale: 1.1, 
                textShadow: "0 0 10px rgba(57, 255, 20, 0.7)" 
              }}
              transition={{ duration: 0.2 }}
            >
              PLANS
            </motion.span>
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-300 max-w-3xl mx-auto"
            variants={headerVariants}
          >
            Choose the perfect plan that fits your fitness goals and budget. All memberships include 24/7 access and basic amenities.
          </motion.p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          {plans.map((plan, index) => (
            <motion.div 
              key={index}
              className={`pricing-card rounded-2xl overflow-hidden transition-all duration-300
                ${plan.popular 
                  ? 'bg-gradient-to-br from-[#121212] to-[#FF5500]/60 border-2 border-[#FF5500] relative transform scale-105 z-10' 
                  : 'bg-[#1A1A1A]'}`}
              custom={index}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true, amount: 0.3 }}
              variants={cardVariants}
            >
              {plan.popular && (
                <motion.div 
                  className="absolute top-0 right-0 bg-[#FF5500] text-white font-poppins font-bold py-1 px-4 rounded-bl-lg"
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                >
                  MOST POPULAR
                </motion.div>
              )}
              <div className="p-8">
                <motion.h3 
                  className="text-2xl font-poppins font-bold mb-2"
                  initial={{ opacity: 0, y: -10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    scale: 1.05,
                    color: plan.popular ? "#FF5500" : "#39FF14"
                  }}
                >
                  {plan.title}
                </motion.h3>
                <motion.div 
                  className="text-4xl font-poppins font-bold mb-4"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    delay: index * 0.1 + 0.3,
                    type: "spring",
                    stiffness: 100
                  }}
                  viewport={{ once: true }}
                >
                  <motion.span 
                    className="text-white"
                    whileHover={{ 
                      scale: 1.1, 
                      color: plan.popular ? "#FF5500" : "#39FF14",
                      transition: { duration: 0.2 }
                    }}
                  >
                    ${plan.price}
                  </motion.span>
                  <span className="text-gray-400 text-lg font-normal">/month</span>
                </motion.div>
                <motion.p 
                  className={`${plan.popular ? 'text-gray-200' : 'text-gray-300'} mb-6`}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.4 }}
                  viewport={{ once: true }}
                >
                  {plan.description}
                </motion.p>
                <ul className="space-y-3 mb-8">
                  {plan.features.included.map((feature, i) => (
                    <motion.li 
                      key={i} 
                      className="flex items-start"
                      custom={i}
                      initial="hidden"
                      whileInView="visible"
                      whileHover={{ x: 5 }}
                      viewport={{ once: true }}
                      variants={featureItemVariants}
                    >
                      <motion.i 
                        className="fas fa-check text-[#39FF14] mt-1 mr-3"
                        variants={checkIconVariants}
                        custom={i}
                        whileHover="hover"
                      ></motion.i>
                      <span>{feature}</span>
                    </motion.li>
                  ))}
                  {plan.features.excluded.map((feature, i) => (
                    <motion.li 
                      key={i} 
                      className="flex items-start text-gray-500"
                      custom={i + plan.features.included.length}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={featureItemVariants}
                    >
                      <motion.i 
                        className="fas fa-times mt-1 mr-3"
                        variants={crossIconVariants}
                        custom={i}
                        whileHover="hover"
                      ></motion.i>
                      <span>{feature}</span>
                    </motion.li>
                  ))}
                </ul>
                <motion.a 
                  href="#join-now" 
                  className={`block text-center font-poppins font-semibold px-6 py-3 rounded-lg transition-all
                    ${plan.popular
                      ? 'bg-[#FF5500] hover:bg-orange-600 text-white'
                      : 'bg-[#1A1A1A] border-2 border-white hover:border-[#39FF14] hover:text-[#39FF14] text-white'}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: plan.popular 
                      ? "0 0 15px rgba(255, 85, 0, 0.7)" 
                      : "0 0 15px rgba(57, 255, 20, 0.5)"
                  }}
                  whileTap={{ scale: 0.97 }}
                  animate={plan.popular ? "pulse" : "rest"}
                  variants={pulseAnimation}
                >
                  Choose Plan
                </motion.a>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="mt-16 text-center"
          initial="hidden"
          animate={controls}
          variants={footerVariants}
        >
          <motion.p 
            className="text-lg mb-6"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            viewport={{ once: true }}
          >
            All memberships include access to our mobile app, locker rooms, and basic amenities.<br/>
            No long-term contracts - cancel anytime with 30 days notice.
          </motion.p>
          <motion.a 
            href="#" 
            className="text-[#39FF14] font-poppins font-medium inline-block"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            viewport={{ once: true }}
            whileHover={{ 
              scale: 1.05, 
              x: 5,
              textShadow: "0 0 10px rgba(57, 255, 20, 0.5)" 
            }}
          >
            View complete membership details
            <motion.i 
              className="fas fa-arrow-right ml-2"
              animate={{ x: [0, 3, 0] }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut" 
              }}
            ></motion.i>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;
