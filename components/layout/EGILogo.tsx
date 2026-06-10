"use client";

import React from 'react';

interface EGILogoProps {
  className?: string;
  iconOnly?: boolean;
  size?: number; // Height or box size in pixels
}

export function EGILogo({ className = '', iconOnly = false, size = 48 }: EGILogoProps) {
  if (iconOnly) {
    // Crop only the square EGI gradient box from public/logo.jpeg
    // Image actual size is 1536 x 1024. Box is x=[599, 935], y=[214, 550] (336x336 pixels)
    return (
      <div
        className={`relative overflow-hidden rounded-xl select-none flex-shrink-0 ${className}`}
        style={{
          width: `${size}px`,
          height: `${size}px`,
        }}
      >
        <img
          src="/logo.jpeg"
          alt="EvoGlobalInsight Icon"
          style={{
            position: 'absolute',
            width: '457.14%',   // 1536 / 336 * 100
            height: '304.76%',  // 1024 / 336 * 100
            left: '-178.27%',   // 599 / 336 * 100
            top: '-63.69%',     // 214 / 336 * 100
            maxWidth: 'none',
            mixBlendMode: 'multiply',
          }}
          className="transition-transform duration-300 group-hover:scale-102"
        />
      </div>
    );
  }

  // Display the full vertical stacked logo from public/logo.jpeg
  return (
    <div className={`flex items-center select-none ${className}`}>
      <img
        src="/logo.jpeg"
        alt="EvoGlobalInsight Logo"
        style={{
          height: `${size}px`,
          width: 'auto',
          mixBlendMode: 'multiply',
        }}
        className="transition-transform duration-300 group-hover:scale-102 flex-shrink-0"
      />
    </div>
  );
}
