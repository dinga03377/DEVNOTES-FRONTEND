import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "./Navbar";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getSharedNote } from "../api/api";
import { AlertCircle, ArrowRight, Loader2 } from "lucide-react";

// Small, local copy of the category → color mapping used on the
// dashboard. Kept separate on purpose: this page is public/unauthenticated
// and shouldn't share state or imports with the logged-in dashboard.
const CATEGORY_CHIP = {
  Personal: "bg-violet-50 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300",
  Work: "bg-rose-50 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300",
  Ideas: "bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300",
  School: "bg-sky-50 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300",
};

const SharedNote = () => {

  const { token } = useParams();

  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {

    const fetchSharedNote = async () => {

      try {

        const data = await getSharedNote(token);
        setNote(data);

      } catch (err) {

        console.log(err);
        setError("This link is invalid or the note is no longer shared.");

      } finally {
        setLoading(false);
      }
    };

    fetchSharedNote();

  }, [token]);

  return (
    <div className="min-h-screen bg-paper dark:bg-ink transition">

      <Navbar />

      <div className="max-w-2xl mx-auto px-4 py-16">

        {loading ? (

          <div className="flex flex-col items-center justify-center gap-3 py-24 text-stone-400 dark:text-stone-500">
            <Loader2 size={28} className="animate-spin" />
            <p className="text-sm">Loading shared note...</p>
          </div>

        ) : error ? (

          <div className="text-center py-16">
            <AlertCircle size={40} className="mx-auto text-rose-500 mb-4" />
            <h2 className="font-display text-2xl font-bold text-stone-800 dark:text-white mb-2">
              Note not found
            </h2>
            <p className="text-stone-500 dark:text-stone-400 mb-6">{error}</p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-stone-900 dark:bg-white text-white dark:text-stone-900 font-medium"
            >
              Go to DevNotes
            </Link>
          </div>

        ) : (

          <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 md:p-8 shadow-sm">

            <div className="flex items-center justify-between mb-4">
              <span
                className={`inline-flex items-center text-xs font-mono px-2.5 py-1 rounded-full ${
                  CATEGORY_CHIP[note.category] || CATEGORY_CHIP.Personal
                }`}
              >
                {note.category || "Personal"}
              </span>

              <p className="text-xs font-mono text-stone-400">
                {note.createdAt ? new Date(note.createdAt).toLocaleDateString() : ""}
              </p>
            </div>

            <h1 className="font-display text-2xl md:text-3xl font-bold text-stone-900 dark:text-white mb-5">
              {note.title}
            </h1>

            {note.format === "markdown" ? (
              <div className="prose dark:prose-invert max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {note.content}
                </ReactMarkdown>
              </div>
            ) : (
              <div
                className="prose dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: note.content }}
              />
            )}

            {note.voiceNoteUrl && (
              <audio controls src={note.voiceNoteUrl} className="w-full h-10 mt-6" />
            )}

          </div>
        )}

        {!loading && (
          <div className="mt-8 text-center">
            <Link
              to="/register"
              className="inline-flex items-center gap-2 text-sm text-teal-700 dark:text-teal-400 font-medium hover:underline"
            >
              Create your own notes with DevNotes
              <ArrowRight size={14} />
            </Link>
          </div>
        )}

      </div>
    </div>
  );
};

export default SharedNote;
