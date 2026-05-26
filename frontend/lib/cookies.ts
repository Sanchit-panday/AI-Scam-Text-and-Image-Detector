import Cookies from "js-cookie";
import {
    CookiePreferences,
    // defaultCookiePreferences,
} from "@/types/types";

const COOKIE_NAME = "cookie_preferences";

export function getCookiePreferences():
    CookiePreferences | null {

    const cookie = Cookies.get(COOKIE_NAME);

    if (!cookie) {
        return null;
    }

    try {
        return JSON.parse(cookie) as CookiePreferences;
    } catch {
        return null;
    }
}

export function saveCookiePreferences(
  preferences: CookiePreferences
) {
  Cookies.set(
    COOKIE_NAME,
    JSON.stringify(preferences),
    {
      expires: 365,
      sameSite: "strict",
    }
  );
}

export function updateCookiePreferences(
  preferences: CookiePreferences
) {
  if (!preferences.analytics) {
    clearAnalyticsData();
  }

  if (!preferences.advertising) {
    clearAdvertisingData();
  }

  saveCookiePreferences(preferences);
}

export function clearAnalyticsData() {
    localStorage.removeItem("analytics-data");

    Cookies.remove("analytics_enabled");
}

export function clearAdvertisingData() {
    localStorage.removeItem("advertising-data");

    Cookies.remove("advertising_enabled");
}

export function hasCookieConsent(): boolean {
    const preferences =
        getCookiePreferences();

    return preferences?.consentGiven === true;
}

export function analyticsEnabled(): boolean {
  return (
    getCookiePreferences()?.analytics ??
    false
  );
}