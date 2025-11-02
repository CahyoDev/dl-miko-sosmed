"use client"

import { useState } from "react"
import { downloadFile, downloadFileDirect } from "@/lib/utils/download"
import type { CobaltSuccessResponse, PickerItem } from "@/lib/types/cobalt"

interface Props {
  result: CobaltSuccessResponse
}

export default function ResultCard({ result }: Props) {
  const [isDownloading, setIsDownloading] = useState(false)
  const [downloadError, setDownloadError] = useState("")

  async function handleDownload(url: string, filename?: string) {
    setIsDownloading(true)
    setDownloadError("")

    try {
      await downloadFile(url, filename || "download")
    } catch (err) {
      // If both methods fail, show error with manual download option
      setDownloadError("Auto-download failed. Click 'Open Link' below to download manually.")
      console.error("[v0] Download error:", err)
    } finally {
      setIsDownloading(false)
    }
  }

  function handleDirectOpen(url: string) {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  if (result.status === "redirect" || result.status === "tunnel") {
    return (
      <div className="animate-fade-in rounded-xl border border-neutral-800 bg-neutral-900 p-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <svg className="h-6 w-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <h3 className="text-xl font-semibold text-white">Ready to Download</h3>
          </div>

          {result.filename && <p className="text-sm text-neutral-400">Filename: {result.filename}</p>}

          {downloadError && (
            <div className="rounded-lg bg-yellow-900/30 border border-yellow-700 p-3 text-sm text-yellow-200">
              {downloadError}
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => handleDownload(result.url || "", result.filename)}
              disabled={isDownloading}
              className="rounded-lg bg-white px-6 py-4 font-semibold text-black transition-colors duration-200 hover:bg-neutral-200 disabled:cursor-not-allowed disabled:bg-neutral-700 disabled:text-neutral-500"
            >
              {isDownloading ? "Downloading..." : "Download"}
            </button>

            <button
              onClick={() => handleDirectOpen(result.url || "")}
              className="rounded-lg bg-neutral-800 border border-neutral-700 px-6 py-4 font-semibold text-white transition-colors duration-200 hover:bg-neutral-700"
            >
              Open Link
            </button>
          </div>

          <p className="text-xs text-neutral-500 text-center">
            If download button doesn't work, use "Open Link" to download manually
          </p>
        </div>
      </div>
    )
  }

  if (result.status === "picker" && result.picker) {
    return (
      <div className="animate-fade-in rounded-xl border border-neutral-800 bg-neutral-900 p-6">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white">Select Media to Download</h3>

          {downloadError && (
            <div className="rounded-lg bg-yellow-900/30 border border-yellow-700 p-3 text-sm text-yellow-200">
              {downloadError}
            </div>
          )}

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {result.picker.map((item: PickerItem, index: number) => (
              <div key={index} className="rounded-lg bg-neutral-800 p-4 transition-colors hover:bg-neutral-750">
                {item.thumb && (
                  <img
                    src={item.thumb}
                    alt="Thumbnail"
                    className="mb-3 h-40 w-full rounded-lg object-cover"
                  />
                )}
                <div className="space-y-2">
                  <span className="capitalize text-neutral-300 text-sm block">{item.type}</span>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleDownload(item.url, `media_${index + 1}`)}
                      disabled={isDownloading}
                      className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-neutral-200 disabled:cursor-not-allowed disabled:bg-neutral-700 disabled:text-neutral-500"
                    >
                      {isDownloading ? "..." : "Download"}
                    </button>
                    <button
                      onClick={() => handleDirectOpen(item.url)}
                      className="rounded-lg bg-neutral-700 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-600"
                    >
                      Open
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return null
}