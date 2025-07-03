import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

const Upload = ({ onUploadComplete }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [animateOut, setAnimateOut] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    setAnimateOut(true); // Start animation

    const formData = new FormData();
    formData.append('document', file);

    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/docs/upload', formData, {
        headers: {
          'x-auth-token': token,
          'Content-Type': 'multipart/form-data'
        }
      });

      // Wait for animation to finish
      setTimeout(() => {
        setUploading(false);
        setFile(null);
        setAnimateOut(false);
        if (onUploadComplete) onUploadComplete();
      }, 800);
    } catch (error) {
      alert('Upload failed: ' + (error.response?.data.message || 'Unknown error'));
      setUploading(false);
      setAnimateOut(false);
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-gray-200 relative overflow-hidden">
      <h3 className="text-2xl font-bold mb-6 text-indigo-700 flex items-center gap-2">
        📤 Upload a PDF
      </h3>

      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <label className="w-full">
          <div className="flex justify-center items-center border border-dashed border-gray-400 p-4 rounded-md bg-gray-50 hover:bg-gray-100 cursor-pointer transition">
            <span className="text-gray-600 font-medium">
              {file ? file.name : 'Click to choose a file'}
            </span>
          </div>
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>

        <button
          onClick={handleUpload}
          disabled={!file || uploading}
          className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-2 rounded-md shadow hover:shadow-md hover:scale-105 transition font-medium"
        >
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
      </div>

      {/* Floating animation */}
      <AnimatePresence>
  {animateOut && file && (
    <motion.div
      initial={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
      animate={{ opacity: 0, y: 250, scale: 1.2, rotate: 5 }}
      exit={{ opacity: 0 }}
      transition={{
      duration: 2,       // ⏱️ increase duration (from 1.1 → 2 seconds)
      ease: 'easeOut',
      bounce: 0.3,
      delay: 0.2         // ⏳ small delay before movement starts
    }}

      className="absolute left-1/2 transform -translate-x-1/2 top-28 bg-indigo-100 text-indigo-800 px-6 py-3 rounded-xl shadow-lg text-lg font-semibold tracking-wide border border-indigo-300"
    >
      📄 {file.name}
    </motion.div>
  )}
</AnimatePresence>

    </div>
  );
};

export default Upload;
