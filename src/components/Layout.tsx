import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { 
  Home, 
  CreditCard, 
  Banknote, 
  TrendingUp, 
  Target, 
  Receipt, 
  User,
  LogOut,
  Menu,
  X,
  ChevronDown
} from "lucide-react";
import { useState } from "react";
import { useAuthRedirect } from "@/hooks/useAuth";

export const Layout = () => {
  useAuthRedirect();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/auth');
  };

  const navItems = [
    { to: "/", icon: Home, label: "Dashboard" },
    { to: "/payment", icon: Banknote, label: "Payment" },
    { to: "/transactions", icon: Receipt, label: "Transactions" },
    { to: "/investments", icon: TrendingUp, label: "Investments" },
    { to: "/goals", icon: Target, label: "Goals" },
    { to: "/expenses", icon: Receipt, label: "Expenses" },
    { to: "/profile", icon: User, label: "Profile" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-primary border-b border-border/50 shadow-glow">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-primary-foreground">
                SmartBank
              </h1>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {/* Banking dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground"
                  >
                    <span>Banking</span>
                    <ChevronDown className="h-3.5 w-3.5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="z-50">
                  <NavLink to="/credit-card" className="w-full">
                    <DropdownMenuItem className="cursor-pointer">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Credit Card
                    </DropdownMenuItem>
                  </NavLink>
                  <NavLink to="/loans" className="w-full">
                    <DropdownMenuItem className="cursor-pointer">
                      <Banknote className="h-4 w-4 mr-2" />
                      Loans
                    </DropdownMenuItem>
                  </NavLink>
                </DropdownMenuContent>
              </DropdownMenu>

              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? "bg-primary-foreground/20 text-primary-foreground"
                        : "text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground"
                    }`
                  }
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </nav>

            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-primary-foreground hover:bg-primary-foreground/10"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
              
              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden text-primary-foreground"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <Card className="lg:hidden border-0 border-t border-border/50 rounded-none">
          <nav className="p-4 space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                  }`
                }
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </NavLink>
            ))}

            <div className="pt-2 mt-2 border-t border-border/50">
              <div className="px-4 py-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                Banking
              </div>
              <NavLink
                to="/credit-card"
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                  }`
                }
              >
                <CreditCard className="h-5 w-5" />
                <span>Credit Card</span>
              </NavLink>
              <NavLink
                to="/loans"
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                  }`
                }
              >
                <Banknote className="h-5 w-5" />
                <span>Loans</span>
              </NavLink>
            </div>
          </nav>
        </Card>
      )}

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
};