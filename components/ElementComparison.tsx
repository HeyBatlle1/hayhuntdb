"use client";

import React from 'react';
import { ElementData, PeriodicTableConfig } from '@/types/element';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ElementComparisonProps {
  elements: ElementData[];
  config: PeriodicTableConfig;
  onRemoveElement: (element: ElementData) => void;
}

export function ElementComparison({ elements, config, onRemoveElement }: ElementComparisonProps) {
  const formatTemperature = (temp: number | null): string => {
    if (temp === null) return 'N/A';
    if (config.temperatureUnit === 'C') {
      return `${(temp - 273.15).toFixed(0)}°C`;
    }
    return `${temp.toFixed(0)}K`;
  };

  const comparisonProperties = [
    { key: 'atomicNumber', label: 'Atomic Number', format: (val: any) => val.toString() },
    { key: 'atomicMass', label: 'Atomic Mass (u)', format: (val: any) => val.toFixed(3) },
    { key: 'category', label: 'Category', format: (val: any) => val },
    { key: 'block', label: 'Block', format: (val: any) => val + '-block' },
    { key: 'period', label: 'Period', format: (val: any) => val.toString() },
    { key: 'group', label: 'Group', format: (val: any) => val?.toString() || 'N/A' },
    { key: 'electronConfiguration', label: 'Electron Configuration', format: (val: any) => val },
    { key: 'electronegativity', label: 'Electronegativity', format: (val: any) => val?.toFixed(2) || 'N/A' },
    { key: 'atomicRadius', label: 'Atomic Radius (pm)', format: (val: any) => val?.toString() || 'N/A' },
    { key: 'density', label: 'Density (g/cm³)', format: (val: any) => val?.toFixed(3) || 'N/A' },
    { key: 'meltingPoint', label: 'Melting Point', format: (val: any) => formatTemperature(val) },
    { key: 'boilingPoint', label: 'Boiling Point', format: (val: any) => formatTemperature(val) },
    { key: 'discoveredBy', label: 'Discovered By', format: (val: any) => val },
    { key: 'yearDiscovered', label: 'Year Discovered', format: (val: any) => val.toString() }
  ];

  if (elements.length === 0) {
    return (
      <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-semibold mb-4">Element Comparison</h3>
        <p className="text-gray-600 dark:text-gray-400">
          Double-click elements in the periodic table to add them to comparison.
          You can compare up to 3 elements at once.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">Element Comparison</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Comparing {elements.length} element{elements.length > 1 ? 's' : ''}
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 dark:border-gray-700">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700">
              <th className="border border-gray-300 dark:border-gray-700 p-3 text-left font-medium">
                Property
              </th>
              {elements.map((element) => (
                <th key={element.atomicNumber} className="border border-gray-300 dark:border-gray-700 p-3 text-center">
                  <div className="flex items-center justify-center space-x-2">
                    <div>
                      <div className="text-2xl font-serif font-bold">{element.symbol}</div>
                      <div className="text-sm">{element.name}</div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onRemoveElement(element)}
                      className="p-1 h-6 w-6"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {comparisonProperties.map((property) => (
              <tr key={property.key} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="border border-gray-300 dark:border-gray-700 p-3 font-medium bg-gray-50 dark:bg-gray-800">
                  {property.label}
                </td>
                {elements.map((element) => {
                  const value = (element as any)[property.key];
                  const formattedValue = property.format(value);
                  
                  return (
                    <td key={element.atomicNumber} className="border border-gray-300 dark:border-gray-700 p-3 text-center">
                      <span className={cn(
                        property.key === 'electronConfiguration' && 'font-mono text-sm'
                      )}>
                        {formattedValue}
                      </span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Oxidation States Comparison */}
      <div className="mt-6">
        <h4 className="text-lg font-semibold mb-3">Oxidation States</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {elements.map((element) => (
            <div key={element.atomicNumber} className="p-4 border border-gray-300 dark:border-gray-700 rounded">
              <h5 className="font-medium mb-2">{element.name} ({element.symbol})</h5>
              <div className="space-y-2">
                <div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">All states: </span>
                  <span className="font-mono">{element.oxidationStates.join(', ')}</span>
                </div>
                <div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Common: </span>
                  <span className="font-mono font-semibold">{element.commonOxidationStates.join(', ')}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Isotopes Comparison */}
      <div className="mt-6">
        <h4 className="text-lg font-semibold mb-3">Stable Isotopes</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {elements.map((element) => {
            const stableIsotopes = element.isotopes.filter(iso => iso.isStable);
            return (
              <div key={element.atomicNumber} className="p-4 border border-gray-300 dark:border-gray-700 rounded">
                <h5 className="font-medium mb-2">{element.name} ({element.symbol})</h5>
                <div className="space-y-1">
                  {stableIsotopes.map((isotope) => (
                    <div key={isotope.massNumber} className="text-sm">
                      <span className="font-mono">{element.symbol}-{isotope.massNumber}</span>
                      {isotope.abundance && (
                        <span className="text-gray-600 dark:text-gray-400 ml-2">
                          ({isotope.abundance.toFixed(2)}%)
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}