"use client"
import { createContext, useContext, useReducer, useCallback, useEffect, ReactNode } from 'react'


const HISTORY_KEY = 'mildyAI_history'
const MAX_HISTORY = 100

export interface ScanHistoryItem {
    id: string;
    timestamp: string;
    prediction: string;
    confidence: number;
    riskLevel: "Low" | "Medium" | "High";
    type: "text" | "image";

    message?: string;
    extractedText?: string;
    urls?: string[];
    indicators?: string[];
}
type ScanState = {
    history: ScanHistoryItem[];
};
type ScanAction =
    | {
        type: "ADD_SCAN";
        payload: Omit<ScanHistoryItem, "id" | "timestamp">;
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
type ScanContextType = {
    history: ScanHistoryItem[];
    addScan: (
        payload: Omit<ScanHistoryItem, "id" | "timestamp">
    ) => void;
    deleteScan: (id: string) => void;
    clearHistory: () => void;
    metrics: {
        total: number;
        safe: number;
        suspicious: number;
        scam: number;
        avgConfidence: number;
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
            const entry: ScanHistoryItem = {
                id: crypto.randomUUID(),
                ...action.payload,
                timestamp: new Date().toISOString()
            }
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
            payload: Omit<
                ScanHistoryItem,
                "id" | "timestamp"
            >
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

    const metrics = {
        total: state.history.length,
        safe: state.history.filter(h => h.prediction === 'safe').length,
        suspicious: state.history.filter(h => h.prediction === 'suspicious').length,
        scam: state.history.filter(h => ['spam', 'scam', 'phishing'].includes(h.prediction)).length,
        avgConfidence: state.history.length
            ? Math.round(state.history.reduce(
                (sum: number, item) =>
                    sum + item.confidence,
                0
            ) / state.history.length)
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
