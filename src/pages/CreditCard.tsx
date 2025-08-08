import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CreditCard, Shield, Star, Zap } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { getCurrentUser, addCreditCardApplication } from "@/lib/storage";

const CreditCardPage = () => {
  const [selectedCard, setSelectedCard] = useState("");
  const [isApplying, setIsApplying] = useState(false);

  const creditCards = [
    {
      id: "platinum",
      name: "Platinum Card",
      icon: Star,
      benefits: ["2% cashback on all purchases", "Free airport lounge access", "₹50,000 credit limit"],
      annualFee: "₹1,999",
      color: "from-gray-400 to-gray-600"
    },
    {
      id: "premium",
      name: "Premium Card", 
      icon: Shield,
      benefits: ["5% cashback on dining", "Fuel surcharge waiver", "₹1,00,000 credit limit"],
      annualFee: "₹3,999",
      color: "from-yellow-400 to-yellow-600"
    },
    {
      id: "signature",
      name: "Signature Card",
      icon: Zap,
      benefits: ["10% cashback on travel", "Concierge services", "₹2,00,000 credit limit"],
      annualFee: "₹9,999",
      color: "from-purple-400 to-purple-600"
    }
  ];

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    const currentUser = getCurrentUser();
    
    if (!currentUser) {
      toast({
        title: "Please log in",
        description: "You need to be logged in to apply for a credit card.",
        variant: "destructive"
      });
      return;
    }

    if (!selectedCard) {
      toast({
        title: "Please select a card",
        description: "Choose a credit card before applying.",
        variant: "destructive"
      });
      return;
    }

    setIsApplying(true);
    
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const applicationData = {
      userId: currentUser.id,
      cardType: selectedCard,
      fullName: formData.get('fullName') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      pan: formData.get('pan') as string,
      income: formData.get('income') as string,
      employment: formData.get('employment') as string,
      address: formData.get('address') as string,
      status: 'pending' as const,
    };

    setTimeout(() => {
      addCreditCardApplication(applicationData);
      setIsApplying(false);
      toast({
        title: "Application Submitted!",
        description: "Your credit card application is being processed. You'll hear from us within 7 business days.",
      });
      
      // Reset form
      (e.target as HTMLFormElement).reset();
      setSelectedCard("");
    }, 2000);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Credit Cards
        </h1>
        <p className="text-muted-foreground mt-2">
          Choose the perfect credit card for your lifestyle
        </p>
      </div>

      {/* Credit Card Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {creditCards.map((card) => {
          const IconComponent = card.icon;
          return (
            <Card 
              key={card.id}
              className={`cursor-pointer transition-all duration-300 hover:shadow-elevated ${
                selectedCard === card.id ? 'ring-2 ring-primary shadow-elevated' : ''
              }`}
              onClick={() => setSelectedCard(card.id)}
            >
              <CardHeader>
                <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${card.color} flex items-center justify-center mb-4`}>
                  <IconComponent className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="flex items-center justify-between">
                  {card.name}
                  <CreditCard className="h-5 w-5 text-muted-foreground" />
                </CardTitle>
                <CardDescription>Annual Fee: {card.annualFee}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {card.benefits.map((benefit, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-start">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 mr-2 flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Application Form */}
      <Card>
        <CardHeader>
          <CardTitle>Credit Card Application</CardTitle>
          <CardDescription>
            Fill in your details to apply for your selected credit card
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleApply} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName" name="fullName" placeholder="Enter your full name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" name="email" type="email" placeholder="your@email.com" required />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" name="phone" type="tel" placeholder="+91 9876543210" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pan">PAN Number</Label>
                <Input id="pan" name="pan" placeholder="ABCDE1234F" required />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="income">Monthly Income</Label>
                <Select name="income" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select income range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="25000-50000">₹25,000 - ₹50,000</SelectItem>
                    <SelectItem value="50000-100000">₹50,000 - ₹1,00,000</SelectItem>
                    <SelectItem value="100000-200000">₹1,00,000 - ₹2,00,000</SelectItem>
                    <SelectItem value="200000+">₹2,00,000+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="employment">Employment Type</Label>
                <Select name="employment" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select employment type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="salaried">Salaried</SelectItem>
                    <SelectItem value="self-employed">Self Employed</SelectItem>
                    <SelectItem value="business">Business Owner</SelectItem>
                    <SelectItem value="freelancer">Freelancer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input id="address" name="address" placeholder="Enter your complete address" required />
            </div>

            <Button type="submit" className="w-full" disabled={isApplying}>
              {isApplying ? "Processing Application..." : "Apply for Credit Card"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreditCardPage;