import React from 'react'

interface ErrorProps {
    onClick: () => void;
    message: string;
}

export const Error: React.FC<ErrorProps> = ({ onClick, message }) => {
    return (
        <div className="p-12 flex flex-col items-center gap-6 text-center max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center mb-2">
                <svg className="w-8 h-8 text-red-600 dark:text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
            </div>
            
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Error loading news
            </h3>
            
            <p className="text-gray-600 dark:text-gray-400 text-base">
                {message}
            </p>

            <button
                onClick={onClick}
                className="mt-2 px-6 py-2.5 rounded-lg bg-gradient-to-r from-red-600 to-red-500 text-white font-medium text-sm shadow-lg shadow-red-500/30 hover:shadow-red-500/40 transition-all duration-200 hover:scale-105 active:scale-95"
            >
                Try Again
            </button>
        </div>
    )
}
