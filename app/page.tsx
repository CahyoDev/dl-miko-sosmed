"use client"

import DownloadForm from "@/components/DownloadForm"

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-neutral-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white">
                <svg className="h-6 w-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
              </div>
              <h1 className="text-2xl font-bold">Miko DL</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-4xl space-y-12">
          {/* Hero Section */}
          <div className="space-y-4 text-center">
            <h2 className="bg-gradient-to-r from-white to-neutral-500 bg-clip-text text-5xl font-bold text-transparent">
              Download Media with Ease
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-neutral-400">
              Fast, free, and simple media downloader. No ads, no tracking, just downloads.
            </p>
          </div>

          {/* Download Form */}
          <DownloadForm />

          {/* Features */}
          <div className="grid grid-cols-1 gap-6 pt-12 md:grid-cols-3">
            <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-white/10">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-semibold">Lightning Fast</h3>
              <p className="text-sm text-neutral-400">Download your media in seconds with our optimized servers</p>
            </div>

            <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-white/10">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-semibold">Privacy First</h3>
              <p className="text-sm text-neutral-400">No tracking, no data collection, completely anonymous</p>
            </div>

            <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-white/10">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-semibold">Multi-Platform</h3>
              <p className="text-sm text-neutral-400">Support for YouTube, TikTok, Instagram, Twitter, and more</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-neutral-800">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-sm text-neutral-500">
            <p>
              Powered by{" "}
              <a
                href="https://github.com/imputnet/cobalt"
                target="_blank"
                rel="noreferrer noopener"
                className="text-white hover:underline"
              >
                Cobalt API
              </a>
            </p>
            <p className="mt-2">Free and open-source media downloader</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
