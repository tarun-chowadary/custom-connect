import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { RequestCard } from '@/components/RequestCard';
import { CategoryCard } from '@/components/CategoryCard';
import { MakerCard } from '@/components/MakerCard';
import { categories, sampleRequests, featuredMakers } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { ArrowRight, Sparkles, TrendingUp, Clock } from 'lucide-react';
import heroImage from '@/assets/hero-craftsman.jpg';

const Home = () => {
  const { user } = useAuth();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <img 
          src={heroImage} 
          alt="Artisan crafting" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/70 to-foreground/50" />
        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-display font-bold text-primary-foreground mb-6 animate-fade-up">
              Turn Your Ideas Into{' '}
              <span className="text-gold">Custom Creations</span>
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 animate-fade-up" style={{ animationDelay: '0.1s' }}>
              Post what you want, connect with skilled makers, and get unique products 
              crafted just for you. From glass art to custom jewelry, nothing is impossible.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-up" style={{ animationDelay: '0.2s' }}>
              <Link to="/create-request">
                <Button variant="hero" size="xl">
                  <Sparkles className="h-5 w-5" />
                  Create Your First Request
                </Button>
              </Link>
              <Link to="/categories">
                <Button variant="hero-outline" size="xl">
                  Browse Categories
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-display font-bold">Browse Categories</h2>
            <p className="text-muted-foreground mt-1">Find makers for any custom creation</p>
          </div>
          <Link to="/categories">
            <Button variant="ghost" className="gap-2">
              View All <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      {/* Trending Requests */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gold/10">
              <TrendingUp className="h-5 w-5 text-gold" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-display font-bold">Trending Requests</h2>
              <p className="text-muted-foreground mt-1">Most viewed custom product requests</p>
            </div>
          </div>
          <Link to="/trending">
            <Button variant="ghost" className="gap-2">
              View All <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sampleRequests.map((request) => (
            <RequestCard key={request.id} request={request} />
          ))}
        </div>
      </section>

      {/* Recent Requests */}
      <section className="bg-muted/50 py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-secondary/10">
                <Clock className="h-5 w-5 text-secondary" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-display font-bold">Recent Requests</h2>
                <p className="text-muted-foreground mt-1">Fresh opportunities for makers</p>
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sampleRequests.slice().reverse().map((request) => (
              <RequestCard key={request.id} request={request} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Makers */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-display font-bold">Featured Makers</h2>
            <p className="text-muted-foreground mt-1">Top-rated craftsmen ready to create</p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredMakers.map((maker) => (
            <MakerCard key={maker.id} maker={maker} />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-foreground text-background py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Ready to Create Something Unique?
          </h2>
          <p className="text-lg opacity-80 mb-8 max-w-2xl mx-auto">
            Join thousands of buyers and makers. Post your request today and watch your vision come to life.
          </p>
          <Link to="/create-request">
            <Button variant="gold" size="xl">
              Get Started Now
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <span className="font-display font-bold text-xl text-gradient">Customise.in</span>
            <p className="text-sm text-muted-foreground">
              © 2024 Customise.in. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </Layout>
  );
};

export default Home;
