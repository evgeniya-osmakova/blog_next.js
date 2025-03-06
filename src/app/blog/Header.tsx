'use client'

import React from 'react'
import { OptimizedImage } from '@/app/components/OptimizedImage'

interface BlogClientProps {
    inputValue: string;
    handleSearchChange: React.ChangeEventHandler<HTMLInputElement>;
    handleClearSearch: () => void;
}

export const Header = ({ inputValue, handleSearchChange, handleClearSearch }: BlogClientProps) => {

    return (
        <header className="sticky top-0 z-10 bg-gray-50 dark:bg-gray-900 pt-12 pb-8 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                        Latest Posts
                    </h1>

                    <div
                        className="max-w-2xl mx-auto relative group"
                        role="search"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur group-hover:blur-md transition-all duration-300" />
                        <div className="relative flex items-center bg-white dark:bg-gray-800 rounded-lg p-1">
                            <div
                                className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500"
                                aria-hidden="true"
                            >
                                <OptimizedImage
                                    src="/icons/search.svg"
                                    alt="Search icon"
                                    width={20}
                                    height={20}
                                    aria-hidden="true"
                                />
                            </div>

                            <label
                                htmlFor="search"
                                className="sr-only"
                            >
                                Search in post title and content
                            </label>

                            <div className="flex-1 px-2">
                                <input
                                    type="text"
                                    id="search"
                                    placeholder="Search posts..."
                                    value={inputValue}
                                    onChange={handleSearchChange}
                                    className="w-full bg-transparent border-0 outline-none px-3 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 rounded-lg"
                                    aria-label="Search posts"
                                    role="searchbox"
                                    autoFocus
                                />
                            </div>

                            {inputValue && (
                                <button
                                    onClick={handleClearSearch}
                                    className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                                    aria-label="Clear search"
                                    type="button"
                                >
                                    <OptimizedImage
                                        src="/icons/close.svg"
                                        alt="Close icon"
                                        width={20}
                                        height={20}
                                        className="w-5 h-5 text-gray-400"
                                        aria-hidden="true"
                                    />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
