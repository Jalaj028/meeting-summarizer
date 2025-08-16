# Meeting Summarizer

A clean, simple web application that uses AI to summarize meeting transcripts and share them via email.

## Features

- **Upload or Paste Transcripts**: Support for .txt file uploads or direct text input
- **AI-Powered Summarization**: Uses Groq's LLaMA model for intelligent summarization
- **Editable Summaries**: Review and edit summaries before sharing
- **Email Integration**: Send summaries to multiple recipients directly from the app
- **Clean Interface**: Simple, user-friendly design with clear workflow steps

## Tech Stack

### Backend
- **Node.js + Express**: REST API server
- **Groq SDK**: AI model integration for text summarization
- **Nodemailer**: Email sending functionality
- **Multer**: File upload handling

### Frontend
- **Next.js 15**: React framework with TypeScript
- **Tailwind CSS**: Utility-first styling
- **React Hooks**: State management

## Project Structure

```
meeting-summarizer/
├── backend/
│   ├── server.js         # Express server with API endpoints
│   ├── package.json      # Backend dependencies
│   ├── .env             # Environment variables (create this)
│   └── uploads/         # Temporary file storage
│
├── frontend/
│   ├── app/
│   │   ├── page.tsx     # Main application component
│   │   ├── layout.tsx   # Root layout
│   │   └── globals.css  # Global styles
│   ├── package.json     # Frontend dependencies
│   └── next.config.ts   # Next.js configuration
│
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js 18+ installed
- Gmail account for email functionality
- Groq API key (get from [console.groq.com](https://console.groq.com))

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
# Groq API Configuration
GROQ_API_KEY=your_groq_api_key_here

# Email Configuration (Gmail)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_specific_password

# Server Port
PORT=5000
```

4. For Gmail setup:
   - Enable 2-factor authentication in your Google account
   - Generate an app-specific password at [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
   - Use this password in `EMAIL_PASS`

5. Start the backend server:
```bash
npm start
```

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env.local` file (optional):
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## API Endpoints

### `GET /api/health`
Health check endpoint to verify server status.

### `POST /api/summarize`
Generates AI summary from transcript.

**Request Body:**
- `transcript` (file): Text file upload
- OR `text` (string): Direct text input
- `prompt` (string, optional): Custom summarization instructions

**Response:**
```json
{
  "success": true,
  "summary": "Generated summary text...",
  "originalLength": 1234,
  "summaryLength": 456
}
```

### `POST /api/send-email`
Sends summary via email to specified recipients.

**Request Body:**
```json
{
  "recipients": ["email1@example.com", "email2@example.com"],
  "subject": "Meeting Summary",
  "summary": "Summary content..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Email sent to 2 recipient(s)"
}
```

## Usage Guide

1. **Upload Transcript**: Click "Choose File" to upload a .txt file, or paste text directly
2. **Generate Summary**: Click "Generate Summary" to process the transcript
3. **Review & Edit**: The AI-generated summary appears in an editable text box
4. **Send Email**: Enter recipient emails (comma-separated) and click "Send Email"

## Development

### Running in Development Mode

Backend:
```bash
cd backend
npm run dev  # Uses nodemon for auto-restart
```

Frontend:
```bash
cd frontend
npm run dev  # Next.js development server
```

### Building for Production

Frontend:
```bash
cd frontend
npm run build
npm start
```

## Deployment

### Backend (Vercel)
The backend includes a `vercel.json` configuration for easy deployment:
```bash
cd backend
vercel
```

### Frontend (Vercel/Netlify)
```bash
cd frontend
npm run build
# Deploy the .next folder
```

### Environment Variables
Remember to set environment variables in your hosting platform:
- Backend: `GROQ_API_KEY`, `EMAIL_USER`, `EMAIL_PASS`
- Frontend: `NEXT_PUBLIC_API_URL` (your backend URL)

## Troubleshooting

### Common Issues

1. **"Failed to generate summary"**
   - Check if backend is running on port 5000
   - Verify GROQ_API_KEY is valid
   - Check browser console for CORS errors

2. **Email not sending**
   - Verify Gmail app-specific password is correct
   - Check if "Less secure app access" is needed
   - Ensure recipient emails are valid

3. **File upload not working**
   - Verify file is .txt format
   - Check file size is under 10MB
   - Ensure uploads/ directory exists in backend

## Security Notes

- Never commit `.env` files to version control
- Use environment variables for all sensitive data
- Enable CORS only for trusted domains in production
- Implement rate limiting for production use
- Consider adding authentication for sensitive deployments

## Future Enhancements

- [ ] Support for more file formats (PDF, DOCX)
- [ ] Multiple language support
- [ ] Custom email templates
- [ ] Meeting action items extraction
- [ ] Real-time collaboration features
- [ ] Integration with calendar apps

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

For issues or questions, please create an issue in the GitHub repository.