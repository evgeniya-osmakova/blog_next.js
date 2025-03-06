import React from 'react';
import { Post } from '@/types/post';
import { OptimizedImage } from '@/app/components/OptimizedImage';

interface ArticleContentProps {
    article: Post;
    formattedDate: string;
}

export default function ArticleContent({ article, formattedDate }: ArticleContentProps) {
    return (
        <>
            <header className="mb-8">
                <h1
                    id="article-title"
                    className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
                    itemProp="headline"
                >
                    {article.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-gray-600 dark:text-gray-400">
                    <div className="flex items-center">
                        <OptimizedImage
                            src="/icons/user.svg"
                            alt="User icon"
                            width={20}
                            height={20}
                            loading="lazy"
                            aria-hidden="true"
                        />
                        <span itemProp="author" className="ml-1">
                            {article.author}
                        </span>
                    </div>

                    <div className="flex items-center">
                        <OptimizedImage
                            src="/icons/calendar.svg"
                            alt="Calendar icon"
                            width={20}
                            height={20}
                            loading="lazy"
                            aria-hidden="true"
                        />
                        <time
                            dateTime={article.pub_date}
                            itemProp="datePublished"
                            aria-label={`Published on ${formattedDate}`}
                        >
                            {formattedDate}
                        </time>
                    </div>
                </div>
            </header>

            <div
                className="prose prose-lg dark:prose-invert max-w-none"
                itemProp="articleBody"
            >
                <p className="text-gray-700 dark:text-gray-300">
                    {article.body}
                </p>
            </div>
        </>
    );
}
