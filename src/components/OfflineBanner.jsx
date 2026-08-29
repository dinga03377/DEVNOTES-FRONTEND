import { useState, useEffect } from "react";
import { WifiOff } from "lucide-react";

// Purely presentational — reflects the browser's own online/offline
// state. Doesn't touch any note-fetching logic; the service worker
// (public/sw.js) is what actually makes cached data available offline.
const OfflineBanner = () => {

  const [online, setOnline] = useState(navigator.onLine);

  useEffect(() => {

    const goOnline = () => setOnline(true);
    const goOffline = () => setOnline(false);

    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);

    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };

  }, []);

  if (online) return null;

  return (
    <div
      className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-2
      px-4 py-2.5 rounded-full bg-stone-900 dark:bg-white text-white dark:text-stone-900
      text-sm font-medium shadow-2xl"
    >
      <WifiOff size={15} />
      You're offline — showing your last synced notes
    </div>
  );
};

export default OfflineBanner;
