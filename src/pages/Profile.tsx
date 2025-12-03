import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { sampleRequests } from '@/data/mockData';
import { RequestCard } from '@/components/RequestCard';
import { toast } from 'sonner';
import { 
  User, 
  Mail, 
  Calendar, 
  Star, 
  Edit2, 
  Camera,
  Package,
  ShoppingBag,
  Settings,
  CheckCircle
} from 'lucide-react';

const Profile = () => {
  const { user, updateRole } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: user?.name || '',
    bio: user?.bio || 'Passionate about unique, handcrafted products.',
    skills: user?.skills || ['Glassblowing', 'Metal Art'],
  });

  const handleSave = () => {
    toast.success('Profile updated successfully!');
    setIsEditing(false);
  };

  const myRequests = sampleRequests.slice(0, 2);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Profile Header */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-start gap-6">
              {/* Avatar */}
              <div className="relative">
                <div className="w-28 h-28 rounded-full bg-muted overflow-hidden">
                  <img 
                    src={user?.profilePhoto || '/placeholder.svg'} 
                    alt={user?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <Button 
                  size="icon" 
                  variant="secondary"
                  className="absolute bottom-0 right-0 rounded-full h-8 w-8"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>

              {/* Info */}
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h1 className="text-2xl font-display font-bold">{user?.name}</h1>
                      {user?.verified && (
                        <CheckCircle className="h-5 w-5 text-secondary" />
                      )}
                    </div>
                    <p className="text-muted-foreground flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      {user?.email}
                    </p>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)}>
                    <Edit2 className="h-4 w-4 mr-2" />
                    {isEditing ? 'Cancel' : 'Edit Profile'}
                  </Button>
                </div>

                <div className="flex flex-wrap items-center gap-4 mt-4">
                  <Badge variant="secondary" className="capitalize">
                    {user?.role === 'both' ? 'Buyer & Maker' : user?.role}
                  </Badge>
                  <span className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    Joined {user?.joinedAt ? new Date(user.joinedAt).toLocaleDateString() : 'Recently'}
                  </span>
                  {user?.rating && user.rating > 0 && (
                    <span className="flex items-center gap-1 text-sm text-gold">
                      <Star className="h-4 w-4 fill-current" />
                      {user.rating.toFixed(1)}
                    </span>
                  )}
                </div>

                <p className="mt-4 text-muted-foreground">{profile.bio}</p>

                {user?.skills && user.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {profile.skills.map((skill) => (
                      <Badge key={skill} variant="outline">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Edit Form */}
        {isEditing && (
          <Card className="mb-8 animate-fade-up">
            <CardHeader>
              <CardTitle>Edit Profile</CardTitle>
              <CardDescription>Update your profile information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Display Name</Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Role</Label>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant={user?.role === 'buyer' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => updateRole('buyer')}
                    >
                      <ShoppingBag className="h-4 w-4 mr-2" />
                      Buyer
                    </Button>
                    <Button
                      type="button"
                      variant={user?.role === 'maker' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => updateRole('maker')}
                    >
                      <Package className="h-4 w-4 mr-2" />
                      Maker
                    </Button>
                    <Button
                      type="button"
                      variant={user?.role === 'both' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => updateRole('both')}
                    >
                      Both
                    </Button>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  className="min-h-[100px]"
                />
              </div>
              <div className="flex justify-end">
                <Button onClick={handleSave}>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Tabs */}
        <Tabs defaultValue="requests">
          <TabsList className="mb-6">
            <TabsTrigger value="requests" className="gap-2">
              <ShoppingBag className="h-4 w-4" />
              My Requests
            </TabsTrigger>
            <TabsTrigger value="orders" className="gap-2">
              <Package className="h-4 w-4" />
              Orders
            </TabsTrigger>
            <TabsTrigger value="settings" className="gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="requests">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myRequests.map((request) => (
                <RequestCard key={request.id} request={request} />
              ))}
            </div>
            {myRequests.length === 0 && (
              <Card>
                <CardContent className="py-12 text-center">
                  <ShoppingBag className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="font-semibold mb-2">No requests yet</h3>
                  <p className="text-muted-foreground mb-4">Create your first custom product request</p>
                  <Button>Create Request</Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="orders">
            <Card>
              <CardContent className="py-12 text-center">
                <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="font-semibold mb-2">No orders yet</h3>
                <p className="text-muted-foreground">Your active and completed orders will appear here</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Email Address</Label>
                    <Input value={user?.email || ''} disabled />
                  </div>
                  <Button variant="outline">Change Password</Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Notifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">
                    Notification preferences coming soon...
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Profile;
