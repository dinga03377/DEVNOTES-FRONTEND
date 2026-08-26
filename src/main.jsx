import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "react-quill-new/dist/quill.snow.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";

import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>

        {/* Toast Provider */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              borderRadius: "12px",
              background: "#1c1b15",
              color: "#fff",
              padding: "14px",
              fontFamily: "Inter, ui-sans-serif, sans-serif",
              border: "1px solid #2a2920",
            },
            success: {
              iconTheme: { primary: "#0d9488", secondary: "#fff" },
            },
          }}
        />

        <App />

      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);