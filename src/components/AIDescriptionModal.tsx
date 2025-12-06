import { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles, Loader2, RefreshCw, Check, PlusCircle } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface AIDescriptionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  onUseDescription: (description: string) => void;
  onInsertAtCursor: (description: string) => void;
}

export const AIDescriptionModal = ({
  open,
  onOpenChange,
  title,
  onUseDescription,
  onInsertAtCursor,
}: AIDescriptionModalProps) => {
  const [occasion, setOccasion] = useState('');
  const [style, setStyle] = useState('');
  const [constraints, setConstraints] = useState('');
  const [generatedDescription, setGeneratedDescription] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!title.trim()) {
      toast.error('Please enter a request title first');
      return;
    }

    setIsGenerating(true);
    setGeneratedDescription('');

    try {
      const { data, error } = await supabase.functions.invoke('generate-description', {
        body: {
          title,
          occasion,
          style,
          constraints,
        },
      });

      if (error) {
        throw new Error(error.message || 'Failed to generate description');
      }

      if (data?.error) {
        throw new Error(data.error);
      }

      setGeneratedDescription(data.description || '');
      toast.success('Description generated!');
    } catch (error: any) {
      console.error('Error generating description:', error);
      toast.error(error.message || 'Failed to generate description');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleUse = () => {
    onUseDescription(generatedDescription);
    onOpenChange(false);
    resetForm();
  };

  const handleInsert = () => {
    onInsertAtCursor(generatedDescription);
    onOpenChange(false);
    resetForm();
  };

  const resetForm = () => {
    setOccasion('');
    setStyle('');
    setConstraints('');
    setGeneratedDescription('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Describe your custom creation with AI
          </DialogTitle>
          <DialogDescription>
            Fill in the details below and let AI craft a compelling description for your request.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* Read-only title */}
          <div className="space-y-2">
            <Label className="text-muted-foreground">Request Title</Label>
            <Input
              value={title || 'No title yet'}
              readOnly
              className="bg-muted/50 cursor-not-allowed"
            />
          </div>

          {/* Occasion */}
          <div className="space-y-2">
            <Label htmlFor="occasion">What are you customising this for?</Label>
            <Input
              id="occasion"
              placeholder="e.g., Birthday gift, Office decor, Wedding anniversary..."
              value={occasion}
              onChange={(e) => setOccasion(e.target.value)}
            />
          </div>

          {/* Style */}
          <div className="space-y-2">
            <Label htmlFor="style">Style & vibe</Label>
            <Input
              id="style"
              placeholder="e.g., Minimal, traditional, luxurious, playful, rustic..."
              value={style}
              onChange={(e) => setStyle(e.target.value)}
            />
          </div>

          {/* Constraints */}
          <div className="space-y-2">
            <Label htmlFor="constraints">Materials, size, colours & constraints</Label>
            <Textarea
              id="constraints"
              placeholder="e.g., Brass with gold finish, 8 inches tall, warm amber tones, must be wall-mountable..."
              className="min-h-[80px]"
              value={constraints}
              onChange={(e) => setConstraints(e.target.value)}
            />
          </div>

          {/* Generate button */}
          <Button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full gap-2"
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                Generate description
              </>
            )}
          </Button>

          {/* Generated preview */}
          {generatedDescription && (
            <div className="space-y-3 pt-4 border-t">
              <Label className="text-sm font-medium">Generated Description</Label>
              <div className="p-4 bg-muted/50 rounded-lg border">
                <p className="text-sm leading-relaxed whitespace-pre-wrap">
                  {generatedDescription}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button onClick={handleUse} className="flex-1 gap-2">
                  <Check className="h-4 w-4" />
                  Use this description
                </Button>
                <Button onClick={handleInsert} variant="outline" className="flex-1 gap-2">
                  <PlusCircle className="h-4 w-4" />
                  Insert at cursor
                </Button>
                <Button onClick={handleGenerate} variant="outline" className="gap-2" disabled={isGenerating}>
                  <RefreshCw className={`h-4 w-4 ${isGenerating ? 'animate-spin' : ''}`} />
                  Regenerate
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
