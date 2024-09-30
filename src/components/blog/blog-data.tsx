import React from "react";
import zodPost from "@/components/blog/post/zod";

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  difficulty: "Easy" | "Medium" | "Hard";
  content: React.ReactNode;
  slug: string;
}


export const blogPosts: BlogPost[] = [
  zodPost,
];