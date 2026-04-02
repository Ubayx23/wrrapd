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

    const digits = (phone || '').replace(/\D/g, '');
    const looksValid = digits.length >= 9;
    let passedLibCheck = false;
    try {
      passedLibCheck = !!phone && isValidPhoneNumber(phone);
    } catch {
      passedLibCheck = looksValid;
    }

    if (!looksValid && !passedLibCheck) {
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
        .PhoneInputInput { background: transparent; border: none; outline: none; color: #fff; font-size: 16px; width: 100%; font-family: inherit; }
        .PhoneInputInput::placeholder { color: rgba(255,255,255,0.4); }
        .PhoneInputCountrySelectArrow { color: #fff; opacity: 0.5; }
        .PhoneInput { width: 100%; display: flex; align-items: center; gap: 8px; }
        .PhoneInputCountrySelect { background: transparent; color: #fff; border: none; outline: none; }
      `}</style>

      {success ? (
        <div style={{ textAlign: 'center', padding: '24px 0' }}>
          <div style={{ fontSize: 40, marginBottom: 12, color: '#7B68EE' }}>&#10003;</div>
          <p style={{ color: '#ffffff', fontSize: 17, fontWeight: 700, lineHeight: 1.5, marginBottom: 6 }}>
            you&apos;re on the list.
          </p>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 14, lineHeight: 1.5, marginBottom: 20 }}>
            we&apos;ll text you when we launch.
          </p>
          <button
            onClick={() => { setSuccess(false); setPhone(''); }}
            style={{
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.2)',
              color: 'rgba(255,255,255,0.6)',
              padding: '10px 20px',
              borderRadius: 8,
              fontSize: 13,
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
              color: 'rgba(255,255,255,0.6)',
              fontSize: 11,
              letterSpacing: 2,
              textTransform: 'uppercase',
              marginBottom: 10,
              display: 'block',
              textAlign: 'left',
              fontWeight: 600,
            }}
          >
            YOUR PHONE NUMBER
          </label>

          <div
            style={{
              background: 'rgba(255,255,255,0.07)',
              border: '1.5px solid rgba(255,255,255,0.25)',
              borderRadius: 12,
              padding: '13px 16px',
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
            <div
              style={{
                marginTop: 10,
                padding: '10px 14px',
                borderRadius: 8,
                background: error.includes('already') ? 'rgba(123,104,238,0.15)' : 'rgba(255,80,80,0.12)',
                border: error.includes('already') ? '1px solid rgba(123,104,238,0.4)' : '1px solid rgba(255,80,80,0.35)',
                textAlign: 'center',
              }}
            >
              <p style={{
                color: error.includes('already') ? '#b8aff5' : '#ff7070',
                fontSize: 13,
                margin: 0,
                fontWeight: 500,
              }}>
                {error.includes('already') ? 'already on the list.' : error}
              </p>
              {error.includes('already') && (
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12, margin: '4px 0 0 0' }}>
                  that number is already registered. we&apos;ll be in touch.
                </p>
              )}
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              width: '100%',
              marginTop: 12,
              padding: '16px',
              background: 'linear-gradient(135deg, #5B4DB8 0%, #7B68EE 100%)',
              color: 'white',
              border: 'none',
              borderRadius: 12,
              fontSize: 16,
              fontWeight: 700,
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1,
              letterSpacing: 0.3,
            }}
          >
            {loading ? 'loading...' : "i'm in"}
          </button>
        </div>
      )}
    </div>
  );
}
