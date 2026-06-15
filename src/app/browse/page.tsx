import { Suspense } from "react"
import BrowseContent from "./browse-content"

export default function BrowsePage() {
  return (
    <Suspense fallback={
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-100 rounded w-48" />
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5">
                <div className="h-48 bg-gray-100 rounded-xl mb-4" />
                <div className="h-4 bg-gray-100 rounded w-1/3 mb-3" />
                <div className="h-6 bg-gray-100 rounded w-2/3 mb-3" />
                <div className="h-2 bg-gray-100 rounded mb-2" />
                <div className="h-4 bg-gray-100 rounded w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    }>
      <BrowseContent />
    </Suspense>
  )
}
