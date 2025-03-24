
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react";

interface AnalyticsCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ElementType;
  iconClassName?: string;
  trend: "up" | "down" | "none";
  trendValue: string;
  trendInverseColor?: boolean;
  className?: string;
  iconBgClassName?: string;
}

const AnalyticsCard = ({
  title,
  value,
  description,
  icon: Icon,
  iconClassName,
  trend,
  trendValue,
  trendInverseColor = false,
  className,
  iconBgClassName,
}: AnalyticsCardProps) => {
  return (
    <Card className={cn("border-white/20 bg-card/70 backdrop-blur-sm", className)}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">
              {title}
            </p>
            <h3 className="text-2xl font-bold">{value}</h3>
            <p className="text-xs text-muted-foreground mt-1">
              {description}
            </p>
          </div>
          <div className={cn("p-2 rounded-full", iconBgClassName || "bg-primary/10", iconClassName ? "" : "text-primary")}>
            <Icon className={cn("h-5 w-5", iconClassName)} />
          </div>
        </div>

        {trend !== "none" && (
          <div className="mt-4 flex items-center">
            <div
              className={cn(
                "flex items-center text-xs font-medium rounded-full px-1.5 py-0.5",
                trend === "up" && !trendInverseColor && "text-green-500 bg-green-500/10",
                trend === "down" && !trendInverseColor && "text-red-500 bg-red-500/10",
                trend === "up" && trendInverseColor && "text-red-500 bg-red-500/10",
                trend === "down" && trendInverseColor && "text-green-500 bg-green-500/10"
              )}
            >
              {trend === "up" ? (
                <ArrowUpIcon className="h-3 w-3 mr-1" />
              ) : (
                <ArrowDownIcon className="h-3 w-3 mr-1" />
              )}
              {trendValue}
            </div>
            <span className="text-xs text-muted-foreground ml-2">vs previous period</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AnalyticsCard;
