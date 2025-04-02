
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const { user, isAuthenticated } = useAuth();

  return (
    <Layout>
      <div className="container px-4 py-12 mx-auto">
        <div className="flex flex-col items-center justify-center max-w-4xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Welcome to <span className="text-primary">TASC Insights</span>
            </h1>
            <p className="mt-6 text-xl text-muted-foreground max-w-3xl mx-auto">
              Collect and analyze feedback effortlessly with our powerful customer satisfaction platform.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mt-8 flex flex-col sm:flex-row gap-4 w-full max-w-md justify-center"
          >
            {isAuthenticated ? (
              <Button asChild size="lg" className="w-full">
                <Link to={user?.role === "admin" ? "/analytics" : "/survey"}>
                  Go to {user?.role === "admin" ? "Dashboard" : "Survey"}
                </Link>
              </Button>
            ) : (
              <>
                <Button asChild size="lg" className="w-full">
                  <Link to="/login">Log In</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="w-full">
                  <Link to="/signup">Sign Up</Link>
                </Button>
              </>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <FeatureCard
              title="Collect Feedback"
              description="Gather customer feedback through well-designed surveys."
              icon="📝"
            />
            <FeatureCard
              title="Analyze Results"
              description="Study customer satisfaction with powerful analytics tools."
              icon="📊"
            />
            <FeatureCard
              title="Take Action"
              description="Implement changes based on valuable customer insights."
              icon="🚀"
            />
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
}

const FeatureCard = ({ title, description, icon }: FeatureCardProps) => (
  <div className="bg-card/70 backdrop-blur-sm border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
    <div className="text-3xl mb-4">{icon}</div>
    <h3 className="text-lg font-medium mb-2">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </div>
);

export default Index;
