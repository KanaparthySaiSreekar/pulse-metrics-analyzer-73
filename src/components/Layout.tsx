
import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import SidebarNav from "./SidebarNav";
import ThemeToggle from "./ThemeToggle";

interface LayoutProps {
  children: ReactNode;
}

const pageVariants = {
  initial: {
    opacity: 0,
    y: 8
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1]
    }
  },
  exit: {
    opacity: 0,
    y: 8,
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col bg-background w-full">
        <SidebarNav />
        <SidebarInset>
          <div className="sticky top-0 z-10 flex items-center justify-between p-4 backdrop-blur-lg border-b border-border/40">
            <SidebarTrigger />
            <ThemeToggle />
          </div>
          <motion.main
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            className="flex-1 w-full mx-auto px-4 py-6 sm:px-6 lg:px-8 max-w-7xl"
          >
            {children}
          </motion.main>
          <footer className="py-6 text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} TASC Insights. All rights reserved.</p>
          </footer>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
