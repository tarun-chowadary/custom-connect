import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import heroImage from '@/assets/hero-craftsman.jpg';

type AuthMode = 'login' | 'signup' | 'forgot';

export const Auth = () => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const { login, signup, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (mode === 'login') {
        await login(formData.email, formData.password);
        toast.success('Welcome back!');
        navigate('/home');
      } else if (mode === 'signup') {
        await signup(formData.name, formData.email, formData.password);
        toast.success('Account created successfully!');
        navigate('/home');
      } else {
        // Handle forgot password
        toast.success('Password reset link sent to your email');
        setMode('login');
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img 
          src={heroImage} 
          alt="Artisan crafting" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 to-foreground/40" />
        <div className="relative z-10 flex flex-col justify-center px-16 text-primary-foreground">
          <h1 className="text-5xl font-display font-bold mb-6 animate-fade-up">
            Customise.in
          </h1>
          <p className="text-xl opacity-90 max-w-md animate-fade-up" style={{ animationDelay: '0.1s' }}>
            Where your imagination meets master craftsmen. Get unique, custom-made products built just for you.
          </p>
          
          <div className="mt-12 space-y-6 animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary-foreground/20 flex items-center justify-center text-2xl">
                🎨
              </div>
              <div>
                <h3 className="font-semibold">Post Your Vision</h3>
                <p className="text-sm opacity-80">Describe what you want, no matter how unique</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary-foreground/20 flex items-center justify-center text-2xl">
                🤝
              </div>
              <div>
                <h3 className="font-semibold">Connect with Makers</h3>
                <p className="text-sm opacity-80">Get proposals from skilled artisans</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary-foreground/20 flex items-center justify-center text-2xl">
                ✨
              </div>
              <div>
                <h3 className="font-semibold">Receive Your Creation</h3>
                <p className="text-sm opacity-80">Get your custom product delivered</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background">
        <Card className="w-full max-w-md shadow-deep border-0">
          <CardHeader className="text-center pb-2">
            <div className="lg:hidden mb-4">
              <span className="text-3xl font-display font-bold text-gradient">Customise.in</span>
            </div>
            <CardTitle className="text-2xl">
              {mode === 'login' && 'Welcome back'}
              {mode === 'signup' && 'Create your account'}
              {mode === 'forgot' && 'Reset password'}
            </CardTitle>
            <CardDescription>
              {mode === 'login' && 'Sign in to access the marketplace'}
              {mode === 'signup' && 'Join thousands of buyers and makers'}
              {mode === 'forgot' && "We'll send you a reset link"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'signup' && (
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              {mode !== 'forgot' && (
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              )}

              {mode === 'login' && (
                <div className="flex justify-end">
                  <Button 
                    type="button" 
                    variant="link" 
                    className="px-0 text-sm"
                    onClick={() => setMode('forgot')}
                  >
                    Forgot password?
                  </Button>
                </div>
              )}

              <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {mode === 'login' && 'Sign In'}
                {mode === 'signup' && 'Create Account'}
                {mode === 'forgot' && 'Send Reset Link'}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm">
              {mode === 'login' && (
                <>
                  Don't have an account?{' '}
                  <Button variant="link" className="px-1" onClick={() => setMode('signup')}>
                    Sign up
                  </Button>
                </>
              )}
              {mode === 'signup' && (
                <>
                  Already have an account?{' '}
                  <Button variant="link" className="px-1" onClick={() => setMode('login')}>
                    Sign in
                  </Button>
                </>
              )}
              {mode === 'forgot' && (
                <>
                  Remember your password?{' '}
                  <Button variant="link" className="px-1" onClick={() => setMode('login')}>
                    Sign in
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
