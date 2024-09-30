import React from "react";
import { Metadata } from "next";
import BlogList from "@/components/blog/blog-list";

export const metadata: Metadata = {
  title: "Eriklueh's Dev Blog",
  description: "A frontend developer's Blog",
};

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <BlogList />
    </div>
  );
}
