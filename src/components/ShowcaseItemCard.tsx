import { Card } from '@/components/ui/card';
import { ShowcaseItem } from '@/types';

interface ShowcaseItemCardProps {
  item: ShowcaseItem;
}

export const ShowcaseItemCard = ({ item }: ShowcaseItemCardProps) => {
  return (
    <Card className="group overflow-hidden border-0 shadow-elegant hover:shadow-deep transition-all duration-300">
      <div className="aspect-square overflow-hidden bg-muted">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className="font-display font-semibold text-foreground mb-1 line-clamp-1">
          {item.name}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {item.description}
        </p>
        <div className="mt-3 flex items-center gap-2">
          <span className="text-xs px-2 py-1 rounded-full bg-accent/50 text-accent-foreground">
            Showcase Example
          </span>
        </div>
      </div>
    </Card>
  );
};
