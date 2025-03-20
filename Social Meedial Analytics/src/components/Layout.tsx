
import { Link, useLocation } from "react-router-dom";
import { Home, Users, TrendingUp, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

const Layout = ({ children, title }: LayoutProps) => {
  const location = useLocation();
  
  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <div className="w-16 md:w-64 bg-card border-r border-border flex flex-col">
        <div className="p-4 border-b border-border">
          <h1 className="text-lg font-bold hidden md:block">Social Analytics</h1>
          <div className="md:hidden flex justify-center">
            <div className="w-8 h-8 bg-primary text-primary-foreground rounded-md flex items-center justify-center font-bold">
              SA
            </div>
          </div>
        </div>
        
        <nav className="flex flex-col gap-2 p-3">
          <NavItem 
            to="/" 
            icon={<Home size={20} />} 
            label="Dashboard" 
            isActive={location.pathname === '/'} 
          />
          <NavItem 
            to="/top-users" 
            icon={<Users size={20} />} 
            label="Top Users" 
            isActive={location.pathname === '/top-users'} 
          />
          <NavItem 
            to="/trending-posts" 
            icon={<TrendingUp size={20} />} 
            label="Trending Posts" 
            isActive={location.pathname === '/trending-posts'} 
          />
          <NavItem 
            to="/feed" 
            icon={<Activity size={20} />} 
            label="Feed" 
            isActive={location.pathname === '/feed'} 
          />
        </nav>
      </div>
      
      {/* Main content */}
      <div className="flex-1 overflow-auto">
        {title && (
          <header className="border-b border-border p-4 bg-card">
            <h1 className="text-2xl font-bold">{title}</h1>
          </header>
        )}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
}

const NavItem = ({ to, icon, label, isActive }: NavItemProps) => {
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
        isActive 
          ? "bg-primary text-primary-foreground" 
          : "text-muted-foreground hover:bg-muted hover:text-foreground"
      )}
    >
      {icon}
      <span className="hidden md:inline-block">{label}</span>
    </Link>
  );
};

export default Layout;
