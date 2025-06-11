"use client";

import { ElementData } from "@/types/element";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useState, useEffect, useLayoutEffect } from "react";

const getCategoryColor = (category: string): string => {
  const categoryColors: Record<string, string> = {
    "noble gas": "bg-amber-900/50 hover:bg-amber-800/70 border-amber-700/50",
    "alkali metal": "bg-pink-900/50 hover:bg-pink-800/70 border-pink-700/50",
    "alkaline earth metal": "bg-purple-900/50 hover:bg-purple-800/70 border-purple-700/50",
    "transition metal": "bg-blue-900/50 hover:bg-blue-800/70 border-blue-700/50",
    "post-transition metal": "bg-orange-900/50 hover:bg-orange-800/70 border-orange-700/50",
    "metalloid": "bg-green-900/50 hover:bg-green-800/70 border-green-700/50",
    "nonmetal": "bg-teal-900/50 hover:bg-teal-800/70 border-teal-700/50",
    "polyatomic nonmetal": "bg-teal-900/50 hover:bg-teal-800/70 border-teal-700/50",
    "diatomic nonmetal": "bg-teal-900/50 hover:bg-teal-800/70 border-teal-700/50",
    "halogen": "bg-yellow-900/50 hover:bg-yellow-800/70 border-yellow-700/50",
    "lanthanide": "bg-lime-900/50 hover:bg-lime-800/70 border-lime-700/50",
    "actinide": "bg-red-900/50 hover:bg-red-800/70 border-red-700/50",
    "unknown": "bg-gray-900/50 hover:bg-gray-800/70 border-gray-700/50"
  };

  return categoryColors[category.toLowerCase()] || "bg-gray-900/50 hover:bg-gray-800/70 border-gray-700/50";
};

interface ElementTileProps {
  element: ElementData;
  onElementClick: (element: ElementData) => void;
}

export function ElementTile({ element, onElementClick }: ElementTileProps) {
  const [isMounted, setIsMounted] = useState(false);
  
  // Use useLayoutEffect for critical rendering measurements
  useLayoutEffect(() => {
    setIsMounted(true);
  }, []);

  const handleClick = () => {
    onElementClick(element);
  };

  // Enhanced gradient backgrounds for each category
  const getEnhancedBackground = (category: string): string => {
    const gradientColors: Record<string, string> = {
      "noble gas": "radial-gradient(circle at center, rgba(251, 191, 36, 0.3) 0%, rgba(251, 191, 36, 0.1) 70%)",
      "alkali metal": "radial-gradient(circle at center, rgba(244, 114, 182, 0.3) 0%, rgba(244, 114, 182, 0.1) 70%)",
      "alkaline earth metal": "radial-gradient(circle at center, rgba(168, 85, 247, 0.3) 0%, rgba(168, 85, 247, 0.1) 70%)",
      "transition metal": "radial-gradient(circle at center, rgba(59, 130, 246, 0.3) 0%, rgba(59, 130, 246, 0.1) 70%)",
      "post-transition metal": "radial-gradient(circle at center, rgba(249, 115, 22, 0.3) 0%, rgba(249, 115, 22, 0.1) 70%)",
      "metalloid": "radial-gradient(circle at center, rgba(34, 197, 94, 0.3) 0%, rgba(34, 197, 94, 0.1) 70%)",
      "nonmetal": "radial-gradient(circle at center, rgba(20, 184, 166, 0.3) 0%, rgba(20, 184, 166, 0.1) 70%)",
      "polyatomic nonmetal": "radial-gradient(circle at center, rgba(20, 184, 166, 0.3) 0%, rgba(20, 184, 166, 0.1) 70%)",
      "diatomic nonmetal": "radial-gradient(circle at center, rgba(20, 184, 166, 0.3) 0%, rgba(20, 184, 166, 0.1) 70%)",
      "halogen": "radial-gradient(circle at center, rgba(234, 179, 8, 0.3) 0%, rgba(234, 179, 8, 0.1) 70%)",
      "lanthanide": "radial-gradient(circle at center, rgba(132, 204, 22, 0.3) 0%, rgba(132, 204, 22, 0.1) 70%)",
      "actinide": "radial-gradient(circle at center, rgba(239, 68, 68, 0.3) 0%, rgba(239, 68, 68, 0.1) 70%)",
      "unknown": "radial-gradient(circle at center, rgba(107, 114, 128, 0.3) 0%, rgba(107, 114, 128, 0.1) 70%)"
    };

    return gradientColors[category.toLowerCase()] || gradientColors["unknown"];
  };

  if (!isMounted) {
    // Return static version without animations for SSR
    return (
      <div
        className={cn(
          "relative p-2 rounded-lg border transition-all duration-200 element-tile",
          "cursor-pointer text-white",
          getCategoryColor(element.category)
        )}
        style={{
          gridColumn: element.xpos,
          gridRow: element.ypos,
          background: getEnhancedBackground(element.category),
        }}
        onClick={handleClick}
      >
        <div className="text-xs font-semibold absolute top-1 left-1 opacity-80">
          {element.atomicNumber}
        </div>
        <div className="flex flex-col items-center justify-center h-full">
          <div className="text-2xl font-bold mb-1">
            {element.symbol}
          </div>
          <div className="text-xs font-medium truncate w-full text-center">
            {element.name}
          </div>
          <div className="text-xs opacity-85 mt-1 font-semibold">
            {element.atomicMass.toFixed(2)}
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className={cn(
        "relative p-2 rounded-lg border transition-all duration-200 element-tile",
        "cursor-pointer text-white",
        getCategoryColor(element.category)
      )}
      style={{
        gridColumn: element.xpos,
        gridRow: element.ypos,
        background: getEnhancedBackground(element.category),
        willChange: "transform, box-shadow"
      }}
      initial={{ scale: 1 }}
      whileHover={{ 
        scale: 1.15,
        zIndex: 10,
        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3), 0 0 15px rgba(255, 255, 255, 0.2)',
        transition: { duration: 0.2, ease: "easeOut" }
      }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      layout
    >
      <div className="text-xs font-semibold absolute top-1 left-1 opacity-80">
        {element.atomicNumber}
      </div>
      <div className="flex flex-col items-center justify-center h-full">
        <motion.div 
          className="element-symbol text-2xl font-bold mb-1"
          animate={{
            y: [0, -2, 0],
            transition: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              repeatType: "reverse"
            }
          }}
          style={{ willChange: "transform" }}
        >
          {element.symbol}
        </motion.div>
        <div className="text-xs font-medium truncate w-full text-center">
          {element.name}
        </div>
        <motion.div 
          className="text-xs opacity-85 mt-1 font-semibold"
          initial={{ opacity: 0.8 }}
          animate={{
            opacity: [0.8, 1, 0.8],
            scale: [1, 1.05, 1],
            transition: {
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        >
          {element.atomicMass.toFixed(2)}
        </motion.div>
      </div>
    </motion.div>
  );
}