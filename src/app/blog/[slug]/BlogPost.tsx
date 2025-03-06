'use client';

import { Post } from '@/types/post';
import Link from 'next/link';
import { OptimizedImage } from '@/app/components/OptimizedImage'
import React, { Suspense } from 'react'
import BlogPostLoading from '@/app/blog/[slug]/loading'

const ArticleContent = React.lazy(() => import('./ArticleContent'));

interface BlogPostProps {
    article: Post;
}

export function BlogPost({ article }: BlogPostProps) {
    const formattedDate = new Date(article.pub_date).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
            <article
                className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8"
                itemScope
                itemType="http://schema.org/Article"
            >
                <div className="mb-8">
                    <Link
                        href="/blog"
                        className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                        aria-label="Return to articles list"
                        aria-current="page"
                    >
                        <OptimizedImage
                            src="/icons/arrow-left.svg"
                            alt="Back icon"
                            width={20}
                            height={20}
                            loading="lazy"
                            aria-hidden="true"
                        />

                        Back to articles
                    </Link>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
                    <Suspense fallback={<BlogPostLoading />}>
                        <ArticleContent
                            article={article}
                            formattedDate={formattedDate}
                        />
                    </Suspense>
                </div>
            </article>
        </div>
    );
}
