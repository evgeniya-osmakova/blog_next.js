import { BlogPost } from './BlogPost';
import { Post } from '@/types/post';
import { notFound } from 'next/navigation';
import { BlogService } from '@/services/api';
import { Metadata } from 'next';

interface BlogPostPageProps {
    params: Promise<{
        slug: string;
    }>;
}

const getPost = async (slug: string): Promise<Post> => {
    const blogService = new BlogService();
    return blogService.getPostById(slug);
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    try {
        const { slug } = await params;
        const article = await getPost(slug);

        return {
            title: article.title,
            description: article.body.substring(0, 160),
            openGraph: {
                title: article.title,
                description: article.body.substring(0, 160),
                type: 'article',
                publishedTime: article.pub_date,
                authors: [article.author],
            },
            twitter: {
                card: 'summary_large_image',
                title: article.title,
                description: article.body.substring(0, 160),
            },
        };
    } catch {
        return {
            title: 'Article not found',
            description: 'The requested article could not be found',
        };
    }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    try {
        const { slug } = await params;
        const article = await getPost(slug);

        return (
            <main role="main" aria-labelledby="article-title">
                <BlogPost article={article} />
            </main>
        );
    } catch {
        notFound();
    }
}
