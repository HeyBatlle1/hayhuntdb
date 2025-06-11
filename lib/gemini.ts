import { GoogleGenerativeAI } from '@google/generative-ai';

// Get API key from environment variables
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  console.warn('Gemini API key not found. AI features will be disabled.');
}

const genAI = GEMINI_API_KEY ? new GoogleGenerativeAI(GEMINI_API_KEY) : null;

export function hasApiKey(): boolean {
  return Boolean(GEMINI_API_KEY);
}

export async function generateResponse(
  prompt: string,
  history: { role: 'user' | 'model'; text: string }[] = [],
  imageData?: string
) {
  try {
    if (!GEMINI_API_KEY || !genAI) {
      return { 
        text: "AI features are currently unavailable. Please check your API key configuration.", 
        error: true 
      };
    }

    // Get the Gemini 2.0 Flash model
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.0-flash-exp",
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 2048,
      },
      safetySettings: [
        {
          category: "HARM_CATEGORY_HARASSMENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE",
        },
        {
          category: "HARM_CATEGORY_HATE_SPEECH",
          threshold: "BLOCK_MEDIUM_AND_ABOVE",
        },
        {
          category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE",
        },
        {
          category: "HARM_CATEGORY_DANGEROUS_CONTENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE",
        },
      ],
    });

    // Convert our history format to Gemini's format
    const chatHistory = history.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.text }]
    }));

    // Start a chat session with history
    const chat = model.startChat({
      history: chatHistory
    });

    // Handle image input if provided
    if (imageData) {
      // Convert base64 image data to the format Gemini expects
      const imageBase64 = imageData.split(',')[1]; // Remove data:image/jpeg;base64, prefix
      const mimeType = imageData.split(';')[0].split(':')[1]; // Extract MIME type
      
      const imagePart = {
        inlineData: {
          data: imageBase64,
          mimeType: mimeType
        }
      };

      const result = await model.generateContent([
        prompt,
        imagePart
      ]);

      return {
        text: result.response.text(),
        error: false
      };
    } else {
      // Text-only message
      const result = await chat.sendMessage(prompt);
      
      return {
        text: result.response.text(),
        error: false
      };
    }
  } catch (error) {
    console.error("Error generating response:", error);
    
    // Handle specific Gemini API errors
    if (error instanceof Error) {
      if (error.message.includes('API_KEY_INVALID') || error.message.includes('API key')) {
        return {
          text: "Invalid API key. Please check your Gemini API key configuration.",
          error: true
        };
      }
      if (error.message.includes('QUOTA_EXCEEDED') || error.message.includes('quota')) {
        return {
          text: "API quota exceeded. Please try again later or check your billing settings.",
          error: true
        };
      }
      if (error.message.includes('SAFETY') || error.message.includes('blocked')) {
        return {
          text: "Content was blocked by safety filters. Please try rephrasing your question in a more academic context.",
          error: false
        };
      }
      if (error.message.includes('RATE_LIMIT')) {
        return {
          text: "Rate limit exceeded. Please wait a moment before trying again.",
          error: true
        };
      }
    }
    
    return {
      text: "I'm experiencing technical difficulties. Please try again in a moment, or rephrase your question.",
      error: true
    };
  }
}

export function findElementData(query: string, elements: any[]) {
  if (!elements?.length) return null;
  
  const cleanQuery = query.toLowerCase().trim();
  
  const element = elements.find(
    el => 
      el.name.toLowerCase() === cleanQuery || 
      el.symbol.toLowerCase() === cleanQuery ||
      `element ${el.name.toLowerCase()}` === cleanQuery ||
      `the element ${el.name.toLowerCase()}` === cleanQuery
  );
  
  if (element) {
    return {
      name: element.name,
      symbol: element.symbol,
      atomicNumber: element.atomicNumber,
      atomicMass: element.atomicMass,
      category: element.category,
      phase: element.phase,
      summary: element.summary,
      electronConfiguration: element.electronConfiguration,
      yearDiscovered: element.yearDiscovered,
      discoveredBy: element.discoveredBy
    };
  }
  
  return null;
}

export function injectElementContext(userMessage: string, elements: any[]) {
  const elementData = findElementData(userMessage, elements);
  
  if (!elementData) return userMessage;
  
  return `
--- Element Data ---
${JSON.stringify(elementData, null, 2)}
--- End Element Data ---

Use this information accurately when relevant to answer the following question:
${userMessage}
`;
}