// Form submission types
export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  goal: string;
}

// Benefits section data
export interface Benefit {
  icon: string;
  iconColor: string;
  title: string;
  description: string;
}

// Classes section data
export interface GymClass {
  image: string;
  category: string;
  categoryColor: string;
  title: string;
  description: string;
}

// Trainers section data
export interface Trainer {
  image: string;
  name: string;
  specialty: string;
  specialtyColor: string;
  bio: string;
  social: {
    instagram?: string;
    twitter?: string;
    linkedin?: string;
  };
}

// Pricing section data
export interface PricingPlan {
  title: string;
  price: number;
  description: string;
  features: {
    included: string[];
    excluded: string[];
  };
  popular?: boolean;
}

// Testimonials section data
export interface Testimonial {
  beforeImage: string;
  afterImage: string;
  quote: string;
  name: string;
  duration: string;
  rating: number;
}

// Facilities section data
export interface Facility {
  image: string;
  alt: string;
}

// FAQ section data
export interface FAQ {
  question: string;
  answer: string;
}
