import { CheckCircle } from "lucide-react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";

// Separate free plan
const freePlan = {
  title: "Free",
  price: "Free",
  description: "Perfect for getting started",
  features: ["3 free credits", "No expiration", "Download all clips"],
  buttonText: "Get Started",
};

export default function FreePlanCard() {
  const router = useRouter();

  const handleFreeSignup = () => {
    router.push("/signup");
  };

  return (
    <motion.div
      className="relative rounded-3xl border border-slate-700/50 bg-zinc-700 p-8 backdrop-blur-md"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -5 }}
    >
      <div className="mb-8 text-center">
        <h3 className="mb-2 text-2xl font-bold text-white">{freePlan.title}</h3>
        <div className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-4xl font-bold text-transparent">
          {freePlan.price}
        </div>
        <p className="mt-4 text-slate-300">{freePlan.description}</p>
      </div>

      <ul className="mb-8 space-y-4">
        {freePlan.features.map((feature, i) => (
          <li key={i} className="flex items-center gap-3">
            <CheckCircle className="h-5 w-5 text-cyan-400" />
            <span className="text-slate-300">{feature}</span>
          </li>
        ))}
      </ul>

      <motion.button
        onClick={handleFreeSignup}
        className="w-full rounded-2xl bg-black py-3 font-semibold text-white transition-all hover:bg-zinc-800"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {freePlan.buttonText}
      </motion.button>
    </motion.div>
  );
}
