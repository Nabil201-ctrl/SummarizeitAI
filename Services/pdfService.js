// /services/pdfService.js
import PDF from"../models/PDF";

exports.addAnnotation = async (pdfId, annotation) => {
    try {
        const pdf = await PDF.findById(pdfId);
        if (!pdf) throw new Error("PDF not found");

        pdf.annotations.push(annotation);
        await pdf.save();
        return pdf;
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.getAnnotations = async (pdfId) => {
    try {
        const pdf = await PDF.findById(pdfId);
        if (!pdf) throw new Error("PDF not found");
        return pdf.annotations;
    } catch (error) {
        throw new Error(error.message);
    }
};