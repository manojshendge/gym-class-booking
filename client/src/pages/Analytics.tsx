import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/use-auth';
import { useLocation } from 'wouter';
import AnalyticsDashboard from '@/components/AnalyticsDashboard';

const Analytics = () => {
  const { user, loading, hasAdminAccess } = useAuth();
  const [, setLocation] = useLocation();
  
  // Redirect non-admin users to home
  useEffect(() => {
    if (!loading && (!user || !hasAdminAccess())) {
      setLocation('/');
    }
  }, [user, loading, hasAdminAccess, setLocation]);

  // Show loading or no access message while checking permissions
  if (loading) {
    return (
      <div className="py-20 bg-[#121212] min-h-screen">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-poppins font-bold mb-4">Loading...</h2>
        </div>
      </div>
    );
  }

  if (!user || !hasAdminAccess()) {
    return (
      <div className="py-20 bg-[#121212] min-h-screen">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-poppins font-bold mb-4">Access Denied</h2>
          <p className="text-xl text-gray-300 mb-8">
            You do not have permission to access this page.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#FF5500] hover:bg-orange-600 text-white font-poppins font-semibold px-6 py-3 rounded-md transition-all"
            onClick={() => setLocation('/')}
          >
            Return to Home
          </motion.button>
        </div>
      </div>
    );
  }

  return <AnalyticsDashboard />;
};

export default Analytics;