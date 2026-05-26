export interface Result  {
    prediction: string;
    confidence: number;
    riskLevel: 'Low' | 'Medium' | 'High';
    indicators: string[];
    urls: string[];
    extractedText?: string;
};
export interface ScanMeta  {
    type: "text" | "image";
    input?: string;
    timestamp: string;
};
export type CookiePreferences = {
  functional: true; // always true
  analytics: boolean;
  advertising: boolean;
  consentGiven: boolean;
};
export const defaultCookiePreferences: CookiePreferences = {
  functional: true,
  analytics: false,
  advertising: false,
  consentGiven: false,
};