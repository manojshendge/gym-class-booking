import { motion } from 'framer-motion';
import { Trainer } from '@/lib/types';

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

const Trainers = () => {
  return (
    <section className="py-20 bg-[#1A1A1A] reveal" id="trainers">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-poppins font-bold mb-4">MEET OUR <span className="text-[#0066FF]">TRAINERS</span></h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">Our certified fitness experts are dedicated to helping you achieve your goals with personalized guidance and motivation.</p>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {trainers.map((trainer, index) => (
            <motion.div 
              key={index} 
              className="trainer-card bg-[#121212] rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                <img src={trainer.image} alt={trainer.name} className="w-full h-80 object-cover" />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                  <h3 className="text-xl font-poppins font-bold">{trainer.name}</h3>
                  <p className={`${trainer.specialtyColor} font-medium`}>{trainer.specialty}</p>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-300 mb-4">{trainer.bio}</p>
                <div className="flex space-x-3">
                  {trainer.social.instagram && (
                    <a href={trainer.social.instagram} className="text-gray-400 hover:text-white transition-colors">
                      <i className="fab fa-instagram"></i>
                    </a>
                  )}
                  {trainer.social.twitter && (
                    <a href={trainer.social.twitter} className="text-gray-400 hover:text-white transition-colors">
                      <i className="fab fa-twitter"></i>
                    </a>
                  )}
                  {trainer.social.linkedin && (
                    <a href={trainer.social.linkedin} className="text-gray-400 hover:text-white transition-colors">
                      <i className="fab fa-linkedin"></i>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Trainers;
