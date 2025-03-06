'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { PostCard } from '@/app/blog/PostCard'
import { Error } from '@/app/components/Error'
import { Post } from '@/types/post'
import { usePostListStore } from '@/providers/storeProvider'
import { OptimizedImage } from '@/app/components/OptimizedImage'
import { Header } from '@/app/blog/Header'

interface BlogClientProps {
    initialData: Post[] | null
    initialError: string | null
}

export function BlogClient({ initialData, initialError }: BlogClientProps) {
    const {
        articles,
        displayLimit,
        visibleArticles,
        searchQuery,
        initError,
        increaseDisplayLimit,
        setInitialData,
        setInitError,
        setSearchQuery,
    } = usePostListStore(state => state);

    const [inputValue, setInputValue] = useState(searchQuery);

    const debouncedSearch = useCallback(
        (() => {
            let timeoutId: NodeJS.Timeout;
            return (value: string) => {
                clearTimeout(timeoutId);

                timeoutId = setTimeout(() => {
                    setSearchQuery(value);
                }, 300);
            };
        })(),
        [setSearchQuery]
    );

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        setInputValue(value);
        debouncedSearch(value);
    };

    const handleClearSearch = () => {
        setInputValue('');
        setSearchQuery('');
    };

    useEffect(() => {
        if (initialData) {
            setInitialData(initialData);
        }

        if (initialError) {
            setInitError(initialError);
        }
    }, [initialData, initialError, setInitialData, setInitError]);

    const loadMoreRef = useRef<HTMLDivElement>(null);

    const handleIntersection = useCallback(async (entries: IntersectionObserverEntry[]) => {
        const loadMoreTrigger = entries[0];

        if (loadMoreTrigger.isIntersecting) {
            if (displayLimit < articles.length) {
                increaseDisplayLimit();
            }
        }
    }, [articles.length, displayLimit, increaseDisplayLimit]);

    useEffect(() => {
        const observer = new IntersectionObserver(handleIntersection, { threshold: 0.1 });

        if (loadMoreRef.current) {
            observer.observe(loadMoreRef.current);
        }

        return () => observer.disconnect();
    }, [handleIntersection]);

    if (initError) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
                <Error
                    message={initError}
                    onClick={() => window.location.reload()}
                />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <Header
                inputValue={inputValue}
                handleSearchChange={handleSearchChange}
                handleClearSearch={handleClearSearch}
            />

            <main
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
                role="main"
            >
                <div
                    className="grid grid-cols-1 md:grid-cols-2 gap-8"
                    role="feed"
                    aria-label="News articles"
                >
                    {visibleArticles.map((article) => (
                        <div
                            className="flex justify-center"
                            key={article.id}
                        >
                            <div className="w-full max-w-2xl">
                                <PostCard post={article} />
                            </div>
                        </div>
                    ))}

                    {visibleArticles.length === 0 && (
                        <div
                            className="col-span-full text-center py-12"
                            role="status"
                            aria-live="polite"
                        >
                            <p className="text-gray-500 dark:text-gray-400">
                                No articles found matching your search criteria
                            </p>
                        </div>
                    )}
                </div>

                <div
                    ref={loadMoreRef}
                    className="mt-12 flex justify-center"
                    role="status"
                    aria-live="polite"
                >
                    {displayLimit < articles.length && visibleArticles.length > 0 && (
                        <span className="animate-bounce text-gray-400 dark:text-gray-600">
                            <OptimizedImage
                                src="/icons/arrow-down.svg"
                                alt="Loading more articles"
                                width={20}
                                height={20}
                                aria-hidden="true"
                            />
                        </span>
                    )}
                </div>
            </main>
        </div>
    );
}
