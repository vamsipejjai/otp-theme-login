import express from "express";
import { sendEmailOtp } from "../services/emailService.js";
import { sendSmsOtp } from "../services/smsService.js";

const router = express.Router();

// Define South Indian states
const SOUTH_STATES = [
  "Tamil Nadu",
  "Kerala",
  "Karnataka",
  "Andhra Pradesh",
  "Telangana",
];

// OTP storage in memory (use Redis/DB in production)
global.otpStore = global.otpStore || {};

// Helper to generate a 6-digit OTP
function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// 📌 Login route → send OTP
router.post("/login", async (req, res) => {
  try {
    const { email, phone, state } = req.body;

    if (!state) {
      return res.status(400).json({ message: "State is required" });
    }

    const otp = generateOtp();

    if (SOUTH_STATES.includes(state)) {
      if (!email) {
        return res.status(400).json({ message: "Email is required for South states" });
      }
      global.otpStore[email] = otp;
      await sendEmailOtp(email, otp);

      console.log(`📧 OTP for ${email}: ${otp}`);
      return res.json({ message: "📧 OTP sent to your Email (South India)" });
    } else {
      if (!phone) {
        return res.status(400).json({ message: "Phone number is required for Other states" });
      }
      global.otpStore[phone] = otp;
      await sendSmsOtp(phone, otp);

      console.log(`📱 OTP for ${phone}: ${otp}`);
      return res.json({ message: "📱 OTP sent to your Mobile (Other States)" });
    }
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error while sending OTP" });
  }
});

// 📌 Verify OTP
router.post("/verify-otp", async (req, res) => {
  try {
    const { email, phone, otp } = req.body;

    let key = email || phone;
    if (!key) {
      return res.status(400).json({ message: "Email or Phone is required" });
    }

    console.log("🔍 Verifying:", key,
      "| Stored OTP:", global.otpStore[key],
      "| User OTP:", otp);

    if (global.otpStore[key] && global.otpStore[key] === otp) {
      delete global.otpStore[key]; // clear after success
      return res.json({ message: "✅ OTP Verified! Login successful." });
    } else {
      return res.status(400).json({ message: "❌ OTP verification failed" });
    }
  } catch (err) {
    console.error("OTP verify error:", err);
    res.status(500).json({ message: "Server error while verifying OTP" });
  }
});

export default router;
