import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { getAvailableClasses, bookClass } from '@/lib/firebase';
import AuthModal from './auth/AuthModal';

import { Calendar } from '@/components/ui/calendar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

type Class = {
  id: string;
  name: string;
  description: string;
  category: string;
  instructor: string;
  capacity: number;
  duration: number;
  categoryColor?: string;
  schedules: Schedule[];
};

type Schedule = {
  id: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  availableSpots: number;
};

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const ClassBooking = () => {
  const [classes, setClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedClassId, setSelectedClassId] = useState<string | null>(null);
  const [selectedScheduleId, setSelectedScheduleId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('category');
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [bookingInProgress, setBookingInProgress] = useState(false);

  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const loadClasses = async () => {
      try {
        setLoading(true);
        const fetchedClasses = await getAvailableClasses();
        // Add category colors based on class category
        const processedClasses = fetchedClasses.map((cls: any) => ({
          ...cls,
          categoryColor: getCategoryColor(cls.category),
          schedules: cls.schedules || [],
        }));
        setClasses(processedClasses);
      } catch (error) {
        console.error('Failed to load classes:', error);
        toast({
          title: 'Failed to load classes',
          description: 'Please try again later.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    loadClasses();
  }, [toast]);

  const getCategoryColor = (category: string): string => {
    switch (category.toLowerCase()) {
      case 'hiit':
        return 'bg-[#FF5500]';
      case 'strength':
        return 'bg-[#0066FF]';
      case 'cardio':
        return 'bg-[#FF3A3A]';
      case 'yoga':
      case 'mind & body':
        return 'bg-[#39FF14]';
      default:
        return 'bg-[#9147FF]';
    }
  };

  const filteredClasses = activeTab === 'category' 
    ? classes 
    : classes.filter(cls => 
        cls.schedules.some(schedule => 
          schedule.dayOfWeek === selectedDate?.getDay()));

  const handleBookClass = async () => {
    if (!user) {
      setAuthModalOpen(true);
      return;
    }

    if (!selectedClassId || !selectedScheduleId || !selectedDate) {
      toast({
        title: 'Booking failed',
        description: 'Please select a class, time, and date.',
        variant: 'destructive',
      });
      return;
    }

    try {
      setBookingInProgress(true);
      const formattedDate = format(selectedDate, 'yyyy-MM-dd');
      await bookClass(user.uid, selectedClassId, selectedScheduleId, formattedDate);
      
      toast({
        title: 'Booking successful!',
        description: 'Your class has been booked. Check your email for details.',
      });
      
      // Reset selections
      setSelectedClassId(null);
      setSelectedScheduleId(null);
    } catch (error: any) {
      toast({
        title: 'Booking failed',
        description: error.message || 'Failed to book class. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setBookingInProgress(false);
    }
  };

  // Get available schedules for the selected class on the selected date
  const getAvailableSchedules = () => {
    if (!selectedClassId || !selectedDate) return [];
    
    const selectedClass = classes.find(cls => cls.id === selectedClassId);
    if (!selectedClass) return [];
    
    return selectedClass.schedules.filter(
      schedule => schedule.dayOfWeek === selectedDate.getDay()
    );
  };

  const availableSchedules = getAvailableSchedules();

  return (
    <section className="py-20 bg-[#121212]" id="book-class">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-poppins font-bold mb-4">
            BOOK A <span className="text-[#FF5500]">CLASS</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Reserve your spot in one of our high-energy classes. Easy booking, guaranteed results.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Tabs defaultValue="category" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-2 mb-6 bg-[#1A1A1A]">
                <TabsTrigger value="category" className="data-[state=active]:bg-[#FF5500] data-[state=active]:text-white">
                  By Category
                </TabsTrigger>
                <TabsTrigger value="date" className="data-[state=active]:bg-[#FF5500] data-[state=active]:text-white">
                  By Date
                </TabsTrigger>
              </TabsList>

              <TabsContent value="category" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {loading ? (
                    Array(4).fill(0).map((_, index) => (
                      <div 
                        key={index} 
                        className="h-32 bg-[#1A1A1A] rounded-lg animate-pulse"
                      ></div>
                    ))
                  ) : (
                    filteredClasses.map(cls => (
                      <motion.div
                        key={cls.id}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Card 
                          className={`cursor-pointer border-2 ${selectedClassId === cls.id ? 'border-[#FF5500]' : 'border-[#333]'} bg-[#1A1A1A] hover:bg-[#222]`}
                          onClick={() => setSelectedClassId(cls.id)}
                        >
                          <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                              <CardTitle className="text-xl font-poppins">{cls.name}</CardTitle>
                              <Badge className={`${cls.categoryColor} text-white`}>{cls.category}</Badge>
                            </div>
                            <CardDescription>{cls.duration} min • {cls.instructor}</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-gray-300">{cls.description}</p>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))
                  )}
                </div>
              </TabsContent>

              <TabsContent value="date">
                <div className="bg-[#1A1A1A] p-4 rounded-lg mb-6">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="text-white rounded-md bg-[#1A1A1A]"
                    classNames={{
                      head_cell: "text-white",
                      cell: "text-white h-9 w-9 text-center p-0 relative [&:has([aria-selected])]:bg-[#FF5500]/20",
                      day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
                      day_selected: "bg-[#FF5500] text-white hover:bg-[#FF5500] hover:text-white focus:bg-[#FF5500] focus:text-white",
                      day_today: "bg-[#333] text-white",
                      day_outside: "text-gray-500 opacity-50",
                      day_disabled: "text-gray-500 opacity-50",
                      day_range_middle: "aria-selected:bg-[#FF5500]/20 aria-selected:text-white",
                      day_hidden: "invisible",
                    }}
                  />
                </div>
                
                {selectedDate && (
                  <div className="mb-6">
                    <h3 className="text-lg font-poppins font-semibold mb-3">
                      Classes for {format(selectedDate, 'EEEE, MMMM d, yyyy')}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {loading ? (
                        Array(2).fill(0).map((_, index) => (
                          <div 
                            key={index} 
                            className="h-32 bg-[#1A1A1A] rounded-lg animate-pulse"
                          ></div>
                        ))
                      ) : filteredClasses.length === 0 ? (
                        <div className="col-span-2 bg-[#1A1A1A] p-6 rounded-lg text-center">
                          <p className="text-gray-400">No classes available on this date.</p>
                        </div>
                      ) : (
                        filteredClasses.map(cls => (
                          <motion.div
                            key={cls.id}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Card 
                              className={`cursor-pointer border-2 ${selectedClassId === cls.id ? 'border-[#FF5500]' : 'border-[#333]'} bg-[#1A1A1A] hover:bg-[#222]`}
                              onClick={() => setSelectedClassId(cls.id)}
                            >
                              <CardHeader className="pb-2">
                                <div className="flex justify-between items-start">
                                  <CardTitle className="text-xl font-poppins">{cls.name}</CardTitle>
                                  <Badge className={`${cls.categoryColor} text-white`}>{cls.category}</Badge>
                                </div>
                                <CardDescription>{cls.duration} min • {cls.instructor}</CardDescription>
                              </CardHeader>
                              <CardContent>
                                <p className="text-sm text-gray-300">
                                  {cls.schedules
                                    .filter(s => s.dayOfWeek === selectedDate.getDay())
                                    .map(s => `${s.startTime} - ${s.endTime}`)
                                    .join(', ')}
                                </p>
                              </CardContent>
                            </Card>
                          </motion.div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-[#1A1A1A] p-6 rounded-lg"
          >
            <h3 className="text-xl font-poppins font-bold mb-4">Booking Summary</h3>
            
            {selectedClassId ? (
              <div className="mb-6">
                <p className="text-sm text-gray-400 mb-1">Selected Class</p>
                <p className="text-lg font-medium">
                  {classes.find(c => c.id === selectedClassId)?.name}
                </p>
                <div className="flex items-center mt-2">
                  <Badge className={`${classes.find(c => c.id === selectedClassId)?.categoryColor} text-white mr-2`}>
                    {classes.find(c => c.id === selectedClassId)?.category}
                  </Badge>
                  <span className="text-sm text-gray-400">
                    {classes.find(c => c.id === selectedClassId)?.duration} min
                  </span>
                </div>
              </div>
            ) : (
              <div className="bg-[#222] p-4 rounded-lg mb-6 text-center">
                <p className="text-gray-400">Select a class to book</p>
              </div>
            )}

            <div className="mb-6">
              <p className="text-sm text-gray-400 mb-2">Select Date</p>
              <div className="bg-[#222] p-3 rounded-lg">
                {selectedDate ? (
                  <p className="font-medium">{format(selectedDate, 'EEEE, MMMM d, yyyy')}</p>
                ) : (
                  <p className="text-gray-500">Please select a date</p>
                )}
              </div>
            </div>

            {selectedClassId && availableSchedules.length > 0 && (
              <div className="mb-6">
                <p className="text-sm text-gray-400 mb-2">Select Time Slot</p>
                <Select 
                  value={selectedScheduleId || ''} 
                  onValueChange={setSelectedScheduleId}
                >
                  <SelectTrigger className="bg-[#222] border-[#333]">
                    <SelectValue placeholder="Select a time slot" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1A1A1A] border-[#333]">
                    {availableSchedules.map(schedule => (
                      <SelectItem 
                        key={schedule.id} 
                        value={schedule.id}
                        className="text-white focus:bg-[#333] focus:text-white"
                      >
                        {schedule.startTime} - {schedule.endTime} 
                        {schedule.availableSpots < 5 && 
                          ` (${schedule.availableSpots} spots left)`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <Button 
              className="w-full bg-[#FF5500] hover:bg-[#FF7730] font-poppins font-bold"
              disabled={!selectedClassId || !selectedDate || !selectedScheduleId || bookingInProgress}
              onClick={handleBookClass}
            >
              {bookingInProgress ? 'Booking...' : 'Book Now'}
            </Button>

            <p className="text-xs text-gray-400 mt-4 text-center">
              You can cancel up to 4 hours before the class starts. No-shows may result in booking restrictions.
            </p>
          </motion.div>
        </div>
      </div>

      <AuthModal isOpen={authModalOpen} setIsOpen={setAuthModalOpen} />
    </section>
  );
};

export default ClassBooking;