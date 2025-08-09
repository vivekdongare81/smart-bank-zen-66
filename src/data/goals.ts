import { Target, Car, Home, GraduationCap, Plane } from "lucide-react";

export interface GoalIcon {
  icon: typeof Target;
  label: string;
}

export const goalIcons: GoalIcon[] = [
  { icon: Car, label: "Car" },
  { icon: Home, label: "Home" },
  { icon: GraduationCap, label: "Education" },
  { icon: Plane, label: "Travel" },
  { icon: Target, label: "General" }
];

export interface Goal {
  id: string;
  userId: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  category: string;
  priority: 'low' | 'medium' | 'high';
  icon: typeof Target;
  timeFrame: number;
}

export const goals: Goal[] = [
  {
    id: "goal1",
    userId: "1",
    name: "Buy New Car",
    targetAmount: 800000,
    currentAmount: 120000,
    deadline: "2025-12-31",
    category: "Car",
    priority: "high",
    icon: Car,
    timeFrame: 18
  },
  {
    id: "goal2",
    userId: "1",
    name: "Emergency Fund",
    targetAmount: 500000,
    currentAmount: 285000,
    deadline: "2025-06-30",
    category: "General",
    priority: "high",
    icon: Target,
    timeFrame: 12
  },
  {
    id: "goal3",
    userId: "1",
    name: "Europe Trip",
    targetAmount: 300000,
    currentAmount: 45000,
    deadline: "2025-08-15",
    category: "Travel",
    priority: "medium",
    icon: Plane,
    timeFrame: 14
  }
];