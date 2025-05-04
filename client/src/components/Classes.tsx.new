import { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { GymClass } from '@/lib/types';
import { slideFromLeft, slideFromRight, slideFromBottom, tabHover, cardHover } from '@/lib/animations';

const classes: GymClass[] = [
  {
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80",
    category: "HIIT",
    categoryColor: "bg-[#FF5500]",
    title: "BEAST Circuit",
    description: "High-intensity interval training to maximize calorie burn and build strength."
  },
  {
    image: "https://images.unsplash.com/photo-1533681904393-9ab6eee7e408?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80",
    category: "Strength",
    categoryColor: "bg-[#0066FF]",
    title: "PowerLift",
    description: "Build raw strength and power with focused lifting techniques."
  },
  {
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80",
    category: "Cardio",
    categoryColor: "bg-[#FF3A3A]",
    title: "Cardio Blast",
    description: "Elevate your heart rate and endurance with dynamic cardio sessions."
  }
];

const filters = ["All Classes", "HIIT", "Strength", "Cardio", "Mind & Body"];

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

const filterContainerVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
      delayChildren: 0.2,
      staggerChildren: 0.05
    }
  }
};

const filterItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
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

const Classes = () => {
  const [activeFilter, setActiveFilter] = useState("All Classes");
  const controls = useAnimation();

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('classes');
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

  // The direction of slide animation alternates for a more dynamic layout
  const getSlideAnimation = (index: number) => {
    if (index % 3 === 0) return slideFromLeft;
    if (index % 3 === 1) return slideFromBottom;
    return slideFromRight;
  };

  return (
    <section className="py-20 bg-[#121212] overflow-hidden" id="classes">
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
            OUR <motion.span 
              className="text-[#FF5500]"
              whileHover={{ 
                scale: 1.1, 
                textShadow: "0 0 10px rgba(255, 85, 0, 0.7)" 
              }}
              transition={{ duration: 0.2 }}
            >
              CLASSES
            </motion.span>
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-300 max-w-3xl mx-auto"
            variants={headerVariants}
          >
            From high-intensity training to mindful movement, our diverse class lineup has something for every fitness level and goal.
          </motion.p>
        </motion.div>
        
        <motion.div 
          className="flex justify-center mb-10 overflow-x-auto"
          initial="hidden"
          animate={controls}
          variants={filterContainerVariants}
        >
          <div className="inline-flex bg-[#1A1A1A] rounded-full p-1">
            {filters.map((filter, index) => (
              <motion.button 
                key={index}
                className={`px-6 py-2 rounded-full font-poppins font-medium transition-colors ${activeFilter === filter ? 'bg-[#FF5500] text-white' : 'hover:bg-gray-800 text-white'}`}
                onClick={() => setActiveFilter(filter)}
                variants={filterItemVariants}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 10px rgba(255, 85, 0, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.span
                  initial={{ color: activeFilter === filter ? "#FFFFFF" : "#FFFFFF" }}
                  whileHover={{ 
                    color: activeFilter === filter ? "#FFFFFF" : "#FF5500",
                    transition: { duration: 0.2 }
                  }}
                >
                  {filter}
                </motion.span>
              </motion.button>
            ))}
          </div>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          viewport={{ once: true }}
        >
          {classes.map((gymClass, index) => {
            const slideAnimation = getSlideAnimation(index);
            
            return (
              <motion.div 
                key={index} 
                className="class-card relative overflow-hidden rounded-lg group cursor-pointer"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                custom={index}
                variants={{
                  hidden: slideAnimation.hidden,
                  visible: slideAnimation.visible(index)
                }}
                whileHover={{ 
                  scale: 1.03, 
                  y: -10,
                  transition: { duration: 0.3 }
                }}
              >
                <div className="overflow-hidden rounded-lg">
                  <motion.img 
                    src={gymClass.image} 
                    alt={gymClass.title} 
                    className="w-full h-64 object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <motion.span 
                    className={`inline-block px-3 py-1 ${gymClass.categoryColor} text-white text-sm font-medium rounded-full mb-3`}
                    whileHover={{
                      scale: 1.1,
                      boxShadow: gymClass.categoryColor === "bg-[#FF5500]" ? 
                        "0 0 10px rgba(255, 85, 0, 0.7)" : 
                        gymClass.categoryColor === "bg-[#0066FF]" ?
                        "0 0 10px rgba(0, 102, 255, 0.7)" :
                        "0 0 10px rgba(255, 58, 58, 0.7)"
                    }}
                  >
                    {gymClass.category}
                  </motion.span>
                  <motion.h3 
                    className="text-2xl font-poppins font-bold mb-2"
                    whileHover={{ 
                      scale: 1.05,
                      textShadow: "0 0 8px rgba(255, 255, 255, 0.5)"
                    }}
                  >
                    {gymClass.title}
                  </motion.h3>
                  <p className="text-gray-200 mb-4">{gymClass.description}</p>
                  <motion.a 
                    href="#join-now" 
                    className="inline-flex items-center font-poppins font-medium text-[#39FF14]"
                    whileHover={{ 
                      x: 5,
                      textShadow: "0 0 8px rgba(57, 255, 20, 0.7)" 
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    Book Now 
                    <motion.i 
                      className="fas fa-arrow-right ml-2"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ 
                        duration: 1.5, 
                        repeat: Infinity,
                        ease: "easeInOut" 
                      }}
                    ></motion.i>
                  </motion.a>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
        
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
        >
          <motion.a 
            href="#schedule" 
            className="inline-flex items-center text-xl font-poppins font-medium text-white hover:text-[#FF5500] transition-colors"
            whileHover={{ 
              color: "#FF5500",
              scale: 1.05
            }}
          >
            View Full Schedule 
            <motion.i 
              className="fas fa-arrow-right ml-2"
              animate={{ x: [0, 5, 0] }}
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

export default Classes;