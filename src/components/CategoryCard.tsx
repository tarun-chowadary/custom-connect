import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Category } from '@/types';

interface CategoryCardProps {
  category: Category;
}

export const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <Link to={`/categories/${category.slug}`}>
      <Card className="group overflow-hidden hover:-translate-y-0.5 cursor-pointer relative border-border/50">
        <div className="aspect-square overflow-hidden bg-muted">
          <img 
            src={category.image} 
            alt={category.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />
          <div className="absolute inset-0 p-3 flex flex-col justify-end">
            <div className="text-2xl mb-1">{category.icon}</div>
            <h3 className="font-display font-medium text-sm text-white">
              {category.name}
            </h3>
            <p className="text-[10px] text-white/60">
              {category.requestCount} requests
            </p>
          </div>
        </div>
      </Card>
    </Link>
  );
};