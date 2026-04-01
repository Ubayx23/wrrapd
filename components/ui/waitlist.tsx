'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

interface WaitlistProps {
  className?: string;
}

export default function Waitlist({ className = '' }: WaitlistProps) {
  const [phone, setPhone] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!phone || !isValidPhoneNumber(phone)) {
      setError('please enter a valid phone number.');
      return;
    }

    setIsLoading(true);
    setError('');

    const { data: existing, error: queryError } = await supabase
      .from('waitlist')
      .select('phone')
      .eq('phone', phone)
      .maybeSingle();

    if (queryError) {
      setIsLoading(false);
      setError('something went wrong, try again');
      return;
    }

    if (existing) {
      setIsLoading(false);
      setError('that number is already on the list.');
      return;
    }

    const { error: dbError } = await supabase
      .from('waitlist')
      .insert({ phone });

    setIsLoading(false);

    if (dbError) {
      setError('something went wrong, try again');
      return;
    }

    setPhone('');
    setIsSubmitted(true);
  };

  return (
    <div
      style={{
        width: '100%',
        maxWidth: 480,
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
      data-purpose="waitlist-container"
    >
      <AnimatePresence mode="wait">
        {isSubmitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, paddingTop: 8, paddingBottom: 8, width: '100%' }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: 'spring', stiffness: 300, damping: 25 }}
              style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.10)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <CheckCircle style={{ width: 20, height: 20, color: '#FFFFFF' }} />
            </motion.div>
            <p
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: 14,
                color: '#FFFFFF',
                textAlign: 'center',
                margin: 0,
              }}
            >
              you&apos;re on the list. we&apos;ll text you when we launch.
            </p>
            <button
              onClick={() => { setIsSubmitted(false); setPhone(''); }}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'Poppins, sans-serif',
                fontSize: 12,
                color: 'rgba(255,255,255,0.5)',
                padding: 0,
              }}
            >
              add another number
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, width: '100%' }}
          >
            <form
              onSubmit={handleSubmit}
              style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%' }}
            >
              {/* Label */}
              <label
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: 11,
                  fontWeight: 600,
                  color: 'rgba(255,255,255,0.6)',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  textAlign: 'left',
                  paddingLeft: 4,
                }}
              >
                your phone number.
              </label>

              {/* PhoneInput wrapper */}
              <div
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: 12,
                  padding: '14px 16px',
                  color: 'white',
                  fontSize: 16,
                  width: '100%',
                  boxSizing: 'border-box',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <PhoneInput
                  defaultCountry="US"
                  value={phone}
                  onChange={(value) => { setPhone(value || ''); setError(''); }}
                  placeholder="your phone number"
                  disabled={isLoading}
                />
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: isLoading ? 1 : 1.02 }}
                whileTap={{ scale: isLoading ? 1 : 0.97 }}
                style={{
                  width: '100%',
                  marginTop: 4,
                  padding: '16px 24px',
                  background: '#07070F',
                  border: '1.5px solid rgba(123,104,238,0.5)',
                  borderRadius: 16,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: 600,
                  fontSize: 16,
                  color: '#FFFFFF',
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  opacity: isLoading ? 0.7 : 1,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                }}
              >
                {isLoading ? (
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <Loader2 style={{ width: 16, height: 16, color: '#FFFFFF' }} />
                  </motion.span>
                ) : "i'm in"}
              </motion.button>
            </form>

            {/* Error */}
            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: 12,
                    color: '#ef4444',
                    margin: 0,
                    textAlign: 'center',
                  }}
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
