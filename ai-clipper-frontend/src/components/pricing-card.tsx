import { CheckCircle } from "lucide-react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import type { VariantProps } from "class-variance-authority";
import type { buttonVariants } from "./ui/button";

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

export default function PricingCard({
  plan,
  index,
}: {
  plan: PricingPlan;
  index: number;
}) {
  const router = useRouter();

  const handlePayment = () => {
    router.push("/payment");
  };
  return (
    <motion.div
      className={`relative rounded-3xl p-8 ${
        plan.isPopular
          ? "border-2 border-cyan-400/50 bg-zinc-900 backdrop-blur-md"
          : "border border-slate-700/50 bg-zinc-700 backdrop-blur-md"
      }`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      {plan.isPopular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 transform">
          <span className="rounded-full bg-zinc-300 px-4 py-1 text-sm font-semibold whitespace-nowrap text-black">
            Most Popular
          </span>
        </div>
      )}

      <div className="mb-8 text-center">
        <h3 className="mb-2 text-2xl font-bold text-white">{plan.title}</h3>
        <div className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-4xl font-bold text-transparent">
          {plan.price}
        </div>
        {plan.savePercentage && (
          <p className="mt-2 text-sm font-medium text-green-400">
            {plan.savePercentage}
          </p>
        )}
        <p className="mt-4 text-slate-300">{plan.description}</p>
      </div>

      <ul className="mb-8 space-y-4">
        {plan.features.map((feature, i) => (
          <li key={i} className="flex items-center gap-3">
            <CheckCircle className="h-5 w-5 text-cyan-400" />
            <span className="text-slate-300">{feature}</span>
          </li>
        ))}
      </ul>

      <form action={() => handlePayment()} className="w-full">
        <motion.button
          type="submit"
          className={`w-full rounded-2xl py-3 font-semibold transition-all ${
            plan.isPopular
              ? "bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:shadow-2xl hover:shadow-cyan-500/25"
              : "bg-black text-white hover:bg-zinc-800"
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {plan.buttonText}
        </motion.button>
      </form>
    </motion.div>
  );
}
