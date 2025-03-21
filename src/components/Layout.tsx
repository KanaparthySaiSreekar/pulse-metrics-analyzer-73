
import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import Navbar from "./Navbar";

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
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <motion.main
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        className="flex-1 max-w-7xl w-full mx-auto px-4 py-6 sm:px-6 lg:px-8"
      >
        {children}
      </motion.main>
      <footer className="py-6 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} AidenAi powered by TASC. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;
