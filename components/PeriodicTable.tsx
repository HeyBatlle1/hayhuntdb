"use client";

import React, { useCallback } from 'react';
import { useEffect, useState, useLayoutEffect, useRef } from "react";
import { ElementData } from "@/types/element";
import { ElementTile } from "./ElementTile";
import { Loader2 } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { getElements } from "@/lib/elements";

interface PeriodicTableProps {
  onElementSelect: (element: ElementData) => void;
}

export function PeriodicTable({ onElementSelect }: PeriodicTableProps) {
  const [elements, setElements] = useState<ElementData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Use reduced motion to improve performance and respect user preferences
  const prefersReducedMotion = useReducedMotion();

  // Use layout effect for critical measurements
  useLayoutEffect(() => {
    setIsMounted(true);
  }, []);
  
  // Optimize animations for performance
  const animationConfig = prefersReducedMotion 
    ? { duration: 0.2, delay: 0 } 
    : { duration: 0.6, staggerChildren: 0.05 };

  useEffect(() => {
    async function fetchElements() {
      try {
        const data = await getElements();
        setElements(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch elements");
      } finally {
        setLoading(false);
      }
    }

    fetchElements();
  }, []);

  // Memoize the handleElementClick function to avoid unnecessary rerenders
  const handleElementClick = useCallback((element: ElementData) => {
    onElementSelect(element);
  }, [onElementSelect]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[500px] bg-card/30 backdrop-blur-sm rounded-lg p-8 border-2 border-blue-900/30">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-[500px] text-destructive bg-card/30 backdrop-blur-sm rounded-lg p-8 border-2 border-red-900/30">
        <p>Error: {error}</p>
      </div>
    );
  }

  // Group elements by their categories
  const mainGroupElements = elements.filter(e => !['lanthanide', 'actinide'].includes(e.category));
  const lanthanides = elements.filter(e => e.category === 'lanthanide');
  const actinides = elements.filter(e => e.category === 'actinide');

  // Add period and group labels
  const periods = Array.from({ length: 7 }, (_, i) => i + 1);
  const groups = Array.from({ length: 18 }, (_, i) => i + 1);

  // Get unique categories for the legend
  const uniqueCategories = Array.from(new Set(elements.map(e => e.category)))
    .filter(Boolean)
    .sort();

  // Map categories to colors for the legend
  const categoryColorMap = [
    { name: "Alkali Metal", color: "bg-pink-600/50 border-2 border-pink-700/70" },
    { name: "Alkaline Earth Metal", color: "bg-purple-600/50 border-2 border-purple-700/70" },
    { name: "Transition Metal", color: "bg-blue-600/50 border-2 border-blue-700/70" },
    { name: "Post-Transition Metal", color: "bg-orange-600/50 border-2 border-orange-700/70" },
    { name: "Metalloid", color: "bg-green-600/50 border-2 border-green-700/70" },
    { name: "Nonmetal", color: "bg-teal-600/50 border-2 border-teal-700/70" },
    { name: "Diatomic Nonmetal", color: "bg-teal-600/50 border-2 border-teal-700/70" },
    { name: "Polyatomic Nonmetal", color: "bg-teal-600/50 border-2 border-teal-700/70" },
    { name: "Halogen", color: "bg-yellow-600/50 border-2 border-yellow-700/70" },
    { name: "Noble Gas", color: "bg-amber-600/50 border-2 border-amber-700/70" },
    { name: "Lanthanide", color: "bg-lime-600/50 border-2 border-lime-700/70" },
    { name: "Actinide", color: "bg-red-600/50 border-2 border-red-700/70" },
    { name: "Unknown", color: "bg-gray-600/50 border-2 border-gray-700/70" }
  ];

  if (!isMounted) {
    return (
      <div className="space-y-8">
        {/* Main periodic table */}
        <div className="relative bg-card/30 backdrop-blur-sm rounded-lg p-8 border-2 border-blue-900/30 shadow-lg">
          <div className="grid grid-cols-19 gap-1"> {/* Added one column for period numbers */}
            {/* Period numbers */}
            <div className="col-start-1 row-start-1"></div> {/* Empty cell for top-left corner */}
            {groups.map(group => (
              <div key={`group-${group}`} className="text-center text-sm font-medium text-blue-400">
                {group}
              </div>
            ))}
            
            {periods.map(period => (
              <React.Fragment key={`period-${period}`}>
                <div className="text-center text-sm font-medium text-blue-400 flex items-center justify-center">
                  {period}
                </div>
                {mainGroupElements
                  .filter(e => e.ypos === period)
                  .map(element => (
                    <ElementTile
                      key={element.atomicNumber}
                      element={element}
                      onElementClick={handleElementClick}
                    />
                  ))}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Lanthanides and Actinides */}
        <div className="grid gap-4">
          <div className="bg-card/30 backdrop-blur-sm rounded-lg p-4 border-2 border-lime-900/30 shadow-md">
            <div className="text-sm font-medium text-blue-400 mb-2 pl-4">Lanthanides</div>
            <div className="grid grid-cols-15 gap-1">
              {lanthanides.map(element => (
                <ElementTile
                  key={element.atomicNumber}
                  element={element}
                  onElementClick={handleElementClick}
                />
              ))}
            </div>
          </div>
          
          <div className="bg-card/30 backdrop-blur-sm rounded-lg p-4 border-2 border-red-900/30 shadow-md">
            <div className="text-sm font-medium text-blue-400 mb-2 pl-4">Actinides</div>
            <div className="grid grid-cols-15 gap-1">
              {actinides.map(element => (
                <ElementTile
                  key={element.atomicNumber}
                  element={element}
                  onElementClick={handleElementClick}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="bg-card/30 backdrop-blur-sm rounded-lg p-4 border-2 border-blue-900/30 shadow-md">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {categoryColorMap.map(category => (
              <div key={category.name} className="flex items-center gap-2">
                <div className={`w-4 h-4 rounded ${category.color}`}></div>
                <span className="text-xs text-muted-foreground">{category.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
      style={{ willChange: "transform, opacity" }}
    >
      {/* Main periodic table */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative bg-card/30 backdrop-blur-sm rounded-lg p-8 border-2 border-blue-900/30 shadow-lg"
        layout
      >
        <div className="grid grid-cols-19 gap-1"> {/* Added one column for period numbers */}
          {/* Period numbers */}
          <div className="col-start-1 row-start-1"></div> {/* Empty cell for top-left corner */}
          {groups.map(group => (
            <motion.div
              key={`group-${group}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: animationConfig.duration,
                delay: prefersReducedMotion ? 0 : group * 0.01 
              }}
              className="text-center text-sm font-medium text-blue-400"
              style={{ willChange: "transform, opacity" }}
            >
              {group}
            </motion.div>
          ))}
          
          {periods.map(period => (
            <React.Fragment key={`period-${period}`}>
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ 
                  duration: animationConfig.duration,
                  delay: prefersReducedMotion ? 0 : period * 0.01 
                }}
                className="text-center text-sm font-medium text-blue-400 flex items-center justify-center"
                style={{ willChange: "transform, opacity" }}
              >
                {period}
              </motion.div>
              {mainGroupElements
                .filter(e => e.ypos === period)
                .map((element) => (
                  <motion.div
                    key={element.atomicNumber}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ 
                      duration: 0.3,
                      delay: prefersReducedMotion ? 0 : 0.1 + ((element.xpos ?? 0) + (element.ypos ?? 0)) * 0.005
                    }}
                    style={{ willChange: "transform, opacity" }}
                  >
                    <ElementTile
                      element={element}
                      onElementClick={handleElementClick}
                    />
                  </motion.div>
                ))}
            </React.Fragment>
          ))}
        </div>
      </motion.div>

      {/* Lanthanides and Actinides */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid gap-4"
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-card/30 backdrop-blur-sm rounded-lg p-4 border-2 border-lime-900/30 shadow-md"
          style={{ willChange: "transform, opacity" }}
        >
          <div className="text-sm font-medium text-blue-400 mb-2 pl-4">Lanthanides</div>
          <div className="grid grid-cols-15 gap-1">
            {lanthanides.map((element, index) => (
              <motion.div
                key={element.atomicNumber}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 0.3,
                  delay: prefersReducedMotion ? 0 : 0.4 + index * 0.01 
                }}
                style={{ willChange: "transform, opacity" }}
              >
                <ElementTile
                  element={element}
                  onElementClick={handleElementClick}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-card/30 backdrop-blur-sm rounded-lg p-4 border-2 border-red-900/30 shadow-md"
          style={{ willChange: "transform, opacity" }}
        >
          <div className="text-sm font-medium text-blue-400 mb-2 pl-4">Actinides</div>
          <div className="grid grid-cols-15 gap-1">
            {actinides.map((element, index) => (
              <motion.div
                key={element.atomicNumber}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 0.3,
                  delay: prefersReducedMotion ? 0 : 0.5 + index * 0.01 
                }}
                style={{ willChange: "transform, opacity" }}
              >
                <ElementTile
                  element={element}
                  onElementClick={handleElementClick}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Legend */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="bg-card/30 backdrop-blur-sm rounded-lg p-4 border-2 border-blue-900/30 shadow-md"
        style={{ willChange: "opacity" }}
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categoryColorMap.map((category, index) => (
            <motion.div 
              key={category.name} 
              className="flex items-center gap-2"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.3,
                delay: prefersReducedMotion ? 0 : 0.7 + index * 0.03 
              }}
            >
              <div className={`w-4 h-4 rounded ${category.color}`}></div>
              <span className="text-xs text-muted-foreground">{category.name}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}