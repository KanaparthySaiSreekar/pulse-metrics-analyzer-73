
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface AnalyticsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: LucideIcon;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  className?: string;
}

const AnalyticsCard = ({
  title,
  value,
  description,
  icon: Icon,
  trend,
  trendValue,
  className,
}: AnalyticsCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -2 }}
      className="h-full"
    >
      <Card className={cn("h-full overflow-hidden border-white/20 bg-card/70 backdrop-blur-sm", className)}>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {title}
          </CardTitle>
          {Icon && (
            <div className="bg-secondary/50 p-2 rounded-full">
              <Icon className="h-4 w-4 text-muted-foreground" />
            </div>
          )}
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{value}</div>
          {(description || trendValue) && (
            <div className="flex items-center mt-1">
              {trend && (
                <div
                  className={cn(
                    "text-xs font-medium mr-2 flex items-center",
                    trend === "up" && "text-green-500",
                    trend === "down" && "text-red-500"
                  )}
                >
                  {trendValue}
                </div>
              )}
              {description && (
                <p className="text-xs text-muted-foreground">{description}</p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AnalyticsCard;
