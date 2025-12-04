import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { RequestCard } from '@/components/RequestCard';
import { Button } from '@/components/ui/button';
import { sampleRequests } from '@/data/mockData';
import { TrendingUp, Flame, Plus } from 'lucide-react';

const Trending = () => {
  // Sort by views count for trending
  const trendingRequests = [...sampleRequests].sort((a, b) => b.viewsCount - a.viewsCount);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-gold/10">
              <TrendingUp className="h-6 w-6 text-gold" />
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-bold">Trending Requests</h1>
          </div>
          <p className="text-muted-foreground">Most popular custom product requests based on views and proposals</p>
        </div>

        {trendingRequests.length > 0 ? (
          <>
            {/* Top 3 Featured */}
            <div className="mb-12">
              <div className="flex items-center gap-2 mb-6">
                <Flame className="h-5 w-5 text-terracotta" />
                <h2 className="text-xl font-semibold">Hot Right Now</h2>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {trendingRequests.slice(0, 3).map((request, index) => (
                  <div key={request.id} className="relative animate-fade-up" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="absolute -top-3 -left-3 z-10 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
                      {index + 1}
                    </div>
                    <RequestCard request={request} />
                  </div>
                ))}
              </div>
            </div>

            {/* All Trending */}
            <div>
              <h2 className="text-xl font-semibold mb-6">All Trending</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {trendingRequests.map((request, index) => (
                  <div key={request.id} className="animate-fade-up" style={{ animationDelay: `${index * 0.05}s` }}>
                    <RequestCard request={request} />
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-16 bg-muted/30 rounded-xl">
            <TrendingUp className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
            <h2 className="text-xl font-semibold mb-2">No trending requests yet</h2>
            <p className="text-muted-foreground mb-6">Be the first to create a custom product request</p>
            <Link to="/create-request">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Request
              </Button>
            </Link>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Trending;
