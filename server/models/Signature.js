const mongoose = require('mongoose');

const SignatureSchema = new mongoose.Schema({
  fileId: { type: String, required: true },
  page: { type: Number, default: 1 },
  x: { type: Number, required: true },
  y: { type: Number, required: true },
  signer: { type: String }, // optional
  status: { type: String, default: 'placed' } // or 'signed'
}, { timestamps: true });

module.exports = mongoose.model('Signature', SignatureSchema);
