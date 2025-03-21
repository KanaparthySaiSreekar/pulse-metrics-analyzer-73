
import React from "react";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import FeedbackForm from "@/components/FeedbackForm";

const Survey = () => {
  return (
    <Layout>
      <div className="container max-w-5xl px-4 py-8 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-12"
        >
          <div className="inline-block mb-3 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
            Customer Survey
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Share Your Experience</h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Your feedback helps us improve our products and services to better meet your needs.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <FeedbackForm />
          
          <div className="mt-12 text-center text-sm text-muted-foreground">
            <p>Your feedback is anonymous and will be used to improve our products and services.</p>
            <p className="mt-1">Thank you for taking the time to share your thoughts with us.</p>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Survey;
