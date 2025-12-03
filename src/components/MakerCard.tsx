import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User } from '@/types';
import { Star, CheckCircle, Clock } from 'lucide-react';

interface MakerCardProps {
  maker: User;
}

export const MakerCard = ({ maker }: MakerCardProps) => {
  return (
    <Link to={`/maker/${maker.id}`}>
      <Card className="group overflow-hidden hover:-translate-y-1 cursor-pointer">
        <CardContent className="p-5">
          <div className="flex items-start gap-4">
            <div className="relative">
              <img 
                src={maker.profilePhoto || '/placeholder.svg'} 
                alt={maker.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-muted"
              />
              {maker.verified && (
                <CheckCircle className="absolute -bottom-1 -right-1 h-5 w-5 text-secondary fill-card" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-display font-semibold truncate group-hover:text-primary transition-colors">
                  {maker.name}
                </h3>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <span className="flex items-center gap-1 text-sm text-gold">
                  <Star className="h-4 w-4 fill-current" />
                  {maker.rating.toFixed(1)}
                </span>
                {maker.verified && (
                  <Badge variant="secondary" className="text-xs">
                    Verified
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                {maker.bio}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {maker.skills?.slice(0, 3).map((skill) => (
                  <Badge key={skill} variant="outline" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
              {maker.avgTurnaround && (
                <div className="flex items-center gap-1 mt-3 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  Avg. {maker.avgTurnaround} days turnaround
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
