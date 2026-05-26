"use client";

import { useState, useEffect } from "react";
import { useCookieContext } from "@/context/CookieContext";

export default function CookieSettingsModal() {
    const {
        showSettings,
        setShowSettings,
        preferences,
        savePreferences,
    } = useCookieContext();

    const [analytics, setAnalytics] =
        useState(false);

    const [advertising, setAdvertising] =
        useState(false);

    useEffect(() => {
        if (preferences) {
            setAnalytics(preferences.analytics);
            setAdvertising(preferences.advertising);
        }
    }, [preferences]);

    if (!showSettings) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="w-full max-w-lg rounded-xl bg-background p-6">
                <h2 className="mb-4 text-xl font-bold">
                    Cookie Preferences
                </h2>

                <div className="space-y-6">

                    <div>
                        <div className="flex gap-4">
                            <h3 className="font-semibold">
                                Functional Cookies
                            </h3>
                            <input
                                type="checkbox"
                                checked
                                disabled
                            />
                        </div>
                        <p className="text-sm text-gray-500">
                            For security and basic functionality.
                        </p>

                    </div>

                    <div>
                        <div className="flex gap-4">
                            <h3 className="font-semibold">
                                Analytics Cookies
                            </h3>
                            <input
                                type="checkbox"
                                checked={analytics}
                                onChange={(e) =>
                                    setAnalytics(e.target.checked)
                                }
                            />
                        </div>
                        <p className="text-sm text-gray-500">
                            For improving site performance.
                        </p>

                    </div>

                    <div>
                        <div className="flex gap-4">
                            <h3 className="font-semibold">
                                Advertising Cookies
                            </h3>
                            <input
                                type="checkbox"
                                checked={advertising}
                                onChange={(e) =>
                                    setAdvertising(e.target.checked)
                                }
                            />

                        </div>
                        <p className="text-sm text-gray-500">
                            Personalize ads through advertising partners.
                        </p>

                    </div>
                </div>

                <div className="mt-6 flex justify-end gap-6">
                    <button
                        onClick={() =>
                            setShowSettings(false)
                        }
                        className="rounded px-4 py-2 bg-gray-800/50 hover:bg-gray-500/50 transition-all duration-300 ease-in-out"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={() =>
                            savePreferences({
                                functional: true,
                                analytics,
                                advertising,
                                consentGiven: true,
                            })
                        }
                        className="rounded bg-primary px-4 py-2 bg-gray-800/50 hover:bg-gray-500/50 transition-all duration-300 ease-in-out"
                    >
                        Save Preferences
                    </button>
                </div>
            </div>
        </div>
    );
}