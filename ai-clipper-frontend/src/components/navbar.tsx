"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import {
  Scissors,
  Menu,
  X,
  CreditCard,
  LogOut,
} from 'lucide-react';

interface NavbarProps {
  user?: {
    credits: number;
    email: string;
  } | null;
}

const Navbar: React.FC<NavbarProps> = ({ user }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const router = useRouter();

  const handleSignOut = async() => {
    await signOut({ redirectTo: "/login" });
  };

  const getInitials = (email: string) => {
    return email.charAt(0).toUpperCase();
  };

  return (
    <motion.nav
      className="relative z-50 p-6"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        {/* Logo */}
        <motion.div
          className="flex items-center space-x-2"
          whileHover={{ scale: 1.05 }}
        >
          <Link 
            href={user ? "/dashboard" : "/"} 
            className="flex items-center space-x-2"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-cyan-400 to-purple-600">
              <Scissors className="h-6 w-6 text-white" />
            </div>
            <span className="bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-2xl font-bold text-transparent">
              ClipMaster
            </span>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden items-center space-x-6 md:flex">
          {!user ? (
            // Non-authenticated navigation
            <>
              <motion.a
                href="#features"
                className="px-3 py-2 font-medium text-gray-600 transition-colors hover:text-cyan-500"
                whileHover={{ y: -2 }}
              >
                Features
              </motion.a>
              <motion.a
                href="#pricing"
                className="px-3 py-2 font-medium text-gray-600 transition-colors hover:text-cyan-500"
                whileHover={{ y: -2 }}
              >
                Pricing
              </motion.a>
              <div className="ml-4 flex items-center space-x-3">
                <motion.button
                  onClick={() => router.push("/login")}
                  className="rounded-lg px-4 py-2 font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Log In
                </motion.button>
                <motion.button
                  onClick={() => router.push("/signup")}
                  className="rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 px-6 py-2.5 font-semibold text-white hover:scale-105 hover:shadow-lg"
                  whileHover={{ scale: 1.05 }}
                >
                  Sign Up
                </motion.button>
              </div>
            </>
          ) : (
            // Authenticated navigation
            <div className="flex items-center space-x-4">
              {/* Credits Badge */}
              <motion.div
                className="flex items-center gap-3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <motion.div
                  className="rounded-full bg-gradient-to-r from-cyan-100 to-purple-100 px-4 py-2"
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="text-sm font-semibold text-gray-700">
                    {user.credits} Credits Left
                  </span>
                </motion.div>
                
                <motion.button
                  onClick={() => router.push("/dashboard/billing")}
                  className="rounded-full border border-cyan-300 px-4 py-2 text-sm font-medium text-cyan-600 transition-all hover:bg-cyan-50 hover:border-cyan-400"
                  whileHover={{ scale: 1.05, y: -1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Buy More
                </motion.button>
              </motion.div>

              {/* User Menu */}
              <div className="relative">
                <motion.button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 to-purple-600 text-white font-semibold text-sm">
                    {getInitials(user.email)}
                  </div>
                  
                </motion.button>

                {/* User Dropdown */}
                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-56 rounded-xl bg-white shadow-2xl border border-gray-200 overflow-hidden"
                    >
                      {/* User Info */}
                      <div className="px-4 py-3 bg-gradient-to-r from-cyan-50 to-purple-50 border-b border-gray-200">
                        <p className="text-sm font-medium text-gray-900">Signed in as</p>
                        <p className="text-sm text-gray-600 truncate">{user.email}</p>
                      </div>

                      {/* Menu Items */}
                      <div className="py-2">
                        <motion.button
                          onClick={() => {
                           
                             router.push("/dashboard/billing")
                            setIsUserMenuOpen(false);
                          }}
                          className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          whileHover={{ x: 5 }}
                        >
                          <CreditCard className="h-4 w-4 text-cyan-500" />
                          Billing & Credits
                        </motion.button>
                        
                        <hr className="my-1 border-gray-200" />
                        
                        <motion.button
                          onClick={async() => {
                            await handleSignOut();
                            setIsUserMenuOpen(false);
                          }}
                          className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                          whileHover={{ x: 5 }}
                        >
                          <LogOut className="h-4 w-4" />
                          Sign Out
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 rounded-xl bg-white p-4 shadow-lg md:hidden"
          >
            <div className="flex flex-col space-y-3">
              {!user ? (
                // Non-authenticated mobile menu
                <>
                  <a
                    href="#features"
                    className="py-2 text-gray-600 transition-colors hover:text-cyan-500"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Features
                  </a>
                  <a
                    href="#pricing"
                    className="py-2 text-gray-600 transition-colors hover:text-cyan-500"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Pricing
                  </a>
                  <div className="mt-2 border-t border-gray-200 pt-3">
                    <button
                      onClick={() => {
                        router.push("/login");
                        setIsMenuOpen(false);
                      }}
                      className="mb-2 w-full py-2 text-left text-gray-600 hover:text-gray-900"
                    >
                      Log In
                    </button>
                    <button
                      onClick={() => {
                        router.push("/signup");
                        setIsMenuOpen(false);
                      }}
                      className="w-full rounded-full bg-gray-100 px-6 py-3 font-semibold text-gray-900 hover:bg-gray-200"
                    >
                      Sign Up
                    </button>
                  </div>
                </>
              ) : (
                // Authenticated mobile menu
                <>
                  <div className="flex items-center justify-between py-2 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 to-purple-600 text-white font-semibold">
                        {getInitials(user.email)}
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 truncate max-w-[200px]">{user.email}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="py-2">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-gray-700">Credits Left</span>
                      <span className="rounded-full bg-gradient-to-r from-cyan-100 to-purple-100 px-3 py-1 text-sm font-semibold text-gray-700">
                        {user.credits}
                      </span>
                    </div>
                    
                    <button
                      onClick={() => {
                        router.push("/dashboard/billing");
                        setIsMenuOpen(false);
                      }}
                      className="w-full rounded-lg bg-cyan-50 px-4 py-2 text-sm font-medium text-cyan-600 hover:bg-cyan-100 transition-colors mb-3"
                    >
                      Buy More Credits
                    </button>
                    
                    <button
                      onClick={() => {
                        router.push("/dashboard/billing");
                        setIsMenuOpen(false);
                      }}
                      className="w-full py-2 text-left text-gray-600 hover:text-gray-900 text-sm"
                    >
                      Billing
                    </button>
                    
                    <button
                      onClick={async () => {
                        await handleSignOut();
                        setIsMenuOpen(false);
                      }}
                      className="w-full py-2 text-left text-red-600 hover:text-red-700 text-sm"
                    >
                      Sign Out
                    </button>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Click outside to close user menu */}
      {isUserMenuOpen && (
        <div
          className="fixed inset-0 -z-10"
          onClick={() => setIsUserMenuOpen(false)}
        />
      )}
    </motion.nav>
  );
};

export default Navbar;