const express = require("express");
const router = express.Router();
const { authenticateUser, checkPremiumAccess } = require("../Middlewares/Authmiddleware");
const { getPremiumDashboard } = require("../Controllers/premiumController");

// Premium Dashboard Route
router.get("/dashboard", authenticateUser, checkPremiumAccess, getPremiumDashboard);

module.exports = router;
