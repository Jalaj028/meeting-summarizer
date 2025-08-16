# Deployment Guide - Vercel

This guide will help you deploy both frontend and backend to Vercel.

## Prerequisites
- Vercel account (sign up at [vercel.com](https://vercel.com))
- Git repository (GitHub, GitLab, or Bitbucket)
- Vercel CLI installed: `npm i -g vercel`

## Step 1: Deploy Backend

### Option A: Using Vercel CLI (Recommended)

1. Navigate to backend directory:
```bash
cd backend
```

2. Deploy to Vercel:
```bash
vercel
```

3. Follow the prompts:
   - Confirm deployment
   - Select scope (your account)
   - Link to existing project? **No** (first time)
   - Project name: `meeting-summarizer-backend`
   - Directory: `./` (current directory)

4. Add environment variables:
```bash
vercel env add GROQ_API_KEY
vercel env add EMAIL_USER  
vercel env add EMAIL_PASS
```

5. Redeploy with env variables:
```bash
vercel --prod
```

6. Note your backend URL: `https://meeting-summarizer-backend.vercel.app`

### Option B: Using Vercel Dashboard

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your Git repository
3. Select the `backend` folder as root directory
4. Add environment variables:
   - `GROQ_API_KEY`: Your Groq API key
   - `EMAIL_USER`: Your Gmail address
   - `EMAIL_PASS`: Your Gmail app password
5. Deploy

## Step 2: Deploy Frontend

### Option A: Using Vercel CLI

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Deploy to Vercel:
```bash
vercel
```

3. Follow the prompts:
   - Project name: `meeting-summarizer-frontend`
   - Framework: Next.js (auto-detected)
   - Build settings: use defaults

4. Add environment variable with your backend URL:
```bash
vercel env add NEXT_PUBLIC_API_URL
# Enter: https://meeting-summarizer-backend.vercel.app
```

5. Redeploy with env variable:
```bash
vercel --prod
```

### Option B: Using Vercel Dashboard

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your Git repository
3. Select the `frontend` folder as root directory
4. Framework preset: Next.js (auto-detected)
5. Add environment variable:
   - `NEXT_PUBLIC_API_URL`: Your backend URL from Step 1
6. Deploy

## Step 3: Verify Deployment

1. **Test Backend**: 
   - Visit: `https://your-backend-url.vercel.app/api/health`
   - Should return: `{"status":"OK","message":"Server is running"}`

2. **Test Frontend**:
   - Visit: `https://your-frontend-url.vercel.app`
   - Try uploading a transcript and generating a summary

## Environment Variables Summary

### Backend (.env)
```env
GROQ_API_KEY=gsk_xxxxxxxxxxxx
EMAIL_USER=yourapp@gmail.com
EMAIL_PASS=xxxx xxxx xxxx xxxx
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=https://meeting-summarizer-backend.vercel.app
```

## Troubleshooting

### CORS Issues
If you get CORS errors, update the backend `server.js`:
```javascript
app.use(cors({
  origin: 'https://your-frontend-url.vercel.app',
  credentials: true
}));
```

### Cold Starts
Vercel free tier may have cold starts. First request after inactivity might be slow.

### Email Not Sending
- Verify Gmail app password is correct
- Check Vercel Function logs for errors
- Ensure environment variables are set in production

## Updating After Changes

### Backend Updates
```bash
cd backend
vercel --prod
```

### Frontend Updates
```bash
cd frontend
vercel --prod
```

## Alternative: Single Repository Deployment

If you want both in one deployment:

1. Create `vercel.json` in root:
```json
{
  "projects": [
    {
      "name": "backend",
      "root": "backend"
    },
    {
      "name": "frontend", 
      "root": "frontend"
    }
  ]
}
```

2. Deploy from root:
```bash
vercel
```

## Free Tier Limits

Vercel Free Tier includes:
- 100GB bandwidth/month
- 100GB-hours serverless function execution
- 1000 image optimizations/month
- Unlimited deployments

More than enough for this project!

## Next Steps

After deployment:
1. Share your app URL with users
2. Monitor usage in Vercel dashboard
3. Set up custom domain (optional)
4. Enable analytics (optional)

## Support

If you encounter issues:
1. Check Vercel Function logs
2. Verify environment variables
3. Test API endpoints directly
4. Check browser console for errors