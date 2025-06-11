"use client";

import React, { useState, useEffect, useRef } from 'react';
import { ElementData } from '@/types/element';
import { generateResponse } from '@/lib/gemini';
import { Brain, X, Sparkles, TrendingUp, Zap, RefreshCw, Send, User, Volume2, VolumeX, ImagePlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  imageData?: string;
}

interface AIPeriodicInsightsProps {
  selectedElement: ElementData | null;
  comparisonElements: ElementData[];
  onClose: () => void;
}

export function AIPeriodicInsights({ 
  selectedElement, 
  comparisonElements, 
  onClose 
}: AIPeriodicInsightsProps) {
  const [insights, setInsights] = useState<{
    generalInsight: string;
    elementInsight: string;
    comparisonInsight: string;
    trendInsight: string;
  }>({
    generalInsight: '',
    elementInsight: '',
    comparisonInsight: '',
    trendInsight: ''
  });
  const [loading, setLoading] = useState({
    general: false,
    element: false,
    comparison: false,
    trend: false
  });

  // Chat interface state
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [imageData, setImageData] = useState<string | null>(null);
  const [showChat, setShowChat] = useState(true);
  
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const speechSynthesisRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    generateGeneralInsight();
    
    // Initialize chat with welcome message
    const welcomeMessage: Message = {
      id: "welcome",
      role: "assistant",
      content: "Hello! I'm your Chemistry AI assistant powered by Google Gemini. Ask me about any element, chemical reaction, periodic trends, or chemistry concepts. I can help with homework, research, or just satisfy your chemical curiosity!",
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
  }, []);

  useEffect(() => {
    if (selectedElement) {
      generateElementInsight(selectedElement);
    }
  }, [selectedElement]);

  useEffect(() => {
    if (comparisonElements.length >= 2) {
      generateComparisonInsight(comparisonElements);
    }
  }, [comparisonElements]);

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current;
      scrollElement.scrollTop = scrollElement.scrollHeight;
    }
  }, [messages]);

  const generateGeneralInsight = async () => {
    setLoading(prev => ({ ...prev, general: true }));
    
    try {
      const response = await generateResponse(
        "Provide an interesting fact about the periodic table or chemistry in general. Keep it to 2-3 sentences and make it engaging for chemistry students."
      );
      
      setInsights(prev => ({
        ...prev,
        generalInsight: response.text
      }));
    } catch (error) {
      console.error('Error generating general insight:', error);
      setInsights(prev => ({
        ...prev,
        generalInsight: 'The periodic table is one of the most elegant organizational systems in science, revealing patterns that help predict element properties and chemical behavior.'
      }));
    } finally {
      setLoading(prev => ({ ...prev, general: false }));
    }
  };

  const generateElementInsight = async (element: ElementData) => {
    setLoading(prev => ({ ...prev, element: true }));
    
    try {
      const prompt = `Provide fascinating insights about ${element.name} (${element.symbol}). Focus on:
1. Unique properties or applications
2. Historical significance or discovery story
3. Role in periodic trends
4. Interesting chemical behavior

Element details:
- Atomic number: ${element.atomicNumber}
- Category: ${element.category}
- Block: ${element.block}
- Electronegativity: ${element.electronegativity || 'N/A'}
- Applications: ${element.applications.join(', ')}

Keep it engaging and educational, about 3-4 sentences.`;

      const response = await generateResponse(prompt);
      
      setInsights(prev => ({
        ...prev,
        elementInsight: response.text
      }));
    } catch (error) {
      console.error('Error generating element insight:', error);
      setInsights(prev => ({
        ...prev,
        elementInsight: `${element.name} is a ${element.category} in the ${element.block}-block of the periodic table with atomic number ${element.atomicNumber}.`
      }));
    } finally {
      setLoading(prev => ({ ...prev, element: false }));
    }
  };

  const generateComparisonInsight = async (elements: ElementData[]) => {
    if (elements.length < 2) return;
    
    setLoading(prev => ({ ...prev, comparison: true }));
    
    try {
      const elementNames = elements.map(el => `${el.name} (${el.symbol})`).join(', ');
      const prompt = `Compare these elements and highlight interesting differences or similarities: ${elementNames}. 

Focus on:
- Periodic trends visible in their properties
- Different applications or behaviors
- What makes each unique
- Any surprising connections

Elements data:
${elements.map(el => `
${el.name}: Period ${el.period}, Group ${el.group || 'f-block'}, ${el.category}
Electronegativity: ${el.electronegativity || 'N/A'}
Applications: ${el.applications.slice(0, 2).join(', ')}
`).join('')}

Keep it educational and engaging, 3-4 sentences.`;

      const response = await generateResponse(prompt);
      
      setInsights(prev => ({
        ...prev,
        comparisonInsight: response.text
      }));
    } catch (error) {
      console.error('Error generating comparison insight:', error);
      setInsights(prev => ({
        ...prev,
        comparisonInsight: `These elements show interesting patterns in the periodic table, each with unique properties and applications.`
      }));
    } finally {
      setLoading(prev => ({ ...prev, comparison: false }));
    }
  };

  const generateTrendInsight = async () => {
    setLoading(prev => ({ ...prev, trend: true }));
    
    try {
      const response = await generateResponse(
        "Explain an interesting periodic trend (like electronegativity, atomic radius, ionization energy, etc.) in simple terms. Include why it happens and give a practical example. Keep it to 3-4 sentences."
      );
      
      setInsights(prev => ({
        ...prev,
        trendInsight: response.text
      }));
    } catch (error) {
      console.error('Error generating trend insight:', error);
      setInsights(prev => ({
        ...prev,
        trendInsight: 'Atomic radius generally decreases across periods due to increasing nuclear charge pulling electrons closer, while it increases down groups as new electron shells are added.'
      }));
    } finally {
      setLoading(prev => ({ ...prev, trend: false }));
    }
  };

  // Chat interface functions
  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if ((!chatInput.trim() && !imageData) || isChatLoading) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: chatInput.trim(),
      timestamp: new Date(),
      imageData: imageData || undefined
    };
    
    setMessages(prev => [...prev, userMessage]);
    setChatInput("");
    setImageData(null);
    setIsChatLoading(true);
    
    try {
      let prompt = chatInput.trim();
      
      // Add context about selected element if relevant
      if (selectedElement) {
        prompt += `\n\nContext: The user is currently viewing ${selectedElement.name} (${selectedElement.symbol}) in the periodic table.`;
      }
      
      // Add context about comparison elements if relevant
      if (comparisonElements.length > 0) {
        const elementNames = comparisonElements.map(el => el.name).join(', ');
        prompt += `\n\nContext: The user is comparing these elements: ${elementNames}.`;
      }

      const response = await generateResponse(prompt, [], imageData || undefined);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response.text,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error generating chat response:", error);
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again later.",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsChatLoading(false);
      
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setImageData(result);
    };
    reader.readAsDataURL(file);
  };

  const handleTextToSpeech = (text: string) => {
    if (!window.speechSynthesis) {
      console.error("Speech synthesis not supported in this browser");
      return;
    }
    
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    speechSynthesisRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950/50 dark:to-indigo-950/50 p-6 rounded-lg border-2 border-blue-200 dark:border-blue-700">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <Brain className="w-6 h-6 gradient-brain" />
            <Sparkles className="w-4 h-4 gradient-sparkles" />
          </div>
          <h3 className="text-xl font-display text-elegant">
            AI Chemistry Insights
          </h3>
        </div>
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setShowChat(!showChat)}
            className="hover:bg-white/20 dark:hover:bg-black/20 font-medium"
          >
            {showChat ? 'Hide Chat' : 'Show Chat'}
          </Button>
          <Button variant="ghost" size="sm" onClick={onClose} className="hover:bg-white/20 dark:hover:bg-black/20">
            <X className="w-4 h-4 gradient-close" />
          </Button>
        </div>
      </div>

      <div className={cn("grid gap-6", showChat ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1")}>
        {/* Insights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* General Chemistry Insight */}
          <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border-2 border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 gradient-sparkles" />
                <h4 className="font-serif font-semibold text-gray-900 dark:text-gray-100">Chemistry Fact</h4>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={generateGeneralInsight}
                disabled={loading.general}
                className="hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <RefreshCw className={cn("w-3 h-3 gradient-refresh", loading.general && "animate-spin")} />
              </Button>
            </div>
            <div className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed min-h-[60px] font-light">
              {loading.general ? (
                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                  <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  <span>Generating insight...</span>
                </div>
              ) : (
                insights.generalInsight || "Click refresh for a chemistry fact!"
              )}
            </div>
          </div>

          {/* Element-Specific Insight */}
          <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border-2 border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="flex items-center space-x-2 mb-3">
              <Zap className="w-4 h-4 gradient-zap" />
              <h4 className="font-serif font-semibold text-gray-900 dark:text-gray-100">
                {selectedElement ? `About ${selectedElement.name}` : 'Element Focus'}
              </h4>
            </div>
            <div className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed min-h-[60px] font-light">
              {selectedElement ? (
                loading.element ? (
                  <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                    <div className="w-4 h-4 border-2 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                    <span>Analyzing element...</span>
                  </div>
                ) : (
                  insights.elementInsight || `Analyzing ${selectedElement.name}...`
                )
              ) : (
                <span className="text-gray-600 dark:text-gray-400">
                  Click on any element to see AI-generated insights about its properties and applications.
                </span>
              )}
            </div>
          </div>

          {/* Periodic Trends Insight */}
          <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border-2 border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 gradient-trends" />
                <h4 className="font-serif font-semibold text-gray-900 dark:text-gray-100">Periodic Trends</h4>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={generateTrendInsight}
                disabled={loading.trend}
                className="hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <RefreshCw className={cn("w-3 h-3 gradient-refresh", loading.trend && "animate-spin")} />
              </Button>
            </div>
            <div className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed min-h-[60px] font-light">
              {loading.trend ? (
                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                  <div className="w-4 h-4 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                  <span>Explaining trends...</span>
                </div>
              ) : (
                insights.trendInsight || "Click refresh to learn about periodic trends!"
              )}
            </div>
          </div>

          {/* Element Comparison Insight */}
          <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border-2 border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="flex items-center space-x-2 mb-3">
              <Brain className="w-4 h-4 gradient-brain" />
              <h4 className="font-serif font-semibold text-gray-900 dark:text-gray-100">
                Element Comparison
              </h4>
            </div>
            <div className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed min-h-[60px] font-light">
              {comparisonElements.length >= 2 ? (
                loading.comparison ? (
                  <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                    <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    <span>Comparing elements...</span>
                  </div>
                ) : (
                  insights.comparisonInsight || "Analyzing element comparison..."
                )
              ) : comparisonElements.length === 1 ? (
                <span className="text-gray-600 dark:text-gray-400">
                  {comparisonElements[0].name} is selected for comparison. Double-click another element to compare properties.
                </span>
              ) : (
                <span className="text-gray-600 dark:text-gray-400">
                  Double-click elements to add them to comparison (up to 3). AI will analyze their relationships and differences.
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Chat Interface */}
        {showChat && (
          <div className="bg-white dark:bg-gray-900 rounded-lg border-2 border-gray-200 dark:border-gray-700 shadow-sm flex flex-col" style={{ height: '500px' }}>
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-t-lg">
              <div className="flex items-center space-x-2">
                <Brain className="w-5 h-5 gradient-brain" />
                <h4 className="font-serif font-semibold text-gray-900 dark:text-gray-100">
                  Chemistry Assistant
                </h4>
                <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                  (Gemini AI)
                </span>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 font-light">
                Ask about chemistry, elements, reactions, or concepts
              </p>
            </div>

            {/* Chat Messages */}
            <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex items-start gap-3 p-3 rounded-lg",
                      message.role === "assistant" 
                        ? "bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800"
                        : "bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                    )}
                  >
                    <div className={cn(
                      "rounded-full p-1.5 w-7 h-7 flex items-center justify-center shrink-0",
                      message.role === "assistant" 
                        ? "bg-blue-100 dark:bg-blue-900"
                        : "bg-gray-200 dark:bg-gray-700"
                    )}>
                      {message.role === "assistant" ? (
                        <Brain className="h-4 w-4 gradient-brain" />
                      ) : (
                        <User className="h-4 w-4 gradient-user" />
                      )}
                    </div>
                    <div className="flex-1">
                      {message.imageData && (
                        <div className="mb-2">
                          <img 
                            src={message.imageData} 
                            alt="Uploaded content"
                            className="max-w-xs rounded-lg"
                          />
                        </div>
                      )}
                      <div className="text-sm leading-relaxed text-gray-800 dark:text-gray-200 font-light">
                        {message.content.split('\n').map((line, i) => (
                          <p key={i} className={i > 0 ? "mt-2" : ""}>
                            {line}
                          </p>
                        ))}
                      </div>
                    </div>
                    {message.role === "assistant" && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="shrink-0"
                        onClick={() => handleTextToSpeech(message.content)}
                      >
                        {isSpeaking ? (
                          <VolumeX className="h-4 w-4 gradient-volume" />
                        ) : (
                          <Volume2 className="h-4 w-4 gradient-volume" />
                        )}
                      </Button>
                    )}
                  </div>
                ))}
                
                {isChatLoading && (
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
                    <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-1.5 w-7 h-7 flex items-center justify-center shrink-0">
                      <Brain className="h-4 w-4 gradient-brain" />
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                      <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">Thinking...</span>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Chat Input */}
            <form onSubmit={handleChatSubmit} className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-b-lg">
              {imageData && (
                <div className="relative w-fit mb-3">
                  <img 
                    src={imageData} 
                    alt="Upload preview" 
                    className="h-20 rounded-lg"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                    onClick={() => setImageData(null)}
                  >
                    ×
                  </Button>
                </div>
              )}
              <div className="flex gap-2">
                <Input
                  ref={inputRef}
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask about chemistry, elements, reactions..."
                  className="flex-1 border-gray-300 dark:border-gray-600 focus:border-blue-500 font-light"
                  disabled={isChatLoading}
                />
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/*"
                  className="hidden"
                />
                <Button 
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isChatLoading}
                >
                  <ImagePlus className="h-4 w-4 gradient-image" />
                </Button>
                <Button 
                  type="submit" 
                  size="sm"
                  disabled={(!chatInput.trim() && !imageData) || isChatLoading}
                >
                  {isChatLoading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Send className="h-4 w-4 gradient-send" />
                  )}
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Status indicator */}
      <div className="mt-4 text-xs text-center text-gray-600 dark:text-gray-400 bg-white/30 dark:bg-black/20 rounded-full py-2 font-medium">
        🤖 <span className="text-elegant">Powered by Google Gemini AI and built with Bolt.New</span> • Real-time chemical insights
      </div>
    </div>
  );
}