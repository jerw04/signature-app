import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DocumentDashboard = ({ refresh }) => {
  const [documents, setDocuments] = useState([]);

  const fetchDocuments = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/docs/', {
        headers: { 'x-auth-token': token }
      });
      setDocuments(res.data);
    } catch (err) {
      console.error('Error fetching documents:', err);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, [refresh]); // reload whenever refresh toggles

  return (
    <div className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-indigo-700">📂 Your Uploaded Documents</h2>
      {documents.length === 0 ? (
        <p className="text-gray-600">No documents uploaded yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {documents.map((doc) => (
            <div key={doc._id} className="p-5 bg-white rounded-xl border shadow-lg hover:shadow-xl transition duration-300">
              <h3 className="text-lg font-semibold text-indigo-700 truncate">
                📄 {doc.originalname}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Uploaded on {new Date(doc.createdAt).toLocaleString()}
              </p>

              {/* Action Buttons */}
              <div className="mt-3 flex space-x-2">
                <a
                  href={`http://localhost:5000/${doc.path.replace(/\\/g, '/')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-indigo-500 text-white px-3 py-1.5 rounded hover:bg-indigo-600 text-sm transition"
                >
                  🔍 Preview
                </a>

                <button
                  onClick={() =>
                    window.open(
                      `/sign?file=${encodeURIComponent(doc.path)}`,
                      '_blank'
                    )
                  }
                  className="bg-yellow-500 text-white px-3 py-1.5 rounded hover:bg-yellow-600 text-sm transition"
                >
                  🖊 Sign
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DocumentDashboard;
