'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface WaitlistProps {
  className?: string;
}

const AVATARS = ['/1claude.JPG', '/3claude.JPG', '/w8.jpg'];

export default function Waitlist({ className = '' }: WaitlistProps) {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setError('drop your email first');
      return;
    }

    setIsLoading(true);
    setError('');

    const { error: dbError } = await supabase
      .from('waitlist')
      .insert({ email: email || null });

    setIsLoading(false);

    if (dbError) {
      if (dbError.code === '23505') {
        setError('you are already on the list');
      } else {
        setError('something went wrong, try again');
      }
      return;
    }

    setIsSubmitted(true);
  };

  return (
    <div className={`w-full max-w-sm ${className}`} data-purpose="waitlist-container">
      <AnimatePresence mode="wait">
        {isSubmitted ? (
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
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center"
            >
              <CheckCircle className="w-5 h-5 text-white" />
            </motion.div>
            <p className="text-sm font-poppins text-white text-center">
              you&apos;re on the list — we&apos;ll email you first.
            </p>
            <button
              onClick={() => { setIsSubmitted(false); setEmail(''); }}
              className="text-xs font-poppins text-white/50 hover:text-white transition-colors"
            >
              add another email
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center gap-4 w-full"
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full">

              {/* Email */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-poppins font-semibold text-white/60 tracking-wide uppercase px-1">
                  your email for updates.
                </label>
                <input
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(''); }}
                  placeholder="you@email.com"
                  disabled={isLoading}
                  className="w-full bg-white border border-white/20 rounded-2xl px-5 py-4 font-poppins text-gray-900 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-200 disabled:opacity-50 text-xl font-semibold tracking-wide shadow-sm"
                />
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: isLoading ? 1 : 1.02 }}
                whileTap={{ scale: isLoading ? 1 : 0.97 }}
                className="w-full mt-1 px-6 py-4 bg-wrrapd-navy text-wrrapd-gray font-poppins font-semibold rounded-2xl flex items-center justify-center gap-2 disabled:opacity-70 transition-colors duration-300 shadow-md text-base"
              >
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "i'm in"}
              </motion.button>
            </form>

            {/* Error */}
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

            {/* Social proof */}
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
              <p className="text-sm font-poppins text-white/60">
                don&apos;t have FOMO / join now
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
