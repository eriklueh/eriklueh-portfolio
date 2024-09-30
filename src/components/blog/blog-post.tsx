import React from 'react'
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, ClockIcon } from 'lucide-react'
import { BlogPost as BlogPostType } from './blog-data'

const DifficultyBadge: React.FC<{ difficulty: BlogPostType['difficulty'] }> = ({ difficulty }) => {
    const colorClass = {
        'Easy': 'bg-green-100 text-green-800',
        'Medium': 'bg-yellow-100 text-yellow-800',
        'Hard': 'bg-red-100 text-red-800'
    }[difficulty]

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClass}`}>
            {difficulty}
        </span>
    )
}

const BlogPost: React.FC<{ post: BlogPostType }> = ({ post }) => (
    <article className="max-w-4xl mx-auto mt-3">
        <header className="mb-8">
            <div className="flex flex-wrap justify-between items-center mb-4">
                <Badge>{post.category}</Badge>
                <div className="flex items-center space-x-4">
                    <DifficultyBadge difficulty={post.difficulty} />
                    <span className="text-sm text-muted-foreground">
                        <CalendarIcon className="inline mr-1 h-4 w-4" />
                        {new Date(post.date).toLocaleDateString()}
                    </span>
                    <span className="text-sm text-muted-foreground">
                        <ClockIcon className="inline mr-1 h-4 w-4" />
                        {post.readTime}
                    </span>
                </div>
            </div>
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
            <p className="text-xl text-muted-foreground">{post.excerpt}</p>
        </header>
        <div className="prose max-w-none">
            {post.content}
        </div>
    </article>
)

export default BlogPost