import { useState } from 'react';
import { motion } from 'framer-motion';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { subscribeToNewsletter } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const newsletterSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

type NewsletterValues = z.infer<typeof newsletterSchema>;

const Newsletter = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<NewsletterValues>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
    },
  });

  const onSubmit = async (values: NewsletterValues) => {
    setIsSubmitting(true);
    try {
      await subscribeToNewsletter(values.email, values.firstName, values.lastName);
      toast({
        title: 'Subscription successful!',
        description: 'Thank you for subscribing to our newsletter.',
      });
      form.reset();
    } catch (error: any) {
      toast({
        title: 'Subscription failed',
        description: error.message || 'Failed to subscribe. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 bg-[#121212]" id="newsletter">
      <div className="container mx-auto px-4">
        <motion.div 
          className="bg-gradient-to-r from-[#1A1A1A] to-[#222] rounded-2xl p-8 md:p-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <motion.h2 
                className="text-3xl md:text-4xl font-poppins font-bold mb-4"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Get <span className="text-[#39FF14]">Fitness Tips</span> &<br />
                Exclusive Offers
              </motion.h2>
              <motion.p 
                className="text-gray-300 mb-6"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                Subscribe to our newsletter and receive workout tips, nutrition advice, and exclusive member offers direct to your inbox.
              </motion.p>
              <motion.div 
                className="flex items-center space-x-6 mb-6 md:mb-0"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center">
                  <i className="fas fa-check-circle text-[#39FF14] mr-2"></i>
                  <span>Weekly workouts</span>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-check-circle text-[#39FF14] mr-2"></i>
                  <span>Nutrition tips</span>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-check-circle text-[#39FF14] mr-2"></i>
                  <span>Special offers</span>
                </div>
              </motion.div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input 
                              placeholder="First Name (optional)" 
                              {...field} 
                              className="bg-[#1A1A1A] border-[#333] h-12"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input 
                              placeholder="Last Name (optional)" 
                              {...field} 
                              className="bg-[#1A1A1A] border-[#333] h-12"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input 
                            placeholder="Your Email Address" 
                            {...field} 
                            className="bg-[#1A1A1A] border-[#333] h-12"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-[#39FF14] hover:bg-green-400 text-black font-poppins font-bold h-12"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Subscribing...' : 'Subscribe Now'}
                  </Button>
                </form>
              </Form>
              <p className="text-xs text-gray-400 mt-4">
                By subscribing, you agree to receive marketing emails from BEASTMODE Gym. You can unsubscribe at any time.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;