'use client';

import { useState } from 'react';

export default function Home() {
  // State management
  const [transcript, setTranscript] = useState('');
  const [summary, setSummary] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [emailRecipients, setEmailRecipients] = useState('');
  const [emailStatus, setEmailStatus] = useState('');

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (!uploadedFile) return;
    
    setFile(uploadedFile);
    
    // Read and display file content
    const reader = new FileReader();
    reader.onload = (event) => {
      setTranscript(event.target?.result as string);
    };
    reader.readAsText(uploadedFile);
  };

  // Generate summary from transcript
  const generateSummary = async () => {
    if (!transcript && !file) {
      alert('Please provide a transcript');
      return;
    }

    setIsLoading(true);
    
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      
      // Prepare request body
      const body = file 
        ? (() => {
            const formData = new FormData();
            formData.append('transcript', file);
            return formData;
          })()
        : JSON.stringify({ text: transcript });

      // Make API call
      const response = await fetch(`${apiUrl}/api/summarize`, {
        method: 'POST',
        body: body,
        headers: file ? {} : { 'Content-Type': 'application/json' }
      });

      const data = await response.json();

      if (data.success) {
        setSummary(data.summary);
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      alert('Failed to generate summary');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Send summary via email
  const sendEmail = async () => {
    if (!summary || !emailRecipients) {
      alert('Please generate a summary and enter recipients');
      return;
    }

    setIsLoading(true);
    
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const recipients = emailRecipients.split(',').map(email => email.trim());

      const response = await fetch(`${apiUrl}/api/send-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipients,
          subject: 'Meeting Summary',
          summary
        })
      });

      const data = await response.json();
      
      if (data.success) {
        setEmailStatus('✓ Email sent successfully');
        setEmailRecipients('');
      } else {
        setEmailStatus(`✗ ${data.error}`);
      }
    } catch (error) {
      setEmailStatus('✗ Failed to send email');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Meeting Summarizer</h1>

        {/* Input Section */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">1. Add Transcript</h2>
          
          {/* File Upload */}
          <input
            type="file"
            accept=".txt"
            onChange={handleFileUpload}
            className="mb-4 block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />

          <div className="text-center text-gray-400 mb-4">— OR —</div>

          {/* Text Input */}
          <textarea
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            placeholder="Paste your meeting transcript here..."
            className="w-full p-3 border rounded-md h-64 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />

          {/* Generate Button */}
          <button
            onClick={generateSummary}
            disabled={isLoading || (!transcript && !file)}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
          >
            {isLoading ? 'Processing...' : 'Generate Summary'}
          </button>
        </div>

        {/* Summary Display */}
        {summary && (
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">2. Summary</h2>
            <textarea
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="w-full p-4 border rounded-md h-80 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm leading-relaxed"
            />
          </div>
        )}

        {/* Email Section */}
        {summary && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">3. Share via Email</h2>
            
            <input
              type="text"
              value={emailRecipients}
              onChange={(e) => setEmailRecipients(e.target.value)}
              placeholder="email1@example.com, email2@example.com"
              className="w-full p-4 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
            />
            
            <button
              onClick={sendEmail}
              disabled={isLoading || !emailRecipients}
              className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-gray-400"
            >
              {isLoading ? 'Sending...' : 'Send Email'}
            </button>
            
            {emailStatus && (
              <p className={`mt-3 ${emailStatus.includes('✓') ? 'text-green-600' : 'text-red-600'}`}>
                {emailStatus}
              </p>
            )}
          </div>
        )}
      </div>
    </main>
  );
}