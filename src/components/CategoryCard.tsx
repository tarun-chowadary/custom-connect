import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Category } from '@/types';

interface CategoryCardProps {
  category: Category;
}

export const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <Link to={`/categories/${category.slug}`}>
      <Card className="group overflow-hidden hover:-translate-y-1 cursor-pointer relative">
        <div className="aspect-square overflow-hidden bg-muted">
          <img 
            src={category.image} 
            alt={category.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
          <div className="absolute inset-0 p-4 flex flex-col justify-end">
            <div className="text-3xl mb-2">{category.icon}</div>
            <h3 className="font-display font-semibold text-lg text-primary-foreground">
              {category.name}
            </h3>
            <p className="text-xs text-primary-foreground/70">
              {category.requestCount} requests
            </p>
          </div>
        </div>
      </Card>
    </Link>
  );
};
