import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Request } from '@/types';
import { Eye, MessageSquare, Clock, IndianRupee } from 'lucide-react';

interface RequestCardProps {
  request: Request;
}

const statusColors: Record<Request['status'], string> = {
  seeking: 'bg-gold/20 text-gold border-gold/30',
  in_progress: 'bg-secondary/20 text-secondary border-secondary/30',
  completed: 'bg-green-500/20 text-green-700 border-green-500/30',
  cancelled: 'bg-destructive/20 text-destructive border-destructive/30',
};

const statusLabels: Record<Request['status'], string> = {
  seeking: 'Seeking Makers',
  in_progress: 'In Progress',
  completed: 'Completed',
  cancelled: 'Cancelled',
};

export const RequestCard = ({ request }: RequestCardProps) => {
  const daysLeft = Math.ceil((new Date(request.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24));

  return (
    <Link to={`/request/${request.id}`}>
      <Card className="group overflow-hidden hover:-translate-y-1 cursor-pointer">
        <div className="aspect-[4/3] overflow-hidden bg-muted relative">
          <img 
            src={request.images[0] || '/placeholder.svg'} 
            alt={request.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <Badge 
            className={`absolute top-3 left-3 ${statusColors[request.status]} border`}
          >
            {statusLabels[request.status]}
          </Badge>
        </div>
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-display font-semibold text-lg line-clamp-1 group-hover:text-primary transition-colors">
              {request.title}
            </h3>
          </div>
          
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {request.description}
          </p>

          <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
            <Badge variant="outline" className="text-xs">
              {request.categoryName}
            </Badge>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1 text-primary font-semibold">
              <IndianRupee className="h-4 w-4" />
              <span>{request.budgetMin.toLocaleString()} - {request.budgetMax.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <span className="flex items-center gap-1">
                <Eye className="h-3.5 w-3.5" />
                {request.viewsCount}
              </span>
              <span className="flex items-center gap-1">
                <MessageSquare className="h-3.5 w-3.5" />
                {request.proposalCount}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-3 pt-3 border-t">
            <img 
              src={request.buyerPhoto || '/placeholder.svg'} 
              alt={request.buyerName}
              className="w-6 h-6 rounded-full object-cover"
            />
            <span className="text-xs text-muted-foreground">{request.buyerName}</span>
            <span className="ml-auto flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              {daysLeft > 0 ? `${daysLeft} days left` : 'Expired'}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
