import React from 'react'
import { Metadata } from 'next'
import { blogPosts } from '@/components/blog/blog-data'
import BlogPost from '@/components/blog/blog-post'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const post = blogPosts.find(post => post.slug === params.slug)

    if (!post) {
        return {
            title: 'Blog Post Not Found',
        }
    }

    return {
        title: post.title,
        description: post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            type: 'article',
            publishedTime: post.date,
            authors: ['Eriklueh'],
            tags: [post.category],
        },
    }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
    const post = blogPosts.find(post => post.slug === params.slug)

    if (!post) {
        notFound()
    }

    return (
        <div className="container mx-auto px-auto p-8 ">
            <BlogPost post={post} />
        </div>
    )
}