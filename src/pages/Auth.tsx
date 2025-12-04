import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { Eye, EyeOff, Loader2, Mail, Lock, User, ArrowRight, Sparkles } from 'lucide-react';

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
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-accent/20 to-primary/10" />
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/30 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-10 right-10 hidden lg:block">
        <Sparkles className="w-8 h-8 text-primary/40 animate-pulse" />
      </div>
      <div className="absolute bottom-10 left-10 hidden lg:block">
        <div className="w-16 h-16 rounded-xl bg-accent/20 backdrop-blur-sm rotate-12" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-md mx-4">
        {/* Logo */}
        <div className="text-center mb-8 animate-fade-up">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-gradient mb-2">
            Customise.in
          </h1>
          <p className="text-muted-foreground">
            Where imagination meets craftsmanship
          </p>
        </div>

        {/* Auth Card */}
        <Card className="shadow-deep border-0 backdrop-blur-sm bg-card/95 animate-fade-up" style={{ animationDelay: '0.1s' }}>
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl font-display">
              {mode === 'login' && 'Welcome back'}
              {mode === 'signup' && 'Create your account'}
              {mode === 'forgot' && 'Reset password'}
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              {mode === 'login' && 'Sign in to access the marketplace'}
              {mode === 'signup' && 'Join thousands of buyers and makers'}
              {mode === 'forgot' && "We'll send you a reset link"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'signup' && (
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="name"
                      placeholder="Enter your name"
                      className="pl-10"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">Email</Label>
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
                  <Label htmlFor="password" className="text-sm font-medium">Password</Label>
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
                    className="px-0 text-sm text-muted-foreground hover:text-primary"
                    onClick={() => setMode('forgot')}
                  >
                    Forgot password?
                  </Button>
                </div>
              )}

              <Button type="submit" className="w-full group" size="lg" disabled={isLoading}>
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
                    className="text-primary font-medium hover:underline"
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
                    className="text-primary font-medium hover:underline"
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
                    className="text-primary font-medium hover:underline"
                    onClick={() => setMode('login')}
                  >
                    Sign in
                  </button>
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Features Preview */}
        <div className="mt-8 grid grid-cols-3 gap-4 animate-fade-up" style={{ animationDelay: '0.2s' }}>
          <div className="text-center p-4 rounded-xl bg-card/50 backdrop-blur-sm">
            <div className="text-2xl mb-2">🎨</div>
            <p className="text-xs text-muted-foreground">Post Ideas</p>
          </div>
          <div className="text-center p-4 rounded-xl bg-card/50 backdrop-blur-sm">
            <div className="text-2xl mb-2">🤝</div>
            <p className="text-xs text-muted-foreground">Find Makers</p>
          </div>
          <div className="text-center p-4 rounded-xl bg-card/50 backdrop-blur-sm">
            <div className="text-2xl mb-2">✨</div>
            <p className="text-xs text-muted-foreground">Get Custom</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
