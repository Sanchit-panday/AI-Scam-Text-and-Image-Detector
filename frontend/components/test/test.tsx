"use client";

import { useScanStore } from "../../context/ScanContext";

export default function TestHistory() {
  const {
    history,
    addScan,
    deleteScan,
    clearHistory,
    metrics,
  } = useScanStore();

  return (
    <div>
      <button
        onClick={() =>
          addScan({
            type: "text",
            prediction: "phishing",
            confidence: 0.92,
            riskLevel: "High",
            message: "Click here now!",
            urls: ["https://fake.com"],
            indicators: ["urgent language"],
          })
        }
      >
        Add Test Scan
      </button>

      <button onClick={clearHistory}>
        Clear History
      </button>

      <p>Total: {metrics.total}</p>

      <pre>
        {JSON.stringify(history, null, 2)}
      </pre>
    </div>
  );
}