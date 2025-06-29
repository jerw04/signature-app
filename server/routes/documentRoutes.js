const express = require('express');
const router = express.Router();
const multer = require('multer'); // ✅ Add this line
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');
const documentController = require('../controllers/documentController');

// ✅ New route to get all documents by logged-in user
router.get('/', authMiddleware, documentController.getUserDocuments);

// ✅ Upload route
router.post(
  '/upload',
  authMiddleware,
  (req, res, next) => {
    upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ message: err.message });
      } else if (err) {
        return res.status(500).json({ message: err.message });
      }
      next();
    });
  },
  documentController.uploadDocument
);

module.exports = router;
