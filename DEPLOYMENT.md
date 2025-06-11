# 🚀 Deployment Guide

## Quick Deploy to Vercel (Recommended)

### 1. **Prepare Environment Variables**
```bash
# Copy the example environment file
cp .env.example .env.local

# Add your Google Gemini API key
echo "GEMINI_API_KEY=your_api_key_here" >> .env.local
```

### 2. **Get Google Gemini API Key**
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated key

### 3. **Deploy to Vercel**

#### Option A: One-Click Deploy
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/interactive-periodic-table&env=GEMINI_API_KEY&envDescription=Google%20Gemini%20API%20Key%20for%20AI%20features&envLink=https://makersuite.google.com/app/apikey)

#### Option B: Manual Deploy
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Set environment variable
vercel env add GEMINI_API_KEY production
# Paste your API key when prompted

# Redeploy with environment variables
vercel --prod
```

### 4. **Configure Domain (Optional)**
```bash
# Add custom domain
vercel domains add your-domain.com

# Configure DNS records as shown in Vercel dashboard
```

## Alternative Deployment Options

### **Netlify**
```bash
# Build the project
npm run build

# Deploy to Netlify
# 1. Drag and drop the 'out' folder to Netlify
# 2. Or connect your GitHub repository
# 3. Set environment variable: GEMINI_API_KEY
```

### **GitHub Pages**
```bash
# Enable GitHub Pages in repository settings
# Set source to GitHub Actions

# The project will auto-deploy on push to main branch
```

### **Self-Hosted**
```bash
# Build for production
npm run build

# Serve static files
npx serve out

# Or use any static file server
# nginx, Apache, etc.
```

## Environment Variables Reference

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `GEMINI_API_KEY` | ✅ | Google Gemini API key for AI features | `AIzaSy...` |
| `NEXT_PUBLIC_GA_ID` | ❌ | Google Analytics tracking ID | `G-XXXXXXXXXX` |
| `NEXT_PUBLIC_APP_URL` | ❌ | Your app's URL for sharing features | `https://your-domain.com` |

## Performance Optimization

### **Enable Caching**
```nginx
# nginx configuration
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

### **CDN Configuration**
- Enable Vercel's Edge Network (automatic)
- Or configure CloudFlare for custom domains

### **Monitoring**
```bash
# Add performance monitoring
npm install @vercel/analytics

# Add to your app
import { Analytics } from '@vercel/analytics/react';
```

## Security Considerations

### **API Key Security**
- ✅ Never commit API keys to version control
- ✅ Use environment variables only
- ✅ Rotate keys regularly
- ✅ Monitor API usage

### **Content Security Policy**
```javascript
// next.config.js
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: "default-src 'self'; script-src 'self' 'unsafe-eval'; style-src 'self' 'unsafe-inline';"
  }
];
```

## Troubleshooting

### **Common Issues**

#### API Key Not Working
```bash
# Check environment variable
echo $GEMINI_API_KEY

# Verify in browser console
console.log(process.env.GEMINI_API_KEY);
```

#### Build Failures
```bash
# Clear cache and reinstall
rm -rf .next node_modules package-lock.json
npm install
npm run build
```

#### Deployment Errors
```bash
# Check build logs
vercel logs your-deployment-url

# Test locally first
npm run build
npm start
```

### **Support**
- 📧 Email: support@hayhuntdb.online
- 🐛 Issues: [GitHub Issues](https://github.com/your-username/interactive-periodic-table/issues)
- 📚 Docs: [Project Wiki](https://github.com/your-username/interactive-periodic-table/wiki)

## Post-Deployment Checklist

- [ ] ✅ AI features working (test chat interface)
- [ ] ✅ All elements loading correctly
- [ ] ✅ Responsive design on mobile
- [ ] ✅ Dark/light mode toggle working
- [ ] ✅ Print functionality working
- [ ] ✅ Performance score >90 (Lighthouse)
- [ ] ✅ SEO optimized
- [ ] ✅ Accessibility compliant
- [ ] ✅ Analytics tracking (if enabled)
- [ ] ✅ Custom domain configured (if applicable)

---

**🎉 Congratulations! Your AI-Enhanced Periodic Table is now live!**

Share your deployment:
- 🌐 Website: `https://your-domain.com`
- 🐦 Twitter: Share with #PeriodicTableAI #Chemistry #Education
- 📧 Email: Tell your chemistry colleagues!