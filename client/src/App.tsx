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

  useEffect(() => {
    // Optional: Wait for fonts and resources to load
    window.addEventListener('load', () => {
      // Once everything is loaded, set appReady to true
      // The PreLoader component will handle its own animation timing
      setAppReady(true);
    });

    // If window already loaded, set appReady to true
    if (document.readyState === 'complete') {
      setAppReady(true);
    }

    return () => {
      window.removeEventListener('load', () => setAppReady(true));
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
}

export default App;
