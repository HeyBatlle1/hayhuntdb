"use client";

import React, { useState } from 'react';
import { ElementData, PeriodicTableConfig } from '@/types/element';
import { AIElementTooltip } from './AIElementTooltip';
import { cn } from '@/lib/utils';

interface ElementTileAcademicProps {
  element: ElementData;
  config: PeriodicTableConfig;
  color: string;
  isSelected: boolean;
  isCompared: boolean;
  onClick: () => void;
  onCompare: () => void;
}

export function ElementTileAcademic({
  element,
  config,
  color,
  isSelected,
  isCompared,
  onClick,
  onCompare
}: ElementTileAcademicProps) {
  const [showAITooltip, setShowAITooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const formatAtomicMass = (mass: number, uncertainty?: number): string => {
    if (config.showUncertainties && uncertainty) {
      return `${mass.toFixed(3)}(${Math.round(uncertainty * 1000)})`;
    }
    return mass.toFixed(3);
  };

  const handleMouseEnter = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltipPosition({
      x: rect.left + rect.width / 2,
      y: rect.top
    });
    setShowAITooltip(true);
  };

  const handleMouseLeave = () => {
    setShowAITooltip(false);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick();
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onCompare();
  };

  return (
    <>
      <div
        className={cn(
          "aspect-square border-2 rounded cursor-pointer transition-all duration-300 hover:scale-105",
          "flex flex-col justify-between p-1 text-xs min-h-[60px] relative",
          "hover:shadow-lg active:scale-95 hover:z-10 group",
          isSelected && "ring-2 ring-blue-500 ring-offset-2 z-20",
          isCompared && "ring-2 ring-green-500 ring-offset-2 z-20",
          config.theme === 'dark' ? 'border-gray-600 hover:border-gray-400' : 'border-gray-300 hover:border-gray-500'
        )}
        style={{ 
          backgroundColor: color,
          color: isLightColor(color) ? '#000000' : '#ffffff'
        }}
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        title={`${element.name} (${element.symbol}) - Atomic number: ${element.atomicNumber}`}
      >
        {/* Atomic number */}
        <div className="text-[10px] font-bold text-left leading-none font-mono">
          {element.atomicNumber}
        </div>

        {/* Element symbol - main content */}
        <div className="text-center flex-1 flex items-center justify-center">
          <span className="text-lg font-display font-bold leading-none element-symbol group-hover:scale-110 transition-transform duration-200">
            {element.symbol}
          </span>
        </div>

        {/* Element name */}
        <div className="text-[9px] text-center leading-tight truncate font-medium">
          {element.name}
        </div>

        {/* Atomic mass */}
        <div className="text-[8px] text-center leading-tight font-mono">
          {formatAtomicMass(element.atomicMass, element.atomicMassUncertainty)}
        </div>

        {/* Additional info based on config */}
        {config.showElectronConfig !== 'none' && element.electronConfiguration && (
          <div className="text-[7px] text-center leading-tight truncate font-mono">
            {config.showElectronConfig === 'noble' && element.electronConfigurationNoble
              ? element.electronConfigurationNoble 
              : element.electronConfiguration}
          </div>
        )}

        {/* Visual indicators */}
        <div className="flex justify-between items-center mt-1">
          {/* Phase indicator */}
          <div className={cn(
            "w-1 h-1 rounded-full",
            element.phase === 'solid' && "bg-gray-800",
            element.phase === 'liquid' && "bg-blue-600", 
            element.phase === 'gas' && "bg-red-600",
            element.phase === 'unknown' && "bg-gray-400"
          )} />

          {/* Radioactive indicator */}
          {element.isotopes.length > 0 && element.isotopes.every(iso => !iso.isStable) && (
            <div className="text-[8px] font-bold" style={{ color: isLightColor(color) ? '#dc2626' : '#fca5a5' }}>
              ☢
            </div>
          )}

          {/* AI indicator */}
          <div className="w-1 h-1 bg-blue-400 rounded-full opacity-60 group-hover:opacity-100 transition-opacity" />
        </div>

        {/* Elegant hover effect overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded pointer-events-none" />
      </div>

      {/* AI-powered tooltip */}
      <AIElementTooltip
        element={element}
        visible={showAITooltip}
        position={tooltipPosition}
        config={config}
      />
    </>
  );
}

// Helper function to determine if a color is light or dark
function isLightColor(color: string): boolean {
  // Convert hex to RGB
  let r, g, b;
  
  if (color.startsWith('#')) {
    const hex = color.slice(1);
    r = parseInt(hex.substr(0, 2), 16);
    g = parseInt(hex.substr(2, 2), 16); 
    b = parseInt(hex.substr(4, 2), 16);
  } else if (color.startsWith('hsl')) {
    // For HSL colors, we'll assume they're generally readable
    return false;
  } else {
    // Default case
    return false;
  }
  
  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5;
}