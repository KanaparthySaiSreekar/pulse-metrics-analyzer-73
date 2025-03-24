
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ChevronRight, BarChart3, FileText, Home } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const SidebarNav = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    {
      title: "Home",
      path: "/",
      icon: Home,
    },
    {
      title: "Survey",
      path: "/survey",
      icon: FileText,
    },
    {
      title: "Analytics",
      path: "/analytics",
      icon: BarChart3,
    },
  ];

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
    </Sidebar>
  );
};

export default SidebarNav;
