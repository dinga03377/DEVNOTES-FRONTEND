import { Link } from "react-router-dom";
import Navbar from "./Navbar";

import {
  ShieldCheck,
  Moon,
  NotebookPen,
  LockKeyhole,
  ArrowRight,
  Pin,
  Search,
} from "lucide-react";

const Home = () => {

  return (
    <div className="min-h-screen bg-paper dark:bg-ink transition overflow-hidden">

      <Navbar />

      {/* Hero Section */}
      <section className="relative px-6 pt-20 pb-24">

        {/* Background blobs + grain */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-10 left-1/4 w-96 h-96 bg-teal-500/15 dark:bg-teal-500/10 blur-3xl rounded-full animate-blob" />
          <div className="absolute top-40 right-1/5 w-80 h-80 bg-violet-500/10 blur-3xl rounded-full animate-blob" style={{ animationDelay: "-6s" }} />
          <div className="absolute inset-0 bg-grain opacity-[0.03] dark:opacity-[0.05]" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

          {/* Left: copy */}
          <div className="text-center lg:text-left">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-teal-50 dark:bg-teal-900/20 text-teal-800 dark:text-teal-300 px-3.5 py-1.5 rounded-full text-xs font-mono mb-7 border border-teal-200/70 dark:border-teal-800/60">
              <ShieldCheck size={14} />
              secure-note-taking --v2
            </div>

            {/* Main Heading */}
            <h1 className="font-display text-4xl md:text-6xl font-bold leading-[1.05] text-stone-900 dark:text-white text-balance">
              Organize your ideas,
              <br />
              <span className="marker-highlight text-stone-900 dark:text-white">
                one note at a time
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-stone-600 dark:text-stone-400 text-lg max-w-xl mx-auto lg:mx-0 mt-7 leading-relaxed">
              Capture your thoughts, secure your notes, manage tasks, and
              access everything anywhere — all in one modern productivity
              workspace built for people who ship things.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-10 justify-center lg:justify-start">

              <Link
                to="/register"
                className="group flex items-center justify-center gap-2 bg-stone-900 hover:bg-teal-700 dark:bg-white dark:hover:bg-teal-400 text-white dark:text-stone-900
                px-7 py-3.5 rounded-full font-semibold shadow-lg shadow-stone-900/10 transition duration-300">
                Get started free
                <ArrowRight size={17} className="group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/login"
                className="px-7 py-3.5 rounded-full border border-stone-300 dark:border-stone-700
                text-stone-800 dark:text-white hover:bg-stone-100 dark:hover:bg-stone-800 transition duration-300 font-medium">
                Login
              </Link>

            </div>

          </div>

          {/* Right: signature editor-window mockup */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-teal-400/20 via-violet-400/10 to-amber-300/20 rounded-[2rem] blur-2xl" />

            <div className="relative rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-2xl shadow-stone-900/10 overflow-hidden rotate-1 hover:rotate-0 transition-transform duration-500">

              {/* window chrome */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950/50">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-teal-500" />
                <span className="ml-3 text-xs font-mono text-stone-400">~/devnotes/today.note</span>
              </div>

              <div className="p-5 space-y-3">

                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono px-2 py-1 rounded-md bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300">#ideas</span>
                  <Pin size={14} className="text-amber-500 fill-amber-500" />
                </div>

                <h3 className="font-display font-semibold text-stone-800 dark:text-white">
                  Ship the v2 onboarding flow
                </h3>

                <div className="space-y-2">
                  <div className="h-2.5 rounded-full bg-stone-100 dark:bg-stone-800 w-full" />
                  <div className="h-2.5 rounded-full bg-stone-100 dark:bg-stone-800 w-5/6" />
                  <div className="h-2.5 rounded-full bg-stone-100 dark:bg-stone-800 w-2/3" />
                </div>

                <div className="flex items-center gap-2 pt-2 text-stone-400">
                  <Search size={13} />
                  <div className="h-2 w-24 rounded-full bg-stone-100 dark:bg-stone-800" />
                </div>

              </div>
            </div>
          </div>

        </div>

      </section>

      {/* Features */}
      <section className="relative px-6 pb-28">

        <div className="max-w-6xl mx-auto">

          <div className="text-center mb-14">
            <p className="font-mono text-xs text-teal-700 dark:text-teal-400 mb-3">/// why devnotes</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-stone-900 dark:text-white">
              Everything your notes need
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Card 1 */}
            <div className="group relative bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800
            rounded-2xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300">
              <span className="absolute top-0 left-8 -translate-y-1/2 h-1.5 w-10 rounded-full bg-teal-500" />

              <div className="bg-teal-50 dark:bg-teal-900/30 w-fit p-3.5 rounded-xl mb-5">
                <NotebookPen className="text-teal-700 dark:text-teal-400" size={22} />
              </div>

              <h3 className="text-lg font-display font-bold text-stone-800 dark:text-white mb-3">
                Smart Notes
              </h3>

              <p className="text-stone-500 dark:text-stone-400 leading-relaxed text-sm">
                Create, edit, search and organize all your notes
                with a clean and distraction-free experience.
              </p>
            </div>

            {/* Card 2 */}
            <div className="group relative bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800
            rounded-2xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300">
              <span className="absolute top-0 left-8 -translate-y-1/2 h-1.5 w-10 rounded-full bg-violet-500" />

              <div className="bg-violet-50 dark:bg-violet-900/30 w-fit p-3.5 rounded-xl mb-5">
                <LockKeyhole className="text-violet-700 dark:text-violet-400" size={22} />
              </div>

              <h3 className="text-lg font-display font-bold text-stone-800 dark:text-white mb-3">
                Secure Authentication
              </h3>

              <p className="text-stone-500 dark:text-stone-400 leading-relaxed text-sm">
                Protected login system with JWT authentication,
                password encryption and reset recovery.
              </p>
            </div>

            {/* Card 3 */}
            <div className="group relative bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800
            rounded-2xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300">
              <span className="absolute top-0 left-8 -translate-y-1/2 h-1.5 w-10 rounded-full bg-amber-500" />

              <div className="bg-amber-50 dark:bg-amber-900/30 w-fit p-3.5 rounded-xl mb-5">
                <Moon className="text-amber-600 dark:text-amber-400" size={22} />
              </div>

              <h3 className="text-lg font-display font-bold text-stone-800 dark:text-white mb-3">
                Dark Mode Experience
              </h3>

              <p className="text-stone-500 dark:text-stone-400 leading-relaxed text-sm">
                Beautiful light and dark themes designed
                for productivity day and night.
              </p>
            </div>

          </div>

        </div>

      </section>

    </div>
  );
};

export default Home;
