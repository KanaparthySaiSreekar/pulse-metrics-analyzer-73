
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

// Sample data
const data = {
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
}

const AnalyticsChart = ({ className }: AnalyticsChartProps) => {
  const [timeframe, setTimeframe] = useState<"daily" | "weekly" | "monthly">("daily");

  return (
    <Card className={cn("border-white/20 bg-card/70 backdrop-blur-sm", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Metrics Over Time</CardTitle>
            <CardDescription className="mt-1">
              NPS scores and sentiment analysis trends
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
              data={data[timeframe]}
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
