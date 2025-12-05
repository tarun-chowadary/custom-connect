import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { RequestCard } from '@/components/RequestCard';
import { CategoryCard } from '@/components/CategoryCard';
import { MakerCard } from '@/components/MakerCard';
import { categories, sampleRequests, featuredMakers } from '@/data/mockData';
import { ArrowRight, TrendingUp, Clock, Plus } from 'lucide-react';
import heroImage from '@/assets/hero-craftsman.jpg';

const Home = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <img 
          src={heroImage} 
          alt="Artisan crafting" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-charcoal/75 to-charcoal/50" />
        <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-5xl font-display font-semibold text-white mb-6 animate-fade-up leading-tight">
              Turn Your Ideas Into{' '}
              <span className="text-gold">Custom Creations</span>
            </h1>
            <p className="text-base md:text-lg text-white/80 mb-8 animate-fade-up leading-relaxed" style={{ animationDelay: '0.1s' }}>
              Post what you want, connect with skilled makers, and get unique products 
              crafted just for you.
            </p>
            <div className="flex flex-wrap gap-3 animate-fade-up" style={{ animationDelay: '0.2s' }}>
              <Link to="/create-request">
                <Button variant="gold" size="lg">
                  Create Your First Request
                </Button>
              </Link>
              <Link to="/categories">
                <Button variant="hero-outline" size="lg">
                  Browse Categories
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl md:text-2xl font-display font-semibold">Browse Categories</h2>
            <p className="text-muted-foreground text-sm mt-1">Find makers for any custom creation</p>
          </div>
          <Link to="/categories">
            <Button variant="ghost" size="sm" className="gap-2">
              View All <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
          {categories.filter(c => c.id !== 'others').map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      {/* Trending Requests */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-md bg-gold/10">
              <TrendingUp className="h-4 w-4 text-gold" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-display font-semibold">Trending Requests</h2>
              <p className="text-muted-foreground text-sm mt-1">Most viewed custom product requests</p>
            </div>
          </div>
          <Link to="/trending">
            <Button variant="ghost" size="sm" className="gap-2">
              View All <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        {sampleRequests.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {sampleRequests.map((request) => (
              <RequestCard key={request.id} request={request} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-muted/30 rounded-lg border border-border/50">
            <TrendingUp className="h-10 w-10 mx-auto mb-4 text-muted-foreground/40" />
            <h3 className="text-base font-medium mb-2">No trending requests yet</h3>
            <p className="text-muted-foreground text-sm mb-6">Be the first to create a custom product request</p>
            <Link to="/create-request">
              <Button variant="gold" size="sm">
                <Plus className="h-4 w-4" />
                Create Request
              </Button>
            </Link>
          </div>
        )}
      </section>

      {/* Recent Requests */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-md bg-background border border-border/50">
                <Clock className="h-4 w-4 text-muted-foreground" />
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-display font-semibold">Recent Requests</h2>
                <p className="text-muted-foreground text-sm mt-1">Fresh opportunities for makers</p>
              </div>
            </div>
          </div>
          {sampleRequests.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              {sampleRequests.slice().reverse().map((request) => (
                <RequestCard key={request.id} request={request} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-background rounded-lg border border-border/50">
              <Clock className="h-10 w-10 mx-auto mb-4 text-muted-foreground/40" />
              <h3 className="text-base font-medium mb-2">No requests yet</h3>
              <p className="text-muted-foreground text-sm mb-6">Create a request to find skilled makers</p>
              <Link to="/create-request">
                <Button variant="gold" size="sm">
                  <Plus className="h-4 w-4" />
                  Create Request
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Featured Makers */}
      {featuredMakers.length > 0 && (
        <section className="container mx-auto px-4 py-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-xl md:text-2xl font-display font-semibold">Featured Makers</h2>
              <p className="text-muted-foreground text-sm mt-1">Top-rated craftsmen ready to create</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredMakers.map((maker) => (
              <MakerCard key={maker.id} maker={maker} />
            ))}
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="bg-charcoal py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-display font-semibold text-white mb-4">
            Ready to Create Something Unique?
          </h2>
          <p className="text-white/70 mb-8 max-w-xl mx-auto">
            Join our community and watch your vision come to life.
          </p>
          <Link to="/create-request">
            <Button variant="gold" size="lg">
              Get Started Now
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <span className="font-display font-semibold text-lg">
              Customise<span className="text-gold">.in</span>
            </span>
            <p className="text-xs text-muted-foreground">
              © 2024 Customise.in. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </Layout>
  );
};

export default Home;