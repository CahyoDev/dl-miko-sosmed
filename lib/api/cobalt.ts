import type { CobaltRequest, CobaltResponse } from "@/lib/types/cobalt"

const COBALT_API_URL = "https://backend-cobalt-api.arifzyn.my.id"

export async function downloadMedia(request: CobaltRequest): Promise<CobaltResponse> {
  const response = await fetch(`${COBALT_API_URL}/`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  })

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`)
  }

  return await response.json()
}

export async function getServerInfo() {
  const response = await fetch(`${COBALT_API_URL}/`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`)
  }

  return await response.json()
}
