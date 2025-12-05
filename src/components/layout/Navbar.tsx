import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Home, 
  PlusCircle, 
  Grid3X3, 
  TrendingUp, 
  MessageCircle, 
  User, 
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { useState } from 'react';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinks = [
    { to: '/home', label: 'Home', icon: Home },
    { to: '/create-request', label: 'Create', icon: PlusCircle },
    { to: '/categories', label: 'Categories', icon: Grid3X3 },
    { to: '/trending', label: 'Trending', icon: TrendingUp },
    { to: '/messages', label: 'Messages', icon: MessageCircle },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/home" className="flex items-center">
            <span className="text-xl font-display font-semibold text-foreground">
              Customise<span className="text-gold">.in</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.to} to={link.to}>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={`gap-2 ${isActive(link.to) ? 'text-gold bg-gold/5' : ''}`}
                >
                  <link.icon className="h-4 w-4" />
                  <span className="hidden lg:inline">{link.label}</span>
                </Button>
              </Link>
            ))}
            
            <div className="ml-4 pl-4 border-l border-border/50 flex items-center gap-2">
              <Link to="/profile">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={`gap-2 ${isActive('/profile') ? 'text-gold bg-gold/5' : ''}`}
                >
                  <User className="h-4 w-4" />
                  <span className="hidden lg:inline">{user?.name}</span>
                </Button>
              </Link>
              <Button variant="ghost" size="icon" onClick={handleLogout} className="text-muted-foreground">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/50 animate-fade-up">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link 
                  key={link.to} 
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Button 
                    variant="ghost" 
                    className={`w-full justify-start gap-3 ${isActive(link.to) ? 'text-gold bg-gold/5' : ''}`}
                  >
                    <link.icon className="h-4 w-4" />
                    {link.label}
                  </Button>
                </Link>
              ))}
              <div className="border-t border-border/50 my-2" />
              <Link to="/profile" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start gap-3">
                  <User className="h-4 w-4" />
                  Profile
                </Button>
              </Link>
              <Button 
                variant="ghost" 
                className="w-full justify-start gap-3 text-destructive"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};