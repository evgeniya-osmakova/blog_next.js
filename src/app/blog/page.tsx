'use server'

    import { Metadata } from 'next'
import { BlogClient } from './BlogClient'
import { BlogService } from '@/services/api'
import { Post } from '@/types/post'

export const metadata: Metadata = {
    title: 'Blog Posts | Blog App',
    description: 'Read our latest blog posts',
    openGraph: {
        title: 'Blog Posts | Blog App',
        description: 'Read our latest blog posts',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Blog Posts | Blog App',
        description: 'Read our latest blog posts',
    },
}

export default async function BlogPage() {
    const blogService = new BlogService();
    let initialData: Post[] | null = null;
    let error: string | null = null;

    try {
        initialData = await blogService.getAllPosts();
    } catch (e) {
        error = e instanceof Error ? e.message : 'Failed to fetch data'
    }

    return (
        <BlogClient
            initialData={initialData}
            initialError={error}
        />
    )
}
