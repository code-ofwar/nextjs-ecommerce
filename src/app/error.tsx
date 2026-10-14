"use client";

import { useEffect } from "react";
import { FaExclamationCircle } from "react-icons/fa";
import { FiRefreshCw } from "react-icons/fi";

const ErrorPage = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-[60vh] items-center justify-center px-4 py-12">
      <section className="w-full max-w-md rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <FaExclamationCircle className="text-3xl text-primary" />
        </div>

        <h1 className="sm:text-2xl text-xl font-bold text-foreground">
          Something went wrong!
        </h1>

        <p className="mt-3 text-sm leading-6 text-muted">
          An unexpected error occurred. Please try again.
        </p>

        <button
          onClick={() => reset()}
          className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 font-medium text-white transition-opacity hover:opacity-90"
        >
          <FiRefreshCw size={18} />
          Try Again
        </button>
      </section>
    </main>
  );
};

export default ErrorPage;
