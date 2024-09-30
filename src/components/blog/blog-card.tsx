import React from 'react'
import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, ClockIcon, ArrowRightIcon } from 'lucide-react'
import { BlogPost } from '@/components/blog/blog-data'

interface BlogCardProps {
    post: BlogPost
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => (
    <Card className="flex flex-col hover:shadow-xl transition-shadow duration-300 overflow-hidden">
        <CardHeader className="bg-muted/50 p-4 sm:p-6">
            <div className="flex flex-wrap justify-between items-center mb-2 gap-2">
                <Badge variant="secondary" className="text-xs font-semibold">
                    {post.category}
                </Badge>
                <span className="text-xs text-muted-foreground flex items-center">
          <CalendarIcon className="w-3 h-3 mr-1" />
                    {new Date(post.date).toLocaleDateString()}
        </span>
            </div>
            <CardTitle className="line-clamp-2 text-lg sm:text-xl">{post.title}</CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 flex-grow">
            <p className="text-muted-foreground text-sm line-clamp-3">{post.excerpt}</p>
        </CardContent>
        <CardFooter className="bg-muted/50 flex justify-between items-center p-4 sm:p-6">
      <span className="text-xs text-muted-foreground flex items-center">
        <ClockIcon className="w-3 h-3 mr-1" />
          {post.readTime}
      </span>
            <Link
                href={`/blog/${post.slug}`}
                className="text-primary hover:text-primary/80 transition-colors duration-200 flex items-center text-sm font-medium"
            >
                Read More <ArrowRightIcon className="ml-1 w-4 h-4" />
            </Link>
        </CardFooter>
    </Card>
)

export default BlogCard