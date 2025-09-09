// OTP Service - Simple in-memory store
export const verifyOtpCode = (emailOrPhone, otp) => {
  if (!global.otpStore) return false;

  const storedOtp = global.otpStore[emailOrPhone];
  return storedOtp === otp;
};
