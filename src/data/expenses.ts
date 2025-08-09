import { ShoppingCart, Car, Utensils, Home, Gamepad2, TrendingUp, TrendingDown } from "lucide-react";

export interface ExpenseCategory {
  name: string;
  icon: typeof ShoppingCart;
  color: string;
}

export const expenseCategories: ExpenseCategory[] = [
  { name: "Food", icon: Utensils, color: "from-green-400 to-green-600" },
  { name: "Transport", icon: Car, color: "from-blue-400 to-blue-600" },
  { name: "Entertainment", icon: Gamepad2, color: "from-purple-400 to-purple-600" },
  { name: "Shopping", icon: ShoppingCart, color: "from-pink-400 to-pink-600" },
  { name: "Bills", icon: Home, color: "from-orange-400 to-orange-600" },
];

export interface BudgetLimit {
  category: string;
  limit: number;
  spent: number;
  month: string;
}

export const budgetLimits: BudgetLimit[] = [
  { category: "Food", limit: 15000, spent: 8500, month: "2024-01" },
  { category: "Transport", limit: 8000, spent: 5200, month: "2024-01" },
  { category: "Entertainment", limit: 5000, spent: 3800, month: "2024-01" },
  { category: "Shopping", limit: 10000, spent: 12500, month: "2024-01" },
  { category: "Bills", limit: 12000, spent: 9800, month: "2024-01" },
];

export interface ExpenseTransaction {
  id: string;
  userId: string;
  description: string;
  category: string;
  amount: number;
  type: 'expense' | 'income';
  date: string;
  merchant?: string;
}

export const expenseTransactions: ExpenseTransaction[] = [
  {
    id: "exp1",
    userId: "1",
    description: "Swiggy Food Order",
    category: "Food",
    amount: 450,
    type: "expense",
    date: "2024-01-15",
    merchant: "Swiggy"
  },
  {
    id: "exp2",
    userId: "1",
    description: "Uber Ride",
    category: "Transport",
    amount: 280,
    type: "expense",
    date: "2024-01-14",
    merchant: "Uber"
  },
  {
    id: "exp3",
    userId: "1",
    description: "Netflix Subscription",
    category: "Entertainment",
    amount: 799,
    type: "expense",
    date: "2024-01-13",
    merchant: "Netflix"
  },
  {
    id: "exp4",
    userId: "1",
    description: "Amazon Shopping",
    category: "Shopping",
    amount: 2500,
    type: "expense",
    date: "2024-01-12",
    merchant: "Amazon"
  },
  {
    id: "exp5",
    userId: "1",
    description: "Electricity Bill",
    category: "Bills",
    amount: 2200,
    type: "expense",
    date: "2024-01-11",
    merchant: "BESCOM"
  }
];