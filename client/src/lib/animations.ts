import { Variants } from 'framer-motion';

// Slide-in animation variants from different directions
export const slideFromLeft: Variants = {
  hidden: { x: -100, opacity: 0 },
  visible: (custom = 0) => ({
    x: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 12,
      delay: custom * 0.1,
    },
  }),
};

export const slideFromRight: Variants = {
  hidden: { x: 100, opacity: 0 },
  visible: (custom = 0) => ({
    x: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 12,
      delay: custom * 0.1,
    },
  }),
};

export const slideFromTop: Variants = {
  hidden: { y: -100, opacity: 0 },
  visible: (custom = 0) => ({
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 12,
      delay: custom * 0.1,
    },
  }),
};

export const slideFromBottom: Variants = {
  hidden: { y: 100, opacity: 0 },
  visible: (custom = 0) => ({
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 12,
      delay: custom * 0.1,
    },
  }),
};

// Staggered container variants
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

// Card hover animations
export const cardHover = {
  rest: { scale: 1, boxShadow: '0 0 0px rgba(57, 255, 20, 0)' },
  hover: { 
    scale: 1.05, 
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2), 0 0 10px rgba(57, 255, 20, 0.5)',
    transition: {
      duration: 0.3,
      ease: 'easeOut'
    }
  }
};

// Tab hover animations
export const tabHover = {
  rest: { scale: 1 },
  hover: { 
    scale: 1.1,
    transition: {
      duration: 0.2,
      ease: 'easeOut'
    }
  }
};

// Reveal on scroll utility for sections
export const revealOnScroll: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut'
    }
  }
};

// Fade in variants
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: (custom = 0) => ({
    opacity: 1,
    transition: {
      duration: 0.6,
      delay: custom * 0.1,
    },
  }),
};

// Pulse animation
export const pulseAnimation = {
  rest: { scale: 1 },
  pulse: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      repeatType: 'reverse' as const,
      ease: 'easeInOut'
    }
  }
};

// Rotate animation
export const rotateAnimation = {
  rest: { rotate: 0 },
  rotate: {
    rotate: 360,
    transition: {
      duration: 20,
      repeat: Infinity,
      ease: 'linear'
    }
  }
};

// Text highlight animations
export const highlightText = {
  rest: { 
    color: '#FFFFFF',
    textShadow: '0 0 0px rgba(57, 255, 20, 0)'
  },
  highlight: { 
    color: '#39FF14',
    textShadow: '0 0 10px rgba(57, 255, 20, 0.5)',
    transition: {
      duration: 0.3,
      ease: 'easeOut'
    }
  }
};