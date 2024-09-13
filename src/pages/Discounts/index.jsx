import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Discounts() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null); // Success or failure state
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setUploadStatus(null); // Reset status when new file is selected
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file first.');
      return;
    }

    setLoading(true); // Start loading

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(
        'https://qc.hpcfuelrite.com/api/v2/admin/bulkImport/discounts',
        formData,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiJDJhJDEwJHJJOW5TdnpKRnJxM003STFRUEZoRi5tNjFRSmExN3pzeXB5UnM1Wm5CVE50bFNRTTk3MmxtIiwiaWF0IjoxNzI1ODg5Mzg0LCJleHAiOjI1ODk4ODkzODR9.apTjdEno8uqCsL1JbXn7Nc0__sgGscpgdBRSKH6OV1I`, // Replace with actual token
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log('Response:', response);
      setUploadStatus('success'); // Set success status
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadStatus('error'); // Set error status
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-pink-400 to-purple-600 relative">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black opacity-30"></div>

      {/* Main Content */}
      <div className="relative z-10 bg-white p-8 rounded-3xl shadow-2xl max-w-md w-full">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Upload Discounts</h2>

        {/* File Input */}
        <div className="mb-6">
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
          />
        </div>

        {/* Upload Button */}
        <button
          onClick={handleUpload}
          className={`w-full py-3 rounded-lg text-white font-semibold transition-all duration-300 ${
            loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
          }`}
          disabled={loading}
        >
          {loading ? 'Uploading...' : 'Upload'}
        </button>

        {/* Status Message */}
        {uploadStatus === 'success' && (
          <p className="mt-4 text-green-500 text-center">File uploaded successfully!</p>
        )}
        {uploadStatus === 'error' && (
          <p className="mt-4 text-red-500 text-center">Failed to upload file.</p>
        )}

        {/* Back to Home Button */}
        <button
          onClick={() => navigate('/')}
          className="w-full py-3 mt-4 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all duration-300"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default Discounts;
