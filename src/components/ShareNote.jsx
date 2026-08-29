import { useState } from "react";
import { Share2, Copy, Check, Link2Off } from "lucide-react";
import toast from "react-hot-toast";
import { shareNote, unshareNote } from "../api/api";

// Manages the share link for an already-saved note. Like VoiceRecorder,
// this only makes sense once a note has a real id.
const ShareNote = ({ noteId, shareToken, onChange }) => {

  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareUrl = shareToken
    ? `${window.location.origin}/shared/${shareToken}`
    : "";

  const handleShare = async () => {

    setLoading(true);

    try {

      const updatedNote = await shareNote(noteId);

      onChange(updatedNote);

      toast.success("Note is now shareable");

    } catch (error) {

      console.log(error);
      toast.error("Failed to share note");

    } finally {
      setLoading(false);
    }
  };

  const handleUnshare = async () => {

    setLoading(true);

    try {

      const updatedNote = await unshareNote(noteId);

      onChange(updatedNote);

      toast.success("Sharing turned off");

    } catch (error) {

      console.log(error);
      toast.error("Failed to turn off sharing");

    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {

    try {

      await navigator.clipboard.writeText(shareUrl);

      setCopied(true);
      toast.success("Link copied!");

      setTimeout(() => setCopied(false), 2000);

    } catch (error) {
      console.log(error);
      toast.error("Couldn't copy — copy it manually");
    }
  };

  return (
    <div className="mb-4">
      <label className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wide text-stone-400 dark:text-stone-500 mb-1.5">
        <Share2 size={11} /> Sharing
      </label>

      {shareToken ? (
        <div className="flex items-center gap-2">
          <input
            type="text"
            readOnly
            value={shareUrl}
            onClick={(e) => e.target.select()}
            className="flex-1 p-3 rounded-xl bg-stone-100 dark:bg-stone-800 border border-stone-200
            dark:border-stone-700 outline-none text-stone-600 dark:text-stone-300 text-sm font-mono truncate"
          />
          <button
            type="button"
            onClick={handleCopy}
            className="p-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white transition shrink-0"
            title="Copy link"
          >
            {copied ? <Check size={15} /> : <Copy size={15} />}
          </button>
          <button
            type="button"
            onClick={handleUnshare}
            disabled={loading}
            className="p-3 rounded-xl bg-stone-100 dark:bg-stone-800 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition shrink-0 disabled:opacity-50"
            title="Stop sharing"
          >
            <Link2Off size={15} />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={handleShare}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-stone-100 dark:bg-stone-800
          text-stone-600 dark:text-stone-300 hover:bg-teal-50 dark:hover:bg-teal-900/20 hover:text-teal-700 dark:hover:text-teal-400
          border border-stone-200 dark:border-stone-700 font-medium transition disabled:opacity-50"
        >
          <Share2 size={16} />
          {loading ? "Generating link..." : "Create share link"}
        </button>
      )}
    </div>
  );
};

export default ShareNote;
