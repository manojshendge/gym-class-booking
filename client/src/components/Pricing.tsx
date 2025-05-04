import { motion } from 'framer-motion';
import { PricingPlan } from '@/lib/types';

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

const Pricing = () => {
  return (
    <section className="py-20 bg-[#121212] reveal" id="pricing">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-poppins font-bold mb-4">MEMBERSHIP <span className="text-[#39FF14]">PLANS</span></h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">Choose the perfect plan that fits your fitness goals and budget. All memberships include 24/7 access and basic amenities.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div 
              key={index}
              className={`pricing-card rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg 
                ${plan.popular 
                  ? 'bg-gradient-to-br from-[#121212] to-[#FF5500]/60 border-2 border-[#FF5500] relative transform scale-105 shadow-lg' 
                  : 'bg-[#1A1A1A] hover:transform hover:scale-105'}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-[#FF5500] text-white font-poppins font-bold py-1 px-4 rounded-bl-lg">
                  MOST POPULAR
                </div>
              )}
              <div className="p-8">
                <h3 className="text-2xl font-poppins font-bold mb-2">{plan.title}</h3>
                <div className="text-4xl font-poppins font-bold mb-4">
                  <span className="text-white">${plan.price}</span>
                  <span className="text-gray-400 text-lg font-normal">/month</span>
                </div>
                <p className={`${plan.popular ? 'text-gray-200' : 'text-gray-300'} mb-6`}>{plan.description}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.included.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <i className="fas fa-check text-[#39FF14] mt-1 mr-3"></i>
                      <span>{feature}</span>
                    </li>
                  ))}
                  {plan.features.excluded.map((feature, i) => (
                    <li key={i} className="flex items-start text-gray-500">
                      <i className="fas fa-times mt-1 mr-3"></i>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <motion.a 
                  href="#join-now" 
                  className={`block text-center font-poppins font-semibold px-6 py-3 rounded-lg transition-all
                    ${plan.popular
                      ? 'bg-[#FF5500] hover:bg-orange-600 text-white cta-pulse'
                      : 'bg-[#1A1A1A] border-2 border-white hover:border-[#39FF14] hover:text-[#39FF14] text-white'}`}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Choose Plan
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-lg mb-6">All memberships include access to our mobile app, locker rooms, and basic amenities.<br/>
          No long-term contracts - cancel anytime with 30 days notice.</p>
          <a href="#" className="text-[#39FF14] font-poppins font-medium hover:underline">View complete membership details</a>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
