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
