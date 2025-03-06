import React from 'react';

export const LoadingSpinner: React.FC = () => {
    return (
        <div className="flex justify-center items-center p-8">
            <div className="relative w-16 h-16">
                <div className="absolute top-0 left-0 w-full h-full">
                    <div className="w-16 h-16 rounded-full border-4 border-blue-200 dark:border-blue-900/30"></div>
                </div>

                <div className="absolute top-0 left-0 w-full h-full animate-spin">
                    <div className="w-16 h-16 rounded-full border-4 border-transparent border-t-blue-600 dark:border-t-blue-500"></div>
                </div>
            </div>
        </div>
    );
};
