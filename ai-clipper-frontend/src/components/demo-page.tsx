"use client";
import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import {
  ArrowLeft,
  CheckCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import SampleOutput from "./sample-output-video";

interface Particle {
  id: number;
  x: number;
  y: number;
  delay: number;
}
type NewParticles = Particle[];

const DemoPage = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);

  const router = useRouter();

  // Generate floating particles
  const [particles, setParticles] = useState<NewParticles>([]);

  useEffect(() => {
    const newParticles = [];
    for (let i = 0; i < 20; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 4,
      });
    }
    setParticles(newParticles);
  }, []);

  // Demo features data
  const features = [
    {
      title: "AI-Powered Clip Selection",
      description:
        "Our AI automatically identifies the most engaging moments in your podcast",
      icon: "🎯",
    },
    {
      title: "Auto-Generated Subtitles",
      description:
        "Professional-quality captions added automatically to every clip",
      icon: "📝",
    },
    {
      title: "Viral Format Optimization",
      description:
        "Perfect 9:16 aspect ratio optimized for social media platforms",
      icon: "📱",
    },
    {
      title: "One-Click Publishing",
      description:
        "Export and share directly to Instagram, TikTok, and YouTube Shorts",
      icon: "🚀",
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-white text-gray-900">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute h-2 w-2 rounded-full bg-gray-400 opacity-20"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

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

      {/* Header with Back Button */}
      <motion.header
        className="relative z-20 flex items-center justify-between p-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.button
          className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-gray-700 backdrop-blur-sm hover:bg-white/20"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push("/")}
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Home
        </motion.button>

        <div className="text-lg font-bold text-gray-800">Product Demo</div>
      </motion.header>

      {/* Main Content */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 py-12">
        {/* Demo Video Section */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="mb-6 bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-4xl font-bold text-transparent md:text-6xl">
            See Our AI in Action
          </h1>
          <p className="mx-auto mb-12 max-w-2xl text-xl text-zinc-500">
            Watch how our AI transforms a full podcast episode into viral-ready
            clips in just minutes
          </p>

          {/* Video Player */}
          <motion.div
            className="relative mx-auto max-w-4xl overflow-hidden rounded-2xl bg-black shadow-2xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            {/* Video Placeholder */}
            <div className="aspect-video">
                <video
                  className="h-auto max-w-full rounded-xl shadow-lg"
                  src="/videos/clipmaster-demo.mp4"
                  controls
                  autoPlay={false}
                  loop
                  muted
                />
            </div>
          </motion.div>
        </motion.div>

        {/* Process Steps */}
        <motion.section className="mb-16" style={{ y: y1 }}>
          <div className="mb-12 text-center">
            <motion.h2
              className="mb-4 text-3xl font-bold text-gray-800 md:text-4xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              How It Works
            </motion.h2>
            <motion.p
              className="text-lg text-zinc-500"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              From podcast to viral content in 3 simple steps
            </motion.p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Upload Your Podcast",
                description:
                  "Upload your audio or video file (up to 500MB). Our AI supports all major formats.",
                color: "from-cyan-400 to-cyan-600",
              },
              {
                step: "02",
                title: "AI Analysis & Clipping",
                description:
                  "Our AI analyzes your content and automatically extracts the most engaging moments.",
                color: "from-purple-400 to-purple-600",
              },
              {
                step: "03",
                title: "Export & Share",
                description:
                  "Download your viral-ready clips with subtitles and share across all platforms.",
                color: "from-pink-400 to-pink-600",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="relative"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <div className="rounded-2xl border border-gray-200 bg-white/50 p-8 backdrop-blur-sm transition-shadow hover:shadow-xl">
                  <div
                    className={`mb-4 inline-block rounded-full bg-gradient-to-r ${item.color} px-4 py-2 text-sm font-bold text-white`}
                  >
                    Step {item.step}
                  </div>
                  <h3 className="mb-4 text-xl font-bold text-gray-800">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Features Showcase */}
        <motion.section className="mb-16" style={{ y: y1 }}>
          <div className="mb-12 text-center">
            <motion.h2
              className="mb-4 text-3xl font-bold text-gray-800 md:text-4xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Powerful Features
            </motion.h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="rounded-2xl border border-gray-200 bg-white/40 p-6 backdrop-blur-sm"
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="flex items-start gap-4">
                  <div className="text-3xl">{feature.icon}</div>
                  <div>
                    <h3 className="mb-2 text-xl font-bold text-gray-800">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Sample Output */}
        <SampleOutput />

        {/* Benefits */}
        <motion.section
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="mb-12 text-3xl font-bold text-gray-800 md:text-4xl">
            Why Choose Our Platform?
          </h2>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: "⚡",
                title: "Lightning Fast",
                desc: "Process 1-hour podcasts in under 5 minutes",
              },
              {
                icon: "🎨",
                title: "Professional Quality",
                desc: "Studio-grade output ready for any platform",
              },
              {
                icon: "💰",
                title: "Cost Effective",
                desc: "Replace expensive video editors and agencies",
              },
              {
                icon: "📊",
                title: "Analytics Ready",
                desc: "Track performance across all your clips",
              },
            ].map((benefit, index) => (
              <motion.div
                key={index}
                className="rounded-xl border border-gray-200 bg-white/60 p-6 backdrop-blur-sm"
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-4 text-3xl">{benefit.icon}</div>
                <h3 className="mb-2 font-bold text-gray-800">
                  {benefit.title}
                </h3>
                <p className="text-sm text-gray-600">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          className="text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="rounded-3xl border border-gray-200 bg-white/40 p-12 backdrop-blur-sm">
            <h2 className="mb-6 text-3xl font-bold text-gray-800 md:text-4xl">
              Ready to Go Viral?
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-zinc-500">
              Join thousands of creators who are already using our AI to grow
              their audience
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <motion.button
                className="rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 px-8 py-4 text-lg font-bold text-white hover:shadow-2xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push("/signup")}
              >
                Start Free Trial
              </motion.button>
              <motion.button
                className="rounded-full border border-gray-300 px-8 py-4 font-semibold text-gray-700 hover:border-cyan-400"
                whileHover={{ scale: 1.05 }}
                onClick={() => router.push("/#pricing")}
              >
                View Pricing
              </motion.button>
            </div>

            {/* Trust Indicators */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 opacity-60">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle className="h-4 w-4 text-green-500" />
                No Credit Card Required
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle className="h-4 w-4 text-green-500" />3 Free Clips
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Cancel Anytime
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default DemoPage;
