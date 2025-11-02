// Cobalt API Types
export interface CobaltRequest {
  url: string
  videoQuality?: "144" | "240" | "360" | "480" | "720" | "1080" | "1440" | "2160" | "max"
  audioFormat?: "best" | "mp3" | "ogg" | "wav" | "opus"
  audioBitrate?: "320" | "256" | "128" | "96" | "64" | "8"
  filenameStyle?: "classic" | "pretty" | "basic" | "nerdy"
  downloadMode?: "auto" | "audio" | "mute"
  youtubeVideoCodec?: "h264" | "av1" | "vp9"
  youtubeDubLang?: string
  alwaysProxy?: boolean
  disableMetadata?: boolean
  tiktokFullAudio?: boolean
  tiktokH265?: boolean
  twitterGif?: boolean
}

export interface CobaltSuccessResponse {
  status: "redirect" | "tunnel" | "picker"
  url?: string
  filename?: string
  picker?: PickerItem[]
}

export interface PickerItem {
  type: "video" | "audio" | "photo"
  url: string
  thumb?: string
}

export interface CobaltErrorResponse {
  status: "error"
  error: {
    code: string
    context?: {
      service?: string
      limit?: number
    }
  }
}

export type CobaltResponse = CobaltSuccessResponse | CobaltErrorResponse