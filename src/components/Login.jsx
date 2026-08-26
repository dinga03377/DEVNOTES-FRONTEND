import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { loginUser } from "../api/api";
import { Mail, Lock, Eye, EyeOff, NotebookPen, Pin } from "lucide-react";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = await loginUser({ email, password });
      console.log(data);

      if (remember) {
        localStorage.setItem("token", data.token);
      } else {
        sessionStorage.setItem("token", data.token);
      }

      navigate("/dashboard");

    } catch (err) {
      setError(err.response?.data?.error || "Invalid Credentials");
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

}, []);

  return (
    <div className="min-h-screen bg-paper dark:bg-ink transition">
      <Navbar />

      <div className="grid lg:grid-cols-2 min-h-[calc(100vh-73px)]">

        {/* Left: brand panel (hidden on mobile) */}
        <div className="hidden lg:flex relative flex-col justify-between p-12 bg-stone-900 dark:bg-stone-950 overflow-hidden">
          <div className="absolute inset-0 bg-grain opacity-[0.06]" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-teal-500/20 blur-3xl rounded-full animate-blob" />

          <div className="relative z-10 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center">
              <NotebookPen className="text-white" size={19} />
            </div>
            <span className="font-display text-lg font-bold text-white">DevNotes</span>
          </div>

          <div className="relative z-10">
            <p className="font-mono text-xs text-teal-400 mb-4">// welcome back</p>
            <h2 className="font-display text-3xl font-bold text-white leading-snug mb-4">
              Pick up right where your last idea left off.
            </h2>
            <div className="flex items-center gap-2 text-stone-400 text-sm">
              <Pin size={14} className="text-amber-400 fill-amber-400" />
              Your pinned notes are waiting.
            </div>
          </div>

          <p className="relative z-10 text-stone-500 text-xs font-mono">devnotes.app</p>
        </div>

        {/* Right: form */}
        <div className="flex justify-center items-center px-4 py-16">

          <div className="w-full max-w-md">

            {/* Header */}
            <div className="mb-8 text-center lg:text-left">
              <h2 className="font-display text-3xl font-bold text-stone-900 dark:text-white">
                Welcome back 👋
              </h2>
              <p className="text-sm text-stone-500 dark:text-stone-400 mt-2">
                Login to continue to your workspace
              </p>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-rose-50 text-rose-600 dark:bg-rose-900/20 dark:text-rose-400 p-3 rounded-xl mb-5 text-sm border border-rose-200 dark:border-rose-900/40">
                {error}
              </div>
            )}

            <form onSubmit={submitHandler} className="space-y-4">

              {/* Email */}
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  className="w-full pl-11 p-3.5 rounded-xl border
                  bg-white dark:bg-stone-900
                  text-stone-800 dark:text-white
                  border-stone-300 dark:border-stone-700
                  focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
                />
              </div>

              {/* Password */}
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
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

                {/* Show/Hide */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {/* Remember + Forgot */}
              <div className="flex justify-between items-center text-sm">

                <label className="flex items-center gap-2 text-stone-600 dark:text-stone-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={() => setRemember(!remember)}
                    className="accent-teal-600"
                  />
                  Remember me
                </label>

                <Link
                  to="/forgot-password"
                  className="text-teal-700 dark:text-teal-400 hover:underline font-medium"
                >
                  Forgot password?
                </Link>

              </div>

              {/* Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl text-white font-semibold
                bg-stone-900 hover:bg-teal-700 dark:bg-teal-600 dark:hover:bg-teal-500 transition disabled:opacity-50 shadow-lg shadow-stone-900/10"
              >
                {loading ? "Logging in..." : "Login"}
              </button>

            </form>

            {/* Footer */}
            <p className="text-center mt-6 text-sm text-stone-600 dark:text-stone-400">
              Don’t have an account?
              <Link
                to="/register"
                className="text-teal-700 dark:text-teal-400 ml-2 hover:underline font-medium"
              >
                Register
              </Link>
            </p>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
