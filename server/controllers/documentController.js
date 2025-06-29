const Document = require('../models/Document');

// Upload a new document
exports.uploadDocument = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded or invalid file type' });
  }

  const newDocument = new Document({
    userId: req.user.userId,
    filename: req.file.filename,
    path: req.file.path,
    originalname: req.file.originalname
  });

  newDocument.save()
    .then(doc => res.status(201).json(doc))
    .catch(err => res.status(500).json({ 
        message: 'Document upload failed', 
        error: err.message 
    }));
};

// ✅ Get all documents uploaded by the logged-in user
exports.getUserDocuments = async (req, res) => {
  try {
    const userId = req.user.userId; // Injected by authMiddleware
    const docs = await Document.find({ userId }).sort({ createdAt: -1 }); // latest first
    res.json(docs);
  } catch (error) {
    console.error('Error fetching documents:', error.message);
    res.status(500).json({ message: 'Server error fetching documents' });
  }
};
