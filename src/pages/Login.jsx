import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { signIn } from "aws-amplify/auth";
import Inherix_Logo from "../assets/Inherix_Logo.png";
import { useAuth } from "../auth/AuthContext";
export default function Login({ onSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { loadUser } = useAuth();
  const isValidEmail = (value) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };
  const login = async () => {
    try {
      if (!email.trim()) {
        setError("Email is required");
        return;
      }

      setError("");
      const user = await signIn({
        username: email,
        password,
      });
      console.log("Logged in:", user);

      await loadUser();
      onSuccess();
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

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
          <h1 className="text-xl font-semibold text-slate-900 mb-1">
            Sign in to your account
          </h1>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Email Address
            </label>
            <input
              type="text"
              autoComplete="username"
              name="email"
              placeholder="Enter your email"
              value={email}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Password
            </label>
            <input
              type="password"
              autoComplete="current-password"
              name="password"
              value={password}
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
            />
          </div>
          {error && <p className="text-red-600 text-sm mt-1">{error}</p>}

          <button
            type="submit"
            name="submit"
            onClick={login}
            className="w-full mt-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-medium shadow-md transition"
          >
            Sign In
          </button>
        </div>

        <p className="mt-6 text-center text-xs text-slate-500">
          Don’t have an account?{" "}
          <span className="text-indigo-600 font-medium cursor-pointer hover:underline">
            <NavLink
              to="/signup"
              className="text-indigo-600 font-medium hover:underline"
            >
              {" "}
              Sign Up
            </NavLink>
          </span>
        </p>
        <p className="mt-1 text-center text-xs text-slate-500">
          Forgot Password?{" "}
          <span className="text-indigo-600 font-medium cursor-pointer hover:underline">
            <NavLink
              to="/reset"
              className="text-indigo-600 font-medium hover:underline"
            >
              {" "}
              Reset
            </NavLink>
          </span>
        </p>
      </div>
    </div>
  );
}
