import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { checkReveal } from '@/lib/utils';
import { useAuth } from '@/hooks/use-auth';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import PromoBanner from '@/components/PromoBanner';
import Benefits from '@/components/Benefits';
import Classes from '@/components/Classes';
import Trainers from '@/components/Trainers';
import Pricing from '@/components/Pricing';
import Testimonials from '@/components/Testimonials';
import Facilities from '@/components/Facilities';
import Faq from '@/components/Faq';
import AppPromo from '@/components/AppPromo';
import JoinNow from '@/components/JoinNow';
import Footer from '@/components/Footer';
import CookieBanner from '@/components/CookieBanner';

// New components for the requested features
import Newsletter from '@/components/Newsletter';
import ClassBooking from '@/components/ClassBooking';
import AnalyticsDashboard from '@/components/AnalyticsDashboard';
import AuthModal from '@/components/auth/AuthModal';

const Home = () => {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    // Initial check
    checkReveal();
    
    // Add scroll event listener
    window.addEventListener("scroll", checkReveal);
    
    // Clean up on component unmount
    return () => {
      window.removeEventListener("scroll", checkReveal);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Header onLoginClick={() => setAuthModalOpen(true)} user={user} />
      <Hero />
      <PromoBanner />
      <Benefits />
      <Classes />
      <ClassBooking />
      <Trainers />
      <Pricing />
      <Testimonials />
      <Facilities />
      <Newsletter />
      <Faq />
      <AppPromo />
      {user && <AnalyticsDashboard />}
      <JoinNow />
      <Footer />
      <CookieBanner />
      
      {/* Auth Modal for login/register */}
      <AuthModal isOpen={authModalOpen} setIsOpen={setAuthModalOpen} />
    </motion.div>
  );
};

export default Home;
