const Signature = require('../models/Signature');

exports.saveSignature = async (req, res) => {
  try {
    const { fileId, x, y, page, signer } = req.body;
    if (!fileId || x === undefined || y === undefined) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const signature = new Signature({ fileId, x, y, page, signer });
    await signature.save();
    res.status(201).json({ message: 'Signature saved', signature });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
