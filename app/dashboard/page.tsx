'use client';

import { useState, useEffect } from 'react';

// ─── Nav Icons ───────────────────────────────────────────────────────────────

function HomeIcon({ active }: { active: boolean }) {
  const c = active ? 'white' : 'rgba(255,255,255,0.4)';
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="1" y="9" width="3" height="6" rx="0.8" fill={c} />
      <rect x="6.5" y="5.5" width="3" height="9.5" rx="0.8" fill={c} />
      <rect x="12" y="2" width="3" height="13" rx="0.8" fill={c} />
    </svg>
  );
}

function StatsIcon({ active }: { active: boolean }) {
  const c = active ? 'white' : 'rgba(255,255,255,0.4)';
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6" stroke={c} strokeWidth="1.2" />
      <path d="M8 5v3.2l2 1.8" stroke={c} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CardIcon({ active }: { active: boolean }) {
  const c = active ? 'white' : 'rgba(255,255,255,0.4)';
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="3" y="2" width="10" height="12" rx="1.5" stroke={c} strokeWidth="1.2" />
      <path d="M5.5 6h5M5.5 9h3" stroke={c} strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function RanksIcon({ active }: { active: boolean }) {
  const c = active ? 'white' : 'rgba(255,255,255,0.4)';
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M2 11.5l3.5-3.5 3 3 5-6" stroke={c} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11 4.5h3v3" stroke={c} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ProfileIcon({ active }: { active: boolean }) {
  const c = active ? 'white' : 'rgba(255,255,255,0.4)';
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="5.5" r="2.5" stroke={c} strokeWidth="1.2" />
      <path d="M2.5 14c0-3.038 2.462-5.5 5.5-5.5s5.5 2.462 5.5 5.5" stroke={c} strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

// ─── Pixel Character SVG ──────────────────────────────────────────────────────

function PixelChar({ size = 88, fill = 'white', eyeFill = '#0D0F14' }: { size?: number; fill?: string; eyeFill?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 88 88" fill="none">
      {/* Head */}
      <rect x="34" y="8" width="20" height="18" fill={fill} />
      {/* Eyes */}
      <rect x="38" y="13" width="4" height="4" fill={eyeFill} />
      <rect x="46" y="13" width="4" height="4" fill={eyeFill} />
      {/* Mouth */}
      <rect x="40" y="22" width="8" height="3" fill={eyeFill} />
      {/* Body */}
      <rect x="30" y="28" width="28" height="18" fill={fill} />
      {/* Left arm */}
      <rect x="22" y="29" width="8" height="14" fill={fill} />
      {/* Right arm */}
      <rect x="58" y="29" width="8" height="14" fill={fill} />
      {/* Left leg */}
      <rect x="32" y="47" width="11" height="16" fill={fill} />
      {/* Right leg */}
      <rect x="45" y="47" width="11" height="16" fill={fill} />
    </svg>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const navItems = [
  { id: 'home', label: 'home', Icon: HomeIcon },
  { id: 'stats', label: 'stats', Icon: StatsIcon },
  { id: 'card', label: 'card', Icon: CardIcon },
  { id: 'ranks', label: 'ranks', Icon: RanksIcon },
  { id: 'profile', label: 'profile', Icon: ProfileIcon },
];

const subjects = [
  { name: 'calculus', color: '#4A90D9' },
  { name: 'cs 201', color: '#7B68EE' },
  { name: 'biology', color: '#50C878' },
  { name: 'english', color: '#FFB347' },
  { name: 'physics', color: '#FF6B6B' },
];

const statCards = [
  { value: '23h', label: 'this week' },
  { value: '81%', label: 'percentile' },
  { value: '4.2h', label: 'avg session' },
];

const insights = [
  { key: 'peak day', value: 'thursday' },
  { key: 'consistency', value: '71 of 100' },
  { key: 'top subject', value: 'cs 201' },
  { key: 'char level', value: 'level 6' },
];

const barData = [
  { day: 'm', h: 11, active: false },
  { day: 't', h: 19, active: false },
  { day: 'w', h: 14, active: false },
  { day: 'th', h: 28, active: false },
  { day: 'f', h: 23, active: true },
  { day: 'sa', h: 7, active: false },
  { day: 'su', h: 0, active: false },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatTime(secs: number) {
  const m = Math.floor(secs / 60).toString().padStart(2, '0');
  const s = (secs % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

type SessionState = 'home' | 'picker' | 'session' | 'celebration';

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const [activeNav, setActiveNav] = useState('home');
  const [sessionState, setSessionState] = useState<SessionState>('home');
  const [selectedSubject, setSelectedSubject] = useState<{ name: string; color: string } | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  // Timer: run only during 'session' state
  useEffect(() => {
    if (sessionState !== 'session') return;
    setElapsedSeconds(0);
    const id = setInterval(() => setElapsedSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [sessionState]);

  function startSession(subject: { name: string; color: string }) {
    setSelectedSubject(subject);
    setSessionState('session');
  }

  function endSession() {
    setSessionState('celebration');
    setTimeout(() => setSessionState('home'), 2500);
  }

  const xp = Math.floor(elapsedSeconds / 6);

  // ── SESSION ────────────────────────────────────────────────────────────────
  if (sessionState === 'session') {
    return (
      <>
        <style>{`
          body:has(.session-screen) {
            padding: 0 !important;
            align-items: stretch !important;
            justify-content: flex-start !important;
            background-color: #0D0F14 !important;
          }
        `}</style>
        <div
          className="session-screen"
          style={{
            minHeight: '100dvh',
            background: '#0D0F14',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Subject pill — top center */}
          {selectedSubject && (
            <div
              className="font-poppins"
              style={{
                position: 'absolute',
                top: 40,
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                alignItems: 'center',
                gap: 7,
                background: 'rgba(255,255,255,0.08)',
                borderRadius: 20,
                padding: '6px 16px',
                fontSize: 12,
                color: 'rgba(255,255,255,0.6)',
                whiteSpace: 'nowrap',
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: selectedSubject.color,
                  flexShrink: 0,
                }}
              />
              {selectedSubject.name}
            </div>
          )}

          {/* Progress ring + character */}
          <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
            {/* Outer ring background */}
            <circle
              cx="100"
              cy="100"
              r="88"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="6"
              fill="none"
            />
            {/* Progress arc */}
            <circle
              cx="100"
              cy="100"
              r="88"
              stroke="rgba(255,255,255,0.4)"
              strokeWidth="6"
              fill="none"
              strokeDasharray="553"
              strokeDashoffset="180"
              strokeLinecap="round"
              transform="rotate(-90 100 100)"
            />
            {/* Pixel character inside ring, centered at 100,100 */}
            <g transform="translate(68, 56)">
              {/* Head */}
              <rect x="13" y="0" width="10" height="9" fill="white" />
              {/* Eyes */}
              <rect x="15" y="2.5" width="2" height="2" fill="rgba(255,255,255,0.25)" />
              <rect x="19" y="2.5" width="2" height="2" fill="rgba(255,255,255,0.25)" />
              {/* Mouth */}
              <rect x="16" y="7" width="4" height="1.5" fill="rgba(255,255,255,0.25)" />
              {/* Body */}
              <rect x="11" y="10" width="14" height="9" fill="white" />
              {/* Left arm */}
              <rect x="7" y="10.5" width="4" height="7" fill="white" />
              {/* Right arm */}
              <rect x="25" y="10.5" width="4" height="7" fill="white" />
              {/* Left leg */}
              <rect x="12" y="20" width="5.5" height="8" fill="white" />
              {/* Right leg */}
              <rect x="18.5" y="20" width="5.5" height="8" fill="white" />
            </g>
          </svg>

          {/* Timer */}
          <div
            className="font-dmsans"
            style={{
              fontSize: 64,
              fontWeight: 500,
              color: 'white',
              letterSpacing: '-2px',
              marginTop: 20,
              lineHeight: 1,
            }}
          >
            {formatTime(elapsedSeconds)}
          </div>

          {/* XP counter */}
          <div
            className="font-poppins"
            style={{
              fontSize: 13,
              color: 'rgba(255,255,255,0.4)',
              marginTop: 10,
            }}
          >
            +{xp} xp
          </div>

          {/* Pomodoro dots */}
          <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
            {[true, true, false, false].map((done, i) => (
              <div
                key={i}
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: done ? 'white' : 'rgba(255,255,255,0.2)',
                }}
              />
            ))}
          </div>

          {/* End session button */}
          <button
            onClick={endSession}
            className="font-poppins"
            style={{
              position: 'absolute',
              bottom: 40,
              background: 'rgba(255,255,255,0.08)',
              border: '0.5px solid rgba(255,255,255,0.12)',
              borderRadius: 12,
              padding: '14px 40px',
              fontSize: 14,
              color: 'white',
              cursor: 'pointer',
            }}
          >
            end session
          </button>
        </div>
      </>
    );
  }

  // ── CELEBRATION ────────────────────────────────────────────────────────────
  if (sessionState === 'celebration') {
    return (
      <>
        <style>{`
          body:has(.celebration-screen) {
            padding: 0 !important;
            align-items: stretch !important;
            justify-content: flex-start !important;
            background-color: #0D0F14 !important;
          }
        `}</style>
        <div
          className="celebration-screen"
          style={{
            minHeight: '100dvh',
            background: '#0D0F14',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
          }}
        >
          <div
            className="font-poppins"
            style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', marginBottom: 2 }}
          >
            session complete
          </div>

          <div
            className="font-dmsans"
            style={{
              fontSize: 48,
              fontWeight: 500,
              color: 'white',
              letterSpacing: '-1px',
              lineHeight: 1,
            }}
          >
            {formatTime(elapsedSeconds)}
          </div>

          {/* XP earned */}
          <div style={{ textAlign: 'center', marginTop: 8 }}>
            <div
              className="font-poppins"
              style={{ fontSize: 20, fontWeight: 500, color: 'white' }}
            >
              +{xp} xp
            </div>
            <div
              className="font-poppins"
              style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}
            >
              earned this session
            </div>
          </div>

          {/* Character with stars */}
          <div style={{ position: 'relative', marginTop: 20 }}>
            <PixelChar size={88} fill="white" eyeFill="rgba(255,255,255,0.2)" />
            {/* Stars */}
            <svg
              width="140"
              height="140"
              viewBox="0 0 140 140"
              fill="none"
              style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', pointerEvents: 'none' }}
            >
              {/* Star top-left */}
              <text x="8" y="30" fontSize="14" fill="rgba(255,255,255,0.7)">✦</text>
              {/* Star top-right */}
              <text x="112" y="22" fontSize="11" fill="rgba(255,255,255,0.5)">✦</text>
              {/* Star right */}
              <text x="120" y="75" fontSize="9" fill="rgba(255,255,255,0.4)">✦</text>
              {/* Star bottom-left */}
              <text x="12" y="110" fontSize="10" fill="rgba(255,255,255,0.5)">✦</text>
              {/* Star top-center */}
              <text x="60" y="10" fontSize="8" fill="rgba(255,255,255,0.35)">✦</text>
            </svg>
          </div>
        </div>
      </>
    );
  }

  // ── HOME + PICKER ──────────────────────────────────────────────────────────
  return (
    <>
      <style>{`
        .dash-scroll::-webkit-scrollbar { display: none; }

        /* ── Mobile — below 744px ─────────────────────────────────── */
        @media (max-width: 743px) {
          .dash-right { display: none !important; }

          body:has(.dash-container) {
            padding: 0 !important;
            align-items: stretch !important;
            justify-content: flex-start !important;
            background-color: #F5F4F0 !important;
          }

          .dash-container {
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 !important;
            box-sizing: border-box !important;
            height: auto !important;
            min-height: 100dvh !important;
            overflow-y: auto !important;
            overflow-x: hidden !important;
          }

          .dash-content {
            width: 100% !important;
            max-width: 100% !important;
            box-sizing: border-box !important;
            overflow: visible !important;
            flex-direction: column !important;
            padding: 0 16px !important;
          }

          .dash-left {
            width: 100% !important;
            max-width: 100% !important;
            box-sizing: border-box !important;
            overflow-y: visible !important;
            padding-right: 0 !important;
            padding-bottom: 90px !important;
            gap: 12px !important;
          }

          .badge-row {
            flex-wrap: nowrap !important;
            overflow-x: auto !important;
            -webkit-overflow-scrolling: touch;
          }
          .badge-row::-webkit-scrollbar { display: none; }
          .badge-item {
            font-size: 9px !important;
            padding: 2px 7px !important;
            flex-shrink: 0 !important;
          }

          .subject-chips { display: none !important; }
          .subject-dropdown { display: block !important; }

          .stat-card { padding: 10px !important; }
          .stat-value { font-size: 18px !important; }
          .stat-label { font-size: 10px !important; }
        }

        @media (max-width: 399px) {
          .char-svg { width: 64px !important; height: 64px !important; }
        }
      `}</style>

      <div
        className="dash-container"
        style={{
          width: '100%',
          height: '100vh',
          overflow: 'hidden',
          background: '#F5F4F0',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          boxSizing: 'border-box',
        }}
      >
        {/* ── TOP BAR ──────────────────────────────────────────────────────── */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '18px 24px',
            flexShrink: 0,
          }}
        >
          <span
            className="font-dmsans"
            style={{ fontSize: 17, fontWeight: 500, color: '#0D0F14', letterSpacing: '-0.5px' }}
          >
            wrrapd.
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div
              className="font-poppins"
              style={{
                background: '#0D0F14',
                color: 'white',
                borderRadius: 999,
                padding: '5px 11px',
                fontSize: 12,
                display: 'flex',
                alignItems: 'center',
                gap: 5,
              }}
            >
              🔥 14 days
            </div>
            <div
              style={{
                width: 30,
                height: 30,
                borderRadius: '50%',
                background: '#E0DDD6',
                border: '0.5px solid rgba(0,0,0,0.1)',
                flexShrink: 0,
              }}
            />
          </div>
        </div>

        {/* ── CONTENT AREA ─────────────────────────────────────────────────── */}
        <div
          className="dash-content"
          style={{
            flex: 1,
            display: 'flex',
            overflow: 'hidden',
            padding: '0 24px',
            gap: 12,
          }}
        >
          {/* ── LEFT COLUMN ────────────────────────────────────────────────── */}
          <div
            className="dash-scroll dash-left"
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
              overflowY: 'auto',
              paddingTop: 20,
              paddingRight: 18,
              paddingBottom: 90,
              scrollbarWidth: 'none',
            }}
          >
            {/* ── CHARACTER BLOCK ────────────────────────────────────────── */}
            <div
              style={{
                background: '#0D0F14',
                borderRadius: 12,
                padding: '18px 20px',
                display: 'flex',
                alignItems: 'center',
                gap: 16,
              }}
            >
              <svg
                className="char-svg"
                width="88"
                height="88"
                viewBox="0 0 88 88"
                fill="none"
                style={{ flexShrink: 0 }}
              >
                <rect x="34" y="8" width="20" height="18" fill="white" />
                <rect x="38" y="13" width="4" height="4" fill="#0D0F14" />
                <rect x="46" y="13" width="4" height="4" fill="#0D0F14" />
                <rect x="40" y="22" width="8" height="3" fill="#0D0F14" />
                <rect x="30" y="28" width="28" height="18" fill="white" />
                <rect x="22" y="29" width="8" height="14" fill="white" />
                <rect x="58" y="29" width="8" height="14" fill="white" />
                <rect x="32" y="47" width="11" height="16" fill="white" />
                <rect x="45" y="47" width="11" height="16" fill="white" />
              </svg>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  className="font-poppins"
                  style={{ fontSize: 14, fontWeight: 500, color: 'white', marginBottom: 3 }}
                >
                  studybot #047
                </div>
                <div
                  className="font-poppins"
                  style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginBottom: 10 }}
                >
                  level 6 — midnight grinder
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                  <span className="font-poppins" style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>xp</span>
                  <span className="font-poppins" style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>680 / 1000</span>
                </div>
                <div
                  style={{
                    width: '100%',
                    height: 5,
                    background: 'rgba(255,255,255,0.1)',
                    borderRadius: 20,
                    marginBottom: 10,
                  }}
                >
                  <div style={{ width: '68%', height: '100%', background: 'white', borderRadius: 20 }} />
                </div>
                <div className="badge-row" style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {['🔥 14 streak', 'top 81%', '23h week'].map((b) => (
                    <span
                      key={b}
                      className="badge-item font-poppins"
                      style={{
                        background: 'rgba(255,255,255,0.07)',
                        borderRadius: 20,
                        padding: '3px 9px',
                        fontSize: 10,
                        color: 'rgba(255,255,255,0.45)',
                      }}
                    >
                      {b}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* ── START SESSION ──────────────────────────────────────────── */}
            <button
              onClick={() => setSessionState('picker')}
              style={{
                width: '100%',
                background: '#0D0F14',
                borderRadius: 12,
                padding: '15px 20px',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                textAlign: 'left',
              }}
            >
              <div>
                <div className="font-poppins" style={{ fontSize: 15, fontWeight: 500, color: 'white' }}>
                  start session
                </div>
                <div
                  className="font-poppins"
                  style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 2 }}
                >
                  tap a subject to begin — character earns xp live
                </div>
              </div>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  marginLeft: 12,
                }}
              >
                <svg width="10" height="12" viewBox="0 0 10 12" fill="none">
                  <polygon points="1,1 9,6 1,11" fill="white" />
                </svg>
              </div>
            </button>

            {/* ── SUBJECTS ───────────────────────────────────────────────── */}
            <div
              style={{
                background: 'white',
                border: '0.5px solid rgba(0,0,0,0.07)',
                borderRadius: 8,
                padding: 14,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 10,
                }}
              >
                <span className="font-poppins" style={{ fontSize: 12, color: 'rgba(0,0,0,0.35)' }}>
                  my subjects
                </span>
                <button
                  className="font-poppins"
                  style={{
                    fontSize: 11,
                    color: 'rgba(0,0,0,0.3)',
                    background: '#F5F4F0',
                    border: 'none',
                    borderRadius: 20,
                    padding: '3px 10px',
                    cursor: 'pointer',
                  }}
                >
                  + add
                </button>
              </div>
              <div className="subject-chips" style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                {subjects.map((s) => (
                  <div
                    key={s.name}
                    className="font-poppins"
                    style={{
                      background: '#F5F4F0',
                      borderRadius: 20,
                      padding: '6px 12px',
                      fontSize: 12,
                      color: '#0D0F14',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      cursor: 'pointer',
                    }}
                  >
                    <div
                      style={{
                        width: 7,
                        height: 7,
                        borderRadius: '50%',
                        background: s.color,
                        flexShrink: 0,
                      }}
                    />
                    {s.name}
                  </div>
                ))}
              </div>

              <div className="subject-dropdown" style={{ display: 'none' }}>
                <select
                  className="font-poppins"
                  style={{
                    width: '100%',
                    background: 'white',
                    border: '0.5px solid rgba(0,0,0,0.07)',
                    borderRadius: 8,
                    padding: '12px 16px',
                    fontSize: 14,
                    color: '#0D0F14',
                    appearance: 'none',
                    WebkitAppearance: 'none',
                    outline: 'none',
                    cursor: 'pointer',
                  }}
                >
                  {subjects.map((s) => (
                    <option key={s.name} value={s.name}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* ── STATS GRID ─────────────────────────────────────────────── */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
              {statCards.map((s) => (
                <div
                  key={s.label}
                  className="stat-card"
                  style={{
                    background: 'white',
                    border: '0.5px solid rgba(0,0,0,0.07)',
                    borderRadius: 8,
                    padding: 13,
                  }}
                >
                  <div
                    className="stat-value font-poppins"
                    style={{ fontSize: 21, fontWeight: 500, color: '#0D0F14', lineHeight: 1 }}
                  >
                    {s.value}
                  </div>
                  <div
                    className="stat-label font-poppins"
                    style={{ fontSize: 11, color: 'rgba(0,0,0,0.35)', marginTop: 4 }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            {/* ── WEEKLY CHART ───────────────────────────────────────────── */}
            <div
              style={{
                background: 'white',
                border: '0.5px solid rgba(0,0,0,0.07)',
                borderRadius: 8,
                padding: 14,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 12,
                }}
              >
                <span className="font-poppins" style={{ fontSize: 12, color: 'rgba(0,0,0,0.35)' }}>
                  this week
                </span>
                <span
                  className="font-poppins"
                  style={{ fontSize: 12, fontWeight: 500, color: '#0D0F14' }}
                >
                  23h total
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'stretch', gap: 6, height: 52 }}>
                {barData.map((bar) => (
                  <div
                    key={bar.day}
                    style={{
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                      gap: 5,
                    }}
                  >
                    <div
                      style={{
                        width: '100%',
                        height: bar.h,
                        background: bar.active ? '#0D0F14' : '#ECEAE4',
                        borderRadius: 3,
                        flexShrink: 0,
                      }}
                    />
                    <span
                      className="font-poppins"
                      style={{ fontSize: 10, color: 'rgba(0,0,0,0.25)', lineHeight: 1 }}
                    >
                      {bar.day}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT COLUMN ─────────────────────────────────────────────────── */}
          <div
            className="dash-scroll dash-right"
            style={{
              width: 300,
              flexShrink: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
              paddingTop: 20,
              paddingBottom: 90,
              overflowY: 'auto',
              scrollbarWidth: 'none',
            }}
          >
            <div
              className="font-poppins"
              style={{
                fontSize: 11,
                color: 'rgba(0,0,0,0.3)',
                letterSpacing: '0.5px',
                textTransform: 'uppercase',
              }}
            >
              your card
            </div>

            <div
              style={{
                background: '#0D0F14',
                borderRadius: 12,
                padding: 18,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: -25,
                  right: -25,
                  width: 100,
                  height: 100,
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)',
                  pointerEvents: 'none',
                }}
              />
              <div
                className="font-poppins"
                style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)', marginBottom: 10 }}
              >
                @ubay
              </div>
              <div
                className="font-dmsans"
                style={{ fontSize: 38, fontWeight: 500, color: 'white', lineHeight: 1 }}
              >
                23h
              </div>
              <div
                className="font-poppins"
                style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginTop: 2, marginBottom: 12 }}
              >
                studied this week
              </div>
              <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
                {[
                  { v: '14', l: 'streak' },
                  { v: '81%', l: 'percentile' },
                  { v: '11pm', l: 'peak' },
                ].map((s) => (
                  <div key={s.l}>
                    <div
                      className="font-poppins"
                      style={{ fontSize: 14, fontWeight: 500, color: 'white' }}
                    >
                      {s.v}
                    </div>
                    <div
                      className="font-poppins"
                      style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', marginTop: 1 }}
                    >
                      {s.l}
                    </div>
                  </div>
                ))}
              </div>
              <div
                className="font-poppins"
                style={{
                  display: 'inline-block',
                  background: 'rgba(255,255,255,0.08)',
                  borderRadius: 20,
                  padding: '4px 10px',
                  fontSize: 10,
                  color: 'rgba(255,255,255,0.5)',
                  marginBottom: 10,
                }}
              >
                the midnight grinder
              </div>
              <div
                className="font-dmsans"
                style={{ fontSize: 10, color: 'rgba(255,255,255,0.2)' }}
              >
                wrrapd.
              </div>
              <div
                className="font-poppins"
                style={{
                  position: 'absolute',
                  bottom: 10,
                  right: 12,
                  fontSize: 9,
                  color: 'rgba(255,255,255,0.12)',
                  background: 'rgba(255,255,255,0.05)',
                  padding: '2px 6px',
                  borderRadius: 20,
                }}
              >
                free
              </div>
            </div>

            <div
              style={{
                background: 'white',
                border: '0.5px solid rgba(0,0,0,0.07)',
                borderRadius: 8,
                padding: 12,
              }}
            >
              {insights.map((row, i) => (
                <div
                  key={row.key}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '5px 0',
                    borderBottom:
                      i < insights.length - 1 ? '0.5px solid rgba(0,0,0,0.05)' : 'none',
                  }}
                >
                  <span
                    className="font-poppins"
                    style={{ fontSize: 11, color: 'rgba(0,0,0,0.35)' }}
                  >
                    {row.key}
                  </span>
                  <span
                    className="font-poppins"
                    style={{ fontSize: 11, fontWeight: 500, color: '#0D0F14' }}
                  >
                    {row.value}
                  </span>
                </div>
              ))}
            </div>

            <button
              className="font-poppins"
              style={{
                width: '100%',
                padding: 10,
                background: '#F5F4F0',
                border: '0.5px solid rgba(0,0,0,0.1)',
                borderRadius: 8,
                fontSize: 12,
                color: 'rgba(0,0,0,0.45)',
                cursor: 'pointer',
                textAlign: 'center',
              }}
            >
              music sync + themes —{' '}
              <strong style={{ color: '#0D0F14' }}>$9.99</strong>
            </button>

            <button
              className="font-poppins"
              style={{
                width: '100%',
                padding: 10,
                background: '#0D0F14',
                border: 'none',
                borderRadius: 8,
                fontSize: 13,
                fontWeight: 500,
                color: 'white',
                cursor: 'pointer',
              }}
            >
              share card
            </button>
          </div>
        </div>

        {/* ── FLOATING BOTTOM NAV ──────────────────────────────────────────── */}
        <div
          style={{
            position: 'fixed',
            bottom: 14,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 100,
          }}
        >
          <div
            style={{
              background: '#0D0F14',
              borderRadius: 40,
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              padding: '7px 8px',
            }}
          >
            {navItems.map(({ id, label, Icon }) => (
              <button
                key={id}
                onClick={() => setActiveNav(id)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 3,
                  cursor: 'pointer',
                  padding: '6px 13px',
                  borderRadius: 30,
                  border: 'none',
                  background: activeNav === id ? 'rgba(255,255,255,0.12)' : 'transparent',
                }}
              >
                <Icon active={activeNav === id} />
                <span
                  className="font-poppins"
                  style={{
                    fontSize: 10,
                    color: activeNav === id ? 'white' : 'rgba(255,255,255,0.3)',
                  }}
                >
                  {label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── SUBJECT PICKER MODAL ─────────────────────────────────────────────── */}
      {sessionState === 'picker' && (
        <div
          onClick={() => setSessionState('home')}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.6)',
            zIndex: 200,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'white',
              borderRadius: 16,
              padding: 28,
              maxWidth: 400,
              width: '90%',
            }}
          >
            <div
              className="font-poppins"
              style={{ fontSize: 18, fontWeight: 500, color: '#0D0F14', marginBottom: 4 }}
            >
              what are you studying?
            </div>
            <div
              className="font-poppins"
              style={{ fontSize: 13, color: 'rgba(0,0,0,0.4)', marginBottom: 20 }}
            >
              pick a subject to begin your session
            </div>

            {subjects.map((s) => (
              <div
                key={s.name}
                onClick={() => startSession(s)}
                className="font-poppins"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '12px 16px',
                  borderRadius: 8,
                  border: '0.5px solid rgba(0,0,0,0.08)',
                  marginBottom: 8,
                  cursor: 'pointer',
                  background: 'white',
                  fontSize: 14,
                  color: '#0D0F14',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = '#F5F4F0')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'white')}
              >
                <div
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    background: s.color,
                    flexShrink: 0,
                  }}
                />
                {s.name}
              </div>
            ))}

            <div style={{ textAlign: 'center', marginTop: 4 }}>
              <button
                onClick={() => setSessionState('home')}
                className="font-poppins"
                style={{
                  fontSize: 13,
                  color: 'rgba(0,0,0,0.4)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 8,
                }}
              >
                cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
