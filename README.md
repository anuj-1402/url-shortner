# 🔗 URL Shortener :- Mini-Full Stack Application

A modern, full-stack URL shortener with analytics, automatic expiration, and smart duplicate detection.

## 🌟 Features

- **Smart URL Management**: Detects existing URLs and offers choice to reuse or create new
- **Beautiful Modal Interface**: User-friendly dialog for URL choices
- **Analytics Dashboard**: Click tracking with timestamps
- **Auto-Expiration**: URLs automatically deleted after 24 hours
- **Responsive Design**: Modern UI with Tailwind CSS
- **MongoDB Integration**: Scalable database with TTL indexing

## 🏗️ Architecture

```
📁 URL-Shortener-Project/
├── 📁 URLshortner-backend/         # Express.js API
├── 📁 URLshortner-frontend/        # React Frontend
│   └── 📁 zfrontend/
│       └── 📁 urlshrtner/          # Vite + React + Tailwind
└── 📄 DEPLOYMENT_GUIDE.md          # Deployment instructions
```

## 🚀 Deployment

### Prerequisites
- MongoDB Atlas cluster
- GitHub repository
- Render account (for backend)
- Vercel account (for frontend)

### Backend Deployment (Deploy First)
1. Go to [render.com](https://render.com)
2. Create new **Web Service**
3. Connect your GitHub repository
4. Configure:
   - **Root Directory**: `URLshortner-backend`
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Add Environment Variables:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
   NODE_ENV=production
   ```
6. Deploy and note the backend URL (e.g., `https://your-app.onrender.com`)

### Frontend Deployment (Deploy Second)
1. Go to [vercel.com](https://vercel.com)
2. Import this repository
3. Create new project with:
   - **Root Directory**: `URLshortner-frontend/zfrontend/urlshrtner`
   - **Framework**: Vite
4. Add Environment Variables:
   ```
   VITE_API_URL=https://your-backend-name.onrender.com
   ```
5. Deploy

## 🌐 Live Demo

- **Frontend**: [https://url-shortner-tawny-kappa.vercel.app](https://url-shortner-tawny-kappa.vercel.app)
- **Backend API**: [https://urlshortnerbackend-1kvx.onrender.com](https://urlshortnerbackend-1kvx.onrender.com)

## 🔐 Environment Variables

### Backend (.env) - Render
```bash
MONGODB_URI=your_mongodb_atlas_connection_string
NODE_ENV=production
FRONTEND_URL=https://your-frontend-app.vercel.app
```

### Frontend (.env) - Vercel
```bash
VITE_API_URL=https://your-backend-app.onrender.com
```

## 🛠️ Local Development

### Backend
```bash
cd URLshortner-backend
npm install
npm start
```

### Frontend
```bash
cd URLshortner-frontend/zfrontend/urlshrtner
npm install
npm run dev
```

## 📊 Database Schema

### URL Model
- `shortId`: Unique 8-character identifier
- `redirectUrl`: Original URL
- `visitHistory`: Array of click timestamps
- `expiresAt`: TTL field (24 hours)
- `createdAt`: Creation timestamp

## 🔄 API Endpoints

- `POST /api/url/shorten` - Create/get short URL
- `POST /api/url/check` - Check if URL exists
- `GET /api/url/:shortId` - Redirect to original URL
- `GET /api/url/analytics/:shortId` - Get analytics data

## 🎯 Key Features

### Smart Duplicate Detection
- Checks if URL already exists
- Shows modal with options: use existing or create new
- Preserves analytics for existing URLs

### Auto-Expiration
- MongoDB TTL index automatically deletes URLs after 24 hours
- Saves storage space and improves privacy

### Analytics Tracking
- Tracks every click with timestamp
- Displays total clicks and visit history
- Combined analytics for duplicate URLs

Made with ❤️ using React, Express.js, MongoDB, and Tailwind CSS
