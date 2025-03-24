
import React, { useState } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import AnalyticsCard from "@/components/AnalyticsCard";
import AnalyticsChart from "@/components/AnalyticsChart";
import FeedbackSummary from "@/components/FeedbackSummary";
import { BarChart3, TrendingUp, Heart, ThumbsUp, ThumbsDown, Users, Zap, UserRound, Gauge, MessageSquare } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

const customers = [
  { id: "all", name: "All Customers" },
  { id: "user1", name: "John Smith" },
  { id: "user2", name: "Emily Johnson" },
  { id: "user3", name: "Michael Brown" },
  { id: "user4", name: "Sarah Wilson" },
];

const userData = {
  user1: {
    npsScore: "9.2",
    sentimentPositive: "0.85",
    sentimentNegative: "0.05",
    sentimentNeutral: "0.10",
    promoter: "Yes",
    responses: "24",
    satisfaction: 92,
    recommendation: 88,
    responseRate: 95,
    feedback: [
      {
        id: 1,
        sentiment: "positive" as const,
        score: 9,
        content: "The interface is intuitive and the customer service is exceptional. Very satisfied with my experience."
      },
      {
        id: 2,
        sentiment: "positive" as const,
        score: 10,
        content: "The new features have made my workflow so much more efficient. Loving the updates!"
      }
    ],
    aiInsights: [
      "John consistently rates product usability very highly (avg 9.5/10)",
      "Most positive feedback relates to customer service and interface design",
      "No significant negative feedback in the last 3 months",
      "Has recommended the product to colleagues multiple times"
    ],
    sentimentBreakdown: {
      positive: 85,
      negative: 5,
      neutral: 10
    }
  },
  user2: {
    npsScore: "7.5",
    sentimentPositive: "0.40",
    sentimentNegative: "0.25",
    sentimentNeutral: "0.35",
    promoter: "No",
    responses: "18",
    satisfaction: 75,
    recommendation: 70,
    responseRate: 85,
    feedback: [
      {
        id: 1,
        sentiment: "neutral" as const,
        score: 7,
        content: "Good product but has some room for improvement in the reporting features."
      },
      {
        id: 2,
        sentiment: "neutral" as const,
        score: 8,
        content: "I like the platform but wish it had better integration with other tools."
      }
    ],
    aiInsights: [
      "Emily's feedback consistently mentions need for better integrations",
      "Score has improved by 1.3 points over last quarter",
      "Most valued feature is the reporting dashboard",
      "Consider showcasing upcoming integration features to improve satisfaction"
    ],
    sentimentBreakdown: {
      positive: 40,
      negative: 25,
      neutral: 35
    }
  },
  user3: {
    npsScore: "8.9",
    sentimentPositive: "0.75",
    sentimentNegative: "0.05",
    sentimentNeutral: "0.20",
    promoter: "Yes",
    responses: "31",
    satisfaction: 87,
    recommendation: 82,
    responseRate: 90,
    feedback: [
      {
        id: 1,
        sentiment: "positive" as const,
        score: 9,
        content: "Great experience overall. The new features added last month are incredibly helpful."
      },
      {
        id: 2,
        sentiment: "positive" as const,
        score: 9,
        content: "The platform is reliable and the support team is excellent."
      }
    ],
    aiInsights: [
      "Michael has been a consistent promoter for over 6 months",
      "Shows high engagement with new features (tries 80% within first week)",
      "Frequently mentions and values the reliability of the platform",
      "Has experienced only minor issues with system performance"
    ],
    sentimentBreakdown: {
      positive: 75,
      negative: 5,
      neutral: 20
    }
  },
  user4: {
    npsScore: "6.3",
    sentimentPositive: "0.20",
    sentimentNegative: "0.45",
    sentimentNeutral: "0.35",
    promoter: "No",
    responses: "15",
    satisfaction: 64,
    recommendation: 58,
    responseRate: 80,
    feedback: [
      {
        id: 1,
        sentiment: "negative" as const,
        score: 6,
        content: "It's okay but I find it confusing to navigate sometimes. Could be more user-friendly."
      },
      {
        id: 2,
        sentiment: "neutral" as const,
        score: 7,
        content: "Decent features but performance has been slow lately."
      }
    ],
    aiInsights: [
      "Sarah finds the navigation confusing - consider offering a guided tour",
      "Performance issues mentioned in 60% of her feedback",
      "Usage pattern shows limited engagement with advanced features",
      "Satisfaction trending upward after recent UI improvements (+0.8 points)"
    ],
    sentimentBreakdown: {
      positive: 20,
      negative: 45,
      neutral: 35
    }
  }
};

const aggregateData = {
  npsScore: "8.4",
  sentimentPositive: "0.65",
  sentimentNegative: "0.15",
  sentimentNeutral: "0.20",
  promoter: "68%",
  responses: "1,248",
  satisfaction: 85,
  recommendation: 78,
  responseRate: 92,
  sentimentBreakdown: {
    positive: 65,
    negative: 15,
    neutral: 20
  }
};

const Analytics = () => {
  const [selectedUser, setSelectedUser] = useState("all");
  
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

        {/* First row: NPS Score and Total Responses at the same size */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <AnalyticsCard
              title="Average NPS Score"
              value={displayData.npsScore}
              description="Last 30 days"
              icon={BarChart3}
              trend={parseFloat(displayData.npsScore) > 8 ? "up" : "down"}
              trendValue={parseFloat(displayData.npsScore) > 8 ? "+0.6" : "-0.3"}
            />
          </div>
          <div>
            <AnalyticsCard
              title="Total Responses"
              value={displayData.responses}
              description="Feedback collected"
              icon={MessageSquare}
              iconClassName="text-blue-500"
              iconBgClassName="bg-blue-500/10"
              trend="up"
              trendValue="+12%"
            />
          </div>
        </div>

        {/* Second row: Sentiment scores and Promoter status */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <AnalyticsCard
            title="Positive Sentiment"
            value={displayData.sentimentPositive}
            description="Scale of 0 to 1"
            icon={ThumbsUp}
            iconClassName="text-green-500"
            iconBgClassName="bg-green-500/10"
            trend={parseFloat(displayData.sentimentPositive) > 0.7 ? "up" : "down"}
            trendValue={parseFloat(displayData.sentimentPositive) > 0.7 ? "+0.05" : "-0.03"}
          />
          <AnalyticsCard
            title="Negative Sentiment"
            value={displayData.sentimentNegative}
            description="Scale of 0 to 1"
            icon={ThumbsDown}
            iconClassName="text-red-500"
            iconBgClassName="bg-red-500/10"
            trend={parseFloat(displayData.sentimentNegative) < 0.2 ? "up" : "down"}
            trendValue={parseFloat(displayData.sentimentNegative) < 0.2 ? "-0.02" : "+0.04"}
            trendInverseColor={true}
          />
          <AnalyticsCard
            title="Neutral Sentiment"
            value={displayData.sentimentNeutral}
            description="Scale of 0 to 1"
            icon={Gauge}
            iconClassName="text-orange-500"
            iconBgClassName="bg-orange-500/10"
            trend="none"
            trendValue=""
          />
          <AnalyticsCard
            title={selectedUser === "all" ? "Promoters" : "Promoter Status"}
            value={displayData.promoter}
            description={selectedUser === "all" ? "Of total customers" : "Customer type"}
            icon={Heart}
            iconClassName="text-pink-500"
            iconBgClassName="bg-pink-500/10"
            trend="none"
            trendValue=""
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
          <FeedbackSummary 
            sentimentBreakdown={aggregateData.sentimentBreakdown}
          />
        ) : (
          <FeedbackSummary 
            userSpecific={true}
            feedbackData={userData[selectedUser as keyof typeof userData].feedback}
            insights={userData[selectedUser as keyof typeof userData].aiInsights}
            sentimentBreakdown={userData[selectedUser as keyof typeof userData].sentimentBreakdown}
          />
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
