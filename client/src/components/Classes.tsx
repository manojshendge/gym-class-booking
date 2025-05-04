import { useState } from 'react';
import { motion } from 'framer-motion';
import { GymClass } from '@/lib/types';

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

const Classes = () => {
  const [activeFilter, setActiveFilter] = useState("All Classes");

  return (
    <section className="py-20 bg-[#121212] reveal" id="classes">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-poppins font-bold mb-4">OUR <span className="text-[#FF5500]">CLASSES</span></h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">From high-intensity training to mindful movement, our diverse class lineup has something for every fitness level and goal.</p>
        </div>
        
        <div className="flex justify-center mb-10 overflow-x-auto">
          <div className="inline-flex bg-[#1A1A1A] rounded-full p-1">
            {filters.map((filter, index) => (
              <button 
                key={index}
                className={`px-6 py-2 rounded-full font-poppins font-medium transition-colors ${activeFilter === filter ? 'bg-[#FF5500] text-white' : 'hover:bg-gray-800 text-white'}`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
          viewport={{ once: true }}
        >
          {classes.map((gymClass, index) => (
            <motion.div 
              key={index} 
              className="class-card relative overflow-hidden rounded-lg group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <img 
                src={gymClass.image} 
                alt={gymClass.title} 
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <span className={`inline-block px-3 py-1 ${gymClass.categoryColor} text-white text-sm font-medium rounded-full mb-3`}>
                  {gymClass.category}
                </span>
                <h3 className="text-2xl font-poppins font-bold mb-2">{gymClass.title}</h3>
                <p className="text-gray-200 mb-4">{gymClass.description}</p>
                <a href="#join-now" className="inline-flex items-center font-poppins font-medium text-[#39FF14]">
                  Book Now <i className="fas fa-arrow-right ml-2"></i>
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="mt-12 text-center">
          <a href="#schedule" className="inline-flex items-center text-xl font-poppins font-medium text-white hover:text-[#39FF14] transition-colors">
            View Full Schedule <i className="fas fa-arrow-right ml-2"></i>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Classes;
