/* eslint-disable react/no-unescaped-entities */
"use client"
import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Scissors, 
  Twitter, 
  ArrowLeft, 
  Sparkles, 
  MessageCircle,
  Clock,
  Gift,
  Star
} from 'lucide-react';

type Particle = { id: number; x: number; y: number; delay: number };

const PaymentComingSoon = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  // Generate floating particles
  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 4,
    }));
    setParticles(newParticles);
  }, []);

  const handleBackToHome = () => {
    // Replace with your actual navigation logic
    window.history.back();
  };

  const handleTwitterContact = () => {
    // Replace with actual creator's Twitter handle
    window.open('https://twitter.com/_chilwal', '_blank');
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 to-gray-100 text-gray-900">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute h-2 w-2 rounded-full bg-cyan-400 opacity-20"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.1, 0.4, 0.1],
              scale: [1, 1.8, 1],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Gradient Orbs */}
      <motion.div
        className="absolute top-1/4 -left-32 h-96 w-96 rounded-full bg-gradient-to-r from-cyan-400/20 to-purple-400/20 blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-32 bottom-1/4 h-96 w-96 rounded-full bg-gradient-to-l from-purple-400/20 to-pink-400/20 blur-3xl"
        animate={{
          x: [0, -100, 0],
          y: [0, 50, 0],
          scale: [1, 1.4, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Navigation */}
      <motion.nav
        className="relative z-50 p-6"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <motion.div
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-cyan-400 to-purple-600">
              <Scissors className="h-6 w-6 text-white" />
            </div>
            <span className="bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-2xl font-bold text-transparent">
              ClipMaster
            </span>
          </motion.div>

          <motion.button
            onClick={handleBackToHome}
            className="flex items-center gap-2 rounded-lg px-4 py-2 font-medium text-gray-600 transition-all hover:bg-gray-100 hover:text-gray-900"
            whileHover={{ x: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </motion.button>
        </div>
      </motion.nav>

      {/* Main Content */}
      <section className="relative z-10 mx-auto max-w-4xl px-6 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative"
        >
          {/* Floating Icons */}
          <motion.div
            className="absolute -top-12 left-1/4 text-cyan-400"
            animate={{ 
              y: [-10, 10, -10],
              rotate: [0, 10, -10, 0]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <Sparkles className="h-8 w-8" />
          </motion.div>
          <motion.div
            className="absolute -top-8 right-1/4 text-purple-400"
            animate={{ 
              y: [10, -10, 10],
              rotate: [0, -10, 10, 0]
            }}
            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
          >
            <Star className="h-6 w-6" />
          </motion.div>

          {/* Main Icon */}
          <motion.div
            className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 to-purple-600 shadow-2xl"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.3, type: "spring" }}
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            <Clock className="h-12 w-12 text-white" />
          </motion.div>

          {/* Title */}
          <motion.h1
            className="mb-6 text-4xl font-bold text-gray-800 md:text-6xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Payment System
            <span className="block bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent">
              Coming Soon!
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="mx-auto mb-12 max-w-2xl text-xl leading-relaxed text-gray-600 md:text-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            We're putting the finishing touches on our secure payment system. 
            In the meantime, reach out to get your credits manually!
          </motion.p>

          {/* Current Status Card */}
          <motion.div
            className="mx-auto mb-12 max-w-md rounded-2xl border border-gray-200 bg-white/80 p-8 shadow-xl backdrop-blur-sm"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
            whileHover={{ y: -5 }}
          >
            <motion.div
              className="mb-4 text-4xl"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 2 }}
            >
              🚧
            </motion.div>
            <h3 className="mb-4 text-2xl font-bold text-gray-800">We're Building Something Amazing</h3>
            <p className="mb-6 text-gray-600">
              Our payment integration is in development to ensure maximum security and the best user experience.
            </p>
            
            {/* Progress Indicators */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Security Implementation</span>
                <span className="font-medium text-green-500">✓ Complete</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Payment Gateway Integration</span>
                <span className="font-medium text-yellow-500">⚡ In Progress</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Testing & Launch</span>
                <span className="font-medium text-gray-400">⏳ Coming Soon</span>
              </div>
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1 }}
          >
            <h3 className="text-2xl font-semibold text-gray-800">
              Need Credits Right Now?
            </h3>
            <p className="text-lg text-gray-600">
              Drop me a message on Twitter and I'll hook you up manually! 🎉
            </p>

            <motion.button
              onClick={handleTwitterContact}
              className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 px-8 py-4 text-lg font-bold text-white shadow-xl transition-all hover:shadow-2xl"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 40px -12px rgba(6, 182, 212, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Twitter className="h-6 w-6" />
              <span>Contact on Twitter</span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.div>
            </motion.button>

            {/* Alternative Contact */}
            <motion.div
              className="mt-8 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 p-6"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center justify-center gap-2 text-gray-600">
                <MessageCircle className="h-5 w-5" />
                <span className="font-medium">
                  Just mention you need credits and I'll sort you out within 24 hours!
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            className="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.3 }}
          >
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-400"></div>
              <span>Secure & Trusted</span>
            </div>
            <div className="flex items-center gap-2">
              <Gift className="h-4 w-4 text-purple-400" />
              <span>Free Credits Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-cyan-400"></div>
              <span>24h Response Time</span>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

export default PaymentComingSoon;