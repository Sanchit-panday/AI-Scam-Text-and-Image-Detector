"use client";
import { Loader } from "lucide-react";
import { useRef, useState } from "react";

export default function ImageAnalysisPage() {

  const MAX_MESSAGE_LENGTH = 5000;
  const MAX_FILE_SIZE = 5 * 1024 * 1024;

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);


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

      const response = await fetch(
        "http://localhost:5298/api/phishing/analyze-image",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();

        throw new Error(
          errorData.error || "Server error"
        );
      }

      const data = await response.json();

      setResult(data);
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

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };


  return (
    <>
      <div className="w-xl my-4 bg-stone-400 rounded-xl shadow-xs p-6">
        {/* header */}
        <div className="py-2 px-3 mb-7 flex justify-evenly">
          <button
            className={"p-3 w-fit bg-red-500"}>Image</button>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/jpg,image/webp"
          onChange={(e) => {
            const selectedFile = e.target.files?.[0];

            if (!selectedFile) return;

            if (selectedFile.size > MAX_FILE_SIZE) {
              setError(
                "Image size cannot exceed 5 MB."
              );

              e.target.value = "";

              return;
            }

            setError("");
            setImage(selectedFile);
          }}
        />

        {/* image preview */}
        {image && (
          <img
            src={URL.createObjectURL(image)}
            alt="Preview"
            className="mt-4 max-h-80 rounded border"
          />
        )}

        {
          image && (
            <p className="text-sm text-gray-500">
              Size:
              {" "}
              {(image.size / 1024 / 1024).toFixed(2)}
              {" "}
              MB
            </p>
          )
        }

        {/* submit button */}
        <button
          disabled={loading || !!error}
          onClick={analyzeImage}
          className="mt-4 px-4 py-2 border">

          {loading ? (
            <Loader className="animate-spin" />
          ) : (
            "Analyse"
          )}
        </button>

        {/* display clear button only if data is available */}
        {(image || result || error) && (
          <button
            type="button"
            onClick={clearForm}
            disabled={loading}
            className="px-4 py-2 border rounded bg-red-500 text-white ml-4"
          >
            Clear
          </button>
        )}

        {/* /If error */}
        {error && (
          <div className="mt-4 rounded border border-red-500 bg-red-50 p-3 text-red-700">
            {error}
          </div>
        )}



        {result && (
          <div className="mt-6">
            <h2>Result</h2>
            <p>
              Prediction: {result.prediction === "ham " ? "Safe" : "Scam"}
            </p>
            <p>
              Confidence:
              {(result.confidence * 100).toFixed(2)}%
            </p>

            {(result.extractedText) && (
              <div>
                <h3 className="font-semibold">
                  Extracted Text
                </h3>

                <pre className="mt-2 p-3 border rounded whitespace-pre-wrap">
                  {result.extractedText}
                </pre>
              </div>
            )}

          </div>
        )}
      </div >
    </>
  )
}
