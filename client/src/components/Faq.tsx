import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FAQ } from '@/lib/types';

const faqs: FAQ[] = [
  {
    question: "What should I bring to my first workout?",
    answer: "We recommend comfortable workout clothes, athletic shoes, a water bottle, and a small towel. We provide lockers for your belongings, but you'll need to bring your own lock. For your first visit, arrive 15 minutes early to complete a brief orientation."
  },
  {
    question: "Can I pause or cancel my membership?",
    answer: "Yes, you can pause your membership for up to 3 months per year. To cancel, simply provide 30 days written notice. There are no cancellation fees or penalties for any of our membership plans."
  },
  {
    question: "Do you offer nutrition guidance?",
    answer: "Yes, our Elite membership includes personalized nutrition coaching. For Basic and Premium members, we offer nutrition workshops monthly and have certified nutritionists available for consultation at an additional cost."
  },
  {
    question: "What are your operating hours?",
    answer: "BEASTMODE is open 24/7 for all members. Our staffed hours are 6am-10pm Monday through Friday, and 8am-8pm on weekends. Personal trainers are available by appointment."
  },
  {
    question: "Is there a free trial available?",
    answer: "Yes! We offer a 7-day free trial so you can experience everything BEASTMODE has to offer before committing. Simply sign up on our website or visit us in person to get started."
  }
];

const Faq = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-[#1A1A1A] reveal" id="faq">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-poppins font-bold mb-4">FREQUENTLY ASKED <span className="text-[#39FF14]">QUESTIONS</span></h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">Everything you need to know about joining BEASTMODE and starting your fitness journey.</p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div 
              key={index} 
              className="faq-item mb-4 border-b border-gray-700 pb-4"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <button 
                className="faq-question w-full text-left flex justify-between items-center focus:outline-none"
                onClick={() => toggleExpand(index)}
              >
                <span className="font-poppins font-semibold text-xl">{faq.question}</span>
                <i className={`fas ${expandedIndex === index ? 'fa-minus' : 'fa-plus'} text-[#39FF14]`}></i>
              </button>
              <AnimatePresence>
                {expandedIndex === index && (
                  <motion.div 
                    className="faq-answer mt-3 text-gray-300"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p>{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;
