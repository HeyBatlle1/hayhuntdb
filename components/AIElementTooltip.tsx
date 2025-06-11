"use client";

import React, { useState, useEffect } from 'react';
import { ElementData, PeriodicTableConfig } from '@/types/element';
import { generateResponse } from '@/lib/gemini';
import { cn } from '@/lib/utils';
import { Brain, Loader2, Sparkles } from 'lucide-react';

interface AIElementTooltipProps {
  element: ElementData;
  visible: boolean;
  position: { x: number; y: number };
  config: PeriodicTableConfig;
}

export function AIElementTooltip({ element, visible, position, config }: AIElementTooltipProps) {
  const [aiInsight, setAiInsight] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (visible && !aiInsight && !loading) {
      generateAIInsight();
    }
  }, [visible, element.atomicNumber]);

  const generateAIInsight = async () => {
    setLoading(true);
    setError(false);

    try {
      const prompt = `Provide a brief, fascinating insight about ${element.name} (${element.symbol}) in 2-3 sentences. Focus on what makes this element unique, interesting applications, or surprising facts. Keep it academic but engaging for chemistry students.

Element data:
- Atomic number: ${element.atomicNumber}
- Category: ${element.category}
- Block: ${element.block}
- Applications: ${element.applications.join(', ')}
- Discovery: ${element.discoveredBy} (${element.yearDiscovered})`;

      const response = await generateResponse(prompt);
      
      if (response.error) {
        setError(true);
        setAiInsight('AI insights temporarily unavailable.');
      } else {
        setAiInsight(response.text);
      }
    } catch (err) {
      console.error('Error generating AI insight:', err);
      setError(true);
      setAiInsight('Unable to generate AI insight at this time.');
    } finally {
      setLoading(false);
    }
  };

  if (!visible) return null;

  return (
    <div
      className={cn(
        "fixed z-50 max-w-sm p-4 rounded-lg shadow-xl border-2 transition-all duration-200",
        "bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600",
        "text-gray-900 dark:text-gray-100"
      )}
      style={{
        left: position.x - 150, // Center the tooltip
        top: position.y - 10,
        transform: 'translateY(-100%)',
        boxShadow: config.theme === 'dark' 
          ? '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.3)' 
          : '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      }}
    >
      {/* Header */}
      <div className="flex items-center space-x-2 mb-3">
        <div className="flex items-center space-x-1">
          <Brain className="w-4 h-4 gradient-brain" />
          <Sparkles className="w-3 h-3 gradient-sparkles" />
        </div>
        <div>
          <div className="font-display font-bold text-lg text-gray-900 dark:text-white">
            {element.symbol}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">
            AI Insight
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-3">
        {/* Quick Facts */}
        <div className="text-xs space-y-1 p-3 bg-gray-100 dark:bg-gray-800 rounded-md border dark:border-gray-700">
          <div className="text-gray-800 dark:text-gray-200 font-light">
            <strong className="text-gray-900 dark:text-white font-serif">Category:</strong> {element.category}
          </div>
          <div className="text-gray-800 dark:text-gray-200 font-light">
            <strong className="text-gray-900 dark:text-white font-serif">Block:</strong> {element.block}-block
          </div>
          <div className="text-gray-800 dark:text-gray-200 font-light">
            <strong className="text-gray-900 dark:text-white font-serif">Period:</strong> {element.period}, <strong className="text-gray-900 dark:text-white font-serif">Group:</strong> {element.group || 'f-block'}
          </div>
        </div>

        {/* AI Insight */}
        <div className="min-h-[60px]">
          {loading ? (
            <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
              <Loader2 className="w-4 h-4 animate-spin gradient-refresh" />
              <span className="text-sm font-light">Generating insight...</span>
            </div>
          ) : error ? (
            <div className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-2 rounded font-light">
              Unable to generate AI insight
            </div>
          ) : (
            <div className="text-sm leading-relaxed text-gray-800 dark:text-gray-200 font-light">
              {aiInsight}
            </div>
          )}
        </div>

        {/* Applications highlight */}
        {element.applications.length > 0 && (
          <div className="text-xs p-2 bg-green-50 dark:bg-green-900/20 rounded border dark:border-green-800">
            <strong className="text-green-700 dark:text-green-300 font-serif">Key uses:</strong>{' '}
            <span className="text-green-600 dark:text-green-200 font-light">
              {element.applications.slice(0, 2).join(', ')}
              {element.applications.length > 2 && '...'}
            </span>
          </div>
        )}

        {/* Safety note */}
        {element.hazards.length > 0 && (
          <div className="text-xs p-2 bg-red-50 dark:bg-red-900/20 rounded border dark:border-red-800">
            <strong className="text-red-700 dark:text-red-300 font-serif">⚠️ Hazards:</strong>{' '}
            <span className="text-red-600 dark:text-red-200 font-light">{element.hazards[0]}</span>
          </div>
        )}
      </div>

      {/* Tooltip arrow */}
      <div 
        className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0"
        style={{
          borderLeft: '8px solid transparent',
          borderRight: '8px solid transparent',
          borderTop: `8px solid ${config.theme === 'dark' ? '#1f2937' : '#d1d5db'}`
        }}
      />
    </div>
  );
}