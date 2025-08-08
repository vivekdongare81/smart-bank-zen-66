import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Shield, 
  Bell, 
  CreditCard,
  FileText,
  Download,
  Edit
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { getCurrentUser, setCurrentUser } from "@/lib/storage";

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    dateOfBirth: "",
    occupation: "",
    annualIncome: ""
  });

  const currentUser = getCurrentUser();

  useEffect(() => {
    if (currentUser) {
      setProfile({
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email,
        phone: currentUser.phone,
        address: currentUser.profile?.address || "",
        dateOfBirth: currentUser.profile?.dateOfBirth || "",
        occupation: currentUser.profile?.employment || "",
        annualIncome: currentUser.profile?.income || ""
      });
    }
  }, [currentUser]);

  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    smsAlerts: true,
    budgetAlerts: true,
    goalReminders: true,
    transactionAlerts: false
  });

  const accountSummary = {
    totalBalance: 2847650,
    totalInvestments: 1845230,
    activeLoans: 2,
    creditScore: 750,
    memberSince: "2020-03-15"
  };

  const handleProfileUpdate = () => {
    if (currentUser) {
      const updatedUser = {
        ...currentUser,
        firstName: profile.firstName,
        lastName: profile.lastName,
        email: profile.email,
        phone: profile.phone,
        profile: {
          address: profile.address,
          dateOfBirth: profile.dateOfBirth,
          employment: profile.occupation,
          income: profile.annualIncome,
          pan: currentUser.profile?.pan || ""
        }
      };
      
      setCurrentUser(updatedUser);
      setIsEditing(false);
      toast({
        title: "Profile Updated",
        description: "Your profile information has been updated successfully."
      });
    }
  };

  const handleNotificationUpdate = (key: string, value: boolean) => {
    setNotifications({ ...notifications, [key]: value });
    toast({
      title: "Notification Settings Updated",
      description: `${key} ${value ? 'enabled' : 'disabled'} successfully.`
    });
  };

  const downloadStatement = () => {
    toast({
      title: "Downloading Statement",
      description: "Your account statement is being downloaded."
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Profile
        </h1>
        <p className="text-muted-foreground mt-2">
          Manage your account information and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src="/placeholder-avatar.jpg" />
                    <AvatarFallback className="bg-gradient-primary text-primary-foreground text-xl">
                      {profile.firstName[0]}{profile.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Update your personal details</CardDescription>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => setIsEditing(!isEditing)}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  {isEditing ? "Cancel" : "Edit"}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={profile.firstName}
                      disabled={!isEditing}
                      onChange={(e) => setProfile({...profile, firstName: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={profile.lastName}
                      disabled={!isEditing}
                      onChange={(e) => setProfile({...profile, lastName: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      disabled={!isEditing}
                      onChange={(e) => setProfile({...profile, email: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={profile.phone}
                      disabled={!isEditing}
                      onChange={(e) => setProfile({...profile, phone: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={profile.address}
                    disabled={!isEditing}
                    onChange={(e) => setProfile({...profile, address: e.target.value})}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={profile.dateOfBirth}
                      disabled={!isEditing}
                      onChange={(e) => setProfile({...profile, dateOfBirth: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="occupation">Occupation</Label>
                    <Input
                      id="occupation"
                      value={profile.occupation}
                      disabled={!isEditing}
                      onChange={(e) => setProfile({...profile, occupation: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="annualIncome">Annual Income (₹)</Label>
                  <Input
                    id="annualIncome"
                    type="number"
                    value={profile.annualIncome}
                    disabled={!isEditing}
                    onChange={(e) => setProfile({...profile, annualIncome: e.target.value})}
                  />
                </div>

                {isEditing && (
                  <Button onClick={handleProfileUpdate} className="w-full">
                    Save Changes
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="h-5 w-5" />
                <span>Notification Preferences</span>
              </CardTitle>
              <CardDescription>Choose how you want to be notified</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(notifications).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {key === 'emailAlerts' && 'Receive email notifications for important updates'}
                        {key === 'smsAlerts' && 'Get SMS alerts for critical transactions'}
                        {key === 'budgetAlerts' && 'Notifications when approaching budget limits'}
                        {key === 'goalReminders' && 'Reminders about your financial goals'}
                        {key === 'transactionAlerts' && 'Instant alerts for all transactions'}
                      </p>
                    </div>
                    <Switch
                      checked={value}
                      onCheckedChange={(checked) => handleNotificationUpdate(key, checked)}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Account Summary */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Account Summary</span>
              </CardTitle>
              <CardDescription>Overview of your SmartBank account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total Balance</span>
                <span className="font-semibold">₹{accountSummary.totalBalance.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Investments</span>
                <span className="font-semibold text-success">₹{accountSummary.totalInvestments.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Active Loans</span>
                <Badge variant="secondary">{accountSummary.activeLoans}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Credit Score</span>
                <Badge variant="default" className="bg-success text-success-foreground">
                  {accountSummary.creditScore}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Member Since</span>
                <span className="text-sm">{new Date(accountSummary.memberSince).toLocaleDateString()}</span>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common account actions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start" onClick={downloadStatement}>
                <Download className="h-4 w-4 mr-2" />
                Download Statement
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <CreditCard className="h-4 w-4 mr-2" />
                Manage Cards
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Shield className="h-4 w-4 mr-2" />
                Security Settings
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <FileText className="h-4 w-4 mr-2" />
                Tax Documents
              </Button>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Need Help?</CardTitle>
              <CardDescription>Get in touch with our support team</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">1800-123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">support@smartbank.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">24/7 Support Available</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;