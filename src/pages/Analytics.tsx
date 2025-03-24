
import React, { useState } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import AnalyticsCard from "@/components/AnalyticsCard";
import AnalyticsChart from "@/components/AnalyticsChart";
import FeedbackSummary from "@/components/FeedbackSummary";
import { BarChart3, TrendingUp, Heart, ThumbsUp, Users, Zap, UserRound } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

// Sample user data for the dropdown
const customers = [
  { id: "all", name: "All Customers" },
  { id: "user1", name: "John Smith" },
  { id: "user2", name: "Emily Johnson" },
  { id: "user3", name: "Michael Brown" },
  { id: "user4", name: "Sarah Wilson" },
];

// User-specific data
const userData = {
  user1: {
    npsScore: "9.2",
    sentiment: "8.7",
    promoter: "Yes",
    responses: "24",
    satisfaction: 92,
    recommendation: 88,
    responseRate: 95
  },
  user2: {
    npsScore: "7.5",
    sentiment: "6.8",
    promoter: "No",
    responses: "18",
    satisfaction: 75,
    recommendation: 70,
    responseRate: 85
  },
  user3: {
    npsScore: "8.9",
    sentiment: "8.3",
    promoter: "Yes",
    responses: "31",
    satisfaction: 87,
    recommendation: 82,
    responseRate: 90
  },
  user4: {
    npsScore: "6.3",
    sentiment: "5.9",
    promoter: "No",
    responses: "15",
    satisfaction: 64,
    recommendation: 58,
    responseRate: 80
  }
};

// Aggregate data (for "All Customers" view)
const aggregateData = {
  npsScore: "8.4",
  sentiment: "7.9",
  promoter: "68%",
  responses: "1,248",
  satisfaction: 85,
  recommendation: 78,
  responseRate: 92
};

const Analytics = () => {
  const [selectedUser, setSelectedUser] = useState("all");
  
  // Choose between aggregate data or user-specific data
  const displayData = selectedUser === "all" 
    ? aggregateData 
    : userData[selectedUser as keyof typeof userData];

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
            <div className="flex items-center gap-3">
              <div className="w-64">
                <Select value={selectedUser} onValueChange={setSelectedUser}>
                  <SelectTrigger className="h-9 bg-secondary/30">
                    <UserRound className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Select customer" />
                  </SelectTrigger>
                  <SelectContent>
                    {customers.map((customer) => (
                      <SelectItem key={customer.id} value={customer.id}>
                        {customer.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="inline-flex items-center bg-secondary/50 rounded-full px-3 py-1 text-sm text-muted-foreground">
                <Zap className="w-4 h-4 mr-1 text-primary" />
                Last updated: {new Date().toLocaleDateString()}
              </div>
            </div>
          </div>
        </motion.div>

        {selectedUser !== "all" && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-6 p-4 bg-secondary/20 rounded-lg border border-border/40"
          >
            <div className="flex items-center gap-3">
              <div className="bg-secondary/60 p-2 rounded-full">
                <UserRound className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-medium">
                  {customers.find(c => c.id === selectedUser)?.name}
                </h2>
                <p className="text-sm text-muted-foreground">
                  Individual customer analytics
                </p>
              </div>
            </div>
          </motion.div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <AnalyticsCard
            title="Average NPS Score"
            value={displayData.npsScore}
            description="Last 30 days"
            icon={BarChart3}
            trend={parseFloat(displayData.npsScore) > 8 ? "up" : "down"}
            trendValue={parseFloat(displayData.npsScore) > 8 ? "+0.6" : "-0.3"}
          />
          <AnalyticsCard
            title="Sentiment Score"
            value={displayData.sentiment}
            description="Last 30 days"
            icon={TrendingUp}
            trend={parseFloat(displayData.sentiment) > 7.5 ? "up" : "down"}
            trendValue={parseFloat(displayData.sentiment) > 7.5 ? "+0.3" : "-0.2"}
          />
          <AnalyticsCard
            title={selectedUser === "all" ? "Promoters" : "Promoter Status"}
            value={displayData.promoter}
            description={selectedUser === "all" ? "Scores 9-10" : "Based on NPS"}
            icon={ThumbsUp}
            trend={selectedUser === "all" || displayData.promoter === "Yes" ? "up" : "down"}
            trendValue={selectedUser === "all" ? "+5%" : ""}
          />
          <AnalyticsCard
            title="Total Responses"
            value={displayData.responses}
            description="Last 30 days"
            icon={Users}
            trend="up"
            trendValue={selectedUser === "all" ? "+124" : ""}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <AnalyticsChart selectedUser={selectedUser} />
          </div>
          <div className="grid grid-cols-1 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              <Card icon={Heart} title="Customer Satisfaction" progress={displayData.satisfaction} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              <Card icon={ThumbsUp} title="Recommendation Rate" progress={displayData.recommendation} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              <Card icon={TrendingUp} title="Response Rate" progress={displayData.responseRate} />
            </motion.div>
          </div>
        </div>

        {selectedUser === "all" ? (
          <FeedbackSummary />
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="border-white/20 bg-card/70 backdrop-blur-sm border rounded-lg p-5"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Recent Feedback</h3>
              <span className="text-xs text-muted-foreground">Last 30 days</span>
            </div>
            <Separator className="mb-4" />
            <div className="space-y-4">
              {selectedUser === "user1" && (
                <>
                  <FeedbackItem date="Jun 12, 2023" nps={9} text="The product exceeds my expectations. The customer service team is always responsive and helpful." />
                  <FeedbackItem date="May 28, 2023" nps={10} text="Very intuitive interface. I've recommended it to several colleagues already." />
                </>
              )}
              {selectedUser === "user2" && (
                <>
                  <FeedbackItem date="Jun 15, 2023" nps={7} text="Good product but has some room for improvement in the reporting features." />
                  <FeedbackItem date="May 22, 2023" nps={8} text="I like the platform but wish it had better integration with other tools." />
                </>
              )}
              {selectedUser === "user3" && (
                <>
                  <FeedbackItem date="Jun 10, 2023" nps={9} text="Great experience overall. The new features added last month are incredibly helpful." />
                  <FeedbackItem date="May 15, 2023" nps={9} text="The platform is reliable and the support team is excellent." />
                </>
              )}
              {selectedUser === "user4" && (
                <>
                  <FeedbackItem date="Jun 8, 2023" nps={6} text="It's okay but I find it confusing to navigate sometimes. Could be more user-friendly." />
                  <FeedbackItem date="May 20, 2023" nps={7} text="Decent features but performance has been slow lately." />
                </>
              )}
            </div>
          </motion.div>
        )}
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

interface FeedbackItemProps {
  date: string;
  nps: number;
  text: string;
}

const FeedbackItem = ({ date, nps, text }: FeedbackItemProps) => {
  return (
    <div className="p-3 rounded-md bg-secondary/20 border border-border/30">
      <div className="flex justify-between mb-2">
        <span className="text-xs text-muted-foreground">{date}</span>
        <div className={`px-2 py-0.5 rounded-full text-xs font-medium ${
          nps >= 9 ? 'bg-green-500/20 text-green-500' : 
          nps >= 7 ? 'bg-yellow-500/20 text-yellow-500' : 
          'bg-red-500/20 text-red-500'
        }`}>
          NPS: {nps}/10
        </div>
      </div>
      <p className="text-sm">{text}</p>
    </div>
  );
};

export default Analytics;
