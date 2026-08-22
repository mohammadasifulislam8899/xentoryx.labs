"use client";

import React, { useState, useEffect, useRef } from "react";

interface MagnetProps {
  children: React.ReactNode;
  padding?: number;
  disabled?: boolean;
  strength?: number;
  activeTransition?: string;
  inactiveTransition?: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function Magnet({
  children,
  padding = 100,
  disabled = false,
  strength = 15,
  activeTransition = "transform 0.2s ease-out",
  inactiveTransition = "transform 0.5s ease-in-out",
  className = "",
  style = {},
}: MagnetProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const magnetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Detect touch device or pointer: coarse to disable mouse magnetic effect
    const isTouch =
      typeof window !== "undefined" &&
      ("ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia("(pointer: coarse)").matches);
    setIsTouchDevice(isTouch);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || isTouchDevice || !magnetRef.current) return;

    const { left, top, width, height } = magnetRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    if (
      Math.abs(distanceX) < width / 2 + padding &&
      Math.abs(distanceY) < height / 2 + padding
    ) {
      setPosition({
        x: distanceX / strength,
        y: distanceY / strength,
      });
    } else {
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const isMoved = position.x !== 0 || position.y !== 0;

  return (
    <div
      ref={magnetRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{
        ...style,
        transform:
          !disabled && !isTouchDevice && isMoved
            ? `translate3d(${position.x}px, ${position.y}px, 0)`
            : "translate3d(0, 0, 0)",
        transition: isMoved ? activeTransition : inactiveTransition,
        willChange: isTouchDevice ? "auto" : "transform",
      }}
    >
      {children}
    </div>
  );
}
