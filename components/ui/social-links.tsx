'use client';
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export type Social = {
  name: string;
  image: string;
  href?: string;
  // Optional overrides for icon size (Tailwind size class) and a fixed tilt angle
  iconSize?: string;
  tilt?: number;
};

interface AnimatedSocialLinksProps extends React.HTMLAttributes<HTMLDivElement> {
  socials: Social[];
}

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

    // Shared content for each social item (icon popup + label)
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

      // Render as <a> when href is provided, otherwise a plain <div>
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
      // flex-wrap so items reflow on narrow screens instead of overflowing
      <div ref={ref} className={`flex flex-wrap items-center justify-center gap-0 ${className ?? ''}`} {...props}>
        {socials.map(renderItem)}
      </div>
    );
  }
);

AnimatedSocialLinks.displayName = 'AnimatedSocialLinks';

export default AnimatedSocialLinks;
