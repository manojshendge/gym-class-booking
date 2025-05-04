import { useState, useEffect } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import PreLoader from "@/components/PreLoader";
import { motion, AnimatePresence } from "framer-motion";
import { AuthProvider } from "@/hooks/use-auth";
import { trackEvent } from "@/lib/firebase";
import { getEnvVar } from "@/lib/env-utils";

function Router() {
  return (
    <AnimatePresence mode="wait">
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </AnimatePresence>
  );
}

function App() {
  const [appReady, setAppReady] = useState(false);
  const [firebaseConfigured, setFirebaseConfigured] = useState(false);

  useEffect(() => {
    // Optional: Wait for fonts and resources to load
    const handleLoad = () => {
      // Once everything is loaded, set appReady to true
      // The PreLoader component will handle its own animation timing
      setAppReady(true);
    };
    
    window.addEventListener('load', handleLoad);

    // If window already loaded, set appReady to true
    if (document.readyState === 'complete') {
      setAppReady(true);
    }

    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  // Check if Firebase is configured
  useEffect(() => {
    const checkFirebaseConfig = async () => {
      try {
        const apiKey = getEnvVar('VITE_FIREBASE_API_KEY');
        const projectId = getEnvVar('VITE_FIREBASE_PROJECT_ID');
        const appId = getEnvVar('VITE_FIREBASE_APP_ID');

        if (apiKey && projectId && appId) {
          setFirebaseConfigured(true);
          
          // Track page view for analytics - with error handling
          setTimeout(() => {
            try {
              trackEvent('page_view', { page_path: window.location.pathname });
            } catch (error) {
              console.warn('Analytics tracking error:', error);
            }
          }, 2000); // Delay to ensure Firebase is fully initialized
        } else {
          console.warn('Firebase configuration missing. Some features will be unavailable.');
        }
      } catch (error) {
        console.warn('Firebase configuration check error:', error);
      }
    };

    checkFirebaseConfig();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <PreLoader />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 1,
              transition: { delay: 2.8, duration: 0.5 } 
            }}
          >
            <Router />
          </motion.div>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
