"use client";
import { useState, useRef, useCallback } from 'react'

import ErrorAlert from "@/components/Error";
import LoadingSpinner from "@/components/LoadingSpinner";
import ResultCard from "@/components/ResultCard";
import { Image, Upload, X, Scan, AlertCircle, FileText } from 'lucide-react'
import { useScanStore } from '@/context/ScanContext';
import type { ScanMeta } from "@/types/types"


export default function ImageAnalysisPage() {

  const ACCEPTED = ['image/png', 'image/jpg', 'image/jpeg', 'image/webp']
  const MAX_FILE_SIZE_MB = 5;
  const MAX_FILE_SIZE = 5 * 1024 * 1024;

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null)
  const [dragging, setDragging] = useState(false)

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [scanMeta, setScanMeta] = useState<ScanMeta | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const { addScan } = useScanStore();


  function validateFile(f: File) {
    if (!ACCEPTED.includes(f.type)) return 'Unsupported file type. Please upload PNG, JPG, JPEG, or WEBP.'
    if (f.size > MAX_FILE_SIZE) return `File is too large. Maximum size is ${MAX_FILE_SIZE_MB} MB.`
    return null
  }

  function loadFile(f: File) {
    const err = validateFile(f)
    if (err) { setError(err); return }
    setImage(f)
    setResult(null)
    setError(null)
    setScanMeta(null)
    const reader = new FileReader()
    reader.onload = (e: ProgressEvent<FileReader>) => {
      const result = e.target?.result

      if (typeof result === "string") {
        setPreview(result)
      }
    }
    reader.readAsDataURL(f)
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0]
    if (f) loadFile(f)
    e.target.value = ''
  }

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragging(false)
    const f = e.dataTransfer.files?.[0]
    if (f) loadFile(f)
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => { e.preventDefault(); setDragging(true) }, [])
  const handleDragLeave = useCallback(() => setDragging(false), [])

  function removeFile() {
    setImage(null)
    setPreview(null)
    setResult(null)
    setError(null)
    setScanMeta(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  const analyzeImage = async () => {
    if (!image) {
      setError("Please select an image.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setResult(null);

      const formData = new FormData();

      // important
      formData.append("file", image);

      const BASE_URL =
        process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5298";

      const response = await fetch(
        `${BASE_URL}/api/phishing/analyze-image`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        
        if (response.status === 429) {
          throw new Error(
            "Too many requests. Please wait a minute and try again."
          );
        }

        const errorData = await response.json();

        throw new Error(
          errorData.error || "Server error"
        );
      }

      const data = await response.json();
      const meta: ScanMeta = { type: 'image', input: image.name, timestamp: new Date().toISOString() }
      setResult(data);
      setScanMeta(meta)
      addScan({
        type: "image",
        prediction: data.prediction,
        confidence: data.confidence,
        riskLevel: data.riskLevel,
        extractedText: data.extractedText,
        urls: data.urls ?? [],
        indicators: data.indicators ?? [],
      });
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  }

  const clearForm = () => {
    setImage(null);
    setResult(null);
    setError("");
    setPreview(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };


  return (
    <>
      {/* data form */}
      <div className="space-y-6 mt-6 max-w-3xl">
        <div className="flex items-center gap-3 mb-1">
          <Image size={22} className="text-brand-400" aria-hidden />
          <h1 className="text-2xl font-bold text-white">Image Analysis</h1>
        </div>
        <p className="text-slate-400 text-sm">Upload a screenshot of a suspicious message or website. AI will extract text via OCR and detect threats.</p>

        {/* Drop zone or preview */}
        <div className="glass-card p-5 space-y-4">
          <p className="text-sm font-medium text-slate-300">Upload image</p>

          {!image ? (
            <div
              role="button"
              tabIndex={0}
              aria-label="Drop image here or click to upload"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={() => fileInputRef.current?.click()}
              onKeyDown={e => e.key === 'Enter' && fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-12 flex flex-col items-center gap-4 cursor-pointer transition-all select-none
                  ${dragging
                  ? 'border-brand-500 bg-brand-900/20 scale-[1.01]'
                  : 'border-slate-600 hover:border-brand-600 hover:bg-brand-900/10'}
              `}
            >
              <div className="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center">
                <Upload size={28} className={dragging ? 'text-brand-400' : 'text-slate-500'} aria-hidden />
              </div>
              <div className="text-center">
                <p className="font-semibold text-slate-300">Drag & drop your image here</p>
                <p className="text-sm text-slate-500 mt-1">or click to browse files</p>
                <p className="text-xs text-slate-600 mt-2">PNG · JPG · JPEG · WEBP · Max {MAX_FILE_SIZE_MB} MB</p>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="relative rounded-2xl overflow-hidden border border-slate-700 bg-slate-900 max-h-80 flex items-center justify-center">
                {image && preview &&
                  <img
                    src={preview}
                    alt={`Preview of ${image.name}`}
                    className="max-h-80 max-w-full object-contain"
                  />
                }
                <button
                  onClick={removeFile}
                  disabled={loading}
                  className="absolute top-2 right-2 w-8 h-8 bg-slate-900/80 hover:bg-slate-800 rounded-full flex items-center justify-center text-slate-300 hover:text-white transition-colors"
                  aria-label="Remove image"
                >
                  <X size={14} />
                </button>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <Image size={14} aria-hidden />
                <span className="truncate">{image.name}</span>
                <span className="ml-auto shrink-0 text-xs text-slate-500">{(image.size / 1024).toFixed(0)} KB</span>
              </div>
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/jpg,image/webp"
            onChange={handleFileChange}
            className="sr-only"
            aria-label="File input"
          />

          {error && <ErrorAlert message={error} onDismiss={() => setError(null)} />}

          <div className="flex justify-end">
            <button
              onClick={analyzeImage}
              disabled={!image || loading}
              className="button-primary"
              aria-label="Analyze image"
            >
              <Scan size={16} aria-hidden />
              {loading ? 'Analyzing…' : 'Analyze Image'}
            </button>
          </div>

          {!image && (
            <p className="text-xs text-slate-600 flex items-center gap-1.5">
              <AlertCircle size={12} /> An image is required to run the analysis.
            </p>
          )}
        </div>

        {/* Loading */}
        {loading && (
          <div className="glass-card p-6">
            <LoadingSpinner message="Extracting text and scanning for threats…" />
          </div>
        )}

        {/* Result */}
        {result && scanMeta && !loading && (
          <ResultCard
            result={result}
            scanMeta={scanMeta}
          />
        )}
      </div >
    </>
  )
}

