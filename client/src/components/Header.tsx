import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User } from 'firebase/auth';
import { useAuth } from '@/hooks/use-auth';
import { Link, useLocation } from 'wouter';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export interface HeaderProps {
  onLoginClick?: () => void;
  user?: User | null;
}

const Header = ({ onLoginClick, user }: HeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { logout, profile, hasAdminAccess } = useAuth();
  const [location, setLocation] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  const getUserInitials = () => {
    if (!user || !user.displayName) {
      return user?.email?.substring(0, 2).toUpperCase() || 'U';
    }
    
    const nameParts = user.displayName.split(' ');
    if (nameParts.length === 1) {
      return nameParts[0].substring(0, 2).toUpperCase();
    }
    
    return (nameParts[0][0] + nameParts[1][0]).toUpperCase();
  };

  return (
    <header className={`fixed w-full bg-black bg-opacity-90 z-50 transition-all duration-300 ${scrolled ? 'py-2' : 'py-3'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="text-2xl md:text-3xl font-poppins font-bold">
          <span className="text-[#39FF14]">BEAST</span><span className="text-white">MODE</span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-8">
          <nav>
            <ul className="flex space-x-6 font-poppins font-medium">
              <li><a href="#classes" className="hover:text-[#39FF14] transition-colors">Classes</a></li>
              <li><a href="#book-class" className="hover:text-[#39FF14] transition-colors">Book</a></li>
              <li><a href="#trainers" className="hover:text-[#39FF14] transition-colors">Trainers</a></li>
              <li><a href="#pricing" className="hover:text-[#39FF14] transition-colors">Pricing</a></li>
              <li><a href="#testimonials" className="hover:text-[#39FF14] transition-colors">Results</a></li>
            </ul>
          </nav>
          
          <div className="flex items-center space-x-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center space-x-2 bg-transparent hover:bg-[#1A1A1A] text-white rounded-full p-1 transition-colors">
                    <Avatar className="h-8 w-8 border-2 border-[#39FF14]">
                      <AvatarImage src={user.photoURL || undefined} alt={user.displayName || 'User'} />
                      <AvatarFallback className="bg-[#1A1A1A] text-white">{getUserInitials()}</AvatarFallback>
                    </Avatar>
                    <span className="hidden sm:inline-block">{user.displayName || user.email?.split('@')[0]}</span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-[#1A1A1A] border-[#333] text-white">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-[#333]" />
                  <DropdownMenuItem className="hover:bg-[#222] cursor-pointer" onClick={() => setLocation('/profile')}>
                    <span className="w-full">My Profile</span>
                  </DropdownMenuItem>
                  {hasAdminAccess() && (
                    <DropdownMenuItem className="hover:bg-[#222] cursor-pointer" onClick={() => setLocation('/analytics')}>
                      <span className="w-full">Analytics Dashboard</span>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem className="hover:bg-[#222] cursor-pointer" onClick={() => setLocation('/')}>
                    <span className="w-full">Return to Home</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-[#333]" />
                  <DropdownMenuItem className="hover:bg-[#222] cursor-pointer" onClick={handleLogout}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <button 
                onClick={onLoginClick} 
                className="bg-[#1A1A1A] hover:bg-[#333] text-white font-poppins font-semibold px-4 py-2 rounded-md transition-all"
              >
                Login
              </button>
            )}
            
            <a href="#join-now" className="bg-[#FF5500] hover:bg-orange-600 text-white font-poppins font-semibold px-6 py-2 rounded-md transition-all">
              Join Now
            </a>
          </div>
        </div>
        
        <button className="md:hidden text-2xl" onClick={toggleMobileMenu}>
          <i className="fas fa-bars"></i>
        </button>
      </div>
      
      {/* Mobile Menu */}
      <motion.div 
        className={`bg-[#1A1A1A] md:hidden w-full absolute top-full left-0 p-4 shadow-lg ${mobileMenuOpen ? 'block' : 'hidden'}`}
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: mobileMenuOpen ? 'auto' : 0, opacity: mobileMenuOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <nav className="flex flex-col space-y-4 mb-4">
          <a href="#classes" className="text-lg py-2 px-4 hover:bg-black rounded transition-colors" onClick={() => setMobileMenuOpen(false)}>Classes</a>
          <a href="#book-class" className="text-lg py-2 px-4 hover:bg-black rounded transition-colors" onClick={() => setMobileMenuOpen(false)}>Book Class</a>
          <a href="#trainers" className="text-lg py-2 px-4 hover:bg-black rounded transition-colors" onClick={() => setMobileMenuOpen(false)}>Trainers</a>
          <a href="#pricing" className="text-lg py-2 px-4 hover:bg-black rounded transition-colors" onClick={() => setMobileMenuOpen(false)}>Pricing</a>
          <a href="#testimonials" className="text-lg py-2 px-4 hover:bg-black rounded transition-colors" onClick={() => setMobileMenuOpen(false)}>Results</a>
          <a href="#facilities" className="text-lg py-2 px-4 hover:bg-black rounded transition-colors" onClick={() => setMobileMenuOpen(false)}>Facilities</a>
          
          {user ? (
            <>
              <div className="border-t border-[#333] my-2 pt-2"></div>
              <button 
                className="text-lg py-2 px-4 text-left hover:bg-black rounded transition-colors w-full text-left" 
                onClick={() => { setLocation('/profile'); setMobileMenuOpen(false); }}
              >
                My Profile
              </button>
              {hasAdminAccess() && (
                <button 
                  className="text-lg py-2 px-4 text-left hover:bg-black rounded transition-colors w-full text-left" 
                  onClick={() => { setLocation('/analytics'); setMobileMenuOpen(false); }}
                >
                  Analytics Dashboard
                </button>
              )}
              <button 
                className="text-lg py-2 px-4 text-left hover:bg-black rounded transition-colors w-full text-left" 
                onClick={() => { setLocation('/'); setMobileMenuOpen(false); }}
              >
                Return to Home
              </button>
              <button 
                onClick={() => { handleLogout(); setMobileMenuOpen(false); }} 
                className="text-lg py-2 px-4 text-left hover:bg-black rounded transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <button onClick={() => { onLoginClick?.(); setMobileMenuOpen(false); }} className="text-lg py-2 px-4 text-left hover:bg-black rounded transition-colors">
              Login
            </button>
          )}
        </nav>
        <a href="#join-now" className="block w-full bg-[#FF5500] text-center text-white font-poppins font-semibold px-6 py-3 rounded-md" onClick={() => setMobileMenuOpen(false)}>Join Now</a>
      </motion.div>
    </header>
  );
};

export default Header;
