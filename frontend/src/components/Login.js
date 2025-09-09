import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  MenuItem,
  Select,
  TextField,
  Typography,
  InputLabel,
  FormControl,
} from "@mui/material";
import { loginUser, verifyOtp } from "../services/api";

const SOUTH_STATES = [
  "Tamil Nadu",
  "Kerala",
  "Karnataka",
  "Andhra Pradesh",
  "Telangana",
];

const ALL_STATES = [
  "Tamil Nadu",
  "Kerala",
  "Karnataka",
  "Andhra Pradesh",
  "Telangana",
  "Maharashtra",
  "Delhi",
  "Gujarat",
  "Rajasthan",
  "Punjab",
  "Uttar Pradesh",
  "West Bengal",
  "Bihar",
  "Odisha",
  "Haryana",
  "Madhya Pradesh",
  "Chhattisgarh",
  "Jharkhand",
  "Assam",
  "Other",
];

const Login = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [state, setState] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("login"); // login or verify
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    try {
      if (!state) {
        setMessage("Please select your state.");
        return;
      }

      const payload = { email, phone, state };
      const res = await loginUser(payload);
      setMessage(res.message);
      setStep("verify");
    } catch (err) {
      console.error("Login error:", err);
      setMessage("Error sending OTP.");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      let payload = {};

      if (SOUTH_STATES.includes(state)) {
        payload = { email, otp }; // only email for South states
      } else {
        payload = { phone, otp }; // only phone for Other states
      }

      const res = await verifyOtp(payload);
      setMessage(res.message);
    } catch (err) {
      console.error("Verify error:", err);
      setMessage("OTP verification failed.");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Box
        sx={{
          p: 4,
          borderRadius: 3,
          boxShadow: 3,
          bgcolor: "background.paper",
        }}
      >
        <Typography variant="h4" gutterBottom align="center">
          Login with OTP
        </Typography>

        {message && (
          <Typography
            variant="body1"
            align="center"
            color="primary"
            sx={{ mb: 2 }}
          >
            {message}
          </Typography>
        )}

        {step === "login" && (
          <>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              label="Phone Number"
              variant="outlined"
              fullWidth
              margin="normal"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <FormControl fullWidth margin="normal">
              <InputLabel>State</InputLabel>
              <Select value={state} onChange={(e) => setState(e.target.value)}>
                {ALL_STATES.map((s) => (
                  <MenuItem key={s} value={s}>
                    {s}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button
              variant="contained"
              fullWidth
              sx={{ mt: 2 }}
              onClick={handleLogin}
            >
              Send OTP
            </Button>
          </>
        )}

        {step === "verify" && (
          <>
            <TextField
              label="Enter OTP"
              variant="outlined"
              fullWidth
              margin="normal"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />

            <Button
              variant="contained"
              color="success"
              fullWidth
              sx={{ mt: 2 }}
              onClick={handleVerifyOtp}
            >
              Verify OTP
            </Button>
          </>
        )}
      </Box>
    </Container>
  );
};

export default Login;
