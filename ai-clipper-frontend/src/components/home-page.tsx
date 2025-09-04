"use client";
import React from "react";
import { motion, useScroll, useTransform } from "motion/react";
import {
  Play,
  Scissors,
  Upload,
  Smartphone,
  Zap,
  Globe,
  Clock,
  TrendingUp,
} from "lucide-react";
import { useRouter } from "next/navigation";
import BillingPage from "~/app/dashboard/billing/page";
import Navbar from "./navbar";
import FooterLinks from "./footer-links";
import ParticleBackground from "./particle-background";

const PodcastClipperHomepage = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);

  const router = useRouter();

  return (
    <div className="relative min-h-screen overflow-hidden text-gray-900">
      {/* Animated Background */}
      <ParticleBackground />

      {/* Gradient Orbs */}
      <motion.div
        className="absolute top-1/4 -left-32 h-96 w-96 rounded-full bg-slate-600/20 blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-32 bottom-1/4 h-96 w-96 rounded-full bg-slate-700/20 blur-3xl"
        animate={{
          x: [0, -100, 0],
          y: [0, 50, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 py-20 text-center">
        <div className="">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <h1 className="mb-6 text-5xl leading-tight font-bold text-zinc-700 md:text-7xl">
              Turn Your <span className="text-black">Podcasts</span> Into Viral{" "}
              <span className="text-black">Reels</span>
            </h1>
          </motion.div>

          <motion.p
            className="mx-auto mb-8 max-w-3xl text-xl leading-relaxed text-balance text-zinc-500 md:text-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            AI-powered podcast clipper that transforms your long-form content
            into engaging vertical videos with automatic subtitles. Get 3 free
            clips to start!
          </motion.p>

          <motion.div
            className="mb-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <motion.button
              onClick={() => router.push("/dashboard")}
              className="rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 px-8 py-4 text-lg font-bold text-white hover:shadow-2xl"
              whileHover={{ scale: 1.05 }}
            >
              <span className="flex items-center gap-2">
                <Zap className="h-5 w-5" /> Start Creating Now
              </span>
            </motion.button>
            <motion.button
             onClick={() => router.push("/demo")}
              className="flex items-center gap-2 rounded-full border border-gray-300 px-8 py-4 font-semibold text-gray-700 hover:border-cyan-400"
              whileHover={{ scale: 1.05 }}
            >
              <Play className="h-5 w-5" /> Watch Demo
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="mx-auto mt-20 grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-3 md:gap-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <motion.div
              className="rounded-2xl border border-slate-700/50 bg-zinc-700 p-6 text-center backdrop-blur-sm"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-2 text-4xl font-bold text-cyan-400">500MB</div>
              <div className="font-medium text-slate-300">Max Upload Size</div>
              <div className="mt-1 text-sm text-slate-400">Per video file</div>
            </motion.div>
            <motion.div
              className="rounded-2xl border border-slate-700/50 bg-zinc-700 p-6 text-center backdrop-blur-sm"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-2 text-4xl font-bold text-purple-400">
                5 Reels
              </div>
              <div className="font-medium text-slate-300">Per Video</div>
              <div className="mt-1 text-sm text-slate-400">
                AI-generated clips
              </div>
            </motion.div>
            <motion.div
              className="rounded-2xl border border-slate-700/50 bg-zinc-700 p-6 text-center backdrop-blur-sm"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-2 text-4xl font-bold text-pink-400">
                3 Free
              </div>
              <div className="font-medium text-slate-300">Credits to Start</div>
              <div className="mt-1 text-sm text-slate-400">
                No payment required
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <motion.section
        id="features"
        className="relative z-10 mx-auto max-w-7xl px-6 py-20"
        style={{ y: y1 }}
      >
        <div className="mb-16 text-center">
          <motion.h2
            className="mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-4xl font-bold text-transparent md:text-5xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Powerful AI Features
          </motion.h2>
          <motion.p
            className="mx-auto max-w-2xl text-xl text-zinc-500"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Everything you need to create viral content from your podcasts
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: <Upload className="h-8 w-8" />,
              title: "Easy Upload",
              description:
                "Upload videos up to 500MB with drag & drop simplicity",
              gradient: "from-cyan-400 to-blue-500",
            },
            {
              icon: <Scissors className="h-8 w-8" />,
              title: "AI Clipping",
              description:
                "Smart AI finds the most engaging moments automatically",
              gradient: "from-purple-400 to-pink-500",
            },
            {
              icon: <Smartphone className="h-8 w-8" />,
              title: "Vertical Format",
              description:
                "Perfect for TikTok, Instagram Reels, and YouTube Shorts",
              gradient: "from-green-400 to-cyan-500",
            },
            {
              icon: <Globe className="h-8 w-8" />,
              title: "Auto Subtitles",
              description: "Accurate English subtitles added automatically",
              gradient: "from-orange-400 to-red-500",
            },
            {
              icon: <Clock className="h-8 w-8" />,
              title: "Fast Processing",
              description: "Get your clips ready in minutes, not hours",
              gradient: "from-yellow-400 to-orange-500",
            },
            {
              icon: <TrendingUp className="h-8 w-8" />,
              title: "Viral Potential",
              description: "Optimized for maximum engagement and reach",
              gradient: "from-pink-400 to-purple-500",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="group flex flex-col items-center rounded-2xl border border-slate-700/50 bg-zinc-700 p-6 text-center backdrop-blur-md hover:border-cyan-400/50"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <div
                className={`h-16 w-16 rounded-2xl bg-gradient-to-r ${feature.gradient} mb-4 flex items-center justify-center transition-transform group-hover:scale-110`}
              >
                {feature.icon}
              </div>
              <h3 className="mb-3 text-xl font-bold text-white transition-colors group-hover:text-cyan-400">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-balance text-slate-300">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Pricing Section */}
      <div id="pricing">
        <BillingPage  />
      </div>

      {/* Footer */}
      <footer className="relative z-10 mt-20 border-t border-slate-800 py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div>
              <div className="mb-4 flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-cyan-400 to-purple-600">
                  <Scissors className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">ClipMaster</span>
              </div>
              <p className="text-zinc-600">
                Transform your podcasts into viral social media content with AI.
              </p>
            </div>

            <FooterLinks />
          </div>

          <div className="mt-12 border-t border-slate-800 pt-8 text-center text-zinc-600">
            <p>&copy; 2025 ClipMaster. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PodcastClipperHomepage;
