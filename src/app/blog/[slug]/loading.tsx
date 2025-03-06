import React from 'react';
import SkeletonArticle from './SkeletonArticle';

export default function BlogPostLoading() {
  return (
    <div
        aria-live="polite"
        aria-busy="true"
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      <SkeletonArticle />

      <div className="sr-only">
          Loading article content, please wait...
      </div>
    </div>
  );
}
