export default function LoadingSpinner() {
  return (
    <div className="animate-fade-in flex items-center justify-center py-12">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-neutral-700 border-t-white"></div>
        <p className="text-neutral-400">Processing your request...</p>
      </div>
    </div>
  )
}
