
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ChevronRight, BarChart3, FileText, Home, LogOut, User } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

const SidebarNav = () => {
  const location = useLocation();
  const { user, logout, hasRole } = useAuth();
  const isActive = (path: string) => location.pathname === path;

  const getNavItems = () => {
    const items = [
      {
        title: "Home",
        path: "/",
        icon: Home,
        showFor: ['admin', 'customer'],
      },
      {
        title: "Survey",
        path: "/survey",
        icon: FileText,
        showFor: ['admin', 'customer'],
      },
      {
        title: "Analytics",
        path: "/analytics",
        icon: BarChart3,
        showFor: ['admin'],
      },
    ];

    // Filter items based on user role
    return items.filter(item => 
      !user || (user && item.showFor.includes(user.role))
    );
  };

  const navItems = getNavItems();

  return (
    <Sidebar>
      <SidebarHeader className="py-4">
        <Link to="/" className="flex items-center space-x-1 text-foreground px-2">
          <span className="font-semibold text-xl tracking-tight">TASC</span>
          <ChevronRight className="h-4 w-4 text-primary" />
          <span className="font-light text-xl tracking-tight">Insights</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton 
                    tooltip={item.title}
                    asChild
                    isActive={isActive(item.path)}
                  >
                    <Link to={item.path} className="flex items-center gap-2">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                      {isActive(item.path) && (
                        <motion.div
                          layoutId="navIndicator"
                          className="absolute right-0 w-1 h-full bg-primary rounded-l-md"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4">
        {user ? (
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-2 rounded-md bg-secondary/30">
              <div className="bg-primary/10 p-2 rounded-full">
                <User className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user.name}</p>
                <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full flex items-center gap-2" 
              onClick={logout}
            >
              <LogOut className="h-3.5 w-3.5" /> Logout
            </Button>
          </div>
        ) : (
          <Button asChild variant="default" size="sm" className="w-full">
            <Link to="/login">Log in</Link>
          </Button>
        )}
      </SidebarFooter>
    </Sidebar>
  );
};

export default SidebarNav;
