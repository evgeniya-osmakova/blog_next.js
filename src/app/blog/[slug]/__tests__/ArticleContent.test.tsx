import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ArticleContent from '../ArticleContent';

jest.mock('@/app/components/OptimizedImage', () => ({
    OptimizedImage: ({ alt, ...props }: any) => <img alt={alt} {...props} />
}));

describe('ArticleContent', () => {
    const mockArticle = {
        id: '1',
        userId: '1',
        title: 'Test Article',
        author: 'John Doe',
        pub_date: '2024-03-20T12:00:00Z',
        body: 'This is a test article body',
        slug: 'test-article'
    };

    const mockFormattedDate = 'March 20, 2024';

    it('renders article content correctly', () => {
        render(
            <ArticleContent
                article={mockArticle}
                formattedDate={mockFormattedDate}
            />
        );

        expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Test Article');
        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText(mockFormattedDate)).toBeInTheDocument();
        expect(screen.getByText('This is a test article body')).toBeInTheDocument();
    });

    it('renders with correct accessibility attributes', () => {
        render(
            <ArticleContent
                article={mockArticle}
                formattedDate={mockFormattedDate}
            />
        );

        expect(screen.getByRole('heading', { level: 1 })).toHaveAttribute('id', 'article-title');

        const timeElement = screen.getByRole('time');
        expect(timeElement).toHaveAttribute('datetime', mockArticle.pub_date);
        expect(timeElement).toHaveAttribute('aria-label', `Published on ${mockFormattedDate}`);

        const icons = screen.getAllByRole('img', { hidden: true });
        icons.forEach(icon => {
            expect(icon).toHaveAttribute('aria-hidden', 'true');
        });
    });

    it('renders with correct schema.org attributes', () => {
        render(
            <ArticleContent
                article={mockArticle}
                formattedDate={mockFormattedDate}
            />
        );

        expect(screen.getByRole('heading', { level: 1 })).toHaveAttribute('itemprop', 'headline');
        expect(screen.getByText('John Doe')).toHaveAttribute('itemprop', 'author');
        expect(screen.getByRole('time')).toHaveAttribute('itemprop', 'datePublished');
        expect(screen.getByText('This is a test article body').parentElement)
            .toHaveAttribute('itemprop', 'articleBody');
    });
}); 