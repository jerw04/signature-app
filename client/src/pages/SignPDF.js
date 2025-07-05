import React, { useState, useRef, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import Draggable from 'react-draggable';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import sampleSignature from '../assets/sign.png';

pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.mjs';

const SignPDF = () => {
  const [numPages, setNumPages] = useState(null);
  const [signatureCoords, setSignatureCoords] = useState({ x: 100, y: 100 });
  const [existingSignature, setExistingSignature] = useState(null);
  const [searchParams] = useSearchParams();

  const filePath = searchParams.get('file');
  const pdfUrl = `http://localhost:5000/${filePath?.replace(/\\/g, '/')}`;
  const fileId = filePath?.split('/').pop()?.split('-')[0];

  useEffect(() => {
    const fetchSignature = async () => {
      if (!fileId) return;
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`http://localhost:5000/api/signatures/${fileId}`, {
          headers: { 'x-auth-token': token }
        });
        if (res.data) setExistingSignature(res.data);
      } catch (err) {
        console.warn('No previous signature found or fetch failed.');
      }
    };
    fetchSignature();
  }, [fileId]);

  const handleDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      const payload = {
        fileId,
        x: signatureCoords.x,
        y: signatureCoords.y,
        page: 1,
        signer: 'User'
      };

      const res = await axios.post('http://localhost:5000/api/signatures', payload, {
        headers: { 'x-auth-token': token }
      });

      alert('✅ Signature position saved!');
      console.log(res.data);
    } catch (err) {
      console.error(err);
      alert('❌ Failed to save signature.');
    }
  };

  return (
    <div className="flex flex-col items-center p-6">
      <h2 className="text-2xl font-bold mb-6 text-indigo-700">🖊 Drag Your Signature</h2>

      {/* Relative container to stack layers */}
      <div className="relative shadow-xl rounded-xl overflow-hidden" style={{ width: 600 }}>
        {/* PDF Layer */}
        <Document
          file={pdfUrl}
          onLoadSuccess={handleDocumentLoadSuccess}
          loading={<p className="text-center text-gray-500">Loading PDF...</p>}
          error={<p className="text-red-500">Failed to load PDF file.</p>}
        >
          <Page pageNumber={1} width={600} />
        </Document>

        {/* Stamped Signature Layer */}
        {existingSignature && (
          <div
            className="absolute pointer-events-none z-20"
            style={{
              top: `${existingSignature.y}px`,
              left: `${existingSignature.x}px`
            }}
          >
            <img
              src={sampleSignature}
              alt="Stamped Signature"
              className="w-24 h-auto grayscale opacity-60"
            />
          </div>
        )}

        {/* Draggable Signature Layer */}
        <Draggable
          bounds="parent"
          position={signatureCoords}
          onStop={(e, data) => setSignatureCoords({ x: data.x, y: data.y })}
        >
          <div
            className="absolute z-30 cursor-move"
            style={{
              top: 0,
              left: 0,
              transform: `translate(${signatureCoords.x}px, ${signatureCoords.y}px)`
            }}
          >
            <img
              src={sampleSignature}
              alt="Your Signature"
              className="w-32 h-auto opacity-90 pointer-events-none"
            />
          </div>
        </Draggable>
      </div>

      <button
        onClick={handleSave}
        className="mt-6 bg-green-600 text-white px-6 py-2 rounded-lg shadow hover:bg-green-700 transition"
      >
        Save Signature
      </button>
    </div>
  );
};

export default SignPDF;
