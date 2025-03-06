import { LoadingSpinner } from '@/app/blog/LoadingSpinner'

export default function BlogLoading() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <LoadingSpinner />
    </div>
  )
}
