
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps } from "recharts";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

// Sample aggregate data
const aggregateData = {
  daily: [
    { date: "Mon", npsScore: 8.2, sentiment: 7.5 },
    { date: "Tue", npsScore: 7.8, sentiment: 6.9 },
    { date: "Wed", npsScore: 8.5, sentiment: 7.8 },
    { date: "Thu", npsScore: 8.7, sentiment: 8.2 },
    { date: "Fri", npsScore: 9.1, sentiment: 8.6 },
    { date: "Sat", npsScore: 8.8, sentiment: 8.3 },
    { date: "Sun", npsScore: 8.5, sentiment: 8.0 },
  ],
  weekly: [
    { date: "Week 1", npsScore: 8.0, sentiment: 7.2 },
    { date: "Week 2", npsScore: 8.3, sentiment: 7.6 },
    { date: "Week 3", npsScore: 8.7, sentiment: 8.1 },
    { date: "Week 4", npsScore: 8.9, sentiment: 8.4 },
  ],
  monthly: [
    { date: "Jan", npsScore: 7.8, sentiment: 7.1 },
    { date: "Feb", npsScore: 8.0, sentiment: 7.3 },
    { date: "Mar", npsScore: 8.2, sentiment: 7.6 },
    { date: "Apr", npsScore: 8.5, sentiment: 7.9 },
    { date: "May", npsScore: 8.7, sentiment: 8.2 },
    { date: "Jun", npsScore: 8.9, sentiment: 8.4 },
  ],
};

// Sample user-specific data
const userSpecificData = {
  user1: {
    daily: [
      { date: "Mon", npsScore: 9.0, sentiment: 8.5 },
      { date: "Tue", npsScore: 9.2, sentiment: 8.7 },
      { date: "Wed", npsScore: 9.0, sentiment: 8.5 },
      { date: "Thu", npsScore: 9.3, sentiment: 8.8 },
      { date: "Fri", npsScore: 9.5, sentiment: 9.0 },
      { date: "Sat", npsScore: 9.3, sentiment: 8.9 },
      { date: "Sun", npsScore: 9.1, sentiment: 8.7 },
    ],
    weekly: [
      { date: "Week 1", npsScore: 8.8, sentiment: 8.2 },
      { date: "Week 2", npsScore: 9.0, sentiment: 8.5 },
      { date: "Week 3", npsScore: 9.2, sentiment: 8.7 },
      { date: "Week 4", npsScore: 9.4, sentiment: 8.9 },
    ],
    monthly: [
      { date: "Jan", npsScore: 8.5, sentiment: 8.0 },
      { date: "Feb", npsScore: 8.7, sentiment: 8.2 },
      { date: "Mar", npsScore: 9.0, sentiment: 8.5 },
      { date: "Apr", npsScore: 9.1, sentiment: 8.6 },
      { date: "May", npsScore: 9.3, sentiment: 8.8 },
      { date: "Jun", npsScore: 9.2, sentiment: 8.7 },
    ],
  },
  user2: {
    daily: [
      { date: "Mon", npsScore: 7.0, sentiment: 6.5 },
      { date: "Tue", npsScore: 7.2, sentiment: 6.8 },
      { date: "Wed", npsScore: 7.5, sentiment: 7.0 },
      { date: "Thu", npsScore: 7.8, sentiment: 7.2 },
      { date: "Fri", npsScore: 7.7, sentiment: 7.1 },
      { date: "Sat", npsScore: 7.5, sentiment: 6.9 },
      { date: "Sun", npsScore: 7.3, sentiment: 6.7 },
    ],
    weekly: [
      { date: "Week 1", npsScore: 7.1, sentiment: 6.6 },
      { date: "Week 2", npsScore: 7.3, sentiment: 6.8 },
      { date: "Week 3", npsScore: 7.6, sentiment: 7.0 },
      { date: "Week 4", npsScore: 7.5, sentiment: 6.9 },
    ],
    monthly: [
      { date: "Jan", npsScore: 6.8, sentiment: 6.3 },
      { date: "Feb", npsScore: 7.0, sentiment: 6.5 },
      { date: "Mar", npsScore: 7.2, sentiment: 6.7 },
      { date: "Apr", npsScore: 7.4, sentiment: 6.9 },
      { date: "May", npsScore: 7.6, sentiment: 7.1 },
      { date: "Jun", npsScore: 7.5, sentiment: 6.8 },
    ],
  },
  user3: {
    daily: [
      { date: "Mon", npsScore: 8.5, sentiment: 8.0 },
      { date: "Tue", npsScore: 8.7, sentiment: 8.2 },
      { date: "Wed", npsScore: 8.9, sentiment: 8.4 },
      { date: "Thu", npsScore: 9.1, sentiment: 8.6 },
      { date: "Fri", npsScore: 9.0, sentiment: 8.5 },
      { date: "Sat", npsScore: 8.8, sentiment: 8.3 },
      { date: "Sun", npsScore: 8.6, sentiment: 8.1 },
    ],
    weekly: [
      { date: "Week 1", npsScore: 8.4, sentiment: 7.9 },
      { date: "Week 2", npsScore: 8.6, sentiment: 8.1 },
      { date: "Week 3", npsScore: 8.9, sentiment: 8.4 },
      { date: "Week 4", npsScore: 9.1, sentiment: 8.6 },
    ],
    monthly: [
      { date: "Jan", npsScore: 8.2, sentiment: 7.7 },
      { date: "Feb", npsScore: 8.4, sentiment: 7.9 },
      { date: "Mar", npsScore: 8.7, sentiment: 8.2 },
      { date: "Apr", npsScore: 8.9, sentiment: 8.4 },
      { date: "May", npsScore: 9.0, sentiment: 8.5 },
      { date: "Jun", npsScore: 8.9, sentiment: 8.3 },
    ],
  },
  user4: {
    daily: [
      { date: "Mon", npsScore: 6.2, sentiment: 5.7 },
      { date: "Tue", npsScore: 6.4, sentiment: 5.9 },
      { date: "Wed", npsScore: 6.6, sentiment: 6.1 },
      { date: "Thu", npsScore: 6.5, sentiment: 6.0 },
      { date: "Fri", npsScore: 6.3, sentiment: 5.8 },
      { date: "Sat", npsScore: 6.1, sentiment: 5.6 },
      { date: "Sun", npsScore: 6.0, sentiment: 5.5 },
    ],
    weekly: [
      { date: "Week 1", npsScore: 6.1, sentiment: 5.6 },
      { date: "Week 2", npsScore: 6.3, sentiment: 5.8 },
      { date: "Week 3", npsScore: 6.5, sentiment: 6.0 },
      { date: "Week 4", npsScore: 6.3, sentiment: 5.8 },
    ],
    monthly: [
      { date: "Jan", npsScore: 5.8, sentiment: 5.3 },
      { date: "Feb", npsScore: 6.0, sentiment: 5.5 },
      { date: "Mar", npsScore: 6.2, sentiment: 5.7 },
      { date: "Apr", npsScore: 6.4, sentiment: 5.9 },
      { date: "May", npsScore: 6.5, sentiment: 6.0 },
      { date: "Jun", npsScore: 6.3, sentiment: 5.9 },
    ],
  }
};

interface CustomTooltipProps extends TooltipProps<number, string> {
  active?: boolean;
  payload?: any[];
  label?: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-2 bg-popover/95 backdrop-blur-sm border border-border rounded-md shadow-md">
        <p className="text-sm font-medium">{label}</p>
        <p className="text-xs text-primary font-medium">{`NPS Score: ${payload[0].value}`}</p>
        <p className="text-xs text-blue-400 font-medium">{`Sentiment: ${payload[1].value}`}</p>
      </div>
    );
  }

  return null;
};

interface AnalyticsChartProps {
  className?: string;
  selectedUser?: string;
}

const AnalyticsChart = ({ className, selectedUser = "all" }: AnalyticsChartProps) => {
  const [timeframe, setTimeframe] = useState<"daily" | "weekly" | "monthly">("daily");
  
  // Choose data based on selected user
  const chartData = selectedUser === "all" 
    ? aggregateData[timeframe] 
    : userSpecificData[selectedUser as keyof typeof userSpecificData]?.[timeframe] || aggregateData[timeframe];

  return (
    <Card className={cn("border-white/20 bg-card/70 backdrop-blur-sm", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Metrics Over Time</CardTitle>
            <CardDescription className="mt-1">
              {selectedUser === "all" 
                ? "NPS scores and sentiment analysis trends" 
                : `${selectedUser === "user1" ? "John Smith" : 
                    selectedUser === "user2" ? "Emily Johnson" : 
                    selectedUser === "user3" ? "Michael Brown" : 
                    "Sarah Wilson"}'s NPS and sentiment trends`
              }
            </CardDescription>
          </div>
          <Tabs 
            value={timeframe} 
            onValueChange={(value) => setTimeframe(value as "daily" | "weekly" | "monthly")}
            className="h-8"
          >
            <TabsList className="h-8 bg-muted/50">
              <TabsTrigger value="daily" className="text-xs h-7">Daily</TabsTrigger>
              <TabsTrigger value="weekly" className="text-xs h-7">Weekly</TabsTrigger>
              <TabsTrigger value="monthly" className="text-xs h-7">Monthly</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{
                top: 20,
                right: 10,
                left: 10,
                bottom: 10,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.4} />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={{ stroke: 'var(--border)' }}
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={{ stroke: 'var(--border)' }}
                domain={[0, 10]}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="npsScore"
                stroke="hsl(var(--primary))"
                activeDot={{ r: 6, stroke: "hsl(var(--primary))", strokeWidth: 2, fill: "hsl(var(--card))" }}
                dot={{ r: 3, stroke: "hsl(var(--primary))", strokeWidth: 2, fill: "hsl(var(--card))" }}
                strokeWidth={2}
                isAnimationActive={true}
                animationDuration={1000}
              />
              <Line
                type="monotone"
                dataKey="sentiment"
                stroke="hsl(210, 100%, 67%)"
                activeDot={{ r: 6, stroke: "hsl(210, 100%, 67%)", strokeWidth: 2, fill: "hsl(var(--card))" }}
                dot={{ r: 3, stroke: "hsl(210, 100%, 67%)", strokeWidth: 2, fill: "hsl(var(--card))" }}
                strokeWidth={2}
                isAnimationActive={true}
                animationDuration={1500}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalyticsChart;
