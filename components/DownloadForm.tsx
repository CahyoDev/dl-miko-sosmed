"use client"

import type React from "react"

import { useState } from "react"
import LoadingSpinner from "./LoadingSpinner"
import ResultCard from "./ResultCard"
import { downloadMedia } from "@/lib/api/cobalt"
import { downloadFile } from "@/lib/utils/download"
import type { CobaltSuccessResponse } from "@/lib/types/cobalt"

type VideoQuality = "720" | "1080" | "max"
type DownloadMode = "auto" | "audio" | "mute"
type AudioFormat = "mp3" | "best"

export default function DownloadForm() {
  const [url, setUrl] = useState("")
  const [videoQuality, setVideoQuality] = useState<VideoQuality>("1080")
  const [downloadMode, setDownloadMode] = useState<DownloadMode>("auto")
  const [audioFormat, setAudioFormat] = useState<AudioFormat>("mp3")

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [result, setResult] = useState<CobaltSuccessResponse | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    e.stopPropagation()
    await processDownload()
  }

  async function processDownload() {
    if (!url.trim()) {
      setError("Please enter a URL")
      return
    }

    setLoading(true)
    setError("")
    setResult(null)

    try {
      const response = await downloadMedia({
        url: url.trim(),
        videoQuality,
        downloadMode,
        audioFormat: downloadMode === "audio" ? audioFormat : undefined,
      })

      if (response.status === "error") {
        setError(`Error: ${response.error.code}`)
      } else {
        setResult(response)
        if (response.status === "redirect" && response.url) {
          try {
            await downloadFile(response.url, response.filename || "download")
          } catch (downloadErr) {
            console.error("[v0] Auto-download failed:", downloadErr)
            // Still show result card so user can manually download
          }
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  function handleReset() {
    setUrl("")
    setResult(null)
    setError("")
  }

  return (
    <div className="mx-auto w-full max-w-4xl space-y-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="url" className="block text-sm font-medium text-white">
            Video/Audio URL
          </label>
          <input
            id="url"
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://youtube.com/watch?v=..."
            className="w-full rounded-lg border border-neutral-700 bg-neutral-900 px-4 py-3 text-white placeholder-neutral-600 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-white"
            disabled={loading}
          />
          <p className="text-xs text-neutral-500">
            Supports: YouTube, TikTok, Twitter, Instagram, Facebook, Reddit, and more
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <label htmlFor="mode" className="block text-sm font-medium text-white">
              Download Mode
            </label>
            <select
              id="mode"
              value={downloadMode}
              onChange={(e) => setDownloadMode(e.target.value as DownloadMode)}
              className="w-full rounded-lg border border-neutral-700 bg-neutral-900 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white"
              disabled={loading}
            >
              <option value="auto">Auto</option>
              <option value="audio">Audio Only</option>
              <option value="mute">Video Only (No Audio)</option>
            </select>
          </div>

          {downloadMode !== "audio" && (
            <div className="space-y-2">
              <label htmlFor="quality" className="block text-sm font-medium text-white">
                Video Quality
              </label>
              <select
                id="quality"
                value={videoQuality}
                onChange={(e) => setVideoQuality(e.target.value as VideoQuality)}
                className="w-full rounded-lg border border-neutral-700 bg-neutral-900 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white"
                disabled={loading}
              >
                <option value="720">720p</option>
                <option value="1080">1080p</option>
                <option value="max">Max Quality</option>
              </select>
            </div>
          )}

          {downloadMode === "audio" && (
            <div className="space-y-2">
              <label htmlFor="audioFormat" className="block text-sm font-medium text-white">
                Audio Format
              </label>
              <select
                id="audioFormat"
                value={audioFormat}
                onChange={(e) => setAudioFormat(e.target.value as AudioFormat)}
                className="w-full rounded-lg border border-neutral-700 bg-neutral-900 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white"
                disabled={loading}
              >
                <option value="best">Best</option>
                <option value="mp3">MP3</option>
              </select>
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-white px-6 py-4 font-semibold text-black transition-colors duration-200 hover:bg-neutral-200 disabled:cursor-not-allowed disabled:bg-neutral-700 disabled:text-neutral-500"
        >
          {loading ? "Processing..." : "Download"}
        </button>
      </form>

      {loading && <LoadingSpinner />}

      {error && (
        <div className="animate-fade-in rounded-lg border border-red-500 bg-red-900/30 p-4 text-red-200">
          <div className="flex items-center gap-3">
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            <p>{error}</p>
          </div>
        </div>
      )}

      {result && (
        <>
          <ResultCard result={result} />
          <button
            type="button"
            onClick={handleReset}
            className="w-full rounded-lg bg-neutral-800 px-6 py-3 font-medium text-white transition-colors duration-200 hover:bg-neutral-700"
          >
            Download Another
          </button>
        </>
      )}
    </div>
  )
}
