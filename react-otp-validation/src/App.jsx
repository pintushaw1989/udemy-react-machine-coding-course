import { useEffect, useRef, useState } from "react";
import "./App.css";

const OTP_INPUT_BOX = 4;
const RESEND_TIME = 30;

const App = () => {
  const [inputArr, setInputArr] = useState(new Array(OTP_INPUT_BOX).fill(""));
  const [timeLeft, setTimeLeft] = useState(RESEND_TIME);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const refArr = useRef([]);

  // Focus first input on load
  useEffect(() => {
    refArr.current[0]?.focus();
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

  // Auto-submit OTP when filled
  useEffect(() => {
    const otp = inputArr.join("");

    if (otp.length === OTP_INPUT_BOX) {
      console.log("OTP Submitted:", otp);
    }
  }, [inputArr]);

  const handleInputChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;

    const newvalue = value.trim();
    const newInput = [...inputArr];
    newInput[index] = newvalue.slice(-1);
    setInputArr(newInput);

    // move cursor to next input
    newvalue && refArr.current[index + 1]?.focus();
  };

  const handleOnKeyDown = (e, index) => {
    if (!e.target.value && e.key === "Backspace") {
      refArr.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();

    const pasteData = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, OTP_INPUT_BOX);

    const newInput = [...inputArr];

    for (let i = 0; i < pasteData.length; i++) {
      newInput[i] = pasteData[i];
    }
    setInputArr(newInput);

    if (pasteData.length > 0) {
      refArr.current[pasteData.length - 1]?.focus();
    }
  };

  const handleResend = () => {
    console.log("Resend OTP clicked");

    // Reset inputs
    setInputArr(new Array(OTP_INPUT_BOX).fill(""));

    // Restart timer
    setTimeLeft(RESEND_TIME);
    setIsResendDisabled(true);

    // Focus first input
    refArr.current[0]?.focus();
  };

  return (
    <div className="app" onPaste={handlePaste}>
      <h1>OTP validation</h1>
      <div className="otp-container">
        <div>
          {inputArr.map((input, index) => {
            return (
              <input
                ref={(input) => (refArr.current[index] = input)}
                className="otp-input"
                type="tel"
                inputMode="numeric"
                key={index}
                aria-label={`OTP digit ${index + 1}`}
                value={inputArr[index]}
                onChange={(e) => handleInputChange(e.target.value, index)}
                onKeyDown={(e) => handleOnKeyDown(e, index)}
                onFocus={(e) => e.target.select()}
              />
            );
          })}
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
    </div>
  );
};

export default App;
