// /routes/pdfRoutes.js
const express = require('express');
const router = express.Router();
import pdfController from "../Controllers/pdfController";
import AuthMiddleware from "../middleware/AuthMiddleware";
const multer = require("multer");

// Set up file storage for PDF uploads
const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({ storage });

// Routes
router.post("/upload", AuthMiddleware, upload.single("pdf"), pdfController.uploadPDF);
router.get("/user", AuthMiddleware, pdfController.getUserPDFs);
router.delete("/:id", AuthMiddleware, pdfController.deletePDF);

module.exports = router;
