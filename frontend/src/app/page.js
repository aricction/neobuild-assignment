"use client";

import { useState } from "react";
import { ColorRing } from "react-loader-spinner";

export default function Home() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onClickUpload = () => {
    if (!file) return;

    setLoading(true);

    // Simulate a delay (like an upload)
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 sm:p-20 bg-gray-50">
      <main className="w-full max-w-xl flex flex-col gap-10">
        <div className="text-center sm:text-left text-5xl font-bold text-gray-800">
          <h1>Resume Analyzer</h1>
        </div>

        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload your resume (PDF or DOCX)
          </label>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-700 bg-white border border-gray-300 rounded-full p-2 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 transition duration-300"
          />
        </div>

        <div className="w-full">
          <button
            type="button"
            onClick={onClickUpload}
            disabled={!file || loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-700 transition duration-300 flex items-center justify-center"
          >
            {loading ? (
              <ColorRing
                visible={true}
                 height="24"
                width="24"
                ariaLabel="color-ring-loading"
                wrapperStyle={{}}
                wrapperClass="color-ring-wrapper"
                colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
              />
            ) : (
              "Upload"
            )}
          </button>
        </div>
      </main>

      <footer className="mt-10 text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Resume Analyzer. All rights reserved.
      </footer>
    </div>
  );
}
