import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/use-auth';
import { useLocation } from 'wouter';
import { getUserBookings } from '@/lib/firebase';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

type Booking = {
  id: string;
  classId: string;
  scheduleId: string;
  bookingDate: string;
  status: string;
  createdAt: any;
  className?: string;
  instructorName?: string;
  timeSlot?: string;
};

const UserProfile = () => {
  const { user, profile, loading } = useAuth();
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState('bookings');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [bookingsLoading, setBookingsLoading] = useState(true);
  
  // Redirect non-authenticated users to home
  useEffect(() => {
    if (!loading && !user) {
      setLocation('/');
    }
  }, [user, loading, setLocation]);

  // Fetch user bookings
  useEffect(() => {
    const fetchBookings = async () => {
      if (user) {
        try {
          setBookingsLoading(true);
          const userBookings = await getUserBookings(user.uid);
          
          // Transform data with placeholder class details
          // In a real app, you would join this with class data
          const formattedBookings = userBookings.map((booking: any) => ({
            ...booking,
            className: 'Sample Class', // In real app: fetch from classes collection
            instructorName: 'John Trainer', // In real app: fetch from classes/instructors collection
            timeSlot: '08:00 - 09:00' // In real app: format from schedule data
          }));
          
          setBookings(formattedBookings);
        } catch (error) {
          console.error('Error fetching bookings:', error);
        } finally {
          setBookingsLoading(false);
        }
      }
    };
    
    fetchBookings();
  }, [user]);

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

  if (!user) {
    return (
      <div className="py-20 bg-[#121212] min-h-screen">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-poppins font-bold mb-4">Access Denied</h2>
          <p className="text-xl text-gray-300 mb-8">
            Please login to access your profile.
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

  return (
    <section className="py-20 bg-[#121212] min-h-screen" id="profile">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-poppins font-bold mb-4">
            MY <span className="text-[#39FF14]">PROFILE</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Welcome back, {profile?.firstName || user.displayName || user.email?.split('@')[0]}!
          </p>
        </motion.div>

        <div className="bg-[#1A1A1A] rounded-xl p-6 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-[#222] flex items-center justify-center text-3xl font-bold">
              {profile?.firstName?.[0]}{profile?.lastName?.[0] || ''}
            </div>
            
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-2">{profile?.firstName} {profile?.lastName}</h3>
              <p className="text-gray-400 mb-1">{user.email}</p>
              <p className="text-gray-400 mb-1">{profile?.phone || 'No phone number added'}</p>
              <div className="mt-2">
                <span className="inline-block px-3 py-1 bg-[#39FF14] text-black rounded-full text-sm font-medium">
                  {profile?.membershipType || 'Basic'} Membership
                </span>
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="bookings" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full max-w-md grid-cols-2 mb-8 bg-[#1A1A1A]">
            <TabsTrigger value="bookings" className="data-[state=active]:bg-[#39FF14] data-[state=active]:text-black">
              My Bookings
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-[#39FF14] data-[state=active]:text-black">
              Profile Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="bookings">
            <Card className="bg-[#1A1A1A] border-[#333]">
              <CardHeader>
                <CardTitle>Your Class Bookings</CardTitle>
                <CardDescription>Manage your scheduled classes</CardDescription>
              </CardHeader>
              <CardContent>
                {bookingsLoading ? (
                  <div className="grid grid-cols-1 gap-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="h-24 bg-[#222] rounded-lg animate-pulse"></div>
                    ))}
                  </div>
                ) : bookings.length === 0 ? (
                  <div className="text-center py-8">
                    <h3 className="text-xl font-semibold mb-2">No bookings yet</h3>
                    <p className="text-gray-400 mb-6">You haven't booked any classes yet.</p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-[#39FF14] text-black font-poppins font-semibold px-6 py-3 rounded-md transition-all"
                      onClick={() => setLocation('/#book-class')}
                    >
                      Book a Class
                    </motion.button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-4">
                    {bookings.map((booking) => (
                      <div key={booking.id} className="bg-[#222] p-4 rounded-lg">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                          <div>
                            <h4 className="text-lg font-semibold">{booking.className}</h4>
                            <p className="text-gray-400">Instructor: {booking.instructorName}</p>
                            <p className="text-gray-400">
                              {new Date(booking.bookingDate).toLocaleDateString()} at {booking.timeSlot}
                            </p>
                          </div>
                          <div className="mt-3 md:mt-0">
                            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                              booking.status === 'confirmed' 
                                ? 'bg-green-900 text-green-200' 
                                : 'bg-yellow-900 text-yellow-200'
                            }`}>
                              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card className="bg-[#1A1A1A] border-[#333]">
              <CardHeader>
                <CardTitle>Profile Settings</CardTitle>
                <CardDescription>Update your personal information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <h3 className="text-xl font-semibold mb-2">Profile Settings</h3>
                  <p className="text-gray-400 mb-6">
                    Profile settings form would appear here in the full implementation.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default UserProfile;