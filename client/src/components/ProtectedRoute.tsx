import { ReactNode, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '@/hooks/use-auth';
import { motion } from 'framer-motion';

type ProtectedRouteProps = {
  children: ReactNode;
  requireAuth?: boolean;
  requireAdmin?: boolean;
  fallbackPath?: string;
};

/**
 * A wrapper component to protect routes based on authentication and role requirements
 * 
 * @param children - The components to render if conditions are met
 * @param requireAuth - Whether authentication is required (default: true)
 * @param requireAdmin - Whether admin access is required (default: false)
 * @param fallbackPath - Where to redirect if conditions are not met (default: '/')
 */
const ProtectedRoute = ({
  children,
  requireAuth = true,
  requireAdmin = false,
  fallbackPath = '/'
}: ProtectedRouteProps) => {
  const { user, loading, hasAdminAccess } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Only redirect after auth state is determined
    if (!loading) {
      if (requireAuth && !user) {
        // User not authenticated but route requires auth
        setLocation(fallbackPath);
      } else if (requireAdmin && !hasAdminAccess()) {
        // User authenticated but lacks required admin access
        setLocation(fallbackPath);
      }
    }
  }, [user, loading, requireAuth, requireAdmin, hasAdminAccess, fallbackPath, setLocation]);

  if (loading) {
    return (
      <div className="py-20 bg-[#121212] min-h-screen">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-poppins font-bold mb-4">Loading...</h2>
        </div>
      </div>
    );
  }

  // Check if conditions are not met (after loading is complete)
  if ((requireAuth && !user) || (requireAdmin && !hasAdminAccess())) {
    return (
      <div className="py-20 bg-[#121212] min-h-screen">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-poppins font-bold mb-4">Access Denied</h2>
          <p className="text-xl text-gray-300 mb-8">
            {!user 
              ? 'Please login to access this page.' 
              : 'You do not have permission to access this page.'}
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#FF5500] hover:bg-orange-600 text-white font-poppins font-semibold px-6 py-3 rounded-md transition-all"
            onClick={() => setLocation(fallbackPath)}
          >
            {fallbackPath === '/' ? 'Return to Home' : 'Go Back'}
          </motion.button>
        </div>
      </div>
    );
  }

  // All conditions met, render children
  return <>{children}</>;
};

export default ProtectedRoute;