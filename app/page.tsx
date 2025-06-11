"use client";

import { AcademicPeriodicTable } from "@/components/AcademicPeriodicTable";
import { motion } from "framer-motion";
import { ThemeToggle } from "@/components/theme-toggle";
import { useEffect, useState } from "react";
import { IUPAC_ELEMENTS } from "@/lib/iupac-data";
import { ElementData } from "@/types/element";
import { AtomIcon, BookOpen, Award, Brain, Sparkles, ExternalLink } from "lucide-react";

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  const [selectedElement, setSelectedElement] = useState<ElementData | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleElementSelect = (element: ElementData) => {
    setSelectedElement(element);
  };

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4">
        <div className="max-w-7xl mx-auto">
          {/* Header with HayHuntDB branding */}
          <header className="mb-8 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <AtomIcon className="h-8 w-8 gradient-atom" />
              <h1 className="text-4xl font-display text-elegant">
                AI-Enhanced Periodic Table
              </h1>
              <ThemeToggle />
            </div>
            <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto font-light mb-4">
              Professional interactive periodic table with AI-powered insights, compliant with IUPAC 2016 recommendations.
              Designed for university-level chemistry education and research.
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-blue-600 dark:text-blue-400">
              <span>Powered by</span>
              <a 
                href="https://hayhuntdb.online" 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-semibold hover:underline flex items-center gap-1"
              >
                HayHuntDB.Online
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </header>
          
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto p-4 space-y-8">
        {/* Header with HayHuntDB branding */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4"
        >
          {/* Top HayHuntDB branding */}
          <div className="flex items-center justify-center gap-2 text-sm text-blue-600 dark:text-blue-400 mb-4">
            <span>Powered by</span>
            <a 
              href="https://hayhuntdb.online" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-semibold hover:underline flex items-center gap-1 transition-colors hover:text-blue-700 dark:hover:text-blue-300"
            >
              HayHuntDB.Online
              <ExternalLink className="h-3 w-3" />
            </a>
            <span>- Advanced Chemical Database Solutions</span>
          </div>

          <div className="flex items-center justify-center gap-4 mb-6">
            <motion.div
              className="flex items-center gap-3"
              animate={{
                scale: [1, 1.02, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <AtomIcon className="h-10 w-10 gradient-atom" />
              <h1 className="text-4xl font-display text-accent-gradient">
                AI-Enhanced Periodic Table
              </h1>
              <Brain className="h-8 w-8 gradient-brain" />
              <Sparkles className="h-6 w-6 gradient-sparkles" />
            </motion.div>
            <ThemeToggle />
          </div>
          
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed font-light">
            Professional interactive periodic table with AI-powered insights, compliant with IUPAC 2016 recommendations.
            Hover over elements for instant AI analysis, click for detailed information, and explore chemistry with intelligent assistance.
          </p>

          {/* Academic Credentials */}
          <div className="flex items-center justify-center gap-8 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 gradient-award" />
              <span className="font-medium">IUPAC 2016 Standard</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 gradient-book" />
              <span className="font-medium">Academic Research Grade</span>
            </div>
            <div className="flex items-center gap-2">
              <AtomIcon className="h-4 w-4 gradient-atom" />
              <span className="font-medium">All 118 Elements</span>
            </div>
            <div className="flex items-center gap-2">
              <Brain className="h-4 w-4 gradient-brain" />
              <span className="font-medium">AI-Powered Insights</span>
            </div>
          </div>
        </motion.header>

        {/* Main Content - Full Width Periodic Table */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="w-full"
        >
          <AcademicPeriodicTable onElementSelect={handleElementSelect} />
        </motion.div>

        {/* Academic Footer with HayHuntDB branding */}
        <footer className="text-center py-8 border-t border-gray-200 dark:border-gray-700">
          <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
            <p className="flex items-center justify-center gap-2 font-medium">
              <Brain className="h-4 w-4 gradient-brain" />
              <span className="text-elegant">AI insights powered by Google Gemini • Real-time chemical analysis</span>
            </p>
            <p className="font-light">
              Data sourced from IUPAC recommendations and peer-reviewed literature.
            </p>
            <p className="font-light">
              Atomic weights based on IUPAC Commission on Isotopic Abundances and Atomic Weights (2016).
            </p>
            
            {/* Bottom HayHuntDB branding */}
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="flex items-center justify-center gap-2 text-blue-600 dark:text-blue-400 font-medium">
                <span>Proudly powered by</span>
                <a 
                  href="https://hayhuntdb.online" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-semibold hover:underline flex items-center gap-1 transition-colors hover:text-blue-700 dark:hover:text-blue-300"
                >
                  HayHuntDB.Online
                  <ExternalLink className="h-3 w-3" />
                </a>
              </p>
              <p className="text-xs font-light opacity-80 mt-1">
                Advanced Chemical Database Solutions • Educational Technology • Research Tools
              </p>
            </div>
            
            <p className="text-xs font-light opacity-80">
              For academic and research use. Citations available upon request.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}