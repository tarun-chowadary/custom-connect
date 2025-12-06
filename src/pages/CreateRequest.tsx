import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { categories } from '@/data/mockData';
import { toast } from 'sonner';
import { Upload, X, Plus, IndianRupee, Calendar, Eye, EyeOff, Sparkles } from 'lucide-react';
import { AIDescriptionModal } from '@/components/AIDescriptionModal';

const CreateRequest = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    categoryId: '',
    budgetMin: '',
    budgetMax: '',
    deadline: '',
    visibility: 'public' as 'public' | 'private',
    tags: [] as string[],
    specs: {} as Record<string, string>,
  });
  const [newTag, setNewTag] = useState('');
  const [newSpecKey, setNewSpecKey] = useState('');
  const [newSpecValue, setNewSpecValue] = useState('');
  const [images, setImages] = useState<string[]>([]);

  const handleAddTag = () => {
    if (newTag && !formData.tags.includes(newTag)) {
      setFormData({ ...formData, tags: [...formData.tags, newTag] });
      setNewTag('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setFormData({ ...formData, tags: formData.tags.filter(t => t !== tag) });
  };

  const handleAddSpec = () => {
    if (newSpecKey && newSpecValue) {
      setFormData({
        ...formData,
        specs: { ...formData.specs, [newSpecKey]: newSpecValue },
      });
      setNewSpecKey('');
      setNewSpecValue('');
    }
  };

  const handleRemoveSpec = (key: string) => {
    const newSpecs = { ...formData.specs };
    delete newSpecs[key];
    setFormData({ ...formData, specs: newSpecs });
  };

  const handleUseDescription = (description: string) => {
    setFormData({ ...formData, description });
    toast.success('Description applied!');
  };

  const handleInsertAtCursor = (description: string) => {
    const textarea = descriptionRef.current;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const currentValue = formData.description;
      const newValue = currentValue.substring(0, start) + description + currentValue.substring(end);
      setFormData({ ...formData, description: newValue });
      toast.success('Description inserted!');
    } else {
      // Fallback: append to the end
      setFormData({ ...formData, description: formData.description + description });
      toast.success('Description added!');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success('Request created successfully! Makers will start sending proposals.');
    navigate('/home');
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-2 flex items-center gap-3">
            <Sparkles className="h-8 w-8 text-primary" />
            Create a Custom Request
          </h1>
          <p className="text-muted-foreground">Describe what you want and let skilled makers bring it to life</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Details */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Details</CardTitle>
              <CardDescription>Tell us what you're looking to create</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Request Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g., Glass Pyramid Pen, Custom Brass Lamp"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="description">Detailed Description *</Label>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="gap-1.5 text-primary hover:text-primary/80"
                    onClick={() => setAiModalOpen(true)}
                  >
                    <Sparkles className="h-3.5 w-3.5" />
                    Ask AI to write this
                  </Button>
                </div>
                <Textarea
                  ref={descriptionRef}
                  id="description"
                  placeholder="Describe your vision in detail. Include materials, style, size, color preferences, inspiration sources, and any specific requirements..."
                  className="min-h-[150px]"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={formData.categoryId}
                  onValueChange={(value) => setFormData({ ...formData, categoryId: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        <span className="flex items-center gap-2">
                          {cat.icon} {cat.name}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Images */}
          <Card>
            <CardHeader>
              <CardTitle>Reference Images</CardTitle>
              <CardDescription>Upload sketches, inspiration, or reference images</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {images.map((img, index) => (
                  <div key={index} className="relative aspect-square rounded-lg overflow-hidden bg-muted">
                    <img src={img} alt={`Reference ${index + 1}`} className="w-full h-full object-cover" />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 h-6 w-6"
                      onClick={() => setImages(images.filter((_, i) => i !== index))}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
                <label className="aspect-square rounded-lg border-2 border-dashed border-muted-foreground/25 flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 hover:bg-muted/50 transition-colors">
                  <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                  <span className="text-sm text-muted-foreground">Upload</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setImages([...images, URL.createObjectURL(file)]);
                      }
                    }}
                  />
                </label>
              </div>
            </CardContent>
          </Card>

          {/* Specifications */}
          <Card>
            <CardHeader>
              <CardTitle>Specifications</CardTitle>
              <CardDescription>Add specific requirements like dimensions, materials, etc.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {Object.entries(formData.specs).map(([key, value]) => (
                  <Badge key={key} variant="secondary" className="gap-2 py-1.5 px-3">
                    <span className="font-medium">{key}:</span> {value}
                    <button type="button" onClick={() => handleRemoveSpec(key)}>
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Specification name (e.g., Material)"
                  value={newSpecKey}
                  onChange={(e) => setNewSpecKey(e.target.value)}
                />
                <Input
                  placeholder="Value (e.g., Brass)"
                  value={newSpecValue}
                  onChange={(e) => setNewSpecValue(e.target.value)}
                />
                <Button type="button" variant="outline" onClick={handleAddSpec}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Budget & Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Budget & Timeline</CardTitle>
              <CardDescription>Set your budget range and deadline</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Budget Range (₹) *</Label>
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="number"
                        placeholder="Min"
                        className="pl-9"
                        value={formData.budgetMin}
                        onChange={(e) => setFormData({ ...formData, budgetMin: e.target.value })}
                        required
                      />
                    </div>
                    <span className="text-muted-foreground">to</span>
                    <div className="relative flex-1">
                      <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="number"
                        placeholder="Max"
                        className="pl-9"
                        value={formData.budgetMax}
                        onChange={(e) => setFormData({ ...formData, budgetMax: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deadline">Deadline *</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="deadline"
                      type="date"
                      className="pl-9"
                      value={formData.deadline}
                      onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                      required
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tags & Visibility */}
          <Card>
            <CardHeader>
              <CardTitle>Tags & Visibility</CardTitle>
              <CardDescription>Help makers find your request</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Tags</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {formData.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="gap-1">
                      {tag}
                      <button type="button" onClick={() => handleRemoveTag(tag)}>
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a tag"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                  />
                  <Button type="button" variant="outline" onClick={handleAddTag}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Visibility</Label>
                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant={formData.visibility === 'public' ? 'default' : 'outline'}
                    className="flex-1 gap-2"
                    onClick={() => setFormData({ ...formData, visibility: 'public' })}
                  >
                    <Eye className="h-4 w-4" />
                    Public
                  </Button>
                  <Button
                    type="button"
                    variant={formData.visibility === 'private' ? 'default' : 'outline'}
                    className="flex-1 gap-2"
                    onClick={() => setFormData({ ...formData, visibility: 'private' })}
                  >
                    <EyeOff className="h-4 w-4" />
                    Invite Only
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  {formData.visibility === 'public' 
                    ? 'All makers can see and submit proposals'
                    : 'Only makers you invite can submit proposals'}
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => navigate(-1)}>
              Cancel
            </Button>
            <Button type="submit" size="lg" disabled={isSubmitting}>
              {isSubmitting ? 'Creating...' : 'Post Request'}
            </Button>
          </div>
        </form>
      </div>

      <AIDescriptionModal
        open={aiModalOpen}
        onOpenChange={setAiModalOpen}
        title={formData.title}
        onUseDescription={handleUseDescription}
        onInsertAtCursor={handleInsertAtCursor}
      />
    </Layout>
  );
};

export default CreateRequest;
