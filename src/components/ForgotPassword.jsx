import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { forgotPassword } from "../api/api";
import { Mail, CheckCircle, KeyRound } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(0);

  const navigate = useNavigate();

  // ✅ Live Email Validation
  const validateEmail = (value) => {
    const regex = /\S+@\S+\.\S+/;
    if (!value) return "Email is required";
    if (!regex.test(value)) return "Enter a valid email";
    return "";
  };

  const submitHandler = async (e) => {

  e.preventDefault();

  const validationError = validateEmail(email);

  if (validationError) {
    setError(validationError);
    return;
  }

  setLoading(true);
  setError("");
  setSuccess("");

  try {

    const data = await forgotPassword(email);

    setSuccess(data.message);

    setCountdown(30);

  } catch (err) {

    setError(
      err.response?.data?.message ||
      "Something went wrong"
    );

  } finally {

    setLoading(false);

  }
};

  // ⏱ Countdown logic for resend
  useEffect(() => {
    if (countdown === 0) return;

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  // 🔁 Auto redirect after success
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        navigate("/login");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [success, navigate]);

  return (
    <div className="min-h-screen bg-paper dark:bg-ink transition">
      <Navbar />

      <div className="relative flex justify-center items-center px-4 min-h-[calc(100vh-73px)] overflow-hidden">

        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-teal-500/10 blur-3xl rounded-full animate-blob pointer-events-none" />

        <div className="relative w-full max-w-md p-8 rounded-2xl shadow-xl
        bg-white/90 dark:bg-stone-900/90 backdrop-blur-lg
        border border-stone-200 dark:border-stone-800">

          {/* Header */}
          <div className="text-center mb-7">
            <div className="flex justify-center mb-4">
              <div className="bg-teal-50 dark:bg-teal-900/30 p-3 rounded-full">
                <KeyRound className="text-teal-700 dark:text-teal-400" size={22} />
              </div>
            </div>
            <h2 className="font-display text-2xl font-bold text-stone-900 dark:text-white">
              Forgot password
            </h2>
            <p className="text-sm text-stone-500 dark:text-stone-400 mt-2">
              Enter your email to receive a reset link
            </p>
          </div>

          {/* ✅ Success Animation */}
          {success && (
            <div className="flex items-center gap-2 bg-teal-50 text-teal-700
            dark:bg-teal-900/20 dark:text-teal-400 p-3 rounded-xl mb-4 text-sm border border-teal-200 dark:border-teal-900/40
            animate-pulse">
              <CheckCircle size={18} />
              <span>{success}</span>
            </div>
          )}

          {/* ❌ Error */}
          {error && (
            <div className="bg-rose-50 text-rose-600 dark:bg-rose-900/20
            dark:text-rose-400 p-3 rounded-xl mb-4 text-sm border border-rose-200 dark:border-rose-900/40">
              {error}
            </div>
          )}

          <form onSubmit={submitHandler} className="space-y-4">

            {/* Email Input */}
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError(validateEmail(e.target.value)); // live validation
                }}
                className="w-full pl-11 p-3.5 rounded-xl border
                bg-white dark:bg-stone-900
                text-stone-800 dark:text-white
                border-stone-300 dark:border-stone-700
                focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl text-white font-semibold
              bg-stone-900 hover:bg-teal-700 dark:bg-teal-600 dark:hover:bg-teal-500 transition disabled:opacity-50 shadow-lg shadow-stone-900/10"
            >
              {loading ? "Sending..." : "Send reset link"}
            </button>

          </form>

          {/* 🔁 Resend */}
          {success && (
            <div className="text-center mt-4 text-sm text-stone-600 dark:text-stone-400">

              {countdown > 0 ? (
                <p className="font-mono text-xs">Resend available in {countdown}s</p>
              ) : (
                <button
                  onClick={submitHandler}
                  className="text-teal-700 dark:text-teal-400 hover:underline font-medium"
                >
                  Resend link
                </button>
              )}

            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
