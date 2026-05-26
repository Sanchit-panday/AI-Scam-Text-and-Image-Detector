"use client";

import { useCookieContext } from "@/context/CookieContext";
import { X } from "lucide-react";

export default function CookieBanner() {
  const {
    showBanner,
    savePreferences,
    setShowSettings,
  } = useCookieContext();

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 rounded-xl border bg-background/90 px-6 py-3 shadow-lg w-sm">
      <div className="absolute top-2 right-2">
        <button onClick={() => savePreferences({
          functional: true,
          analytics: false,
          advertising: false,
          consentGiven: true,
        })}>
          <X className="hover:bg-gray-500/50 p-1 rounded transition-all duration-300 ease-in-out" size={25} strokeWidth={2.5} />
        </button>
      </div>
      <h3 className="mb-2 text-lg font-semibold">
        🍪 Cookie Preferences
      </h3>

      <p className="mb-4 text-sm text-muted-foreground">
        We use essential cookies for security and functionality.
        Optional cookies help improve our services and
        personalize advertising.
      </p>

      <div className="flex flex-col">
        <div className=" flex justify-evenly mb-8">
          <button
            onClick={() =>
              savePreferences({
                functional: true,
                analytics: true,
                advertising: true,
                consentGiven: true,
              })
            }
            className="rounded px-4 py-2 text-sm hover:bg-gray-500/40 transition-all duration-300 ease-in-out"
          >
            Accept All
          </button>

          <button
            onClick={() =>
              savePreferences({
                functional: true,
                analytics: false,
                advertising: false,
                consentGiven: true,
              })
            }
            className="rounded px-4 py-2 text-sm hover:bg-gray-500/40 transition-all duration-300 ease-in-out"
          >
            Reject (Optional)
          </button>
        </div>
        <button
          onClick={() => setShowSettings(true)}
          className="rounded hover:underline text-xs"
        >
          Manage Cookies
        </button>
      </div>
    </div>
  );
}