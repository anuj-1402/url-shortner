# 🚀 Vercel Deployment Checklist

## Prerequisites
- [ ] GitHub repository created and code pushed
- [ ] MongoDB Atlas database set up
- [ ] MongoDB connection string ready

## Backend Deployment Steps

### 1. Deploy Backend to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your `URLshortner-backend` folder
4. Configure project:
   - Framework Preset: **Other**
   - Root Directory: `URLshortner-backend`
   - Build Command: Leave empty
   - Output Directory: Leave empty
5. Add Environment Variables:
   - `MONGODB_URI` = Your MongoDB Atlas connection string
   - `NODE_ENV` = production

### 2. Get Backend URL
After deployment, you'll get a URL like: `https://your-backend-name.vercel.app`

## Frontend Deployment Steps

### 1. Update Frontend API URLs
Before deploying frontend, update the API URLs in your frontend code to point to your deployed backend.

### 2. Deploy Frontend to Vercel
1. Create another new project in Vercel
2. Import your `URLshortner-frontend/zfrontend/urlshrtner` folder
3. Configure project:
   - Framework Preset: **Vite**
   - Root Directory: `URLshortner-frontend/zfrontend/urlshrtner`
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Add Environment Variables:
   - `VITE_API_URL` = Your deployed backend URL

## Post-Deployment
- [ ] Test URL shortening functionality
- [ ] Test analytics functionality
- [ ] Test modal for existing URLs
- [ ] Verify TTL expiration works

## Environment Variables Needed

### Backend (.env)
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
NODE_ENV=production
```

### Frontend (.env)
```
VITE_API_URL=https://your-backend-name.vercel.app
```
