'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export type Social = {
  name: string;
  image: string;
  href?: string;
  iconSize?: string;
  tilt?: number;
};

interface AnimatedSocialLinksProps extends React.HTMLAttributes<HTMLDivElement> {
  socials: Social[];
}

// ─── NEW: Logo-only social links ──────────────────────────────────────────────
// Hovered icon pops up & scales; others blur. Cursor hidden on hover,
// replaced by a small pill tag (icon + name) that follows the mouse.
export const LogoSocialLinks = ({ socials, className }: AnimatedSocialLinksProps) => {
  const [hovered, setHovered] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const hoveredSocial = socials.find(s => s.name === hovered) ?? null;

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <div
      className={`flex items-center justify-center gap-8 ${className ?? ''}`}
      onMouseMove={handleMouseMove}
    >
      {socials.map((social, index) => {
        const isHovered = hovered === social.name;
        const isBlurred = hovered !== null && !isHovered;

        const img = (
          <motion.img
            src={social.image}
            alt={social.name}
            className={social.iconSize ?? 'size-8'}
            animate={{
              scale: isHovered ? 1.3 : 1,
              y: isHovered ? -10 : 0,
              opacity: isBlurred ? 0.2 : 1,
              filter: isBlurred ? 'blur(3px)' : 'blur(0px)',
            }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          />
        );

        const sharedProps = {
          onMouseEnter: () => setHovered(social.name),
          onMouseLeave: () => setHovered(null),
          // Hide native cursor when hovering so the pill replaces it
          style: { cursor: isHovered ? 'none' : 'pointer' } as React.CSSProperties,
        };

        return social.href ? (
          <a key={index} href={social.href} target="_blank" rel="noopener noreferrer" {...sharedProps}>
            {img}
          </a>
        ) : (
          <div key={index} {...sharedProps}>{img}</div>
        );
      })}

      {/* Cursor-following pill — replaces the native cursor while hovering a social */}
      <AnimatePresence>
        {hoveredSocial && (
          <motion.div
            className="fixed z-[100] px-2.5 py-1 rounded-full bg-white/90 shadow-md border border-gray-100 pointer-events-none select-none"
            style={{ left: mousePos.x + 14, top: mousePos.y + 14 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.15 }}
          >
            <span className="text-[11px] font-medium text-gray-700 font-poppins whitespace-nowrap">
              {hoveredSocial.name}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── OLD: Animated text + popup icon social links (commented out) ─────────────
/*
const AnimatedSocialLinks = React.forwardRef<HTMLDivElement, AnimatedSocialLinksProps>(
  ({ socials, className, ...props }, ref) => {
    const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);
    const [rotation, setRotation] = useState<number>(0);
    const [cliked, setCliked] = useState<boolean>(false);

    const animation = {
      scale: cliked ? [1, 1.3, 1] : 1,
      transition: { duration: 0.3 },
    };

    useEffect(() => {
      const handleClick = () => {
        setCliked(true);
        setTimeout(() => setCliked(false), 200);
      };
      window.addEventListener('click', handleClick);
      return () => window.removeEventListener('click', handleClick);
    }, [cliked]);

    const renderItem = (social: Social, index: number) => {
      const sharedClass = `relative cursor-pointer px-3 sm:px-5 py-2 transition-opacity duration-200 ${
        hoveredSocial && hoveredSocial !== social.name ? 'opacity-50' : 'opacity-100'
      }`;
      const sharedEvents = {
        onMouseEnter: () => { setHoveredSocial(social.name); setRotation(Math.random() * 20 - 10); },
        onMouseLeave: () => setHoveredSocial(null),
        onClick: () => setCliked(true),
      };
      const inner = (
        <>
          <span className="block text-lg text-current">{social.name}</span>
          <AnimatePresence>
            {hoveredSocial === social.name && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 flex h-full w-full items-center justify-center"
                animate={animation}
              >
                <motion.img
                  key={social.name}
                  src={social.image}
                  alt={social.name}
                  className={social.iconSize ?? 'size-16'}
                  initial={{ y: -40, rotate: social.tilt ?? rotation, opacity: 0, filter: 'blur(2px)' }}
                  animate={{ y: -50, opacity: 1, filter: 'blur(0px)', rotate: social.tilt ?? rotation }}
                  exit={{ y: -40, opacity: 0, filter: 'blur(2px)' }}
                  transition={{ duration: 0.2 }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </>
      );

      return social.href ? (
        <a key={index} href={social.href} target="_blank" rel="noopener noreferrer" className={sharedClass} {...sharedEvents}>
          {inner}
        </a>
      ) : (
        <div key={index} className={sharedClass} {...sharedEvents}>
          {inner}
        </div>
      );
    };

    return (
      <div ref={ref} className={`flex flex-wrap items-center justify-center gap-0 ${className ?? ''}`} {...props}>
        {socials.map(renderItem)}
      </div>
    );
  }
);

AnimatedSocialLinks.displayName = 'AnimatedSocialLinks';

export default AnimatedSocialLinks;
*/
