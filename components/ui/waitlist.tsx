'use client';

import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

export default function Waitlist() {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    setError('');

    if (!phone || !isValidPhoneNumber(phone)) {
      setError('please enter a valid phone number.');
      return;
    }

    setLoading(true);

    try {
      const { data: existing } = await supabase
        .from('waitlist')
        .select('phone')
        .eq('phone', phone)
        .maybeSingle();

      if (existing) {
        setError('that number is already on the list.');
        return;
      }

      const { error: insertError } = await supabase
        .from('waitlist')
        .insert([{ phone }]);

      if (insertError) {
        setError('something went wrong. try again.');
      } else {
        setSuccess(true);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ width: '100%' }}>
      <style>{`
        .PhoneInputInput { background: transparent; border: none; outline: none; color: #000; font-size: 16px; width: 100%; font-family: inherit; }
        .PhoneInputInput::placeholder { color: rgba(0,0,0,0.35); }
        .PhoneInputCountrySelectArrow { color: #000; opacity: 0.4; }
        .PhoneInput { width: 100%; display: flex; align-items: center; gap: 8px; }
        .PhoneInputCountrySelect { background: transparent; color: #000; border: none; outline: none; }
      `}</style>

      {success ? (
        <div style={{ textAlign: 'center', padding: '20px 0' }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>&#10003;</div>
          <p style={{ color: '#000000', fontSize: 16, lineHeight: 1.5, marginBottom: 16 }}>
            you&apos;re on the list. we&apos;ll text you when we launch.
          </p>
          <button
            onClick={() => { setSuccess(false); setPhone(''); }}
            style={{
              background: 'transparent',
              border: '1px solid rgba(0,0,0,0.2)',
              color: '#000000',
              padding: '10px 20px',
              borderRadius: 8,
              fontSize: 14,
              cursor: 'pointer',
            }}
          >
            add another number
          </button>
        </div>
      ) : (
        <div>
          <label
            style={{
              color: 'rgba(0,0,0,0.45)',
              fontSize: 11,
              letterSpacing: 2,
              textTransform: 'uppercase',
              marginBottom: 10,
              display: 'block',
              textAlign: 'left',
            }}
          >
            YOUR PHONE NUMBER.
          </label>

          <div
            style={{
              background: 'rgba(0,0,0,0.06)',
              border: '1px solid rgba(0,0,0,0.15)',
              borderRadius: 12,
              padding: '12px 16px',
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              boxSizing: 'border-box',
            }}
          >
            <PhoneInput
              defaultCountry="US"
              value={phone}
              onChange={(val: string | undefined) => setPhone(val || '')}
              placeholder="your phone number"
              style={{ width: '100%' }}
            />
          </div>

          {error && (
            <p style={{ color: '#ff6b6b', fontSize: 13, marginTop: 8, textAlign: 'center' }}>
              {error}
            </p>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              width: '100%',
              marginTop: 12,
              padding: '16px',
              background: '#4C3D8F',
              color: 'white',
              border: 'none',
              borderRadius: 12,
              fontSize: 16,
              fontWeight: 700,
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? 'loading...' : "i'm in"}
          </button>
        </div>
      )}
    </div>
  );
}
