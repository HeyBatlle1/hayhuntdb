"use client";

import { ElementData } from "@/types/element";
import { X } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface ElementDetailProps {
  element: ElementData | null;
  onClose: () => void;
}

export function ElementDetail({ element, onClose }: ElementDetailProps) {
  if (!element) {
    return (
      <div className="p-6 bg-card/30 backdrop-blur-sm rounded-lg border border-border">
        <div className="text-center text-muted-foreground p-8">
          Select an element to view details
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      className="p-6 bg-card/30 backdrop-blur-md rounded-lg border border-border relative overflow-hidden"
    >
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-3 right-3 text-muted-foreground hover:text-foreground"
        onClick={onClose}
      >
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </Button>

      <div className="mb-4 flex flex-col items-center">
        <div className="relative">
          <div className={`w-20 h-20 rounded-xl flex items-center justify-center bg-${getCategoryBgColor(element.category)} mb-2`}>
            <span className="element-symbol text-5xl font-bold text-foreground">{element.symbol}</span>
          </div>
          <div className="absolute -top-2 -right-2 bg-secondary text-secondary-foreground text-xs rounded-full h-6 w-6 flex items-center justify-center">
            {element.atomicNumber}
          </div>
        </div>
        <h2 className="text-2xl font-bold text-foreground">{element.name}</h2>
        <div className="text-sm text-muted-foreground">{element.category}</div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="grid grid-cols-2 gap-y-3 gap-x-4 mb-4">
          <DetailItem label="Phase" value={element.phase} />
          <DetailItem label="Atomic Mass" value={`${element.atomicMass.toFixed(4)} u`} />
          <DetailItem label="Density" value={`${element.density} g/cm³`} />
          <DetailItem label="Discovered" value={element.yearDiscovered.toString()} />
          <DetailItem label="Melting Point" value={`${element.meltingPoint}K`} />
          <DetailItem label="Boiling Point" value={`${element.boilingPoint}K`} />
          <DetailItem 
            label="Electron Config" 
            value={element.electronConfiguration}
            className="col-span-2"
          />
          <DetailItem 
            label="Discovered By" 
            value={element.discoveredBy}
            className="col-span-2"
          />
        </div>

        <div className="mt-3 space-y-2">
          <h3 className="text-sm font-medium text-foreground">Summary</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {element.summary}
          </p>
          <div className="mt-4">
            <a 
              href={element.source}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-primary hover:underline inline-flex items-center gap-1"
            >
              Learn more
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function DetailItem({ 
  label, 
  value, 
  className 
}: { 
  label: string; 
  value: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="text-xs font-medium text-foreground">{label}</div>
      <div className="text-sm text-muted-foreground truncate">{value}</div>
    </div>
  );
}

function getCategoryBgColor(category: string): string {
  const categoryColors: Record<string, string> = {
    "noble gas": "amber-900/70",
    "alkali metal": "pink-900/70",
    "alkaline earth metal": "purple-900/70",
    "transition metal": "blue-900/70",
    "post-transition metal": "orange-900/70",
    "metalloid": "green-900/70",
    "nonmetal": "teal-900/70",
    "polyatomic nonmetal": "teal-900/70",
    "diatomic nonmetal": "teal-900/70",
    "halogen": "yellow-900/70",
    "lanthanide": "lime-900/70",
    "actinide": "red-900/70",
    "unknown": "gray-900/70"
  };

  return categoryColors[category.toLowerCase()] || "gray-900/70";
}