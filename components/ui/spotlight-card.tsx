"use client";

import React, { useRef, useState } from "react";

interface GlowCardProps {
  children: React.ReactNode;
  glowColor?: "purple" | "blue" | "green" | "orange";
  className?: string;
  customSize?: boolean;
  style?: React.CSSProperties;
  borderOnly?: boolean;
}

const glowColors = {
  purple: "rgba(123, 104, 238, 0.4)",
  blue: "rgba(59, 130, 246, 0.4)",
  green: "rgba(34, 197, 94, 0.4)",
  orange: "rgba(249, 115, 22, 0.4)",
};

export function GlowCard({
  children,
  glowColor = "purple",
  className = "",
  customSize = false,
  style,
  borderOnly = false,
}: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const color = glowColors[glowColor];

  return (
    <div
      ref={cardRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: "relative",
        overflow: borderOnly ? "visible" : "hidden",
        borderRadius: "inherit",
        ...style,
      }}
    >
      {isHovered && (
        <div
          style={{
            position: "absolute",
            pointerEvents: "none",
            zIndex: borderOnly ? -1 : 10,
            borderRadius: borderOnly ? "inherit" : "50%",
            width: borderOnly ? "calc(100% + 80px)" : 300,
            height: borderOnly ? "calc(100% + 80px)" : 300,
            left: borderOnly ? -40 : mousePosition.x - 150,
            top: borderOnly ? -40 : mousePosition.y - 150,
            background: borderOnly
              ? `radial-gradient(ellipse at ${mousePosition.x}px ${mousePosition.y}px, ${color} 0%, transparent 65%)`
              : `radial-gradient(circle, ${color} 0%, transparent 70%)`,
            transition: "opacity 0.2s ease",
          }}
        />
      )}
      {children}
    </div>
  );
}
