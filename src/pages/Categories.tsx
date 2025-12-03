import { Layout } from '@/components/layout/Layout';
import { CategoryCard } from '@/components/CategoryCard';
import { categories } from '@/data/mockData';

const Categories = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">Categories</h1>
          <p className="text-muted-foreground">Browse custom product categories and find skilled makers</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div key={category.id} className="animate-fade-up" style={{ animationDelay: `${categories.indexOf(category) * 0.05}s` }}>
              <CategoryCard category={category} />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
