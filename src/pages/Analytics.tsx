
import React from "react";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import AnalyticsCard from "@/components/AnalyticsCard";
import AnalyticsChart from "@/components/AnalyticsChart";
import FeedbackSummary from "@/components/FeedbackSummary";
import { BarChart3, TrendingUp, Heart, ThumbsUp, Users, Zap } from "lucide-react";

const Analytics = () => {
  return (
    <Layout>
      <div className="container px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
              <p className="text-muted-foreground">
                Track customer sentiment and satisfaction metrics
              </p>
            </div>
            <div className="inline-flex items-center bg-secondary/50 rounded-full px-3 py-1 text-sm text-muted-foreground">
              <Zap className="w-4 h-4 mr-1 text-primary" />
              Last updated: {new Date().toLocaleDateString()}
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <AnalyticsCard
            title="Average NPS Score"
            value="8.4"
            description="Last 30 days"
            icon={BarChart3}
            trend="up"
            trendValue="+0.6"
          />
          <AnalyticsCard
            title="Sentiment Score"
            value="7.9"
            description="Last 30 days"
            icon={TrendingUp}
            trend="up"
            trendValue="+0.3"
          />
          <AnalyticsCard
            title="Promoters"
            value="68%"
            description="Scores 9-10"
            icon={ThumbsUp}
            trend="up"
            trendValue="+5%"
          />
          <AnalyticsCard
            title="Total Responses"
            value="1,248"
            description="Last 30 days"
            icon={Users}
            trend="up"
            trendValue="+124"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <AnalyticsChart />
          </div>
          <div className="grid grid-cols-1 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              <Card icon={Heart} title="Customer Satisfaction" progress={85} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              <Card icon={ThumbsUp} title="Recommendation Rate" progress={78} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              <Card icon={TrendingUp} title="Response Rate" progress={92} />
            </motion.div>
          </div>
        </div>

        <FeedbackSummary />
      </div>
    </Layout>
  );
};

interface CardProps {
  icon: React.FC<{ className?: string }>;
  title: string;
  progress: number;
}

const Card = ({ icon: Icon, title, progress }: CardProps) => {
  return (
    <div className="border-white/20 bg-card/70 backdrop-blur-sm border rounded-lg p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="font-medium text-sm">{title}</span>
        <div className="bg-secondary/50 p-1.5 rounded-full">
          <Icon className="w-3.5 h-3.5 text-muted-foreground" />
        </div>
      </div>
      <div className="w-full bg-secondary/50 rounded-full h-2 mb-1">
        <motion.div
          className="bg-primary h-2 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, delay: 0.5 }}
        />
      </div>
      <div className="flex justify-between items-center text-xs text-muted-foreground">
        <span>Progress</span>
        <span className="font-medium">{progress}%</span>
      </div>
    </div>
  );
};

export default Analytics;
