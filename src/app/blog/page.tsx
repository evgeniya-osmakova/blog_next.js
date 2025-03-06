'use server'

import { BlogClient } from './BlogClient'
import { BlogService } from '@/services/api'
import { Post } from '@/types/post'

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
