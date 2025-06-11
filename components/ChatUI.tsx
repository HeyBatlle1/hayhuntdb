"use client";

import { useState, useRef, useEffect } from "react";
import { Send, User, Loader2, Volume2, ImagePlus, VolumeX, Brain, AtomIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ElementData } from "@/types/element";
import { generateResponse, injectElementContext, hasApiKey } from "@/lib/gemini";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  imageData?: string;
  element?: ElementData;
}

interface ChatUIProps {
  elements: ElementData[];
  initialSelectedElement?: ElementData | null;
}

export function ChatUI({ elements, initialSelectedElement }: ChatUIProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'model'; text: string }[]>([]);
  const [apiKeyMissing, setApiKeyMissing] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [imageData, setImageData] = useState<string | null>(null);
  
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const speechSynthesisRef = useRef<SpeechSynthesisUtterance | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Check API key on mount and whenever it changes
  useEffect(() => {
    setApiKeyMissing(!hasApiKey());
    const welcomeMessage: Message = {
      id: "welcome",
      role: "assistant",
      content: "Hello! I'm your Chemistry AI assistant powered by Google Gemini. Click on any element in the periodic table to view its details here, or ask me about any chemistry topic.",
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);

    // Focus input on mount
    if (inputRef.current) {
      inputRef.current.focus();
    }

    return () => {
      if (speechSynthesisRef.current && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  useEffect(() => {
    if (initialSelectedElement) {
      displayElementInfo(initialSelectedElement);
    }
  }, [initialSelectedElement]);

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current;
      scrollElement.scrollTop = scrollElement.scrollHeight;
    }
  }, [messages]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const displayElementInfo = (element: ElementData) => {
    const elementContent = `
**${element.name} (${element.symbol})**
Atomic Number: ${element.atomicNumber}
Atomic Mass: ${element.atomicMass.toFixed(4)} u
Category: ${element.category}
Phase: ${element.phase}
Density: ${element.density} g/cm³
Melting Point: ${element.meltingPoint}K
Boiling Point: ${element.boilingPoint}K
Electron Configuration: ${element.electronConfiguration}
Discovered: ${element.yearDiscovered} by ${element.discoveredBy}

${element.summary}
`;

    const elementMessage: Message = {
      id: `element-${element.atomicNumber}-${Date.now()}`,
      role: 'system',
      content: elementContent,
      timestamp: new Date(),
      element: element
    };

    setMessages(prev => [...prev, elementMessage]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if ((!input.trim() && !imageData) || isLoading || apiKeyMissing) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
      imageData: imageData || undefined
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setImageData(null);
    setIsLoading(true);
    
    const newHistory = [
      ...chatHistory,
      { role: 'user' as 'user', text: input.trim() }
    ];
    setChatHistory(newHistory);
    
    try {
      const prompt = injectElementContext(input.trim(), elements);
      const response = await generateResponse(prompt, newHistory, imageData || undefined);
      
      if (response.error) {
        setApiKeyMissing(true);
      }
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response.text,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      
      setChatHistory([
        ...newHistory,
        { role: 'model' as 'model', text: response.text }
      ]);
    } catch (error) {
      console.error("Error generating response:", error);
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again later.",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      
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

  const renderMessageContent = (content: string) => {
    return content.split('\n').map((line, i) => {
      if (line.startsWith('**') && line.endsWith('**')) {
        return (
          <p key={i} className={i > 0 ? "mt-2" : ""}>
            <span className="font-bold text-blue-300">
              {line.slice(2, -2)}
            </span>
          </p>
        );
      }
      
      if (line.match(/^\*\*([^*]+)\s+\(([^)]+)\)\*\*$/)) {
        const match = line.match(/^\*\*([^*]+)\s+\(([^)]+)\)\*\*$/);
        if (match) {
          const [, name, symbol] = match;
          return (
            <p key={i} className="text-lg font-bold text-blue-300 flex items-center gap-2">
              <AtomIcon className="h-5 w-5 text-blue-400" />
              {name} ({symbol})
            </p>
          );
        }
      }
      
      if (line.includes(':')) {
        const [key, ...valueParts] = line.split(':');
        const value = valueParts.join(':').trim();
        
        if (key && value) {
          return (
            <p key={i} className={`${i > 0 ? "mt-1" : ""} text-sm`}>
              <span className="font-medium text-blue-200">{key}:</span>{' '}
              <span className="text-blue-100">{value}</span>
            </p>
          );
        }
      }
      
      return (
        <p key={i} className={i > 0 ? "mt-2" : ""}>
          {line}
        </p>
      );
    });
  };

  return (
    <div className="flex flex-col h-full chat-ui-container rounded-lg">
      <div className="p-4 border-b border-slate-700/50 chat-ui-header">
        <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
          <div className="brain-icon">
            <Brain className="h-6 w-6" />
          </div>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
            Chemistry AI (Gemini)
          </span>
        </h2>
        <p className="text-sm text-blue-300">
          Ask questions or click elements to learn about them
        </p>
      </div>
      
      <ScrollArea 
        className="flex-1 p-4 overflow-y-auto" 
        ref={scrollAreaRef}
      >
        <div className="space-y-4">
          <AnimatePresence initial={false}>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className={cn(
                  "chat-message flex items-start gap-3",
                  message.role === "assistant" 
                    ? "bg-blue-950/30 border-blue-900/30" 
                    : message.role === "system"
                      ? "bg-indigo-950/40 border-indigo-900/40"
                      : "bg-slate-800/30 border-slate-700/30"
                )}
              >
                <div className={cn(
                  "rounded-full p-1.5 w-7 h-7 flex items-center justify-center shrink-0",
                  message.role === "assistant" 
                    ? "brain-icon" 
                    : message.role === "system"
                      ? "bg-indigo-700/80 text-blue-100"
                      : "bg-slate-700/80 text-blue-300"
                )}>
                  {message.role === "assistant" ? (
                    <Brain className="h-4 w-4" />
                  ) : message.role === "system" ? (
                    <AtomIcon className="h-4 w-4" />
                  ) : (
                    <User className="h-4 w-4" />
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
                  <div className="text-sm leading-relaxed text-blue-100">
                    {message.element ? (
                      renderMessageContent(message.content)
                    ) : (
                      message.content.split('\n').map((line, i) => (
                        <p key={i} className={i > 0 ? "mt-2" : ""}>
                          {line}
                        </p>
                      ))
                    )}
                  </div>
                  {message.element && (
                    <div className="mt-3">
                      <a 
                        href={message.element.source}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-400 hover:underline inline-flex items-center gap-1"
                      >
                        Learn more about {message.element.name}
                      </a>
                    </div>
                  )}
                </div>
                {(message.role === "assistant" || message.role === "system") && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="shrink-0 text-blue-400 hover:text-blue-300"
                    onClick={() => handleTextToSpeech(message.content)}
                  >
                    {isSpeaking ? (
                      <VolumeX className="h-4 w-4" />
                    ) : (
                      <Volume2 className="h-4 w-4" />
                    )}
                  </Button>
                )}
              </motion.div>
            ))}
            
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="chat-message flex items-start gap-3 bg-blue-950/30 border-blue-900/30"
              >
                <div className="brain-icon rounded-full p-1.5 w-7 h-7 flex items-center justify-center shrink-0">
                  <Brain className="h-4 w-4" />
                </div>
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin text-blue-400" />
                  <span className="text-sm text-blue-300">Thinking...</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </ScrollArea>
      
      <form 
        ref={formRef}
        onSubmit={handleSubmit} 
        className="p-4 space-y-4 chat-ui-footer"
      >
        {imageData && (
          <div className="relative w-fit">
            <img 
              src={imageData} 
              alt="Upload preview" 
              className="h-20 rounded-lg"
            />
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
              onClick={() => setImageData(null)}
            >
              ×
            </Button>
          </div>
        )}
        <div className="flex gap-2">
          <Input
            ref={inputRef}
            value={input}
            onChange={handleInputChange}
            placeholder={apiKeyMissing ? "API key missing or invalid" : "Ask about chemistry or elements..."}
            className="chat-input flex-1 text-blue-100 placeholder:text-blue-500/50"
            disabled={isLoading || apiKeyMissing}
            autoComplete="off"
            type="text"
            name="chat-input"
            id="chat-input"
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
            size="icon"
            variant="outline"
            className="border-blue-500/30 text-blue-400 hover:text-blue-300"
            onClick={() => fileInputRef.current?.click()}
            disabled={isLoading || apiKeyMissing}
          >
            <ImagePlus className="h-4 w-4" />
            <span className="sr-only">Upload image</span>
          </Button>
          <Button 
            type="submit" 
            size="icon"
            className="bg-blue-600 hover:bg-blue-500"
            disabled={(!input.trim() && !imageData) || isLoading || apiKeyMissing}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
            <span className="sr-only">Send</span>
          </Button>
        </div>
      </form>
    </div>
  );
}