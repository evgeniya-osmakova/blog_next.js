/// <reference types="jest" />
import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, act } from '@testing-library/react';
import { BlogPost } from '../BlogPost';

// Mock the ArticleContent component
jest.mock('../ArticleContent', () => {
    return {
        __esModule: true,
        default: ({ article, formattedDate }: any) => (
            <div data-testid="mocked-article-content">
                <div>Title: {article.title}</div>
                <div>Date: {formattedDate}</div>
            </div>
        ),
    };
});

describe('BlogPost', () => {
    const mockArticle = {
        id: '1',
        userId: '1',
        title: 'Test Article',
        author: 'John Doe',
        pub_date: '2024-03-20T12:00:00Z',
        body: 'This is a test article body',
        slug: 'test-article'
    };

    it('renders back navigation link correctly', async () => {
        await act(async () => {
            render(<BlogPost article={mockArticle} />);
        });

        const backLink = screen.getByRole('link', { name: /return to articles list/i });
        expect(backLink).toBeInTheDocument();
        expect(backLink).toHaveAttribute('href', '/blog');
    });

    it('renders with correct schema.org attributes', async () => {
        await act(async () => {
            render(<BlogPost article={mockArticle} />);
        });

        const article = screen.getByRole('article');
        expect(article).toHaveAttribute('itemscope');
        expect(article).toHaveAttribute('itemtype', 'http://schema.org/Article');
    });

    it('renders back arrow icon with correct attributes', async () => {
        await act(async () => {
            render(<BlogPost article={mockArticle} />);
        });

        const backIcon = screen.getByAltText('Back icon');
        expect(backIcon).toHaveAttribute('loading', 'lazy');
        expect(backIcon).toHaveAttribute('aria-hidden', 'true');
        expect(backIcon).toHaveAttribute('width', '20');
        expect(backIcon).toHaveAttribute('height', '20');
    });

    it('formats date correctly', async () => {
        await act(async () => {
            render(<BlogPost article={mockArticle} />);
        });

        const articleContent = await screen.findByTestId('mocked-article-content');
        expect(articleContent).toHaveTextContent('March 20, 2024');
    });

    it('renders article content', async () => {
        await act(async () => {
            render(<BlogPost article={mockArticle} />);
        });

        const articleContent = screen.getByTestId('mocked-article-content');
        expect(articleContent).toBeInTheDocument();
    });
}); 