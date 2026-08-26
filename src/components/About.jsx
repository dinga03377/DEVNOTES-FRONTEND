import Navbar from "./Navbar";
import {
  NotebookPen,
  ShieldCheck,
  Moon,
  Cloud,
  Sparkles,
  Mail,
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const About = () => {
  return (
    <div className="min-h-screen bg-paper dark:bg-ink transition">

      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden">

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/3 w-96 h-96 bg-teal-500/10 blur-3xl rounded-full animate-blob" />
          <div className="absolute -top-10 right-1/4 w-80 h-80 bg-violet-500/10 blur-3xl rounded-full animate-blob" style={{ animationDelay: "-5s" }} />
          <div className="absolute inset-0 bg-grain opacity-[0.03] dark:opacity-[0.05]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-24">

          <div className="text-center max-w-3xl mx-auto">

            <div
              className="w-20 h-20 mx-auto mb-6 rounded-3xl
              bg-stone-900 dark:bg-white
              flex items-center justify-center shadow-2xl rotate-3"
            >
              <NotebookPen
                size={36}
                className="text-white dark:text-stone-900"
              />
            </div>

            <p className="font-mono text-xs text-teal-700 dark:text-teal-400 mb-4">
              /// the story so far
            </p>

            <h1
              className="font-display text-4xl md:text-6xl font-bold
              text-stone-900 dark:text-white mb-6"
            >
              About DevNotes
            </h1>

            <p
              className="text-lg md:text-xl text-stone-600 dark:text-stone-300 leading-relaxed"
            >
              A modern secure notes application designed to help
              students, developers, creators, and teams organize ideas
              beautifully across all devices.
            </p>

          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-6 py-16">

        <div className="text-center mb-14">

          <h2
            className="font-display text-3xl md:text-4xl font-bold
            text-stone-900 dark:text-white mb-4"
          >
            Why DevNotes?
          </h2>

          <p className="text-stone-500 dark:text-stone-400">
            Built with modern technologies and clean user experience
          </p>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

          {/* Card */}
          <div
            className="group relative bg-white dark:bg-stone-900
            border border-stone-200 dark:border-stone-800
            rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1
            transition-all duration-300"
          >
            <span className="absolute top-0 left-6 -translate-y-1/2 h-1.5 w-8 rounded-full bg-teal-500" />

            <div
              className="w-13 h-13 rounded-2xl bg-teal-50
              dark:bg-teal-900/30 flex items-center justify-center mb-5"
            >
              <ShieldCheck className="text-teal-700 dark:text-teal-400" />
            </div>

            <h3 className="text-lg font-display font-bold text-stone-800 dark:text-white mb-3">
              Secure Authentication
            </h3>

            <p className="text-stone-500 dark:text-stone-400 leading-relaxed text-sm">
              JWT authentication, password encryption, reset password,
              protected routes, and secure backend architecture.
            </p>
          </div>

          {/* Card */}
          <div
            className="group relative bg-white dark:bg-stone-900
            border border-stone-200 dark:border-stone-800
            rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1
            transition-all duration-300"
          >
            <span className="absolute top-0 left-6 -translate-y-1/2 h-1.5 w-8 rounded-full bg-violet-500" />

            <div
              className="w-13 h-13 rounded-2xl bg-violet-50
              dark:bg-violet-900/30 flex items-center justify-center mb-5"
            >
              <Moon className="text-violet-700 dark:text-violet-400" />
            </div>

            <h3 className="text-lg font-display font-bold text-stone-800 dark:text-white mb-3">
              Dark & Light Mode
            </h3>

            <p className="text-stone-500 dark:text-stone-400 leading-relaxed text-sm">
              Beautiful UI with smooth dark mode support powered by
              Tailwind CSS v4 and React Context API.
            </p>
          </div>

          {/* Card */}
          <div
            className="group relative bg-white dark:bg-stone-900
            border border-stone-200 dark:border-stone-800
            rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1
            transition-all duration-300"
          >
            <span className="absolute top-0 left-6 -translate-y-1/2 h-1.5 w-8 rounded-full bg-amber-500" />

            <div
              className="w-13 h-13 rounded-2xl bg-amber-50
              dark:bg-amber-900/30 flex items-center justify-center mb-5"
            >
              <Cloud className="text-amber-600 dark:text-amber-400" />
            </div>

            <h3 className="text-lg font-display font-bold text-stone-800 dark:text-white mb-3">
              Cloud Powered
            </h3>

            <p className="text-stone-500 dark:text-stone-400 leading-relaxed text-sm">
              Notes and profile data are securely stored using MongoDB
              with fast backend APIs built using Express.js.
            </p>
          </div>

          {/* Card */}
          <div
            className="group relative bg-white dark:bg-stone-900
            border border-stone-200 dark:border-stone-800
            rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1
            transition-all duration-300"
          >
            <span className="absolute top-0 left-6 -translate-y-1/2 h-1.5 w-8 rounded-full bg-rose-500" />

            <div
              className="w-13 h-13 rounded-2xl bg-rose-50
              dark:bg-rose-900/30 flex items-center justify-center mb-5"
            >
              <Sparkles className="text-rose-600 dark:text-rose-400" />
            </div>

            <h3 className="text-lg font-display font-bold text-stone-800 dark:text-white mb-3">
              Modern Experience
            </h3>

            <p className="text-stone-500 dark:text-stone-400 leading-relaxed text-sm">
              Responsive layouts, elegant animations, profile uploads,
              note management, and clean productivity workflows.
            </p>
          </div>

        </div>
      </section>

      {/* Developer */}
      <section className="max-w-5xl mx-auto px-6 py-10">

        <div
          className="relative bg-white dark:bg-stone-900
          border border-stone-200 dark:border-stone-800
          rounded-3xl p-8 md:p-12 shadow-sm overflow-hidden"
        >

          <div className="absolute inset-0 bg-grain opacity-[0.02] dark:opacity-[0.04] pointer-events-none" />

          <div className="relative flex flex-col md:flex-row items-center gap-8">

            {/* Avatar */}
            <div
              className="w-32 h-32 rounded-full
              bg-stone-900 dark:bg-teal-600
              flex items-center justify-center
              text-white text-4xl font-display font-bold shadow-2xl shrink-0"
            >
              D
            </div>

            {/* Content */}
            <div className="flex-1 text-center md:text-left">

              <h2 className="font-display text-3xl font-bold text-stone-900 dark:text-white mb-3">
                Built by Dinga Robert
              </h2>

              <p
                className="text-stone-600 dark:text-stone-400
                leading-relaxed mb-6"
              >
                Passionate frontend and backend developer focused on
                building modern full-stack applications with React,
                Node.js, MongoDB, and beautiful user experiences.
              </p>

              {/* Socials */}
              <div className="flex items-center justify-center md:justify-start gap-4">

                <a
                  href="https://github.com/dinga03377"
                  target="_blank"
                  rel="noreferrer"
                  className="w-11 h-11 rounded-xl
                  bg-stone-100 dark:bg-stone-800
                  hover:scale-110 hover:bg-teal-50 dark:hover:bg-teal-900/30 transition
                  flex items-center justify-center"
                >
                  <FaGithub className="text-stone-700 dark:text-white" />
                </a>
              
                <a
                  href="mailto:devnotes75@gmail.com"
                  className="w-11 h-11 rounded-xl
                  bg-stone-100 dark:bg-stone-800
                  hover:scale-110 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition
                  flex items-center justify-center"
                >
                  <Mail className="text-rose-500" />
                </a>
              
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 text-center">

        <p className="font-mono text-xs text-stone-400 dark:text-stone-500">
          © 2026 DevNotes — built with React, Tailwind CSS &amp; Node.js
        </p>

      </footer>

    </div>
  );
};

export default About;
