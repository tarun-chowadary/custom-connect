import { Layout } from '@/components/layout/Layout';
import { CategoryCard } from '@/components/CategoryCard';
import { ShowcaseItemCard } from '@/components/ShowcaseItemCard';
import { categories } from '@/data/mockData';

const Categories = () => {
  // Collect all showcase items from all categories (exclude "Others" category)
  const allShowcaseItems = categories
    .filter(cat => cat.id !== 'others')
    .flatMap(cat => cat.showcaseItems || []);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="mb-10">
          <h1 className="text-2xl md:text-3xl font-display font-semibold mb-2">Categories</h1>
          <p className="text-muted-foreground text-sm">Browse custom product categories and find skilled makers</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-16">
          {categories.filter(cat => cat.id !== 'others').map((category, index) => (
            <div key={category.id} className="animate-fade-up" style={{ animationDelay: `${index * 0.03}s` }}>
              <CategoryCard category={category} />
            </div>
          ))}
        </div>

        {/* Showcase Section */}
        {allShowcaseItems.length > 0 && (
          <div className="mt-16 pt-16 border-t border-border/50">
            <div className="mb-8">
              <h2 className="text-xl md:text-2xl font-display font-semibold mb-2">What You Can Create</h2>
              <p className="text-muted-foreground text-sm max-w-xl">
                Explore examples of beautifully crafted custom products our makers can bring to life.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {allShowcaseItems.map((item, index) => (
                <div key={item.id} className="animate-fade-up" style={{ animationDelay: `${index * 0.05}s` }}>
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