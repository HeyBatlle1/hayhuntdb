# 🧪 AI-Enhanced Interactive Periodic Table

**Powered by [HayHuntDB.Online](https://hayhuntdb.online) - Advanced Chemical Database Solutions**

[![Built with Bolt](https://img.shields.io/badge/Built%20with-Bolt.New-FF6154?style=for-the-badge&logo=bolt&logoColor=white)](https://bolt.new)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Google Gemini](https://img.shields.io/badge/Google-Gemini%20AI-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)
[![IUPAC 2016](https://img.shields.io/badge/IUPAC-2016%20Standard-green?style=for-the-badge)](https://iupac.org/)

A professional, academic-grade interactive periodic table with **AI-powered insights** built using Google Gemini AI. Designed for university-level chemistry education, research, and chemical exploration.

## ✨ **Key Features**

### 🤖 **AI-Powered Intelligence**
- **Real-time AI insights** powered by Google Gemini 2.0 Flash
- **Interactive chat interface** for chemistry questions and explanations
- **Smart element tooltips** with AI-generated fascinating facts
- **Automated trend analysis** and chemical property explanations
- **Image upload support** for chemistry homework help
- **Text-to-speech** functionality for accessibility

### 📊 **Academic Excellence**
- **IUPAC 2016 compliant** data for all 118 elements
- **Comprehensive isotope information** with stability data
- **Accurate atomic weights** with uncertainty values
- **Professional electron configurations** (full and noble gas notation)
- **Complete oxidation states** and common valencies
- **Peer-reviewed data sources** with proper citations

### 🔬 **Advanced Analysis Tools**
- **Element comparison** (up to 3 elements simultaneously)
- **Periodic trends visualization** with interactive color mapping
- **Property-based color schemes** (category, block, state, electronegativity, atomic radius)
- **Temperature unit conversion** (Kelvin ↔ Celsius)
- **Detailed safety information** and hazard warnings
- **Real-world applications** and industrial uses

### 🎨 **Premium Design System**
- **Elegant typography** using Playfair Display, Inter, and JetBrains Mono
- **Stunning red-black gradient icons** throughout the interface
- **Professional animations** with Framer Motion
- **Dark/light mode** with enhanced contrast for readability
- **Print-optimized layouts** for academic use
- **Responsive design** for all screen sizes
- **Accessibility features** with reduced motion support

## 🚀 **Quick Start**

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Google Gemini API key (free tier available)

### Installation

```bash
# Clone the repository
git clone https://github.com/HeyBatlle1/hayhuntdb.git
cd hayhuntdb

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Add your Google Gemini API key to .env.local
GEMINI_API_KEY=your_api_key_here

# Start development server
npm run dev

# Open http://localhost:3000 in your browser
```

### Production Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

## 🔧 **Configuration**

### Environment Variables

```env
# Required for AI features
GEMINI_API_KEY=your_google_gemini_api_key

# Optional: Analytics and tracking
NEXT_PUBLIC_GA_ID=your_google_analytics_id
```

### Getting a Google Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Add it to your `.env.local` file
4. The free tier includes generous limits for educational use

## 📚 **Usage Examples**

### Basic Element Exploration
```javascript
// Click any element to view detailed information
// Hover for instant AI-powered insights
// Double-click to add to comparison

// Example: Exploring Carbon
const carbonData = {
  name: "Carbon",
  symbol: "C",
  atomicNumber: 6,
  applications: ["Diamond jewelry", "Graphite lubricants", "Carbon fiber composites"]
};
```

### AI Chat Interface
```text
User: "What makes gold so special in chemistry?"
AI: "Gold's exceptional chemical inertness stems from relativistic effects that stabilize its 6s electrons, making it resistant to most chemical reactions..."

User: "Compare the electronegativity of fluorine and cesium"
AI: "Fluorine (4.0) and cesium (0.79) represent the extreme ends of electronegativity. This 3.21 difference demonstrates the dramatic variation across the periodic table..."
```

## 🛠 **Technology Stack**

### **Frontend Framework**
- **Next.js 14** - React framework with App Router
- **React 18** - Component-based UI library
- **TypeScript 5** - Type-safe development

### **Styling & Animation**
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **Framer Motion** - Production-ready motion library
- **Custom CSS** - Premium typography and gradient systems

### **AI & Data**
- **Google Gemini 2.0 Flash** - Advanced AI model for chemistry insights
- **IUPAC 2016 Standard** - Official chemical data
- **Custom element database** - Comprehensive chemical properties

### **UI Components**
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icon library with custom gradients
- **Custom components** - Academic-grade interfaces

## 📄 **License**

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🙏 **Acknowledgments**

### **Data Sources**
- **IUPAC Commission on Isotopic Abundances and Atomic Weights (2016)**
- **NIST Chemistry WebBook** - Physical and chemical properties
- **Periodic Table JSON** by Bowserinator - Base element data
- **PubChem** - Chemical compound information

### **Technology Partners**
- **Google Gemini AI** - Advanced language model for chemistry insights
- **Bolt.New** - Rapid development and deployment platform
- **Netlify** - Hosting and deployment infrastructure
- **GitHub** - Version control and collaboration

---

<div align="center">

### **🧪 Built with passion for chemistry education and powered by AI 🤖**

**[⭐ Star this repository](https://github.com/HeyBatlle1/hayhuntdb)** | **[🚀 Try Live Demo](https://your-domain.com)** | **[📖 Read Documentation](https://github.com/HeyBatlle1/hayhuntdb/wiki)**


</div>

---

<div align="center">

**🔬 Proudly powered by [HayHuntDB.Online](https://hayhuntdb.online) - Your trusted source for advanced chemical database solutions and educational tools.**

*Advancing chemistry education through innovative technology and AI-powered insights.*

</div>
