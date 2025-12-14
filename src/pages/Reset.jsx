import { resetPassword, confirmResetPassword } from "aws-amplify/auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Reset() {
  const [email, setEmail] = useState("");
  const [confirmationCode, setConfirmationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState("reset");
  const [error, setError] = useState("");
  const confirm = async () => {
    try {
      await confirmResetPassword({
        username: email,
        confirmationCode: confirmationCode,
        newPassword: newPassword,
      });
      alert("Password reset successfull! Please sign in.");
      window.location.href = "/signin";
    } catch (err) {
      setError(err.message);
    }
  };
  const navigate = useNavigate();

  function back() {
    navigate("/signin");
  }

  const output = async () => {
    try {
      setError("");
      const { nextStep } = await resetPassword({ username: email });
      if (nextStep.resetPasswordStep === "CONFIRM_RESET_PASSWORD_WITH_CODE") {
        setStep("confirm");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  if (step === "confirm") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-200">
        <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 border border-slate-100">
          <h1 className="text-xl font-semibold mb-4">Confirm Your Account</h1>

          <input
            type="text"
            placeholder="Enter the code sent to your email"
            value={confirmationCode}
            onChange={(e) => setConfirmationCode(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border mb-4"
          />
          <input
            type="password"
            placeholder="Enter New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border mb-4"
          />

          {error && <p className="text-red-600">{error}</p>}

          <button
            onClick={confirm}
            className="w-full bg-indigo-600 text-white py-2.5 rounded-lg"
          >
            Confirm Account
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-50 px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl px-8 pt-12 pb-8 border border-slate-100 relative">
        <div className="absolute left-[20px] top-[20px]">
          <button onClick={back}>
            {" "}
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20.3284 11.0001V13.0001L7.50011 13.0001L10.7426 16.2426L9.32842 17.6568L3.67157 12L9.32842 6.34314L10.7426 7.75735L7.49988 11.0001L20.3284 11.0001Z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>
        <h1 className="text-xl font-semibold mb-4">Reset your account</h1>
        <input
          className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
          placeholder="Enter your Email"
        />
        <button
          type="button"
          onClick={output}
          className="w-full mt-3 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-medium shadow-md transition"
        >
          Reset Password
        </button>
      </div>
    </div>
  );
}
