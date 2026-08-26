import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api/api";
import Navbar from "./Navbar";

import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  ShieldCheck,
  CheckCircle,
  XCircle,
  NotebookPen,
  Sparkles
} from "lucide-react";

const Register = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  // Password checks
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSymbol = /[^A-Za-z0-9]/.test(password);
  const hasLength = password.length >= 8;

  const passwordValid =
    hasUppercase &&
    hasLowercase &&
    hasNumber &&
    hasSymbol &&
    hasLength;

  const submitHandler = async (e) => {

    e.preventDefault();

    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!passwordValid) {
      setError("Password does not meet requirements");
      return;
    }

    try {

      setLoading(true);

      await registerUser({
        name,
        email,
        password
      });

      setSuccess("Registration successful 🎉");

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (error) {

      console.log(error);

      setError(
        error.response?.data?.message ||
        "Registration Failed"
      );

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {

    const token =
      localStorage.getItem("token") ||
      sessionStorage.getItem("token");

    if (token) {
      navigate("/dashboard");
    }

  }, [navigate]);

  const PasswordCheck = ({ ok, text }) => (
    <div className="flex items-center gap-2 text-sm">
      {ok ? (
        <CheckCircle size={16} className="text-teal-600 dark:text-teal-400" />
      ) : (
        <XCircle size={16} className="text-stone-300 dark:text-stone-600" />
      )}
      <span className={ok ? "text-teal-700 dark:text-teal-400" : "text-stone-400 dark:text-stone-500"}>
        {text}
      </span>
    </div>
  );

  return (
    <div className="min-h-screen bg-paper dark:bg-ink transition">

      <Navbar />

      <div className="grid lg:grid-cols-2 min-h-[calc(100vh-73px)]">

        {/* Left: brand panel */}
        <div className="hidden lg:flex relative flex-col justify-between p-12 bg-stone-900 dark:bg-stone-950 overflow-hidden">
          <div className="absolute inset-0 bg-grain opacity-[0.06]" />
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-violet-500/20 blur-3xl rounded-full animate-blob" />

          <div className="relative z-10 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center">
              <NotebookPen className="text-white" size={19} />
            </div>
            <span className="font-display text-lg font-bold text-white">DevNotes</span>
          </div>

          <div className="relative z-10">
            <p className="font-mono text-xs text-teal-400 mb-4">// join in seconds</p>
            <h2 className="font-display text-3xl font-bold text-white leading-snug mb-4">
              A workspace for every idea worth keeping.
            </h2>
            <div className="flex items-center gap-2 text-stone-400 text-sm">
              <Sparkles size={14} className="text-amber-400" />
              Free to start, no card required.
            </div>
          </div>

          <p className="relative z-10 text-stone-500 text-xs font-mono">devnotes.app</p>
        </div>

        {/* Right: form */}
        <div className="flex justify-center items-center px-4 py-12">

          <div className="w-full max-w-md">

            {/* Header */}
            <div className="text-center lg:text-left mb-7">

              <div className="hidden lg:flex mb-4">
                <div className="bg-teal-50 dark:bg-teal-900/30 p-2.5 rounded-xl">
                  <ShieldCheck className="text-teal-700 dark:text-teal-400" size={20} />
                </div>
              </div>

              <h2 className="font-display text-3xl font-bold text-stone-900 dark:text-white">
                Create account
              </h2>

              <p className="text-stone-500 dark:text-stone-400 text-sm mt-2">
                Join DevNotes and start organizing your ideas
              </p>

            </div>

            {/* Error */}
            {error && (
              <div className="bg-rose-50 text-rose-600 dark:bg-rose-900/20 dark:text-rose-400 p-3 rounded-xl mb-4 text-sm border border-rose-200 dark:border-rose-900/40">
                {error}
              </div>
            )}

            {/* Success */}
            {success && (
              <div className="bg-teal-50 text-teal-700 dark:bg-teal-900/20 dark:text-teal-400 p-3 rounded-xl mb-4 text-sm border border-teal-200 dark:border-teal-900/40 animate-pulse">
                {success}
              </div>
            )}

            <form onSubmit={submitHandler} className="space-y-4">

              {/* Name */}
              <div className="relative">
                <User
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400"
                  size={18}
                />

                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="
                  w-full pl-11 p-3.5 rounded-xl border
                  bg-white dark:bg-stone-900
                  text-stone-800 dark:text-white
                  border-stone-300 dark:border-stone-700
                  focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition
                  "
                />
              </div>

              {/* Email */}
              <div className="relative">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400"
                  size={18}
                />

                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="
                  w-full pl-11 p-3.5 rounded-xl border
                  bg-white dark:bg-stone-900
                  text-stone-800 dark:text-white
                  border-stone-300 dark:border-stone-700
                  focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition
                  "
                />
              </div>

              {/* Password */}
              <div className="relative">

                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400"
                  size={18}
                />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  className="
                  w-full pl-11 pr-11 p-3.5 rounded-xl border
                  bg-white dark:bg-stone-900
                  text-stone-800 dark:text-white
                  border-stone-300 dark:border-stone-700
                  focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition
                  "
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>

              </div>

              {/* Password Requirements */}
              <div className="
              bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800
              p-4 rounded-xl space-y-2
              ">

                <h4 className="text-xs font-mono uppercase tracking-wide font-semibold text-stone-500 dark:text-stone-400 mb-1">
                  Password must contain
                </h4>

                <PasswordCheck ok={hasUppercase} text="One uppercase letter" />
                <PasswordCheck ok={hasLowercase} text="One lowercase letter" />
                <PasswordCheck ok={hasNumber} text="One number" />
                <PasswordCheck ok={hasSymbol} text="One special character" />
                <PasswordCheck ok={hasLength} text="At least 8 characters" />

              </div>

              {/* Confirm Password */}
              <div className="relative">

                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400"
                  size={18}
                />

                <input
                  type={showConfirm ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setError("");
                  }}
                  className="
                  w-full pl-11 pr-11 p-3.5 rounded-xl border
                  bg-white dark:bg-stone-900
                  text-stone-800 dark:text-white
                  border-stone-300 dark:border-stone-700
                  focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition
                  "
                />

                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
                >
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>

              </div>

              {/* Button */}
              <button
                type="submit"
                disabled={loading}
                className="
                w-full py-3.5 rounded-xl text-white font-semibold
                bg-stone-900 hover:bg-teal-700 dark:bg-teal-600 dark:hover:bg-teal-500
                transition duration-300
                disabled:opacity-50 shadow-lg shadow-stone-900/10
                "
              >
                {loading ? "Creating Account..." : "Register"}
              </button>

            </form>

            {/* Footer */}
            <p className="
            text-center mt-6 text-sm
            text-stone-600 dark:text-stone-400
            ">
              Already have an account?

              <Link
                to="/login"
                className="
                text-teal-700 dark:text-teal-400
                ml-2 hover:underline font-medium
                "
              >
                Login
              </Link>
            </p>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Register;
