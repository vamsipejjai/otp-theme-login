import React, { useState } from "react";
import api from "../services/api";

const OTPVerification = ({ destination }) => {
    const [otp, setOtp] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post("/auth/verify-otp", { destination, otp });
            setMessage(res.data.message);
        } catch (err) {
            setMessage(err.response?.data?.message || "Error verifying OTP");
        }
    };

    return (
        <div style={{ maxWidth: "400px", margin: "0 auto" }}>
            <h2>Enter OTP sent to {destination}</h2>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <input
                    name="otp"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                />
                <button type="submit" style={{ padding: "10px", cursor: "pointer" }}>Verify OTP</button>
            </form>
            {message && <p style={{ marginTop: "10px" }}>{message}</p>}
        </div>
    );
};

export default OTPVerification;
