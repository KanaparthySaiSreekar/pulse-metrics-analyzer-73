
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { MessageSquare, ThumbsUp, ThumbsDown, Sparkles, BarChart } from "lucide-react";

interface FeedbackItem {
  id: number;
  sentiment: "positive" | "negative" | "neutral";
  score: number;
  content: string;
}

interface FeedbackSummaryProps {
  className?: string;
  userSpecific?: boolean;
  feedbackData?: FeedbackItem[];
  insights?: string[];
  sentimentBreakdown?: {
    positive: number;
    negative: number;
    neutral: number;
  };
}

// Sample feedback data
const defaultFeedbackData: FeedbackItem[] = [
  {
    id: 1,
    sentiment: "positive",
    score: 9,
    content: "The interface is intuitive and the customer service is exceptional. Very satisfied with my experience.",
  },
  {
    id: 2,
    sentiment: "negative",
    score: 3,
    content: "I found the checkout process confusing and had trouble with payment processing.",
  },
  {
    id: 3,
    sentiment: "positive",
    score: 8,
    content: "Great product quality, but delivery took longer than expected.",
  },
  {
    id: 4,
    sentiment: "neutral",
    score: 6,
    content: "Product meets expectations but nothing exceptional. Would like to see more features.",
  },
  {
    id: 5,
    sentiment: "positive",
    score: 10,
    content: "Absolutely love this product! Best user experience I've had in a long time.",
  },
];

// Default AI-generated insights
const defaultInsights = [
  "Customers consistently praise the intuitive interface design",
  "Payment processing issues mentioned in 15% of negative feedback",
  "Delivery time is a common concern even among satisfied customers",
  "Feature requests focus primarily on customization options",
];

// Default sentiment breakdown
const defaultSentimentBreakdown = {
  positive: 65,
  negative: 15,
  neutral: 20,
};

const FeedbackSummary = ({ 
  className,
  userSpecific = false,
  feedbackData = defaultFeedbackData,
  insights = defaultInsights,
  sentimentBreakdown = defaultSentimentBreakdown
}: FeedbackSummaryProps) => {
  return (
    <Card className={cn("border-white/20 bg-card/70 backdrop-blur-sm", className)}>
      <CardHeader>
        <CardTitle className="flex items-center">
          <MessageSquare className="h-5 w-5 mr-2 text-primary" />
          {userSpecific ? "Customer Feedback" : "Recent Feedback"}
        </CardTitle>
        <CardDescription>
          {userSpecific 
            ? "Customer submissions and AI-generated insights" 
            : "Latest user submissions and AI-generated insights"}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="grid grid-cols-1 divide-y divide-border">
          {/* Feedback Comments Section */}
          <div className="p-4">
            <h4 className="text-sm font-medium mb-3">
              {userSpecific ? "Customer Comments" : "Latest Comments"}
            </h4>
            <ScrollArea className="h-[180px] pr-4">
              <div className="space-y-4">
                {feedbackData.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 rounded-lg bg-secondary/30 border border-border/50"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <Badge
                        variant="outline"
                        className={cn(
                          "px-2 py-0 text-xs",
                          item.sentiment === "positive" && "bg-green-500/10 text-green-500 border-green-500/20",
                          item.sentiment === "negative" && "bg-red-500/10 text-red-500 border-red-500/20",
                          item.sentiment === "neutral" && "bg-orange-500/10 text-orange-500 border-orange-500/20"
                        )}
                      >
                        {item.sentiment === "positive" && <ThumbsUp className="h-3 w-3 mr-1" />}
                        {item.sentiment === "negative" && <ThumbsDown className="h-3 w-3 mr-1" />}
                        {item.sentiment.charAt(0).toUpperCase() + item.sentiment.slice(1)}
                      </Badge>
                      <span className="text-xs font-medium">
                        Score: {item.score}/10
                      </span>
                    </div>
                    <p className="text-sm text-foreground/80">{item.content}</p>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
          
          {/* Enhanced AI Insights Section */}
          <div className="p-4">
            <h4 className="text-lg font-medium flex items-center mb-4">
              <Sparkles className="h-5 w-5 mr-2 text-primary" />
              {userSpecific ? "AI Summary" : "AI Insights"}
            </h4>
            <ScrollArea className="h-[160px] pr-4 mb-6">
              <div className="space-y-3">
                {insights.map((insight, index) => (
                  <div
                    key={index}
                    className="p-3 rounded-md bg-primary/5 border border-primary/10"
                  >
                    <p className="text-sm">{insight}</p>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
          
          {/* Enhanced Sentiment Breakdown Section */}
          <div className="p-4 pb-6">
            <h4 className="text-lg font-medium flex items-center mb-4">
              <BarChart className="h-5 w-5 mr-2 text-primary" />
              Sentiment Analysis
            </h4>
            <div className="space-y-5">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="flex items-center text-green-500 font-medium">
                    <ThumbsUp className="h-4 w-4 mr-2" />
                    Positive
                  </span>
                  <span className="font-medium">{sentimentBreakdown.positive}%</span>
                </div>
                <Progress value={sentimentBreakdown.positive} className="h-2.5 bg-secondary/50">
                  <div
                    className="h-full bg-green-500 rounded-full"
                    style={{ width: `${sentimentBreakdown.positive}%` }}
                  ></div>
                </Progress>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="flex items-center text-red-500 font-medium">
                    <ThumbsDown className="h-4 w-4 mr-2" />
                    Negative
                  </span>
                  <span className="font-medium">{sentimentBreakdown.negative}%</span>
                </div>
                <Progress value={sentimentBreakdown.negative} className="h-2.5 bg-secondary/50">
                  <div
                    className="h-full bg-red-500 rounded-full"
                    style={{ width: `${sentimentBreakdown.negative}%` }}
                  ></div>
                </Progress>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="flex items-center text-orange-500 font-medium">
                    Neutral
                  </span>
                  <span className="font-medium">{sentimentBreakdown.neutral}%</span>
                </div>
                <Progress value={sentimentBreakdown.neutral} className="h-2.5 bg-secondary/50">
                  <div
                    className="h-full bg-orange-500 rounded-full"
                    style={{ width: `${sentimentBreakdown.neutral}%` }}
                  ></div>
                </Progress>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FeedbackSummary;
