import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { Lock, Eye, EyeOff, CheckCircle, ShieldCheck } from "lucide-react";
import { resetPassword } from "../api/api";

const ResetPassword = () => {

  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔐 Validation
  const validate = () => {
    if (!password || !confirmPassword) {
      return "All fields are required";
    }
    if (password.length < 6) {
      return "Password must be at least 6 characters";
    }
    if (password !== confirmPassword) {
      return "Passwords do not match";
    }
    return "";
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError("");

    try {
      // 🔌 FRONTEND ONLY (mock)
      // later → await resetPassword(token, password)

      await resetPassword(token, password);
      setSuccess("Password reset successful!");

    } catch (err) {
      setError("Invalid or expired token");
      setLoading(false);
    }
  };

  // 🔁 Redirect after success
useEffect(() => {
  if (success) {
    const timer = setTimeout(() => {
      navigate("/login");
    }, 2500);

    return () => clearTimeout(timer);
  }
}, [success, navigate]);

  return (
    <div className="min-h-screen bg-paper dark:bg-ink transition">
      <Navbar />

      <div className="relative flex justify-center items-center px-4 min-h-[calc(100vh-73px)] overflow-hidden">

        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-violet-500/10 blur-3xl rounded-full animate-blob pointer-events-none" />

        <div className="relative w-full max-w-md p-8 rounded-2xl shadow-xl
        bg-white/90 dark:bg-stone-900/90 backdrop-blur-lg
        border border-stone-200 dark:border-stone-800">

          {/* Header */}
          <div className="text-center mb-7">
            <div className="flex justify-center mb-4">
              <div className="bg-teal-50 dark:bg-teal-900/30 p-3 rounded-full">
                <ShieldCheck className="text-teal-700 dark:text-teal-400" size={22} />
              </div>
            </div>
            <h2 className="font-display text-2xl font-bold text-stone-900 dark:text-white">
              Reset password
            </h2>
            <p className="text-sm text-stone-500 dark:text-stone-400 mt-2">
              Enter your new password
            </p>
          </div>

          {/* Success */}
          {success && (
            <div className="flex items-center gap-2 bg-teal-50 text-teal-700
            dark:bg-teal-900/20 dark:text-teal-400 p-3 rounded-xl mb-4 text-sm border border-teal-200 dark:border-teal-900/40 animate-pulse">
              <CheckCircle size={18} />
              {success}
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="bg-rose-50 text-rose-600 dark:bg-rose-900/20
            dark:text-rose-400 p-3 rounded-xl mb-4 text-sm border border-rose-200 dark:border-rose-900/40">
              {error}
            </div>
          )}

          <form onSubmit={submitHandler} className="space-y-4">

            {/* Password */}
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="New password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                className="w-full pl-11 pr-11 p-3.5 rounded-xl border
                bg-white dark:bg-stone-900
                text-stone-800 dark:text-white
                border-stone-300 dark:border-stone-700
                focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
              <input
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setError("");
                }}
                className="w-full pl-11 p-3.5 rounded-xl border
                bg-white dark:bg-stone-900
                text-stone-800 dark:text-white
                border-stone-300 dark:border-stone-700
                focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl text-white font-semibold
              bg-stone-900 hover:bg-teal-700 dark:bg-teal-600 dark:hover:bg-teal-500 transition disabled:opacity-50 shadow-lg shadow-stone-900/10"
            >
              {loading ? "Resetting..." : "Reset password"}
            </button>

          </form>

        </div>

      </div>
    </div>
  );
};

export default ResetPassword;
