# Vercel Deployment Guide

This guide will help you deploy both the backend and frontend to Vercel.

## Prerequisites
- Vercel account (create one at https://vercel.com)
- Vercel CLI installed: `npm i -g vercel`

## Backend Deployment

1. Navigate to the backend directory:
```bash
cd backend
```

2. Deploy using Vercel CLI:
```bash
vercel
```

3. Follow the prompts:
   - Link to existing project or create new one
   - Choose project name (e.g., "meeting-summarizer-backend")
   - Override settings if needed

4. Set environment variables in Vercel dashboard:
   - Go to your project settings on Vercel
   - Navigate to "Environment Variables"
   - Add the following:
     - `GROQ_API_KEY`: Your Groq API key
     - `EMAIL_USER`: Gmail address for sending emails
     - `EMAIL_PASS`: Gmail app password (not regular password)
     - `NODE_ENV`: production

5. Deploy to production:
```bash
vercel --prod
```

6. Note your backend URL (e.g., `https://meeting-summarizer-backend.vercel.app`)

## Frontend Deployment

1. Navigate to the frontend directory:
```bash
cd ../frontend
```

2. Create `.env.production` file:
```bash
echo "NEXT_PUBLIC_API_URL=https://your-backend-url.vercel.app" > .env.production
```
Replace `your-backend-url` with your actual backend URL from step 6 above.

3. Deploy using Vercel CLI:
```bash
vercel
```

4. Follow the prompts:
   - Link to existing project or create new one
   - Choose project name (e.g., "meeting-summarizer-frontend")
   - Override settings if needed

5. Deploy to production:
```bash
vercel --prod
```

## Alternative: Deploy via GitHub

1. Push your code to GitHub:
```bash
git add .
git commit -m "Add Vercel deployment configuration"
git push origin main
```

2. Go to https://vercel.com/new

3. Import your GitHub repository

4. Deploy backend:
   - Select the backend folder as root directory
   - Vercel will auto-detect the configuration
   - Add environment variables in the settings

5. Deploy frontend:
   - Create a new project
   - Select the frontend folder as root directory
   - Add `NEXT_PUBLIC_API_URL` environment variable pointing to your backend URL

## Important Notes

### CORS Configuration
The backend is already configured to accept requests from any origin. For production, you may want to restrict this to your frontend domain.

### Gmail App Password
To get a Gmail app password:
1. Enable 2-factor authentication on your Google account
2. Go to https://myaccount.google.com/apppasswords
3. Generate an app-specific password
4. Use this password for `EMAIL_PASS` environment variable

### Environment Variables Summary

**Backend (.env):**
- `GROQ_API_KEY`: Required for AI summarization
- `EMAIL_USER`: Gmail address
- `EMAIL_PASS`: Gmail app password
- `PORT`: (Optional, Vercel handles this)

**Frontend (.env.production):**
- `NEXT_PUBLIC_API_URL`: Your backend URL on Vercel

## Testing Your Deployment

1. Visit your frontend URL
2. Upload a sample transcript or paste text
3. Generate a summary
4. Test email functionality (optional)

## Troubleshooting

### Backend Issues
- Check Vercel function logs for errors
- Verify environment variables are set correctly
- Ensure GROQ_API_KEY is valid

### Frontend Issues
- Verify NEXT_PUBLIC_API_URL is set correctly
- Check browser console for CORS errors
- Ensure backend is deployed and accessible

### Email Issues
- Verify Gmail app password is correct
- Check that 2FA is enabled on Gmail account
- Review Gmail security settings

## Monitoring

- Use Vercel dashboard to monitor:
  - Function invocations
  - Error rates
  - Performance metrics
  - Logs

## Updating Your Deployment

To update after making changes:
```bash
# From backend or frontend directory
vercel --prod
```

Or if connected to GitHub, simply push to main branch for automatic deployment.