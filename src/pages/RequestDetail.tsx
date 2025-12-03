import { useParams } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { sampleRequests, sampleProposals } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { useState } from 'react';
import { 
  Eye, 
  MessageSquare, 
  Clock, 
  IndianRupee, 
  Calendar, 
  Star, 
  CheckCircle,
  Send,
  User
} from 'lucide-react';

const statusColors: Record<string, string> = {
  seeking: 'bg-gold/20 text-gold border-gold/30',
  in_progress: 'bg-secondary/20 text-secondary border-secondary/30',
  completed: 'bg-green-500/20 text-green-700 border-green-500/30',
  cancelled: 'bg-destructive/20 text-destructive border-destructive/30',
};

const statusLabels: Record<string, string> = {
  seeking: 'Seeking Makers',
  in_progress: 'In Progress',
  completed: 'Completed',
  cancelled: 'Cancelled',
};

const RequestDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [proposalForm, setProposalForm] = useState({
    price: '',
    timeline: '',
    note: '',
  });
  
  const request = sampleRequests.find(r => r.id === id);
  const proposals = sampleProposals.filter(p => p.requestId === id);

  if (!request) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold">Request not found</h1>
        </div>
      </Layout>
    );
  }

  const daysLeft = Math.ceil((new Date(request.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
  const isBuyer = user?.id === request.buyerId;

  const handleSubmitProposal = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Proposal submitted successfully!');
    setProposalForm({ price: '', timeline: '', note: '' });
  };

  const handleAcceptProposal = (proposalId: string) => {
    toast.success('Proposal accepted! Proceeding to payment...');
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <Badge className={`${statusColors[request.status]} border mb-2`}>
                    {statusLabels[request.status]}
                  </Badge>
                  <h1 className="text-3xl md:text-4xl font-display font-bold">{request.title}</h1>
                </div>
              </div>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  {request.viewsCount} views
                </span>
                <span className="flex items-center gap-1">
                  <MessageSquare className="h-4 w-4" />
                  {request.proposalCount} proposals
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {daysLeft > 0 ? `${daysLeft} days left` : 'Deadline passed'}
                </span>
                <Badge variant="outline">{request.categoryName}</Badge>
              </div>
            </div>

            {/* Images */}
            <div className="grid grid-cols-2 gap-4">
              {request.images.map((img, index) => (
                <div key={index} className="aspect-video rounded-xl overflow-hidden bg-muted">
                  <img src={img} alt={`Reference ${index + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground whitespace-pre-wrap">{request.description}</p>
              </CardContent>
            </Card>

            {/* Specifications */}
            <Card>
              <CardHeader>
                <CardTitle>Specifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {Object.entries(request.specs).map(([key, value]) => (
                    <div key={key} className="p-3 rounded-lg bg-muted">
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">{key}</p>
                      <p className="font-medium">{value}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Proposals Section */}
            <Card>
              <CardHeader>
                <CardTitle>Proposals ({proposals.length})</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {proposals.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">
                    No proposals yet. Be the first to submit!
                  </p>
                ) : (
                  proposals.map((proposal) => (
                    <div key={proposal.id} className="p-4 rounded-xl border bg-card">
                      <div className="flex items-start gap-4">
                        <img 
                          src={proposal.makerPhoto || '/placeholder.svg'} 
                          alt={proposal.makerName}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold">{proposal.makerName}</span>
                            {proposal.makerVerified && (
                              <CheckCircle className="h-4 w-4 text-secondary" />
                            )}
                            <span className="flex items-center gap-1 text-sm text-gold">
                              <Star className="h-3 w-3 fill-current" />
                              {proposal.makerRating}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">{proposal.note}</p>
                          <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1 font-semibold text-primary">
                              <IndianRupee className="h-4 w-4" />
                              {proposal.price.toLocaleString()}
                            </span>
                            <span className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Clock className="h-4 w-4" />
                              {proposal.timelineDays} days
                            </span>
                          </div>
                          {isBuyer && proposal.status === 'sent' && (
                            <div className="flex gap-2 mt-4">
                              <Button size="sm" onClick={() => handleAcceptProposal(proposal.id)}>
                                Accept & Pay Advance
                              </Button>
                              <Button variant="outline" size="sm">
                                Message
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>

            {/* Submit Proposal Form (for makers) */}
            {!isBuyer && request.status === 'seeking' && (
              <Card>
                <CardHeader>
                  <CardTitle>Submit Your Proposal</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmitProposal} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Your Price (₹)</Label>
                        <div className="relative">
                          <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            type="number"
                            placeholder="Enter your price"
                            className="pl-9"
                            value={proposalForm.price}
                            onChange={(e) => setProposalForm({ ...proposalForm, price: e.target.value })}
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Timeline (days)</Label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            type="number"
                            placeholder="Delivery days"
                            className="pl-9"
                            value={proposalForm.timeline}
                            onChange={(e) => setProposalForm({ ...proposalForm, timeline: e.target.value })}
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Your Message</Label>
                      <Textarea
                        placeholder="Describe your approach, experience, and why you're the best fit for this project..."
                        className="min-h-[100px]"
                        value={proposalForm.note}
                        onChange={(e) => setProposalForm({ ...proposalForm, note: e.target.value })}
                        required
                      />
                    </div>
                    <Button type="submit" className="gap-2">
                      <Send className="h-4 w-4" />
                      Submit Proposal
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Budget Card */}
            <Card>
              <CardContent className="pt-6">
                <div className="text-center mb-4">
                  <p className="text-sm text-muted-foreground mb-1">Budget Range</p>
                  <p className="text-2xl font-display font-bold text-primary flex items-center justify-center gap-1">
                    <IndianRupee className="h-5 w-5" />
                    {request.budgetMin.toLocaleString()} - {request.budgetMax.toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  Deadline: {new Date(request.deadline).toLocaleDateString()}
                </div>
              </CardContent>
            </Card>

            {/* Buyer Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Posted By</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <img 
                    src={request.buyerPhoto || '/placeholder.svg'} 
                    alt={request.buyerName}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold">{request.buyerName}</p>
                    <p className="text-xs text-muted-foreground">
                      Posted on {new Date(request.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tags */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {request.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RequestDetail;
