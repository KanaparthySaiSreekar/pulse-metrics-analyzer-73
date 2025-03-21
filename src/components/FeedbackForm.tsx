
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Star, SendHorizontal, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const FeedbackForm = () => {
  const [score, setScore] = useState<number | null>(null);
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (score === null) {
      toast.error("Please select a score");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call with setTimeout
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Thank you for your feedback");
      // Reset form
      setScore(null);
      setFeedback("");
    }, 1500);
  };

  return (
    <Card className="w-full max-w-md mx-auto overflow-hidden shadow-sm border-white/20 bg-card/70 backdrop-blur-sm">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle className="text-2xl text-center">Your Feedback Matters</CardTitle>
          <CardDescription className="text-center text-base">
            How likely are you to recommend our product to a friend or colleague?
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col space-y-4">
            <div className="flex justify-center">
              <div className="inline-flex items-center bg-secondary/50 rounded-full px-2 py-1 text-xs font-medium text-secondary-foreground">
                {score !== null ? `You selected: ${score}/10` : "Select a score"}
              </div>
            </div>
            <div className="flex justify-center space-x-1 sm:space-x-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                <motion.button
                  key={value}
                  type="button"
                  whileTap={{ scale: 0.95 }}
                  className={cn(
                    "w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-200",
                    score === value
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary hover:bg-secondary/80 text-secondary-foreground"
                  )}
                  onClick={() => setScore(value)}
                >
                  {value}
                </motion.button>
              ))}
            </div>
            <div className="flex justify-between px-2 mt-1 text-xs text-muted-foreground">
              <span>Not likely</span>
              <span>Very likely</span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">
              What's the primary reason for your score?
            </label>
            <Textarea
              placeholder="Share your thoughts..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="resize-none h-28 bg-secondary/50"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            type="submit" 
            className="w-full group relative overflow-hidden"
            disabled={isSubmitting}
          >
            <span className="relative z-10 flex items-center justify-center">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting
                </>
              ) : (
                <>
                  <SendHorizontal className="mr-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  Submit Feedback
                </>
              )}
            </span>
            <motion.div 
              className="absolute inset-0 bg-primary dark:bg-primary/90"
              initial={false}
              animate={{ 
                scale: isSubmitting ? 1.5 : 1,
                opacity: isSubmitting ? 0 : 1
              }}
              transition={{ duration: 0.5 }}
            />
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default FeedbackForm;
