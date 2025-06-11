"use client";

import React from 'react';
import { PeriodicTableConfig } from '@/types/element';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { TrendingUp, GitCompare, Palette, Download, Printer as Print } from 'lucide-react';

interface PeriodicTableControlsProps {
  config: PeriodicTableConfig;
  onConfigChange: (config: PeriodicTableConfig) => void;
  onShowTrends: () => void;
  onShowComparison: () => void;
  trendsVisible: boolean;
  comparisonVisible: boolean;
}

export function PeriodicTableControls({
  config,
  onConfigChange,
  onShowTrends,
  onShowComparison,
  trendsVisible,
  comparisonVisible
}: PeriodicTableControlsProps) {
  const updateConfig = (updates: Partial<PeriodicTableConfig>) => {
    onConfigChange({ ...config, ...updates });
  };

  const printTable = () => {
    window.print();
  };

  const exportToCSV = () => {
    // Implementation for CSV export would go here
    console.log('Export to CSV clicked');
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
      <div className="flex flex-wrap items-center gap-4">
        {/* Color Scheme */}
        <div className="flex items-center space-x-2">
          <Palette className="w-4 h-4 gradient-sparkles" />
          <Label htmlFor="color-scheme" className="text-sm font-serif font-semibold">
            Color by:
          </Label>
          <Select 
            value={config.colorScheme} 
            onValueChange={(value: any) => updateConfig({ colorScheme: value })}
          >
            <SelectTrigger className="w-32 font-medium">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="category">Category</SelectItem>
              <SelectItem value="block">Block</SelectItem>
              <SelectItem value="state">State</SelectItem>
              <SelectItem value="electronegativity">Electronegativity</SelectItem>
              <SelectItem value="atomic-radius">Atomic Radius</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Temperature Unit */}
        <div className="flex items-center space-x-2">
          <Label htmlFor="temp-unit" className="text-sm font-serif font-semibold">
            Temperature:
          </Label>
          <Select 
            value={config.temperatureUnit} 
            onValueChange={(value: any) => updateConfig({ temperatureUnit: value })}
          >
            <SelectTrigger className="w-16 font-medium">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="K">K</SelectItem>
              <SelectItem value="C">°C</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Electron Configuration */}
        <div className="flex items-center space-x-2">
          <Label htmlFor="electron-config" className="text-sm font-serif font-semibold">
            Electron config:
          </Label>
          <Select 
            value={config.showElectronConfig} 
            onValueChange={(value: any) => updateConfig({ showElectronConfig: value })}
          >
            <SelectTrigger className="w-20 font-medium">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              <SelectItem value="noble">Noble</SelectItem>
              <SelectItem value="full">Full</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Uncertainties Toggle */}
        <div className="flex items-center space-x-2">
          <Switch
            id="uncertainties"
            checked={config.showUncertainties}
            onCheckedChange={(checked) => updateConfig({ showUncertainties: checked })}
          />
          <Label htmlFor="uncertainties" className="text-sm font-serif font-semibold">
            Show uncertainties
          </Label>
        </div>

        {/* Theme Toggle */}
        <div className="flex items-center space-x-2">
          <Switch
            id="dark-mode"
            checked={config.theme === 'dark'}
            onCheckedChange={(checked) => updateConfig({ theme: checked ? 'dark' : 'light' })}
          />
          <Label htmlFor="dark-mode" className="text-sm font-serif font-semibold">
            Dark mode
          </Label>
        </div>

        {/* Divider */}
        <div className="h-6 w-px bg-gray-300 dark:bg-gray-600" />

        {/* Action Buttons */}
        <Button
          variant={trendsVisible ? "default" : "outline"}
          size="sm"
          onClick={onShowTrends}
          className="font-medium"
        >
          <TrendingUp className="w-4 h-4 mr-2 gradient-trends" />
          Trends
        </Button>

        <Button
          variant={comparisonVisible ? "default" : "outline"}
          size="sm"
          onClick={onShowComparison}
          className="font-medium"
        >
          <GitCompare className="w-4 h-4 mr-2 gradient-zap" />
          Compare
        </Button>

        <Button variant="outline" size="sm" onClick={printTable} className="font-medium">
          <Print className="w-4 h-4 mr-2 icon-gradient" />
          Print
        </Button>

        <Button variant="outline" size="sm" onClick={exportToCSV} className="font-medium">
          <Download className="w-4 h-4 mr-2 gradient-refresh" />
          Export CSV
        </Button>
      </div>
    </div>
  );
}