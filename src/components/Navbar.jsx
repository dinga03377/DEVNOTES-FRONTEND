import { NavLink, Link } from "react-router-dom";
import { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import {
  Sun,
  Moon,
  Menu,
  X,
  NotebookPen,
} from "lucide-react";

const Navbar = () => {

  const { toggleTheme, theme } = useContext(ThemeContext);

  const [menuOpen, setMenuOpen] = useState(false);

  // Active Link Styles
  const navLinkClass = ({ isActive }) =>
    `relative font-medium text-sm transition-colors ${
      isActive
        ? "text-stone-900 dark:text-white"
        : "text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white"
    }`;

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-paper/80 dark:bg-ink/80 border-b border-stone-200 dark:border-stone-800">

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-3.5 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 group"
        >
          <div
            className="relative w-10 h-10 rounded-xl bg-teal-700 dark:bg-teal-600
            flex items-center justify-center shadow-sm shadow-teal-900/20
            rotate-0 group-hover:-rotate-6 transition duration-300"
          >
            <NotebookPen className="text-white" size={19} strokeWidth={2.25} />
            <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-amber-400 border-2 border-paper dark:border-ink" />
          </div>

          <div>
            <h1 className="text-lg font-display font-bold text-stone-900 dark:text-white leading-none tracking-tight">
              Dev<span className="text-teal-700 dark:text-teal-400">Notes</span>
            </h1>

            <p className="text-[11px] font-mono text-stone-400 dark:text-stone-500 hidden md:block mt-0.5">
              // notes for builders
            </p>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-7">

          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>

          <NavLink to="/about" className={navLinkClass}>
            About
          </NavLink>

          <NavLink to="/login" className={navLinkClass}>
            Login
          </NavLink>

          <NavLink
            to="/register"
            className={({ isActive }) =>
              `px-4 py-2 rounded-full text-white text-sm font-semibold transition shadow-sm ${
                isActive
                  ? "bg-stone-900 dark:bg-white dark:text-stone-900"
                  : "bg-stone-900 hover:bg-teal-700 dark:bg-white dark:text-stone-900 dark:hover:bg-teal-400"
              }`
            }
          >
            Get started
          </NavLink>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-full bg-stone-100 dark:bg-stone-800 hover:scale-110 transition"
          >
            {theme === "dark" ? (
              <Sun
                size={17}
                className="text-amber-400"
              />
            ) : (
              <Moon
                size={17}
                className="text-stone-600"
              />
            )}
          </button>

        </div>

        {/* Mobile Right */}
        <div className="flex items-center gap-2 md:hidden">

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-full bg-stone-100 dark:bg-stone-800"
          >
            {theme === "dark" ? (
              <Sun
                size={17}
                className="text-amber-400"
              />
            ) : (
              <Moon
                size={17}
                className="text-stone-600"
              />
            )}
          </button>

          {/* Menu Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            className="p-2 rounded-lg bg-stone-100 dark:bg-stone-800"
          >
            {menuOpen ? (
              <X className="text-stone-700 dark:text-white" size={19} />
            ) : (
              <Menu className="text-stone-700 dark:text-white" size={19} />
            )}
          </button>

        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen
            ? "max-h-96 opacity-100"
            : "max-h-0 opacity-0"
        }`}
      >
        <div
          className="px-6 pb-5 pt-2 flex flex-col gap-5
          bg-paper/95 dark:bg-ink/95
          backdrop-blur-xl border-t border-stone-200 dark:border-stone-800"
        >

          <NavLink
            to="/"
            className={navLinkClass}
            onClick={() => setMenuOpen(false)}
          >
            Home
          </NavLink>

          <NavLink
            to="/about"
            className={navLinkClass}
            onClick={() => setMenuOpen(false)}
          >
            About
          </NavLink>

          <NavLink
            to="/login"
            className={navLinkClass}
            onClick={() => setMenuOpen(false)}
          >
            Login
          </NavLink>

          <NavLink
            to="/register"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              `text-center px-4 py-2.5 rounded-full text-white text-sm font-semibold transition ${
                isActive
                  ? "bg-teal-700"
                  : "bg-stone-900 hover:bg-teal-700 dark:bg-white dark:text-stone-900"
              }`
            }
          >
            Get started
          </NavLink>

        </div>
      </div>

    </nav>
  );
};

export default Navbar;
