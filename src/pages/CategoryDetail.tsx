import { useParams, Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { RequestCard } from '@/components/RequestCard';
import { ShowcaseItemCard } from '@/components/ShowcaseItemCard';
import { Button } from '@/components/ui/button';
import { categories, sampleRequests } from '@/data/mockData';
import { ArrowLeft, Plus, Sparkles } from 'lucide-react';

const CategoryDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  
  const category = categories.find(c => c.slug === slug);
  const categoryRequests = sampleRequests.filter(r => r.categoryId === category?.id);
  const showcaseItems = category?.showcaseItems || [];

  if (!category) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-display font-bold mb-4">Category Not Found</h1>
          <p className="text-muted-foreground mb-8">The category you're looking for doesn't exist.</p>
          <Link to="/categories">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Categories
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link to="/categories" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-4 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Categories
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-4xl">{category.icon}</span>
            <div>
              <h1 className="text-3xl md:text-4xl font-display font-bold">{category.name}</h1>
              <p className="text-muted-foreground">{category.description}</p>
              <p className="text-sm text-muted-foreground mt-1">{category.requestCount} requests</p>
            </div>
          </div>
        </div>

        {/* Showcase Items */}
        {showcaseItems.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-display font-semibold">Example Creations</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              See what's possible in this category. These are showcase examples of custom products.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {showcaseItems.map((item) => (
                <ShowcaseItemCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        )}

        {/* Requests in this category */}
        <div>
          <h2 className="text-xl font-display font-semibold mb-4">Active Requests</h2>
          {categoryRequests.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryRequests.map((request) => (
                <RequestCard key={request.id} request={request} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-muted/30 rounded-xl">
              <span className="text-5xl mb-4 block">{category.icon}</span>
              <h3 className="text-xl font-semibold mb-2">No requests yet</h3>
              <p className="text-muted-foreground mb-6">Be the first to create a request in {category.name}</p>
              <Link to="/create-request">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Request
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CategoryDetail;
