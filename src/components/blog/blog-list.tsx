import React from 'react'
import BlogCard from './blog-card'
import { blogPosts } from '@/components/blog/blog-data'

const BlogList: React.FC = () => {
    return (
        <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3 p-8">
            {blogPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
            ))}
        </div>
    )
}

export default BlogList