import { Post } from '@/types/post'

interface RowData {
    userId: string;
    id: string;
    title: string;
    body: string;
}

export class BlogService {
    private readonly baseUrl = 'https://jsonplaceholder.typicode.com';

    public async getAllPosts(): Promise<Post[]> {
        const res = await fetch(`${this.baseUrl}/posts`);

        if (!res.ok) {
            throw new Error('Failed to fetch post');
        }

        const data = await res.json();

        return data.map((item: RowData) => ({
            ...item,
            pub_date: new Date().toISOString(),
        }));
    }

    public async getPostById(id: string): Promise<Post> {
        const res = await fetch(`${this.baseUrl}/posts/${id}`);

        if (!res.ok) {
            throw new Error('Failed to fetch post');
        }

        const data = await res.json();

        return {
            id: data.id.toString(),
            userId: data.userId.toString(),
            title: data.title,
            body: data.body,
            pub_date: new Date().toISOString(),
            author: `Author ${data.userId}`
        };
    }
}
