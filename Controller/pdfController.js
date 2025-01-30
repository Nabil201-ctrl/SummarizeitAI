// /controllers/pdfController.js
import PDF from "../models/PDF";
import fs  from "fs";
import path from "path";

// Upload PDF
exports.uploadPDF = async (req, res) => {
    try {
        const { filename, path: filePath } = req.file;
        const pdf = new PDF({ userId: req.user.id, filename, filePath });
        await pdf.save();
        res.status(201).json({ message: "PDF uploaded successfully", pdf });
    } catch (error) {
        res.status(500).json({ message: "Error uploading PDF", error });
    }
};

// Get user PDFs
exports.getUserPDFs = async (req, res) => {
    try {
        const pdfs = await PDF.find({ userId: req.user.id });
        res.status(200).json(pdfs);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving PDFs", error });
    }
};

// Delete PDF
exports.deletePDF = async (req, res) => {
    try {
        const pdf = await PDF.findById(req.params.id);
        if (!pdf) return res.status(404).json({ message: "PDF not found" });

        if (pdf.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized to delete this PDF" });
        }

        fs.unlinkSync(path.join(__dirname, "../uploads/", pdf.filePath));
        await pdf.deleteOne();

        res.status(200).json({ message: "PDF deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting PDF", error });
    }
};