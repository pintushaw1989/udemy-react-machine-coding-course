import { useEffect, useRef, useState, useCallback } from "react";

const OTPInput = ({ numInputs = 4, resendTime = 30, onComplete, onResend }) => {
  const [otp, setOtp] = useState(new Array(numInputs).fill(""));
  const [timeLeft, setTimeLeft] = useState(resendTime);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const inputRefs = useRef([]);

  // Focus first input on mount
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  // Timer logic
  useEffect(() => {
    if (!isResendDisabled) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          setIsResendDisabled(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isResendDisabled]);

  // Auto-submit when OTP is complete
  useEffect(() => {
    const otpValue = otp.join("");
    if (otpValue.length === numInputs) {
      onComplete?.(otpValue);
    }
  }, [otp, numInputs, onComplete]);

  const handleChange = useCallback(
    (value, index) => {
      if (!/^\d*$/.test(value)) return;

      const newOtp = [...otp];
      newOtp[index] = value.slice(-1);
      setOtp(newOtp);

      // Move to next input
      if (value) {
        inputRefs.current[index + 1]?.focus();
      }
    },
    [otp],
  );

  const handleKeyDown = useCallback((e, index) => {
    if (e.key === "Backspace" && !e.target.value) {
      inputRefs.current[index - 1]?.focus();
    }
  }, []);

  const handlePaste = useCallback(
    (e) => {
      e.preventDefault();
      const pastedData = e.clipboardData
        .getData("text")
        .replace(/\D/g, "")
        .slice(0, numInputs);

      const newOtp = [...otp];
      for (let i = 0; i < pastedData.length; i++) {
        newOtp[i] = pastedData[i];
      }
      setOtp(newOtp);

      if (pastedData.length > 0) {
        inputRefs.current[pastedData.length - 1]?.focus();
      }
    },
    [otp, numInputs],
  );

  const handleResend = useCallback(() => {
    setOtp(new Array(numInputs).fill(""));
    setTimeLeft(resendTime);
    setIsResendDisabled(true);
    inputRefs.current[0]?.focus();
    onResend?.();
  }, [numInputs, resendTime, onResend]);

  return (
    <div className="otp-container" onPaste={handlePaste}>
      <div>
        {otp.map((value, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            className="otp-input"
            type="tel"
            inputMode="numeric"
            aria-label={`OTP digit ${index + 1}`}
            value={value}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onFocus={(e) => e.target.select()}
          />
        ))}
      </div>
      <div className="otp-footer">
        <button
          className="resend-btn"
          onClick={handleResend}
          disabled={isResendDisabled}
        >
          {isResendDisabled ? `Resend OTP in ${timeLeft}s` : "Resend OTP"}
        </button>
      </div>
    </div>
  );
};

export default OTPInput;
