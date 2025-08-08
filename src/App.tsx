import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/Layout";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import CreditCard from "./pages/CreditCard";
import Loans from "./pages/Loans";
import Investments from "./pages/Investments";
import Goals from "./pages/Goals";
import ExpenseTracker from "./pages/ExpenseTracker";
import Profile from "./pages/Profile";
import Payment from "./pages/Payment";
import Transactions from "./pages/Transactions";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Index />} />
            <Route path="credit-card" element={<CreditCard />} />
            <Route path="loans" element={<Loans />} />
            <Route path="investments" element={<Investments />} />
            <Route path="goals" element={<Goals />} />
            <Route path="expenses" element={<ExpenseTracker />} />
            <Route path="payment" element={<Payment />} />
            <Route path="transactions" element={<Transactions />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
