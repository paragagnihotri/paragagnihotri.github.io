"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
      <p className="font-serif text-6xl font-bold text-brown-200 mb-4">Oops</p>
      <h2 className="font-serif text-2xl font-semibold text-brown-900 mb-3">
        Something went wrong
      </h2>
      <p className="text-brown-500 mb-8 text-sm">
        Could not load data. Make sure the backend is running at{" "}
        <code className="bg-beige-100 px-1.5 py-0.5 rounded text-brown-700">
          http://localhost:8000
        </code>
      </p>
      <button onClick={reset} className="btn-primary">
        Try again
      </button>
    </div>
  );
}
