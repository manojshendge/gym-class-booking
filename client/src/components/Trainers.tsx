import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import { Trainer } from '@/lib/types';
import { 
  slideFromLeft, 
  slideFromRight, 
  slideFromTop, 
  slideFromBottom,
  fadeIn 
} from '@/lib/animations';

const trainers: Trainer[] = [
  {
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=600&q=80",
    name: "Alex Johnson",
    specialty: "Strength & Conditioning",
    specialtyColor: "text-[#0066FF]",
    bio: "Former competitive powerlifter with 10+ years of coaching experience specializing in strength development.",
    social: {
      instagram: "#",
      twitter: "#",
      linkedin: "#"
    }
  },
  {
    image: "https://images.unsplash.com/photo-1609899537878-88d5ba422bb9?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=600&q=80",
    name: "Sarah Martinez",
    specialty: "HIIT & Functional Training",
    specialtyColor: "text-[#FF5500]",
    bio: "CrossFit Level 2 coach specializing in high-intensity workouts and functional movement patterns.",
    social: {
      instagram: "#",
      twitter: "#",
      linkedin: "#"
    }
  },
  {
    image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=600&q=80",
    name: "Marcus Lee",
    specialty: "Nutrition & Weight Management",
    specialtyColor: "text-[#39FF14]",
    bio: "Certified nutritionist and personal trainer helping clients achieve sustainable weight management goals.",
    social: {
      instagram: "#",
      twitter: "#",
      linkedin: "#"
    }
  },
  {
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=600&q=80",
    name: "Jessica Kim",
    specialty: "Mobility & Recovery",
    specialtyColor: "text-[#FF3A3A]",
    bio: "Specializes in injury prevention, flexibility training, and recovery techniques to optimize performance.",
    social: {
      instagram: "#",
      twitter: "#",
      linkedin: "#"
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

// Get a different slide-in animation for each trainer for visual interest
const getSlideAnimation = (index: number) => {
  if (index % 4 === 0) return slideFromLeft;
  if (index % 4 === 1) return slideFromTop;
  if (index % 4 === 2) return slideFromRight;
  return slideFromBottom;
};

const Trainers = () => {
  const controls = useAnimation();

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('trainers');
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
    <section className="py-20 bg-[#1A1A1A] overflow-hidden" id="trainers">
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
            MEET OUR <motion.span 
              className="text-[#0066FF]"
              whileHover={{ 
                scale: 1.1, 
                textShadow: "0 0 10px rgba(0, 102, 255, 0.7)" 
              }}
              transition={{ duration: 0.2 }}
            >
              TRAINERS
            </motion.span>
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-300 max-w-3xl mx-auto"
            variants={headerVariants}
          >
            Our certified fitness experts are dedicated to helping you achieve your goals with personalized guidance and motivation.
          </motion.p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          viewport={{ once: true }}
        >
          {trainers.map((trainer, index) => {
            const slideAnimation = getSlideAnimation(index);
            
            return (
              <motion.div 
                key={index} 
                className="trainer-card bg-[#121212] rounded-lg overflow-hidden transition-all duration-300 h-full"
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={slideAnimation}
                whileHover={{ 
                  y: -10,
                  boxShadow: `0 10px 25px rgba(0, 0, 0, 0.3), 0 0 10px ${
                    trainer.specialtyColor === "text-[#0066FF]" ? "rgba(0, 102, 255, 0.3)" :
                    trainer.specialtyColor === "text-[#FF5500]" ? "rgba(255, 85, 0, 0.3)" :
                    trainer.specialtyColor === "text-[#39FF14]" ? "rgba(57, 255, 20, 0.3)" :
                    "rgba(255, 58, 58, 0.3)"
                  }`,
                  transition: { duration: 0.3 }
                }}
              >
                <div className="relative overflow-hidden">
                  <motion.img 
                    src={trainer.image} 
                    alt={trainer.name} 
                    className="w-full h-80 object-cover"
                    whileHover={{ 
                      scale: 1.05,
                      transition: { duration: 0.5 }
                    }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                    <motion.h3 
                      className="text-xl font-poppins font-bold"
                      whileHover={{
                        textShadow: "0 0 8px rgba(255, 255, 255, 0.5)"
                      }}
                    >
                      {trainer.name}
                    </motion.h3>
                    <motion.p 
                      className={`${trainer.specialtyColor} font-medium`}
                      whileHover={{
                        x: 5,
                        textShadow: trainer.specialtyColor === "text-[#0066FF]" ? 
                          "0 0 8px rgba(0, 102, 255, 0.7)" :
                          trainer.specialtyColor === "text-[#FF5500]" ? 
                          "0 0 8px rgba(255, 85, 0, 0.7)" :
                          trainer.specialtyColor === "text-[#39FF14]" ?
                          "0 0 8px rgba(57, 255, 20, 0.7)" :
                          "0 0 8px rgba(255, 58, 58, 0.7)"
                      }}
                    >
                      {trainer.specialty}
                    </motion.p>
                  </div>
                </div>
                <motion.div 
                  className="p-6"
                  variants={fadeIn}
                  custom={index + 1}
                >
                  <p className="text-gray-300 mb-4">{trainer.bio}</p>
                  <div className="flex space-x-3">
                    {trainer.social.instagram && (
                      <motion.a 
                        href={trainer.social.instagram} 
                        className="text-gray-400 hover:text-white transition-colors"
                        whileHover={{ 
                          scale: 1.2, 
                          rotate: [0, 5, -5, 0],
                          color: "#E1306C", // Instagram brand color
                          transition: { duration: 0.3 }
                        }}
                      >
                        <i className="fab fa-instagram"></i>
                      </motion.a>
                    )}
                    {trainer.social.twitter && (
                      <motion.a 
                        href={trainer.social.twitter} 
                        className="text-gray-400 hover:text-white transition-colors"
                        whileHover={{ 
                          scale: 1.2, 
                          rotate: [0, 5, -5, 0],
                          color: "#1DA1F2", // Twitter brand color
                          transition: { duration: 0.3 }
                        }}
                      >
                        <i className="fab fa-twitter"></i>
                      </motion.a>
                    )}
                    {trainer.social.linkedin && (
                      <motion.a 
                        href={trainer.social.linkedin} 
                        className="text-gray-400 hover:text-white transition-colors"
                        whileHover={{ 
                          scale: 1.2, 
                          rotate: [0, 5, -5, 0],
                          color: "#0A66C2", // LinkedIn brand color
                          transition: { duration: 0.3 }
                        }}
                      >
                        <i className="fab fa-linkedin"></i>
                      </motion.a>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Trainers;
