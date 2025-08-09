import { TrendingUp, Shield, Building2, PiggyBank, Coins } from "lucide-react";

export interface InvestmentType {
  value: string;
  label: string;
  icon: typeof TrendingUp;
  avgReturn: string;
}

export const investmentTypes: InvestmentType[] = [
  { value: "mutual-funds", label: "Mutual Funds", icon: TrendingUp, avgReturn: "10-15%" },
  { value: "bonds", label: "Bonds", icon: Shield, avgReturn: "6-8%" },
  { value: "eps", label: "EPS", icon: Building2, avgReturn: "8-10%" },
  { value: "nps", label: "NPS", icon: PiggyBank, avgReturn: "9-12%" },
  { value: "gold", label: "Gold", icon: Coins, avgReturn: "6-8%" }
];

export interface Investment {
  id: string;
  userId: string;
  type: 'mutual-funds' | 'gold' | 'bonds' | 'eps' | 'nps';
  name: string;
  amount: number;
  currentValue: number;
  expectedReturn: number;
  stepUpAmount?: number;
  icon: typeof TrendingUp;
  stepUp: boolean;
}

export const investments: Investment[] = [
  {
    id: "inv1",
    userId: "1",
    type: "mutual-funds",
    name: "HDFC Top 100 Fund",
    amount: 500000,
    currentValue: 580000,
    expectedReturn: 12,
    stepUpAmount: 5000,
    icon: TrendingUp,
    stepUp: true
  },
  {
    id: "inv2",
    userId: "1",
    type: "nps",
    name: "NPS Tier 1 Account",
    amount: 300000,
    currentValue: 340000,
    expectedReturn: 10,
    icon: PiggyBank,
    stepUp: false
  },
  {
    id: "inv3",
    userId: "1",
    type: "gold",
    name: "Digital Gold",
    amount: 200000,
    currentValue: 215000,
    expectedReturn: 7,
    icon: Coins,
    stepUp: false
  }
];