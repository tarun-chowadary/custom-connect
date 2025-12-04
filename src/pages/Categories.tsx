import { Layout } from '@/components/layout/Layout';
import { CategoryCard } from '@/components/CategoryCard';
import { ShowcaseItemCard } from '@/components/ShowcaseItemCard';
import { categories } from '@/data/mockData';
import { Sparkles } from 'lucide-react';

const Categories = () => {
  // Collect all showcase items from all categories
  const allShowcaseItems = categories.flatMap(cat => cat.showcaseItems || []);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">Categories</h1>
          <p className="text-muted-foreground">Browse custom product categories and find skilled makers</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-16">
          {categories.map((category, index) => (
            <div key={category.id} className="animate-fade-up" style={{ animationDelay: `${index * 0.05}s` }}>
              <CategoryCard category={category} />
            </div>
          ))}
        </div>

        {/* Showcase Section */}
        {allShowcaseItems.length > 0 && (
          <div className="mt-12">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="h-6 w-6 text-primary" />
              <h2 className="text-2xl md:text-3xl font-display font-bold">What You Can Create</h2>
            </div>
            <p className="text-muted-foreground mb-8 max-w-2xl">
              Explore examples of beautifully crafted custom products. These showcases represent the kind of unique items our makers can bring to life.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {allShowcaseItems.map((item, index) => (
                <div key={item.id} className="animate-fade-up" style={{ animationDelay: `${index * 0.08}s` }}>
                  <ShowcaseItemCard item={item} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Categories;
