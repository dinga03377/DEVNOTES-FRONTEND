import { useState, useRef, useEffect } from "react";
import { Mic, Square, Trash2, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { uploadVoiceNote, deleteVoiceNote } from "../api/api";

// Records a short voice memo in-browser (MediaRecorder API) and attaches it
// to an already-saved note. `noteId` must belong to an existing note —
// recording is only offered once a note has been created, since the upload
// endpoint needs a real note id to attach the audio to.
const VoiceRecorder = ({ noteId, existingUrl, onChange }) => {

  const [recording, setRecording] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [seconds, setSeconds] = useState(0);

  const mediaRecorderRef = useRef(null);
  const streamRef = useRef(null);
  const chunksRef = useRef([]);
  const timerRef = useRef(null);
  const mimeTypeRef = useRef("audio/webm");

  useEffect(() => {
    return () => {
      clearInterval(timerRef.current);
      streamRef.current?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  const startRecording = async () => {

    if (!navigator.mediaDevices?.getUserMedia) {
      toast.error("Voice recording isn't supported in this browser");
      return;
    }

    try {

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const preferredTypes = [
        "audio/webm;codecs=opus",
        "audio/webm",
        "audio/mp4",
        "audio/ogg",
      ];

      const supportedType = preferredTypes.find((t) =>
        MediaRecorder.isTypeSupported(t)
      );

      const recorder = new MediaRecorder(
        stream,
        supportedType ? { mimeType: supportedType } : undefined
      );

      // Use whatever the browser actually negotiated, not our guess —
      // this is what previously caused silent playback when a browser
      // picked a different encoding than the one we assumed (audio/webm).
      mimeTypeRef.current = recorder.mimeType || "audio/webm";

      chunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      recorder.onstop = handleStopped;

      recorder.start();
      mediaRecorderRef.current = recorder;

      setRecording(true);
      setSeconds(0);
      timerRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);

    } catch (error) {
      console.log(error);
      toast.error("Microphone access denied");
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    streamRef.current?.getTracks().forEach((t) => t.stop());
    clearInterval(timerRef.current);
    setRecording(false);
  };

  const handleStopped = async () => {

    const mimeType = mimeTypeRef.current;
    const blob = new Blob(chunksRef.current, { type: mimeType });

    if (blob.size === 0) return;

    // Pick a file extension that actually matches how it was encoded,
    // rather than always writing .webm regardless of the real format.
    const extension = mimeType.includes("mp4")
      ? "m4a"
      : mimeType.includes("ogg")
      ? "ogg"
      : "webm";

    const formData = new FormData();
    formData.append("voiceNote", blob, `voice-${Date.now()}.${extension}`);

    setUploading(true);

    try {

      const updatedNote = await uploadVoiceNote(noteId, formData);

      onChange(updatedNote);

      toast.success("Voice note saved");

    } catch (error) {

      console.log(error);
      toast.error("Failed to upload voice note");

    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async () => {

    try {

      const updatedNote = await deleteVoiceNote(noteId);

      onChange(updatedNote);

      toast.success("Voice note removed");

    } catch (error) {

      console.log(error);
      toast.error("Failed to remove voice note");
    }
  };

  const formatSeconds = (s) => {
    const m = Math.floor(s / 60);
    const r = s % 60;
    return `${m}:${String(r).padStart(2, "0")}`;
  };

  return (
    <div className="mb-4">
      <label className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wide text-stone-400 dark:text-stone-500 mb-1.5">
        <Mic size={11} /> Voice note (optional)
      </label>

      {existingUrl ? (
        <div className="flex items-center gap-2 p-3 rounded-xl bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700">
          <audio controls src={existingUrl} className="flex-1 h-9" />
          <button
            type="button"
            onClick={handleDelete}
            className="p-2 rounded-lg bg-white dark:bg-stone-900 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition shrink-0"
            title="Remove voice note"
          >
            <Trash2 size={15} />
          </button>
        </div>
      ) : uploading ? (
        <div className="flex items-center gap-2 p-3 rounded-xl bg-stone-100 dark:bg-stone-800 text-sm text-stone-500 dark:text-stone-400">
          <Loader2 size={15} className="animate-spin" />
          Uploading voice note...
        </div>
      ) : recording ? (
        <button
          type="button"
          onClick={stopRecording}
          className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-medium transition"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white" />
          </span>
          Stop recording · {formatSeconds(seconds)}
          <Square size={14} className="fill-white" />
        </button>
      ) : (
        <button
          type="button"
          onClick={startRecording}
          className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-stone-100 dark:bg-stone-800
          text-stone-600 dark:text-stone-300 hover:bg-teal-50 dark:hover:bg-teal-900/20 hover:text-teal-700 dark:hover:text-teal-400
          border border-stone-200 dark:border-stone-700 font-medium transition"
        >
          <Mic size={16} />
          Record voice note
        </button>
      )}
    </div>
  );
};

export default VoiceRecorder;