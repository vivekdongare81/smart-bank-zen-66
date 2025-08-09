import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Phone, MapPin, Briefcase, Calendar, CreditCard, Banknote } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { getCurrentUser, setCurrentUser } from "@/lib/storage";

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Raj Kumar",
    email: "raj@example.com",
    phone: "+91 9876543210",
    address: "123 Main Street, Mumbai, Maharashtra 400001",
    dateOfBirth: "1990-05-15",
    occupation: "Software Engineer",
    annualIncome: "10,00,000"
  });

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      setProfile({
        name: `${currentUser.firstName} ${currentUser.lastName}`,
        email: currentUser.email || "raj@example.com",
        phone: currentUser.phone || "+91 9876543210",
        address: currentUser.profile?.address || "123 Main Street, Mumbai, Maharashtra 400001",
        dateOfBirth: currentUser.profile?.dateOfBirth || "1990-05-15",
        occupation: currentUser.profile?.employment || "Software Engineer",
        annualIncome: currentUser.profile?.income || "10,00,000"
      });
    }
  }, []);

  const handleProfileUpdate = () => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      const updatedUser = {
        ...currentUser,
        ...profile
      };
      setCurrentUser(updatedUser);
      setIsEditing(false);
      toast({
        title: "Profile Updated",
        description: "Your profile information has been updated successfully."
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Profile
        </h1>
        <p className="text-muted-foreground mt-2">
          Manage your personal information and account settings
        </p>
      </div>

      {/* Personal Information */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Your basic profile details</CardDescription>
            </div>
            <Button 
              variant="outline" 
              onClick={() => isEditing ? handleProfileUpdate() : setIsEditing(true)}
            >
              {isEditing ? "Save Changes" : "Edit Profile"}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              {isEditing ? (
                <Input
                  id="name"
                  value={profile.name}
                  onChange={(e) => setProfile({...profile, name: e.target.value})}
                />
              ) : (
                <div className="flex items-center space-x-2 p-3 bg-muted/20 rounded-md">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span>{profile.name}</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              {isEditing ? (
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({...profile, email: e.target.value})}
                />
              ) : (
                <div className="flex items-center space-x-2 p-3 bg-muted/20 rounded-md">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{profile.email}</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              {isEditing ? (
                <Input
                  id="phone"
                  value={profile.phone}
                  onChange={(e) => setProfile({...profile, phone: e.target.value})}
                />
              ) : (
                <div className="flex items-center space-x-2 p-3 bg-muted/20 rounded-md">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{profile.phone}</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">Date of Birth</Label>
              {isEditing ? (
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={profile.dateOfBirth}
                  onChange={(e) => setProfile({...profile, dateOfBirth: e.target.value})}
                />
              ) : (
                <div className="flex items-center space-x-2 p-3 bg-muted/20 rounded-md">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{new Date(profile.dateOfBirth).toLocaleDateString()}</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="occupation">Occupation</Label>
              {isEditing ? (
                <Input
                  id="occupation"
                  value={profile.occupation}
                  onChange={(e) => setProfile({...profile, occupation: e.target.value})}
                />
              ) : (
                <div className="flex items-center space-x-2 p-3 bg-muted/20 rounded-md">
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                  <span>{profile.occupation}</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="annualIncome">Annual Income</Label>
              {isEditing ? (
                <Input
                  id="annualIncome"
                  value={profile.annualIncome}
                  onChange={(e) => setProfile({...profile, annualIncome: e.target.value})}
                />
              ) : (
                <div className="flex items-center space-x-2 p-3 bg-muted/20 rounded-md">
                  <Banknote className="h-4 w-4 text-muted-foreground" />
                  <span>₹{profile.annualIncome}</span>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            {isEditing ? (
              <Input
                id="address"
                value={profile.address}
                onChange={(e) => setProfile({...profile, address: e.target.value})}
              />
            ) : (
              <div className="flex items-start space-x-2 p-3 bg-muted/20 rounded-md">
                <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                <span>{profile.address}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Account Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Account Summary</CardTitle>
          <CardDescription>Quick overview of your financial status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">₹28,47,650</div>
              <p className="text-sm text-muted-foreground">Account Balance</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-success">₹18,45,230</div>
              <p className="text-sm text-muted-foreground">Investments</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-warning">₹25,00,000</div>
              <p className="text-sm text-muted-foreground">Active Loans</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-info">785</div>
              <p className="text-sm text-muted-foreground">Credit Score</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common account management tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-12">
              <CreditCard className="h-4 w-4 mr-2" />
              Download Statement
            </Button>
            <Button variant="outline" className="h-12">
              <User className="h-4 w-4 mr-2" />
              Update KYC
            </Button>
            <Button variant="outline" className="h-12">
              <Phone className="h-4 w-4 mr-2" />
              Contact Support
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;