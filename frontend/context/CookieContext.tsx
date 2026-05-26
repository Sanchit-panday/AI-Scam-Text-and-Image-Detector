"use client";
import { useState } from "react";

import {
    createContext,
    useContext,
    useEffect,
} from "react";

import {
    getCookiePreferences,
    saveCookiePreferences,
} from "@/lib/cookies";

import type {
    CookiePreferences,
} from "@/types/types";

type CookieContextType = {
    preferences: CookiePreferences | null;

    showBanner: boolean;

    showSettings: boolean;

    savePreferences: (
        prefs: CookiePreferences
    ) => void;

    setShowSettings: (
        value: boolean
    ) => void;
};

const CookieContext = createContext<CookieContextType | null>(null);

// const [preferences, setPreferences] =
//   useState<CookiePreferences | null>(null);

// const [showBanner, setShowBanner] =
//   useState(false);

// const [showSettings, setShowSettings] =
//   useState(false);

export function CookieProvider({
    children,
}: {
    children: React.ReactNode;
}) {

    const [preferences, setPreferences] =
        useState<CookiePreferences | null>(
            null
        );

    const [showBanner, setShowBanner] =
        useState(false);

    const [showSettings, setShowSettings] =
        useState(false);

    useEffect(() => {
        const prefs =
            getCookiePreferences();

        if (!prefs) {
            setShowBanner(true);
        } else {
            setPreferences(prefs);
        }
    }, []);

    const savePreferences = (
        prefs: CookiePreferences
    ) => {

        saveCookiePreferences(prefs);

        setPreferences(prefs);

        setShowBanner(false);

        setShowSettings(false);
    };

    return (
        <CookieContext.Provider
            value={{
                preferences,
                showBanner,
                showSettings,
                savePreferences,
                setShowSettings,
            }}
        >
            {children}
        </CookieContext.Provider>
    );
}

export function useCookieContext() {
    const context =
        useContext(CookieContext);

    if (!context) {
        throw new Error(
            "useCookieContext must be used inside CookieProvider"
        );
    }

    return context;
}