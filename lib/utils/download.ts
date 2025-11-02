/**
 * Downloads a file from a URL by creating a blob and triggering download
 * This method works across all browsers without page refresh
 */
export async function downloadFileFromBlob(url: string, filename: string): Promise<void> {
  try {
    // Try fetching with blob first (works for same-origin or CORS-enabled URLs)
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "*/*",
      },
      mode: "cors", // Explicitly set CORS mode
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const blob = await response.blob()
    const blobUrl = URL.createObjectURL(blob)

    const link = document.createElement("a")
    link.href = blobUrl
    link.download = filename
    link.style.display = "none"

    document.body.appendChild(link)
    link.click()
    
    // Cleanup after a short delay
    setTimeout(() => {
      document.body.removeChild(link)
      URL.revokeObjectURL(blobUrl)
    }, 100)
  } catch (error) {
    console.error("[v0] Blob download failed, trying direct method:", error)
    // Fallback to direct download if blob fails (CORS issues)
    throw error
  }
}

/**
 * Direct download without blob (fallback for CORS-restricted URLs)
 * Opens URL in new tab or triggers direct download
 */
export function downloadFileDirect(url: string, filename?: string): void {
  const link = document.createElement("a")
  link.href = url
  if (filename) {
    link.download = filename
  }
  link.target = "_blank"
  link.rel = "noopener noreferrer"
  link.style.display = "none"

  document.body.appendChild(link)
  link.click()
  
  setTimeout(() => {
    document.body.removeChild(link)
  }, 100)
}

/**
 * Smart download function that tries blob first, then falls back to direct
 */
export async function downloadFile(url: string, filename: string): Promise<void> {
  try {
    // Try blob method first
    await downloadFileFromBlob(url, filename)
  } catch (error) {
    console.log("[v0] Falling back to direct download method")
    // Fallback to direct download
    downloadFileDirect(url, filename)
  }
}

/**
 * Check if URL is downloadable via fetch (CORS check)
 */
export async function canDownloadViaBlob(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, {
      method: "HEAD",
      mode: "cors",
    })
    return response.ok
  } catch {
    return false
  }
}