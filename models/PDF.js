// /models/PDF.js
import mongoose from "mongoose";

const PDFSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    filename: { type: String, required: true },
    filePath: { type: String, required: true },
    summary: { type: String },
    annotations: [{
        text: String,
        page: Number,
        coordinates: { x: Number, y: Number }
    }],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("PDF", PDFSchema);