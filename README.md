# Next.js Blog Application

https://blog-next-ihzpotwq9-evgeniya-osmakovas-projects.vercel.app/blog

A modern, accessible blog application built with Next.js 15, React 19, and TypeScript. This application demonstrates best practices in web development, including accessibility features, SEO optimization, and responsive design.

## Features

### Core Features
- 📱 Responsive design that works across all devices
- ♿ Full accessibility support (WCAG 2.1 compliant)
- 🔍 SEO optimized with meta tags and Schema.org markup
- 🌓 Dark mode support
- 🖼️ Optimized image loading with lazy loading
- ⚡ Fast page loads with Next.js App Router

### Technical Features
- Server-side rendering with Next.js
- TypeScript for type safety
- Component-based architecture
- Tailwind CSS for styling
- Jest and React Testing Library for testing
- Integration with JSONPlaceholder API
- State management with Zustand

## Getting Started

### Prerequisites
- Node.js 18.0 or later
- npm 9.0 or later

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd <project-directory>
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

- `npm run dev` - Starts the development server
- `npm run build` - Creates a production build
- `npm run start` - Runs the production server
- `npm run lint` - Runs ESLint
- `npm test` - Runs Jest tests

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── blog/              # Blog pages and components
│   │   ├── [slug]/        # Individual blog post page
│   │   └── page.tsx       # Blog listing page
│   ├── components/        # Shared components
│   └── layout.tsx         # Root layout
├── types/                 # TypeScript type definitions
└── tests/                 # Test files
```

## Pages and Routing

### Blog List Page (`/blog`)
- Displays a grid of blog post cards
- Each card shows:
  - Post title
  - Author name
  - Publication date
  - "Read more" link
- Includes search functionality
- Responsive grid layout
- Dark mode support

### Blog Post Page (`/blog/[slug]`)
- Shows full article content
- Displays:
  - Article title
  - Author information
  - Publication date
  - Full article body
- "Back to articles" navigation
- Schema.org article markup
- Optimized meta tags

## State Management

The application uses Zustand for state management, providing a simple and efficient store implementation.

### Blog Store
```typescript
interface BlogState {
  // Data
  posts: Post[]
  searchQuery: string
  isLoading: boolean
  error: string | null

  // Actions
  setPosts: (posts: Post[]) => void
  setSearchQuery: (query: string) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  
  // Computed
  filteredPosts: Post[]
}
```

### Key Features
- Centralized state management
- Search functionality
- Loading states
- Error handling
- Computed filtered posts
- Type-safe actions

## API Integration

The project uses [JSONPlaceholder](https://jsonplaceholder.typicode.com/) - a free fake REST API for testing and prototyping. This provides:
- Ready-to-use mock data
- RESTful API endpoints
- Consistent response format
- No authentication required
- Reliable for development and testing

## Accessibility Features

- ARIA labels and roles
- Semantic HTML structure
- Keyboard navigation support
- Screen reader optimizations
- Color contrast compliance
- Focus management
- Alt text for images

## SEO Optimization

- Meta tags for each page
- Schema.org markup for articles
- Open Graph tags
- Semantic HTML
- Optimized page titles and descriptions

## Testing

Run tests with:
```bash
npm test
```
