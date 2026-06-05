"use client"
import { createContext, useContext, useReducer, useCallback, useEffect, ReactNode } from 'react'

const HISTORY_KEY = 'mildyAI_history'
const MAX_HISTORY = 100

// type defination of scan
type ScanType =
    | "text"
    | "image"
    | "domain-age"
    | "ssl"
    | "website";

interface BaseScan {
    id: string;
    timestamp: string;
    type: ScanType;
}

export interface TextScan extends BaseScan {
    type: "text";

    prediction: string;
    confidence: number;
    riskLevel: string;

    message?: string;
    urls?: string[];
    indicators?: string[];
}

export interface ImageScan extends BaseScan {
    type: "image";

    prediction: string;
    confidence: number;
    riskLevel: string;

    extractedText?: string;
    urls?: string[];
    indicators?: string[];
}
export interface DomainAgeScan extends BaseScan {
    type: "domain-age";

    url: string;
    createdAt?: string;
    age?: number;
    riskLevel: "Low" | "Medium" | "High" | "Unavailable";
    // riskLevel: string;
}

export type ScanHistoryItem =
    | TextScan
    | ImageScan
    | DomainAgeScan

type ScanState = {
    history: ScanHistoryItem[];
};
type ScanAction =
    | {
        type: "ADD_SCAN";
        payload: NewScan;
    }
    | {
        type: "DELETE_SCAN";
        id: string;
    }
    | {
        type: "CLEAR_HISTORY";
    }
    | {
        type: "LOAD_HISTORY";
        payload: ScanHistoryItem[];
    };

type NewTextScan = Omit<
    TextScan,
    "id" | "timestamp"
>;
type NewImageScan = Omit<
    ImageScan,
    "id" | "timestamp"
>;
type NewDomainAgeScan = Omit<
    DomainAgeScan,
    "id" | "timestamp"
>;
type NewScan =
    | NewTextScan
    | NewImageScan
    | NewDomainAgeScan;

type ScanContextType = {
    history: ScanHistoryItem[];

    addScan: (payload: NewScan) => void;

    deleteScan: (id: string) => void;
    clearHistory: () => void;

    metrics: {
        total: number;
        safe: number;
        suspicious: number;
        scam: number;
        avgConfidence: number;
        domainChecks: number;
    };
};
function loadHistory(): ScanHistoryItem[] {
    try {
        const raw = localStorage.getItem(HISTORY_KEY)
        return raw ? JSON.parse(raw) : []
    } catch {
        return []
    }
}

function saveHistory(history: ScanHistoryItem[]) {
    try {
        localStorage.setItem(HISTORY_KEY, JSON.stringify(history))
    } catch { }
}

const initialState = {
    history: [],
}

function reducer(
    state: ScanState,
    action: ScanAction
): ScanState {


    switch (action.type) {
        case 'ADD_SCAN': {
            const entry = {
                ...action.payload,
                id: crypto.randomUUID(),
                timestamp: new Date().toISOString(),
            };
            const history = [entry, ...state.history].slice(0, MAX_HISTORY)
            saveHistory(history)
            return { ...state, history }
        }
        case 'DELETE_SCAN': {
            const history = state.history.filter(h => h.id !== action.id)
            saveHistory(history)
            return { ...state, history }
        }
        case 'CLEAR_HISTORY': {
            saveHistory([])
            return { ...state, history: [] }
        }
        case "LOAD_HISTORY":
            return {
                ...state,
                history: action.payload,
            };
        default:
            return state
    }
}

export const ScanContext =
    createContext<ScanContextType | null>(null);

export function ScanProvider({
    children,
}: {
    children: ReactNode;
}) {
    const [state, dispatch] = useReducer(reducer, initialState)

    const addScan = useCallback(
        (
            payload: NewScan
        ) =>
            dispatch({
                type: "ADD_SCAN",
                payload,
            }),
        []
    );
    const deleteScan = useCallback(
        (id: string) =>
            dispatch({
                type: "DELETE_SCAN",
                id,
            }),
        []
    );
    const clearHistory = useCallback(() => dispatch({ type: 'CLEAR_HISTORY' }), [])

    const TextScans = state.history.filter(
        (scan): scan is TextScan =>
            scan.type === "text"
    )
    const ImageScans = state.history.filter(
        (scan): scan is ImageScan =>
            scan.type === "image"
    )
    const DomainAgeScans = state.history.filter(
        (scan): scan is DomainAgeScan =>
            scan.type === "domain-age"
    );
    const totalAnalysisScans = TextScans.length + ImageScans.length;
    const metrics = {
        total: state.history.length,

        safe: TextScans.filter(h => h.prediction === 'safe').length + ImageScans.filter(h => h.prediction === 'safe').length,
        suspicious: TextScans.filter(h => h.prediction === 'suspicious').length + ImageScans.filter(h => h.prediction === 'suspicious').length,
        scam: TextScans.filter(h => ['spam', 'scam', 'phishing'].includes(h.prediction)).length + ImageScans.filter(h => ['spam', 'scam', 'phishing'].includes(h.prediction)).length,

        domainChecks: DomainAgeScans.length,

        // later add confidence from different scans
        avgConfidence: (TextScans.length + ImageScans.length)
            ? Math.round((
                TextScans.reduce((sum: number, item) =>
                    sum + item.confidence, 0) +
                ImageScans.reduce((sum: number, item) =>
                    sum + item.confidence, 0)
            ) / totalAnalysisScans)
            : 0,
    }

    useEffect(() => {
        dispatch({
            type: "LOAD_HISTORY",
            payload: loadHistory(),
        });
    }, []);

    return (
        <ScanContext.Provider value={{ history: state.history, addScan, deleteScan, clearHistory, metrics }}>
            {children}
        </ScanContext.Provider>
    )
}

export function useScanStore() {
    const ctx = useContext(ScanContext)
    if (!ctx) throw new Error('useScanStore must be used inside ScanProvider')
    return ctx
}
