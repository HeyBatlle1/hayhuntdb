"use client";

import React, { useState } from 'react';
import { ElementData } from '@/types/element';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface PeriodicTrendsVisualizationProps {
  elements: ElementData[];
  selectedProperty: string;
}

export function PeriodicTrendsVisualization({ 
  elements, 
  selectedProperty: initialProperty 
}: PeriodicTrendsVisualizationProps) {
  const [selectedProperty, setSelectedProperty] = useState(initialProperty);

  const getPropertyValue = (element: ElementData, property: string): number | null => {
    switch (property) {
      case 'electronegativity':
        return element.electronegativity;
      case 'atomic-radius':
        return element.atomicRadius;
      case 'ionization-energy':
        return element.ionizationEnergies[0] || null;
      case 'density':
        return element.density;
      case 'melting-point':
        return element.meltingPoint;
      case 'boiling-point':
        return element.boilingPoint;
      default:
        return null;
    }
  };

  const getPropertyRange = (property: string): [number, number] => {
    const values = elements
      .map(el => getPropertyValue(el, property))
      .filter((val): val is number => val !== null);
    
    return [Math.min(...values), Math.max(...values)];
  };

  const getPropertyColor = (element: ElementData, property: string): string => {
    const value = getPropertyValue(element, property);
    if (value === null) return '#BDC3C7';
    
    const [min, max] = getPropertyRange(property);
    const normalized = (value - min) / (max - min);
    
    // Create a color gradient from blue (low) to red (high)
    const hue = (1 - normalized) * 240; // 240° is blue, 0° is red
    return `hsl(${hue}, 70%, 60%)`;
  };

  const getPropertyUnit = (property: string): string => {
    switch (property) {
      case 'electronegativity':
        return '(Pauling scale)';
      case 'atomic-radius':
        return '(pm)';
      case 'ionization-energy':
        return '(eV)';
      case 'density':
        return '(g/cm³)';
      case 'melting-point':
      case 'boiling-point':
        return '(K)';
      default:
        return '';
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4">Periodic Trends Visualization</h3>
        
        <div className="flex items-center space-x-4">
          <Label htmlFor="property-select" className="text-sm font-medium">
            Property:
          </Label>
          <Select value={selectedProperty} onValueChange={setSelectedProperty}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="electronegativity">Electronegativity</SelectItem>
              <SelectItem value="atomic-radius">Atomic Radius</SelectItem>
              <SelectItem value="ionization-energy">Ionization Energy</SelectItem>
              <SelectItem value="density">Density</SelectItem>
              <SelectItem value="melting-point">Melting Point</SelectItem>
              <SelectItem value="boiling-point">Boiling Point</SelectItem>
            </SelectContent>
          </Select>
          
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {getPropertyUnit(selectedProperty)}
          </span>
        </div>
      </div>

      {/* Miniature periodic table with trend visualization */}
      <div className="space-y-2">
        {Array.from({ length: 7 }, (_, period) => {
          const periodNumber = period + 1;
          const periodElements = elements.filter(el => el.period === periodNumber);
          
          return (
            <div key={periodNumber} className="flex space-x-1">
              {Array.from({ length: 18 }, (_, group) => {
                const element = periodElements.find(el => el.group === group + 1);
                
                if (!element) {
                  return <div key={`${periodNumber}-${group}`} className="w-8 h-8" />;
                }
                
                const value = getPropertyValue(element, selectedProperty);
                const color = getPropertyColor(element, selectedProperty);
                
                return (
                  <div
                    key={element.atomicNumber}
                    className="w-8 h-8 border border-gray-300 dark:border-gray-600 rounded flex items-center justify-center text-xs font-bold cursor-pointer hover:scale-110 transition-transform"
                    style={{ backgroundColor: color }}
                    title={`${element.symbol}: ${value?.toFixed(2) || 'N/A'} ${getPropertyUnit(selectedProperty)}`}
                  >
                    {element.symbol}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* Color scale legend */}
      <div className="mt-6">
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium">Scale:</span>
          <div className="flex items-center space-x-2">
            <span className="text-xs">Low</span>
            <div className="w-32 h-4 rounded" style={{
              background: 'linear-gradient(to right, hsl(240, 70%, 60%), hsl(120, 70%, 60%), hsl(60, 70%, 60%), hsl(0, 70%, 60%))'
            }} />
            <span className="text-xs">High</span>
          </div>
          {(() => {
            const [min, max] = getPropertyRange(selectedProperty);
            return (
              <span className="text-xs text-gray-600 dark:text-gray-400">
                {min.toFixed(2)} - {max.toFixed(2)} {getPropertyUnit(selectedProperty)}
              </span>
            );
          })()}
        </div>
      </div>

      {/* Trend explanation */}
      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded border border-blue-200 dark:border-blue-800">
        <h4 className="font-medium text-blue-900 dark:text-blue-200 mb-2">
          Periodic Trend: {selectedProperty.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
        </h4>
        <p className="text-sm text-blue-800 dark:text-blue-300">
          {(() => {
            switch (selectedProperty) {
              case 'electronegativity':
                return 'Generally increases across periods (left to right) and decreases down groups. Fluorine has the highest electronegativity.';
              case 'atomic-radius':
                return 'Generally decreases across periods (left to right) and increases down groups due to additional electron shells.';
              case 'ionization-energy':
                return 'Generally increases across periods and decreases down groups. Represents the energy required to remove an electron.';
              case 'density':
                return 'Varies with atomic mass and atomic radius. Transition metals typically have high densities.';
              case 'melting-point':
                return 'Varies significantly. Metals generally have higher melting points than nonmetals.';
              case 'boiling-point':
                return 'Related to intermolecular forces and atomic structure. Noble gases have very low boiling points.';
              default:
                return 'Select a property to see its periodic trend explanation.';
            }
          })()}
        </p>
      </div>
    </div>
  );
}