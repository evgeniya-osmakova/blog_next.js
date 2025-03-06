import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Header } from '../Header';
import Image from 'next/image';

jest.mock('@/app/components/OptimizedImage', () => ({
    OptimizedImage: ({ alt, src, ...props }: { alt: string; src: string }) =>
        <Image
            alt={alt}
            src={src}
            {...props}
        />
}));

describe('Header', () => {
    const mockProps = {
        inputValue: '',
        handleSearchChange: jest.fn(),
        handleClearSearch: jest.fn(),
    };

    it('renders header with title', () => {
        render(<Header {...mockProps} />);
        expect(screen.getByText('Latest Posts')).toBeInTheDocument();
    });

    it('renders search input with correct attributes', () => {
        render(<Header {...mockProps} />);

        const input = screen.getByRole('searchbox');
        expect(input).toHaveAttribute('id', 'search');
        expect(input).toHaveAttribute('placeholder', 'Search posts...');
        expect(input).toHaveAttribute('type', 'text');
    });

    it('renders search label for screen readers', () => {
        render(<Header {...mockProps} />);

        const input = screen.getByLabelText('Search in post title and content');
        expect(input).toBeInTheDocument();
    });

    it('handles search input change', () => {
        render(<Header {...mockProps} />);

        const input = screen.getByRole('searchbox');
        fireEvent.change(input, { target: { value: 'test' } });

        expect(mockProps.handleSearchChange).toHaveBeenCalled();
    });

    it('shows clear button when input has value', () => {
        render(<Header {...mockProps} inputValue="test" />);

        const clearButton = screen.getByRole('button', { name: /clear search/i });
        expect(clearButton).toBeInTheDocument();
    });

    it('hides clear button when input is empty', () => {
        render(<Header {...mockProps} />);

        const clearButton = screen.queryByRole('button', { name: /clear search/i });
        expect(clearButton).not.toBeInTheDocument();
    });

    it('calls handleClearSearch when clear button is clicked', () => {
        render(<Header {...mockProps} inputValue="test" />);

        const clearButton = screen.getByRole('button', { name: /clear search/i });
        fireEvent.click(clearButton);

        expect(mockProps.handleClearSearch).toHaveBeenCalled();
    });

    it('renders search icon', () => {
        render(<Header {...mockProps} />);

        const searchIcon = screen.getByAltText('Search icon');
        expect(searchIcon).toBeInTheDocument();
        expect(searchIcon).toHaveAttribute('aria-hidden', 'true');
    });

    it('renders with correct accessibility attributes', () => {
        render(<Header {...mockProps} />);

        const searchRegion = screen.getByRole('search');
        expect(searchRegion).toBeInTheDocument();

        const input = screen.getByRole('searchbox');
        expect(input).toHaveAttribute('aria-label', 'Search posts');
    });
});
