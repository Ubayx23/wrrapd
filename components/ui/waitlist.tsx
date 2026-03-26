'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface WaitlistProps {
  className?: string;
}

const AVATARS = ['/1claude.JPG', '/3claude.JPG', '/w8.jpg'];

// Format as (123) 456-7890 while typing
function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 10);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

function isValidPhone(phone: string): boolean {
  return phone.replace(/\D/g, '').length === 10;
}

export default function Waitlist({ className = '' }: WaitlistProps) {
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(formatPhone(e.target.value));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!phone) {
      setError('drop your number first');
      return;
    }
    if (!isValidPhone(phone)) {
      setError('needs to be a valid 10-digit number');
      return;
    }

    setIsLoading(true);
    setError('');

    const { error: dbError } = await supabase
      .from('waitlist')
      .insert({ phone: phone.replace(/\D/g, ''), email: email || null });

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
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(123,104,238,0.15)' }}
            >
              <CheckCircle className="w-5 h-5" style={{ color: '#7B68EE' }} />
            </motion.div>
            <p className="text-sm font-poppins text-center" style={{ color: '#FFFFFF' }}>
              you&apos;re locked in — we&apos;ll text you first.
            </p>
            <button
              onClick={() => { setIsSubmitted(false); setPhone(''); setEmail(''); }}
              className="text-xs font-poppins transition-colors"
              style={{ color: 'rgba(255,255,255,0.45)' }}
            >
              add another number
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

              {/* Phone — primary */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-poppins font-semibold tracking-wide uppercase px-1" style={{ color: 'rgba(255,255,255,0.45)' }}>
                  what&apos;s your number?
                </label>
                <input
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  value={phone}
                  onChange={handlePhoneChange}
                  placeholder="(555) 867-5309"
                  disabled={isLoading}
                  className="w-full rounded-2xl px-5 py-4 font-poppins outline-none transition-all duration-200 disabled:opacity-50 text-xl font-semibold tracking-wide focus:ring-2 focus:ring-[#7B68EE] focus:ring-offset-0"
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: '#FFFFFF',
                  }}
                />
              </div>

              {/* Email — secondary */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-poppins font-semibold tracking-wide uppercase px-1" style={{ color: 'rgba(255,255,255,0.45)' }}>
                  and your email for updates.
                </label>
                <input
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(''); }}
                  placeholder="you@email.com"
                  disabled={isLoading}
                  className="w-full rounded-xl px-4 py-3 font-poppins outline-none transition-all duration-200 disabled:opacity-50 text-base focus:ring-2 focus:ring-[#7B68EE] focus:ring-offset-0"
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: '#FFFFFF',
                  }}
                />
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: isLoading ? 1 : 1.02 }}
                whileTap={{ scale: isLoading ? 1 : 0.97 }}
                className="w-full mt-1 px-6 py-4 font-poppins font-semibold rounded-2xl flex items-center justify-center gap-2 disabled:opacity-70 transition-colors duration-300 shadow-md text-base"
                style={{ background: '#4C3D8F', color: '#FFFFFF' }}
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
                  className="text-xs font-poppins"
                  style={{ color: '#ff6b6b' }}
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
                    className="h-8 w-8 rounded-full object-cover"
                    style={{ outline: '2px solid #07070F' }}
                  />
                ))}
              </div>
              <p className="text-sm font-poppins" style={{ color: 'rgba(255,255,255,0.45)' }}>
                don&apos;t have FOMO / join now
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
