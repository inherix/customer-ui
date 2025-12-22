import { useState } from "react";
import { signUp, confirmSignUp } from "aws-amplify/auth";
import { NavLink } from "react-router-dom";
import Inherix_Logo from "../assets/Inherix_Logo.png";

export default function Register() {
  const [step, setStep] = useState("signup");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmationCode, setConfirmationCode] = useState("");
  const [error, setError] = useState("");

  const register = async () => {
    try {
      setError("");
      await signUp({
        username: email,
        password,
        firstName,
        lastName,
        options: {
          userAttributes: {
            email: email,
            given_name: firstName,
            family_name: lastName,
          },
        },
      });

      setStep("confirm");
    } catch (err) {
      setError(err.message);
    }
  };

  const confirm = async () => {
    try {
      await confirmSignUp({
        username: email,
        confirmationCode: confirmationCode,
      });

      alert("Account confirmed! Please sign in.");
      window.location.href = "/signin";
    } catch (err) {
      setError(err.message);
    }
  };

  if (step === "confirm") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-200 px-4">
        <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 border border-slate-100">
          <h1 className="text-xl font-semibold mb-4">Confirm Your Account</h1>

          <input
            type="text"
            placeholder="Enter the code sent to your email"
            value={confirmationCode}
            onChange={(e) => setConfirmationCode(e.target.value)}
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-200 px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 border border-slate-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white font-bold text-xl shadow">
            <a href="/dashboard">
              <img src={Inherix_Logo} alt="Inherix Logo" />
            </a>
          </div>
          <div>
            <h1 className="text-xl font-semibold text-slate-900">InHeriX</h1>
            <p className="text-sm italic text-slate-500">Build your family</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h1 className="text-xl font-semibold text-slate-900 mb-2">
              Create your account
            </h1>
            <label className="block text-sm font-medium mb-1">First Name</label>
            <input
              type="text"
              value={firstName}
              placeholder="Enter your First Name"
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Last Name</label>
            <input
              type="text"
              value={lastName}
              placeholder="Enter your Last Name"
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              value={password}
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border"
            />
          </div>

          {error && <p className="text-red-600">{error}</p>}

          <button
            type="button"
            onClick={register}
            className="w-full bg-indigo-600 text-white py-2.5 rounded-lg mt-2"
          >
            Register
          </button>
        </div>
        <p className="mt-6 text-center text-xs text-slate-500">
          Have an account?{" "}
          <span className="text-indigo-600 font-medium cursor-pointer hover:underline">
            <NavLink
              to="/signin"
              className="text-indigo-600 font-medium hover:underline"
            >
              {" "}
              Sign In
            </NavLink>
          </span>
        </p>
      </div>
    </div>
  );
}
