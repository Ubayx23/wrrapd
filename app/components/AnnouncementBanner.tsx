'use client';

import { useState, useEffect } from 'react';
import { Bell, X } from 'lucide-react';

const BANNER_KEY = 'wrrapd_banner_dismissed_v1';

export default function AnnouncementBanner() {
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(BANNER_KEY)) {
      setDismissed(true);
    }
  }, []);

  function dismiss() {
    localStorage.setItem(BANNER_KEY, '1');
    setDismissed(true);
  }

  if (dismissed) return null;

  return (
    <div style={{
      width: '100%',
      background: 'rgba(155,93,229,0.07)',
      border: '1px solid rgba(155,93,229,0.22)',
      borderRadius: 12,
      padding: '14px 16px',
      display: 'flex',
      alignItems: 'flex-start',
      gap: 12,
      marginBottom: 24,
      boxSizing: 'border-box',
    }}>
      <Bell size={15} color="rgba(155,93,229,0.75)" style={{ marginTop: 2, flexShrink: 0 }} />
      <p style={{
        flex: 1,
        fontFamily: 'Poppins, sans-serif',
        fontSize: 'clamp(12px, 3vw, 13px)',
        color: 'rgba(255,255,255,0.5)',
        margin: 0,
        lineHeight: 1.65,
      }}>
        heads up. sms check-ins are delayed while we finish carrier setup.
      </p>
      <button
        onClick={dismiss}
        aria-label="dismiss"
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
          color: 'rgba(255,255,255,0.22)',
          display: 'flex',
          alignItems: 'center',
          flexShrink: 0,
          marginTop: 2,
        }}
      >
        <X size={13} />
      </button>
    </div>
  );
}
