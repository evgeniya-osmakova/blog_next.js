'use client';

import React from 'react';
import { Post } from '@/types/post'
import Link from 'next/link';
import { OptimizedImage } from '@/app/components/OptimizedImage';

interface PostCardProps {
    post: Post;
}

export function PostCard({ post }: PostCardProps) {
    return (
        <article className="h-[380px] rounded-2xl bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 overflow-hidden">
            <header className="h-[180px] p-8 flex flex-col justify-center mb-4">
                <div className="flex items-center justify-between mb-2">
                    <span className="inline-flex items-center rounded-full bg-blue-50 dark:bg-blue-900/20 px-2 py-1 text-xs font-medium text-blue-700 dark:text-blue-300">
                        Post
                    </span>
                </div>

                <h2 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2">
                    <Link href={`/blog/${post.id}`} className="hover:underline">
                        {post.title}
                    </Link>
                </h2>

                <time className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(post.pub_date).toLocaleDateString()}
                </time>
            </header>

            <div className="h-[140px] px-8 flex-1 min-w-0">
                <p className="text-base text-gray-600 dark:text-gray-300 line-clamp-6 overflow-hidden text-ellipsis">
                    {post.body}
                </p>
            </div>

            <footer className="h-[60px] px-8 pt-2 pb-4 border-t border-gray-100 dark:border-gray-700 mt-auto flex items-center">
                <Link
                    href={`/blog/${post.id}`}
                    className="ml-auto text-sm text-blue-600 dark:text-blue-400 flex items-center font-medium hover:underline"
                    aria-label={`Read more about ${post.title}`}
                >
                    Read more
                    <OptimizedImage
                        src="/icons/arrow-right.svg"
                        alt="More icon"
                        width={20}
                        height={20}
                        aria-hidden="true"
                    />
                </Link>
            </footer>
        </article>
    );
}
