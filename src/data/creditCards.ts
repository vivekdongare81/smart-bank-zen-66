import { Star, Shield, Zap } from "lucide-react";

export interface CreditCardOption {
  id: string;
  name: string;
  icon: typeof Star;
  benefits: string[];
  annualFee: string;
  color: string;
}

export const creditCards: CreditCardOption[] = [
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

export interface CreditCardApplication {
  id: string;
  cardType: string;
  fullName: string;
  email: string;
  phone: string;
  pan: string;
  income: string;
  employment: string;
  address: string;
  status: 'pending' | 'approved' | 'rejected';
  appliedDate: string;
}

export const creditCardApplications: CreditCardApplication[] = [
  {
    id: "app1",
    cardType: "premium",
    fullName: "Raj Kumar",
    email: "raj@example.com",
    phone: "+91 9876543210",
    pan: "ABCDE1234F",
    income: "50000-100000",
    employment: "salaried",
    address: "123 Main Street, Mumbai",
    status: "approved",
    appliedDate: "2024-01-15"
  }
];