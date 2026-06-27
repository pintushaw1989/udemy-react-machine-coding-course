import OTPInput from "./components/OTPInput";
import "./App.css";

const App = () => {
  const handleComplete = (otp) => {
    console.log("OTP Submitted:", otp);
    // Call your API here
  };

  const handleResend = () => {
    console.log("Resend OTP clicked");
    // Call your resend API here
  };

  return (
    <div className="app">
      <h1>OTP Validation</h1>
      <OTPInput
        numInputs={4}
        resendTime={30}
        onComplete={handleComplete}
        onResend={handleResend}
      />
    </div>
  );
};

export default App;
