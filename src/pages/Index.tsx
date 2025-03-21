
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, BarChart3, MessageSquare, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";

const Index = () => {
  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-block mb-3 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
            Customer-Centric Insights
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
            Transform Feedback Into <br className="hidden sm:block" />
            <span className="text-primary">Actionable Insights</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Collect, analyze and visualize customer feedback with AI-powered sentiment analysis
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/survey">
              <Button size="lg" className="group">
                Start Collecting Feedback
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/analytics">
              <Button size="lg" variant="outline">
                View Analytics Dashboard
              </Button>
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            <FeatureCard
              icon={MessageSquare}
              title="Collect Feedback"
              description="Gather NPS scores and detailed feedback from your customers with an elegant, user-friendly survey interface."
              delay={0.1}
            />
            <FeatureCard
              icon={TrendingUp}
              title="Sentiment Analysis"
              description="Automatically analyze feedback text to determine sentiment, uncovering the emotions behind customer responses."
              delay={0.2}
            />
            <FeatureCard
              icon={BarChart3}
              title="Visual Analytics"
              description="Transform raw data into beautiful, insightful visualizations that help you make better business decisions."
              delay={0.3}
            />
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

interface FeatureCardProps {
  icon: React.FC<{ className?: string }>;
  title: string;
  description: string;
  delay: number;
}

const FeatureCard = ({ icon: Icon, title, description, delay }: FeatureCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="bg-card/70 backdrop-blur-sm border border-white/20 rounded-lg p-6 hover:shadow-md transition-shadow"
    >
      <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </motion.div>
  );
};

export default Index;
