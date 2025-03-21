
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ChevronRight, BarChart3, FileText } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300 backdrop-blur-lg",
        scrolled ? "bg-background/80 shadow-sm" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link 
            to="/" 
            className="flex items-center space-x-1 text-foreground"
          >
            <span className="font-semibold text-xl tracking-tight">Pulse</span>
            <ChevronRight className="h-4 w-4 text-primary" />
            <span className="font-light text-xl tracking-tight">Metrics</span>
          </Link>
          
          <nav className="flex items-center space-x-1">
            <NavLink to="/" active={isActive("/")}>
              Home
            </NavLink>
            <NavLink to="/survey" active={isActive("/survey")}>
              <FileText className="w-4 h-4 mr-1" />
              Survey
            </NavLink>
            <NavLink to="/analytics" active={isActive("/analytics")}>
              <BarChart3 className="w-4 h-4 mr-1" />
              Analytics
            </NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
};

interface NavLinkProps {
  to: string;
  active: boolean;
  children: React.ReactNode;
}

const NavLink = ({ to, active, children }: NavLinkProps) => {
  return (
    <Link
      to={to}
      className={cn(
        "relative flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
        active
          ? "text-primary"
          : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
      )}
    >
      {children}
      {active && (
        <motion.div
          layoutId="navIndicator"
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </Link>
  );
};

export default Navbar;
