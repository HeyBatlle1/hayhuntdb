"use client";

import React, { useState, useCallback, useMemo } from 'react';
import { ElementData, PeriodicTableConfig } from '@/types/element';
import { IUPAC_ELEMENTS, ELEMENT_CATEGORIES, BLOCK_COLORS, STATE_COLORS, getLanthanides, getActinides } from '@/lib/iupac-data';
import { ElementTileAcademic } from './ElementTileAcademic';
import { ElementDetailsPanel } from './ElementDetailsPanel';
import { PeriodicTableControls } from './PeriodicTableControls';
import { PeriodicTrendsVisualization } from './PeriodicTrendsVisualization';
import { ElementComparison } from './ElementComparison';
import { AIPeriodicInsights } from './AIPeriodicInsights';
import { cn } from '@/lib/utils';

interface AcademicPeriodicTableProps {
  onElementSelect?: (element: ElementData) => void;
}

export function AcademicPeriodicTable({ onElementSelect }: AcademicPeriodicTableProps) {
  const [selectedElement, setSelectedElement] = useState<ElementData | null>(null);
  const [comparisonElements, setComparisonElements] = useState<ElementData[]>([]);
  const [config, setConfig] = useState<PeriodicTableConfig>({
    colorScheme: 'category',
    showUncertainties: false,
    temperatureUnit: 'K',
    showElectronConfig: 'none',
    theme: 'light'
  });
  const [showTrends, setShowTrends] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [showAIInsights, setShowAIInsights] = useState(true);

  const handleElementClick = useCallback((element: ElementData) => {
    setSelectedElement(element);
    onElementSelect?.(element);
  }, [onElementSelect]);

  const handleElementCompare = useCallback((element: ElementData) => {
    setComparisonElements(prev => {
      if (prev.find(el => el.atomicNumber === element.atomicNumber)) {
        return prev.filter(el => el.atomicNumber !== element.atomicNumber);
      }
      if (prev.length >= 3) {
        return [prev[1], prev[2], element];
      }
      return [...prev, element];
    });
  }, []);

  const getElementColor = useCallback((element: ElementData): string => {
    switch (config.colorScheme) {
      case 'category':
        return ELEMENT_CATEGORIES[element.category] || '#BDC3C7';
      case 'block':
        return BLOCK_COLORS[element.block] || '#BDC3C7';
      case 'state':
        return STATE_COLORS[element.phase] || '#BDC3C7';
      case 'electronegativity':
        if (!element.electronegativity) return '#BDC3C7';
        const hue = (element.electronegativity / 4.0) * 240;
        return `hsl(${240 - hue}, 70%, 60%)`;
      case 'atomic-radius':
        if (!element.atomicRadius) return '#BDC3C7';
        const radiusHue = (element.atomicRadius / 300) * 240;
        return `hsl(${radiusHue}, 70%, 60%)`;
      default:
        return '#BDC3C7';
    }
  }, [config.colorScheme]);

  const mainTableElements = useMemo(() => {
    return IUPAC_ELEMENTS.filter(el => 
      !(el.atomicNumber >= 57 && el.atomicNumber <= 71) && // Exclude lanthanides
      !(el.atomicNumber >= 89 && el.atomicNumber <= 103)   // Exclude actinides
    );
  }, []);

  const lanthanides = useMemo(() => getLanthanides(), []);
  const actinides = useMemo(() => getActinides(), []);

  console.log(`Loaded ${IUPAC_ELEMENTS.length} elements total`);
  console.log(`Main table elements: ${mainTableElements.length}`);
  console.log(`Lanthanides: ${lanthanides.length}`);
  console.log(`Actinides: ${actinides.length}`);

  return (
    <div className={cn(
      "w-full max-w-[1600px] mx-auto p-4 space-y-6",
      config.theme === 'dark' ? 'dark bg-gray-900 text-white' : 'bg-white text-gray-900'
    )}>
      {/* Controls */}
      <PeriodicTableControls
        config={config}
        onConfigChange={setConfig}
        onShowTrends={() => setShowTrends(!showTrends)}
        onShowComparison={() => setShowComparison(!showComparison)}
        trendsVisible={showTrends}
        comparisonVisible={showComparison}
      />

      {/* AI Insights Panel */}
      {showAIInsights && (
        <AIPeriodicInsights
          selectedElement={selectedElement}
          comparisonElements={comparisonElements}
          onClose={() => setShowAIInsights(false)}
        />
      )}

      {/* Trends Visualization */}
      {showTrends && (
        <PeriodicTrendsVisualization
          elements={IUPAC_ELEMENTS}
          selectedProperty="electronegativity"
        />
      )}

      {/* Main Periodic Table */}
      <div className="space-y-4 overflow-x-auto">
        {/* Group numbers header */}
        <div className="grid grid-cols-19 gap-1 min-w-[1200px]">
          <div></div> {/* Empty cell for period column */}
          {Array.from({ length: 18 }, (_, i) => (
            <div key={i} className="text-center text-xs font-semibold text-gray-600 dark:text-gray-400 py-1">
              {i + 1}
            </div>
          ))}
        </div>

        {/* Main table grid with period numbers */}
        <div className="grid grid-cols-19 gap-1 auto-rows-fr min-w-[1200px]">
          {Array.from({ length: 7 }, (_, periodIndex) => {
            const periodNumber = periodIndex + 1;
            
            return (
              <React.Fragment key={periodNumber}>
                {/* Period number */}
                <div className="flex items-center justify-center text-xs font-semibold text-gray-600 dark:text-gray-400 min-h-[60px]">
                  {periodNumber}
                </div>
                
                {/* Elements in this period */}
                {Array.from({ length: 18 }, (_, groupIndex) => {
                  const groupNumber = groupIndex + 1;
                  
                  // Find element at this position
                  const element = mainTableElements.find(el => 
                    el.xpos === groupNumber && el.ypos === periodNumber
                  );
                  
                  if (!element) {
                    // Special placeholders for lanthanide/actinide series
                    if (periodNumber === 6 && groupNumber === 3) {
                      return (
                        <div 
                          key={`${periodNumber}-${groupNumber}`} 
                          className="aspect-square border border-dashed border-gray-400 dark:border-gray-600 rounded flex items-center justify-center text-xs bg-gray-100 dark:bg-gray-800 min-h-[60px] cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
                          onClick={() => {
                            // Show lanthanides section
                            document.getElementById('lanthanides-section')?.scrollIntoView({ behavior: 'smooth' });
                          }}
                        >
                          <span className="text-center">
                            <div className="font-bold">57-71</div>
                            <div className="text-[8px]">La-Lu</div>
                          </span>
                        </div>
                      );
                    }
                    if (periodNumber === 7 && groupNumber === 3) {
                      return (
                        <div 
                          key={`${periodNumber}-${groupNumber}`} 
                          className="aspect-square border border-dashed border-gray-400 dark:border-gray-600 rounded flex items-center justify-center text-xs bg-gray-100 dark:bg-gray-800 min-h-[60px] cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
                          onClick={() => {
                            // Show actinides section
                            document.getElementById('actinides-section')?.scrollIntoView({ behavior: 'smooth' });
                          }}
                        >
                          <span className="text-center">
                            <div className="font-bold">89-103</div>
                            <div className="text-[8px]">Ac-Lr</div>
                          </span>
                        </div>
                      );
                    }
                    return <div key={`${periodNumber}-${groupNumber}`} className="min-h-[60px]" />;
                  }
                  
                  return (
                    <ElementTileAcademic
                      key={element.atomicNumber}
                      element={element}
                      config={config}
                      color={getElementColor(element)}
                      isSelected={selectedElement?.atomicNumber === element.atomicNumber}
                      isCompared={comparisonElements.some(el => el.atomicNumber === element.atomicNumber)}
                      onClick={() => handleElementClick(element)}
                      onCompare={() => handleElementCompare(element)}
                    />
                  );
                })}
              </React.Fragment>
            );
          })}
        </div>

        {/* Lanthanides */}
        <div id="lanthanides-section" className="mt-8 space-y-2">
          <div className="flex items-center space-x-2">
            <h3 className="text-lg font-serif font-semibold">Lanthanides</h3>
            <div className="h-px bg-gray-400 dark:bg-gray-600 flex-1" />
            <span className="text-sm text-gray-500">Period 6 (57-71)</span>
          </div>
          <div className="grid grid-cols-15 gap-1 min-w-[900px]">
            {lanthanides.map((element, index) => (
              <ElementTileAcademic
                key={element.atomicNumber}
                element={element}
                config={config}
                color={getElementColor(element)}
                isSelected={selectedElement?.atomicNumber === element.atomicNumber}
                isCompared={comparisonElements.some(el => el.atomicNumber === element.atomicNumber)}
                onClick={() => handleElementClick(element)}
                onCompare={() => handleElementCompare(element)}
              />
            ))}
          </div>
        </div>

        {/* Actinides */}
        <div id="actinides-section" className="space-y-2">
          <div className="flex items-center space-x-2">
            <h3 className="text-lg font-serif font-semibold">Actinides</h3>
            <div className="h-px bg-gray-400 dark:bg-gray-600 flex-1" />
            <span className="text-sm text-gray-500">Period 7 (89-103)</span>
          </div>
          <div className="grid grid-cols-15 gap-1 min-w-[900px]">
            {actinides.map((element, index) => (
              <ElementTileAcademic
                key={element.atomicNumber}
                element={element}
                config={config}
                color={getElementColor(element)}
                isSelected={selectedElement?.atomicNumber === element.atomicNumber}
                isCompared={comparisonElements.some(el => el.atomicNumber === element.atomicNumber)}
                onClick={() => handleElementClick(element)}
                onCompare={() => handleElementCompare(element)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-8 p-4 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800">
        <h3 className="text-lg font-semibold mb-3">Legend - Element Categories</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {Object.entries(ELEMENT_CATEGORIES).map(([category, color]) => (
            <div key={category} className="flex items-center space-x-2">
              <div 
                className="w-4 h-4 rounded border border-gray-400" 
                style={{ backgroundColor: color }}
              />
              <span className="text-sm capitalize">{category}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 text-xs text-gray-600 dark:text-gray-400 space-y-1">
          <p>• Hover over elements for AI-powered insights</p>
          <p>• Click any element for detailed information</p>
          <p>• Double-click to add elements to comparison (up to 3)</p>
          <p>• Use controls above to change color schemes and display options</p>
        </div>
      </div>

      {/* Element Details Panel */}
      {selectedElement && (
        <ElementDetailsPanel
          element={selectedElement}
          config={config}
          onClose={() => setSelectedElement(null)}
        />
      )}

      {/* Element Comparison */}
      {showComparison && comparisonElements.length > 0 && (
        <ElementComparison
          elements={comparisonElements}
          config={config}
          onRemoveElement={(element) => 
            setComparisonElements(prev => 
              prev.filter(el => el.atomicNumber !== element.atomicNumber)
            )
          }
        />
      )}
    </div>
  );
}