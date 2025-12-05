import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { Eye, EyeOff, Loader2, Mail, Lock, User, ArrowRight } from 'lucide-react';

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
        toast.success('Password reset link sent to your email');
        setMode('login');
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-champagne/10 rounded-full blur-3xl" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10 animate-fade-up">
          <h1 className="text-3xl md:text-4xl font-display font-semibold text-foreground mb-2">
            Customise<span className="text-gold">.in</span>
          </h1>
          <p className="text-muted-foreground text-sm">
            Where imagination meets craftsmanship
          </p>
        </div>

        {/* Auth Card */}
        <Card className="border-border/50 shadow-premium animate-fade-up" style={{ animationDelay: '0.1s' }}>
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl font-display">
              {mode === 'login' && 'Welcome back'}
              {mode === 'signup' && 'Create account'}
              {mode === 'forgot' && 'Reset password'}
            </CardTitle>
            <CardDescription>
              {mode === 'login' && 'Sign in to continue'}
              {mode === 'signup' && 'Join our community'}
              {mode === 'forgot' && "We'll send you a reset link"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'signup' && (
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-xs uppercase tracking-wide text-muted-foreground">
                    Full Name
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="name"
                      placeholder="Your name"
                      className="pl-10"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs uppercase tracking-wide text-muted-foreground">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className="pl-10"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              {mode !== 'forgot' && (
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-xs uppercase tracking-wide text-muted-foreground">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      className="pl-10 pr-10"
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
                      {showPassword ? <EyeOff className="h-4 w-4 text-muted-foreground" /> : <Eye className="h-4 w-4 text-muted-foreground" />}
                    </Button>
                  </div>
                </div>
              )}

              {mode === 'login' && (
                <div className="flex justify-end">
                  <Button 
                    type="button" 
                    variant="link" 
                    className="px-0 text-xs text-muted-foreground hover:text-gold"
                    onClick={() => setMode('forgot')}
                  >
                    Forgot password?
                  </Button>
                </div>
              )}

              <Button type="submit" variant="gold" className="w-full group" size="lg" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {mode === 'login' && 'Sign In'}
                {mode === 'signup' && 'Create Account'}
                {mode === 'forgot' && 'Send Reset Link'}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </form>

            <div className="mt-6 text-center text-sm">
              {mode === 'login' && (
                <p className="text-muted-foreground">
                  Don't have an account?{' '}
                  <button 
                    className="text-gold font-medium hover:underline"
                    onClick={() => setMode('signup')}
                  >
                    Sign up
                  </button>
                </p>
              )}
              {mode === 'signup' && (
                <p className="text-muted-foreground">
                  Already have an account?{' '}
                  <button 
                    className="text-gold font-medium hover:underline"
                    onClick={() => setMode('login')}
                  >
                    Sign in
                  </button>
                </p>
              )}
              {mode === 'forgot' && (
                <p className="text-muted-foreground">
                  Remember your password?{' '}
                  <button 
                    className="text-gold font-medium hover:underline"
                    onClick={() => setMode('login')}
                  >
                    Sign in
                  </button>
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Tagline */}
        <p className="text-center text-xs text-muted-foreground mt-8 animate-fade-up" style={{ animationDelay: '0.2s' }}>
          Premium custom creations, crafted just for you
        </p>
      </div>
    </div>
  );
};

export default Auth;