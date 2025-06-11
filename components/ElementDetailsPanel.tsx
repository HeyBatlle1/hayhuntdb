"use client";

import React from 'react';
import { ElementData, PeriodicTableConfig } from '@/types/element';
import { X, Download, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ElementDetailsPanelProps {
  element: ElementData;
  config: PeriodicTableConfig;
  onClose: () => void;
}

export function ElementDetailsPanel({ element, config, onClose }: ElementDetailsPanelProps) {
  const formatTemperature = (temp: number | null): string => {
    if (temp === null) return 'N/A';
    if (config.temperatureUnit === 'C') {
      return `${(temp - 273.15).toFixed(2)}°C (${temp.toFixed(2)}K)`;
    }
    return `${temp.toFixed(2)}K (${(temp - 273.15).toFixed(2)}°C)`;
  };

  const exportElementData = () => {
    const data = {
      name: element.name,
      symbol: element.symbol,
      atomicNumber: element.atomicNumber,
      atomicMass: element.atomicMass,
      electronConfiguration: element.electronConfiguration,
      properties: {
        meltingPoint: element.meltingPoint,
        boilingPoint: element.boilingPoint,
        density: element.density,
        electronegativity: element.electronegativity
      },
      isotopes: element.isotopes
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${element.symbol}-data.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className={cn(
      "fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center p-4 z-50"
    )}>
      <div className={cn(
        "bg-white dark:bg-gray-900 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto",
        "border-2 border-gray-200 dark:border-gray-600"
      )}>
        {/* Header */}
        <div className="p-6 border-b-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-4xl font-serif font-bold text-gray-800 dark:text-gray-100">
                {element.symbol}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                  {element.name}
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Atomic Number: {element.atomicNumber}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={exportElementData}>
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm" onClick={onClose}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
          {/* Basic Properties */}
          <section>
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 pb-2">
              Basic Properties
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border dark:border-gray-700">
                <dt className="text-sm font-medium text-gray-600 dark:text-gray-300">Atomic Mass</dt>
                <dd className="text-lg font-mono text-gray-900 dark:text-gray-100">
                  {element.atomicMass.toFixed(6)} u
                  {element.atomicMassUncertainty && config.showUncertainties && (
                    <span className="text-sm text-gray-500 dark:text-gray-400"> ±{element.atomicMassUncertainty}</span>
                  )}
                </dd>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border dark:border-gray-700">
                <dt className="text-sm font-medium text-gray-600 dark:text-gray-300">Category</dt>
                <dd className="text-lg capitalize text-gray-900 dark:text-gray-100">{element.category}</dd>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border dark:border-gray-700">
                <dt className="text-sm font-medium text-gray-600 dark:text-gray-300">Block</dt>
                <dd className="text-lg font-mono text-gray-900 dark:text-gray-100">{element.block}-block</dd>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border dark:border-gray-700">
                <dt className="text-sm font-medium text-gray-600 dark:text-gray-300">Period</dt>
                <dd className="text-lg text-gray-900 dark:text-gray-100">{element.period}</dd>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border dark:border-gray-700">
                <dt className="text-sm font-medium text-gray-600 dark:text-gray-300">Group</dt>
                <dd className="text-lg text-gray-900 dark:text-gray-100">{element.group || 'N/A'}</dd>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border dark:border-gray-700">
                <dt className="text-sm font-medium text-gray-600 dark:text-gray-300">Phase (STP)</dt>
                <dd className="text-lg capitalize text-gray-900 dark:text-gray-100">{element.phase}</dd>
              </div>
            </div>
          </section>

          {/* Electronic Configuration */}
          <section>
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 pb-2">
              Electronic Configuration
            </h3>
            <div className="space-y-3">
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border dark:border-gray-700">
                <dt className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">Full Configuration</dt>
                <dd className="text-lg font-mono bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 p-3 rounded border dark:border-gray-600">
                  {element.electronConfiguration}
                </dd>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border dark:border-gray-700">
                <dt className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">Noble Gas Notation</dt>
                <dd className="text-lg font-mono bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 p-3 rounded border dark:border-gray-600">
                  {element.electronConfigurationNoble}
                </dd>
              </div>
            </div>
          </section>

          {/* Physical Properties */}
          <section>
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 pb-2">
              Physical Properties
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border dark:border-gray-700">
                <dt className="text-sm font-medium text-gray-600 dark:text-gray-300">Density (STP)</dt>
                <dd className="text-lg text-gray-900 dark:text-gray-100">
                  {element.density ? `${element.density} g/cm³` : 'N/A'}
                </dd>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border dark:border-gray-700">
                <dt className="text-sm font-medium text-gray-600 dark:text-gray-300">Melting Point</dt>
                <dd className="text-lg text-gray-900 dark:text-gray-100">{formatTemperature(element.meltingPoint)}</dd>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border dark:border-gray-700">
                <dt className="text-sm font-medium text-gray-600 dark:text-gray-300">Boiling Point</dt>
                <dd className="text-lg text-gray-900 dark:text-gray-100">{formatTemperature(element.boilingPoint)}</dd>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border dark:border-gray-700">
                <dt className="text-sm font-medium text-gray-600 dark:text-gray-300">Crystal Structure</dt>
                <dd className="text-lg text-gray-900 dark:text-gray-100">{element.crystallStructure || 'N/A'}</dd>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border dark:border-gray-700">
                <dt className="text-sm font-medium text-gray-600 dark:text-gray-300">Atomic Radius</dt>
                <dd className="text-lg text-gray-900 dark:text-gray-100">
                  {element.atomicRadius ? `${element.atomicRadius} pm` : 'N/A'}
                </dd>
              </div>
            </div>
          </section>

          {/* Chemical Properties */}
          <section>
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 pb-2">
              Chemical Properties
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border dark:border-gray-700">
                <dt className="text-sm font-medium text-gray-600 dark:text-gray-300">Electronegativity</dt>
                <dd className="text-lg text-gray-900 dark:text-gray-100">
                  {element.electronegativity ? `${element.electronegativity} (Pauling)` : 'N/A'}
                </dd>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border dark:border-gray-700">
                <dt className="text-sm font-medium text-gray-600 dark:text-gray-300">Oxidation States</dt>
                <dd className="text-lg text-gray-900 dark:text-gray-100">
                  {element.oxidationStates.join(', ')}
                </dd>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border dark:border-gray-700">
                <dt className="text-sm font-medium text-gray-600 dark:text-gray-300">Common States</dt>
                <dd className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {element.commonOxidationStates.join(', ')}
                </dd>
              </div>
            </div>
          </section>

          {/* Isotopes */}
          <section>
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 pb-2">
              Isotopes
            </h3>
            <div className="overflow-x-auto bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border dark:border-gray-700">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-700">
                    <th className="border-2 border-gray-300 dark:border-gray-600 p-3 text-left text-gray-900 dark:text-gray-100 font-semibold">Mass Number</th>
                    <th className="border-2 border-gray-300 dark:border-gray-600 p-3 text-left text-gray-900 dark:text-gray-100 font-semibold">Abundance (%)</th>
                    <th className="border-2 border-gray-300 dark:border-gray-600 p-3 text-left text-gray-900 dark:text-gray-100 font-semibold">Half-Life</th>
                    <th className="border-2 border-gray-300 dark:border-gray-600 p-3 text-left text-gray-900 dark:text-gray-100 font-semibold">Stability</th>
                  </tr>
                </thead>
                <tbody>
                  {element.isotopes.map((isotope, index) => (
                    <tr key={index} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                      <td className="border border-gray-300 dark:border-gray-600 p-3 font-mono text-gray-900 dark:text-gray-100">
                        {isotope.massNumber}
                      </td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 text-gray-900 dark:text-gray-100">
                        {isotope.abundance?.toFixed(4) || 'N/A'}
                      </td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 text-gray-900 dark:text-gray-100">
                        {isotope.halfLife || 'Stable'}
                      </td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3">
                        <span className={cn(
                          "px-3 py-1 rounded-full text-xs font-medium",
                          isotope.isStable 
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 border border-green-300 dark:border-green-700"
                            : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 border border-red-300 dark:border-red-700"
                        )}>
                          {isotope.isStable ? 'Stable' : 'Radioactive'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Discovery & Applications */}
          <section>
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 pb-2">
              Discovery & Applications
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border dark:border-gray-700">
                <dt className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">Discovered By</dt>
                <dd className="text-lg text-gray-900 dark:text-gray-100">{element.discoveredBy} ({element.yearDiscovered})</dd>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border dark:border-gray-700">
                <dt className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">Applications</dt>
                <dd className="text-lg">
                  <ul className="list-disc list-inside space-y-2 text-gray-900 dark:text-gray-100">
                    {element.applications.map((app, index) => (
                      <li key={index}>{app}</li>
                    ))}
                  </ul>
                </dd>
              </div>
              {element.hazards.length > 0 && (
                <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border-2 border-red-200 dark:border-red-700">
                  <dt className="text-sm font-medium text-red-700 dark:text-red-300 mb-2">⚠️ Safety Hazards</dt>
                  <dd className="text-lg">
                    <ul className="list-disc list-inside space-y-2 text-red-800 dark:text-red-200">
                      {element.hazards.map((hazard, index) => (
                        <li key={index}>{hazard}</li>
                      ))}
                    </ul>
                  </dd>
                </div>
              )}
            </div>
          </section>

          {/* Summary */}
          <section>
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 pb-2">
              Summary
            </h3>
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
              <p className="text-gray-800 dark:text-gray-200 leading-relaxed">
                {element.summary}
              </p>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="p-4 border-t-2 border-gray-200 dark:border-gray-700 text-center text-xs bg-gray-50 dark:bg-gray-800">
          <p className="text-gray-600 dark:text-gray-300">
            Data sourced from IUPAC recommendations and peer-reviewed literature.
          </p>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Last updated: 2024 | Atomic weights based on IUPAC 2016 standard atomic weights
          </p>
        </div>
      </div>
    </div>
  );
}