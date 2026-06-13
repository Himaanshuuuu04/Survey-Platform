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
        className={`relative overflow-hidden object-cover rounded-full select-none flex-shrink-0 ${className}`}
        style={{
          width: `${size}px`,
          height: `${size}px`,
        }}
      >
        <img
          src="/logo.webp"
          alt="EvoGlobalInsight Icon"
         
          className="transition-transform duration-300 group-hover:scale-102 object-cover h-full w-full"
        />
      </div>
    );
  }

  // Display the full vertical stacked logo from public/logo.jpeg
  return (
    <div className={`flex items-center select-none overflow-hidden rounded-full ${className}`}>
      <img
        src="/logo.webp"
        alt="EvoGlobalInsight Logo"
        style={{
          height: `${size}px`,
          width: `${size}px`,
          mixBlendMode: 'multiply',
        }}
        className="transition-transform duration-300 group-hover:scale-102 flex-shrink-0 object-cover"
      />
    </div>
  );
}
