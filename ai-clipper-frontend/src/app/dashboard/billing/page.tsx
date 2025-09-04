"use client";

import type { VariantProps } from "class-variance-authority";
import { ArrowLeftIcon, CheckCircle } from "lucide-react";
import Link from "next/link";
import { Button, type buttonVariants } from "~/components/ui/button";
import { motion } from "motion/react";
import FreePlanCard from "~/components/free-plan-card";
import PricingCard from "~/components/pricing-card";

type PriceId = "small" | "medium";

interface PricingPlan {
  title: string;
  price: string;
  description: string;
  features: string[];
  buttonText: string;
  buttonVariant: VariantProps<typeof buttonVariants>["variant"];
  isPopular?: boolean;
  savePercentage?: string;
  priceId: PriceId;
}

const plans: PricingPlan[] = [
  {
    title: "Starter",
    price: "$9.99",
    description: "Perfect for occasional podcast creators",
    features: ["50 credits", "No expiration", "Download all clips"],
    buttonText: "Buy 50 credits",
    isPopular: true,
    buttonVariant: "outline",
    priceId: "small",
  },
  {
    title: "Pro",
    price: "$24.99",
    description: "Best value for regular podcasters",
    features: ["150 credits", "No expiration", "Download all clips"],
    buttonText: "Buy 150 credits",
    buttonVariant: "default",

    savePercentage: "Save 17%",
    priceId: "medium",
  },
];
const isInHomepage = true

export default function BillingPage() {
  return (
    <div className="min-h-screen text-black">
      <div className="mx-auto flex max-w-7xl flex-col space-y-8 px-6 py-12">
        <div className="relative flex items-center justify-center gap-4">
          {!isInHomepage && (
            <Button
              className="absolute top-0 left-0 border-zinc-600 bg-zinc-800 text-white hover:bg-zinc-700 hover:text-white"
              variant="outline"
              size="icon"
              asChild
            >
              <Link href="/dashboard">
                <ArrowLeftIcon className="size-4" />
              </Link>
            </Button>
          )}

          <motion.div
            className="space-y-2 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              {isInHomepage ? "Simple Pricing" : "Buy Credits"}
            </h1>
            <p className="text-xl text-zinc-600">
              {isInHomepage
                ? "Start free, scale as you grow"
                : "Purchase credits to generate more podcast clips. The more credits you buy, the better the value."}
            </p>
          </motion.div>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3">
          <FreePlanCard />
          {plans.map((plan, index) => (
            <PricingCard key={plan.title} plan={plan} index={index + 1} />
          ))}
        </div>
      </div>

      <motion.div
        className="mx-auto max-w-90 rounded-3xl border border-zinc-700/50 p-8 md:max-w-5xl"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <h3 className="mb-6 text-2xl font-bold text-black">How credits work</h3>
        <ul className="space-y-3 text-zinc-600">
          <li className="flex items-center gap-3">
            <CheckCircle className="h-5 w-5 text-cyan-400" />
            <span>1 credit = 1 minute of podcast processing</span>
          </li>
          <li className="flex items-center gap-3">
            <CheckCircle className="h-5 w-5 text-cyan-400" />
            <span>
              The program will create around 1 clip per 5 minutes of podcast
            </span>
          </li>
          <li className="flex items-center gap-3">
            <CheckCircle className="h-5 w-5 text-cyan-400" />
            <span>Credits never expire and can be used anytime</span>
          </li>
          <li className="flex items-center gap-3">
            <CheckCircle className="h-5 w-5 text-cyan-400" />
            <span>Longer podcasts require more credits based on duration</span>
          </li>
          <li className="flex items-center gap-3">
            <CheckCircle className="h-5 w-5 text-cyan-400" />
            <span>All packages are one-time purchases (not subscription)</span>
          </li>
        </ul>
      </motion.div>
    </div>
  );
}
