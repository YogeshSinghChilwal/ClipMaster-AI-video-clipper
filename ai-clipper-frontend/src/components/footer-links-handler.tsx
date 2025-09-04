/* eslint-disable react/no-unescaped-entities */
"use client"
import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useRouter } from 'next/navigation';
import {
  Scissors,
  ArrowLeft,
  Github,
  Linkedin,
  Twitter,
  Mail,
  Shield,
  FileText,
  HelpCircle,
  Zap,
  Users,
  BookOpen,
  Coffee,
  Heart,
  ExternalLink,
  Sparkles,
  Building,
  Clock
} from 'lucide-react';

interface FooterPageProps {
  pageType: string;
}

const FooterPlaceholderPage: React.FC<FooterPageProps> = ({ pageType = 'about' }) => {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);
  const router = useRouter();

  // Generate floating particles
  useEffect(() => {
    const newParticles = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 4,
    }));
    setParticles(newParticles);
  }, []);

  const handleBackToHome = () => {
    router.push('/');
  };

  const socialLinks = [
    {
      name: 'GitHub',
      icon: Github,
      url: 'https://github.com/YogeshSinghChilwal', // Replace with your GitHub
      color: 'hover:text-gray-800 hover:bg-gray-100'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: 'https://www.linkedin.com/in/yogesh-singh-chilwal-7b9a5a35b/', // Replace with your LinkedIn
      color: 'hover:text-blue-600 hover:bg-blue-50'
    },
    {
      name: 'Twitter',
      icon: Twitter,
      url: 'https://x.com/_chilwal', // Replace with your Twitter
      color: 'hover:text-sky-500 hover:bg-sky-50'
    }
  ];

  const getPageContent = () => {
    switch (pageType) {
      case 'about':
        return {
          title: 'About ClipMaster',
          subtitle: 'Transforming podcasts into viral content',
          icon: Users,
          content: (
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  At ClipMaster, we believe every podcast has moments worth sharing. Our AI-powered platform 
                  automatically identifies and extracts the most engaging segments from your long-form content, 
                  transforming them into perfect vertical videos for social media.
                </p>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Why We Built This</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Content creators spend hours manually editing clips from their podcasts. We saw an opportunity 
                  to automate this process using advanced AI, giving creators more time to focus on what they do 
                  best - creating amazing content.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mt-12">
                <motion.div
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">Lightning Fast</h4>
                  <p className="text-gray-600">Generate 5 clips in minutes, not hours</p>
                </motion.div>
                
                <motion.div
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">AI-Powered</h4>
                  <p className="text-gray-600">Smart algorithms find the best moments</p>
                </motion.div>
              </div>
            </div>
          )
        };

      case 'privacy':
        return {
          title: 'Privacy Policy',
          subtitle: 'How we protect your data',
          icon: Shield,
          content: (
            <div className="space-y-8">
              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl border border-green-200">
                <div className="flex items-center gap-3 mb-3">
                  <Shield className="h-6 w-6 text-green-600" />
                  <h3 className="text-xl font-bold text-green-800">Your Privacy Matters</h3>
                </div>
                <p className="text-green-700">
                  We're currently drafting our comprehensive privacy policy. Your data security is our top priority.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">What We're Working On</h3>
                <ul className="space-y-3">
                  {[
                    'Transparent data collection practices',
                    'Secure file storage and processing',
                    'GDPR and CCPA compliance',
                    'User data deletion options',
                    'Third-party service disclosures'
                  ].map((item, index) => (
                    <motion.li
                      key={index}
                      className="flex items-center gap-3 text-gray-600"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"></div>
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          )
        };

      case 'terms':
        return {
          title: 'Terms of Service',
          subtitle: 'Usage guidelines and policies',
          icon: FileText,
          content: (
            <div className="space-y-8">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-200">
                <div className="flex items-center gap-3 mb-3">
                  <FileText className="h-6 w-6 text-blue-600" />
                  <h3 className="text-xl font-bold text-blue-800">Terms Coming Soon</h3>
                </div>
                <p className="text-blue-700">
                  We're finalizing our terms of service to ensure fair and transparent usage policies.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">What to Expect</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    { title: 'Fair Usage', desc: 'Reasonable limits and guidelines' },
                    { title: 'Content Rights', desc: 'Your content remains yours' },
                    { title: 'Service Availability', desc: 'Uptime and maintenance policies' },
                    { title: 'Account Management', desc: 'Registration and usage rules' }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className="p-4 border border-gray-200 rounded-lg hover:border-cyan-300 transition-colors"
                      whileHover={{ scale: 1.02 }}
                    >
                      <h4 className="font-semibold text-gray-800 mb-2">{item.title}</h4>
                      <p className="text-gray-600 text-sm">{item.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          )
        };

      case 'contact':
        return {
          title: 'Get In Touch',
          subtitle: "We'd love to hear from you",
          icon: Mail,
          content: (
            <div className="space-y-8">
              <div className="text-center">
                <p className="text-xl text-gray-600 mb-8">
                  Have questions, feedback, or just want to say hi? Reach out to us!
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <motion.div
                  className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
                  whileHover={{ y: -5, boxShadow: "0 20px 40px -12px rgba(0, 0, 0, 0.1)" }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
                      <Mail className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Email Us</h3>
                      <p className="text-gray-600 text-sm">We'll get back to you soon</p>
                    </div>
                  </div>
                  <p className="text-cyan-600 font-medium">hello@clipmaster.com</p>
                </motion.div>

                <motion.div
                  className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
                  whileHover={{ y: -5, boxShadow: "0 20px 40px -12px rgba(0, 0, 0, 0.1)" }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
                      <Twitter className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Twitter DM</h3>
                      <p className="text-gray-600 text-sm">Quick responses here</p>
                    </div>
                  </div>
                  <p className="text-purple-600 font-medium">@_chilwal</p>
                </motion.div>
              </div>
            </div>
          )
        };

      case 'help':
        return {
          title: 'Help Center',
          subtitle: 'Find answers to common questions',
          icon: HelpCircle,
          content: (
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h3>
                <div className="space-y-4">
                  {[
                    {
                      q: "How does ClipMaster work?",
                      a: "Upload your podcast, and our AI analyzes the content to create engaging vertical clips with automatic subtitles."
                    },
                    {
                      q: "What file formats do you support?",
                      a: "Currently, we support MP4 files up to 500MB. More formats coming soon!"
                    },
                    {
                      q: "How long does processing take?",
                      a: "Processing typically takes 5-10 minutes depending on the length of your content."
                    },
                    {
                      q: "Can I edit the generated clips?",
                      a: "Yes! You can download the clips and edit them in your preferred video editor."
                    }
                  ].map((faq, index) => (
                    <motion.div
                      key={index}
                      className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.01 }}
                    >
                      <h4 className="font-semibold text-gray-800 mb-2">{faq.q}</h4>
                      <p className="text-gray-600">{faq.a}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          )
        };

      case 'careers':
        return {
          title: 'Join Our Team',
          subtitle: 'Help us revolutionize content creation',
          icon: Building,
          content: (
            <div className="space-y-8">
              <div className="text-center">
                <p className="text-xl text-gray-600 mb-8">
                  We're building the future of AI-powered content creation. Want to be part of the journey?
                </p>
              </div>

              <div className="bg-gradient-to-r from-cyan-50 to-purple-50 p-8 rounded-2xl border border-cyan-200">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">We're Growing!</h3>
                  <p className="text-gray-600 mb-6">
                    Currently, we're a small but passionate team. As we scale, we'll be looking for talented individuals to join us.
                  </p>
                  <div className="flex flex-wrap justify-center gap-3">
                    {['Frontend Developer', 'AI Engineer', 'Product Designer', 'DevOps'].map((role, index) => (
                      <motion.span
                        key={index}
                        className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 shadow-sm"
                        whileHover={{ scale: 1.05 }}
                      >
                        {role}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )
        };

      case 'blog':
        return {
          title: 'Our Blog',
          subtitle: 'Insights, tips, and updates',
          icon: BookOpen,
          content: (
            <div className="space-y-8">
              <div className="text-center">
                <p className="text-xl text-gray-600 mb-8">
                  Stay updated with the latest in AI, content creation, and ClipMaster news.
                </p>
              </div>

              <div className="bg-gradient-to-r from-orange-50 to-red-50 p-8 rounded-2xl border border-orange-200">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Coffee className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Coming Soon!</h3>
                  <p className="text-gray-600 mb-6">
                    We're brewing up some great content for you. Our blog will feature tutorials, 
                    industry insights, and behind-the-scenes looks at ClipMaster development.
                  </p>
                  <div className="text-sm text-gray-500">
                    Expected topics: AI in Content Creation • Video Marketing Tips • Product Updates
                  </div>
                </div>
              </div>
            </div>
          )
        };

      default:
        return {
          title: 'Page Coming Soon',
          subtitle: 'We are working on this',
          icon: Clock,
          content: (
            <div className="text-center">
              <p className="text-xl text-gray-600">
                This page is currently under development. Check back soon!
              </p>
            </div>
          )
        };
    }
  };

  const pageContent = getPageContent();
  const PageIcon = pageContent.icon;

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 to-gray-100 text-gray-900">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute h-1.5 w-1.5 rounded-full bg-cyan-400 opacity-20"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{
              y: [-15, 15, -15],
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.4, 1],
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
        className="absolute top-1/4 -left-32 h-96 w-96 rounded-full bg-gradient-to-r from-cyan-200/30 to-purple-200/30 blur-3xl"
        animate={{
          x: [0, 80, 0],
          y: [0, -40, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-32 bottom-1/4 h-96 w-96 rounded-full bg-gradient-to-l from-purple-200/30 to-pink-200/30 blur-3xl"
        animate={{
          x: [0, -80, 0],
          y: [0, 40, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
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
      <section className="relative z-10 mx-auto max-w-4xl px-6 py-16">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 to-purple-600 shadow-2xl"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.3, type: "spring" }}
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            <PageIcon className="h-10 w-10 text-white" />
          </motion.div>

          <motion.h1
            className="text-4xl font-bold text-gray-800 md:text-5xl mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            {pageContent.title}
          </motion.h1>

          <motion.p
            className="text-xl text-gray-600"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            {pageContent.subtitle}
          </motion.p>
        </motion.div>

        <motion.div
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-xl border border-gray-200/50 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
        >
          {pageContent.content}
        </motion.div>

        {/* Social Links */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-6">Connect With Us</h3>
          <div className="flex justify-center gap-4">
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 rounded-full p-4 text-gray-600 transition-all ${social.color} border border-gray-200 hover:border-transparent`}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 1.2 }}
              >
                <social.icon className="h-5 w-5" />
                <span className="font-medium">{social.name}</span>
                <ExternalLink className="h-3 w-3" />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default FooterPlaceholderPage;