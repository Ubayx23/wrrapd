'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, CheckCircle, Loader2 } from 'lucide-react';

interface WaitlistProps {
  className?: string;
}

// Local avatar photos uploaded to /public for social proof row
const AVATARS = ['/1claude.JPG', '/3claude.JPG', '/w8.jpg'];
const SIGNUP_COUNT = 247;

export default function Waitlist({ className = '' }: WaitlistProps) {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    setIsLoading(true);
    setError('');

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <div className={`w-full max-w-lg ${className}`} data-purpose="waitlist-container">
      <AnimatePresence mode="wait">
        {isSubmitted ? (
          // Success state — replaces the form
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center gap-3 py-2"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: 'spring', stiffness: 300, damping: 25 }}
              className="w-10 h-10 rounded-full bg-wrrapd-navy/10 flex items-center justify-center"
            >
              <CheckCircle className="w-5 h-5 text-wrrapd-navy" />
            </motion.div>
            <p className="text-sm font-poppins text-wrrapd-navy text-center">
              You&apos;re on the list — we&apos;ll be in touch!
            </p>
            <button
              onClick={() => { setIsSubmitted(false); setEmail(''); }}
              className="text-xs font-poppins text-wrrapd-navy/50 hover:text-wrrapd-navy transition-colors"
            >
              Join with another email
            </button>
          </motion.div>
        ) : (
          // Pill form + social proof
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center gap-4"
          >
            {/* Pill-shaped form with Mail icon on the left */}
            <form
              onSubmit={handleSubmit}
              className="relative flex flex-col sm:flex-row items-center w-full bg-white/70 backdrop-blur-sm p-2 rounded-2xl sm:rounded-full shadow-lg border border-wrrapd-navy/20 group focus-within:ring-2 focus-within:ring-wrrapd-navy focus-within:ring-offset-2 transition-all duration-300"
            >
              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-wrrapd-navy/50 hidden sm:block" />
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(''); }}
                placeholder="Your Email Address"
                disabled={isLoading}
                className="w-full sm:w-auto flex-grow bg-transparent sm:pl-12 px-4 py-3 font-poppins text-wrrapd-navy placeholder:text-wrrapd-navy/70 outline-none text-center sm:text-left disabled:opacity-50"
                required
              />
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: isLoading ? 1 : 1.05 }}
                whileTap={{ scale: isLoading ? 1 : 0.97 }}
                className="w-full sm:w-auto mt-2 sm:mt-0 px-6 py-3 bg-wrrapd-navy text-wrrapd-gray font-poppins font-semibold rounded-full flex items-center justify-center gap-2 disabled:opacity-70 transition-colors duration-300 shadow-md"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  'Get Notified'
                )}
              </motion.button>
            </form>

            {/* Inline error message */}
            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="text-xs font-poppins text-red-500"
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>

            {/* Social proof — real avatar photos + count */}
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {AVATARS.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={`User ${i + 1}`}
                    className="h-8 w-8 rounded-full ring-2 ring-wrrapd-gray object-cover"
                  />
                ))}
              </div>
              <p className="text-sm font-poppins text-wrrapd-navy/60">
                <span className="font-semibold text-wrrapd-navy">{SIGNUP_COUNT}</span> joined already
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
