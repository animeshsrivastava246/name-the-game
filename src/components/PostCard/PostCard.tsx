"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PostType } from "@/types/post";

function PostCard({ post }: { post: PostType }) {
  return (
    <Card className="h-full flex flex-col glass overflow-hidden transition-all duration-300 hover:gold-glow group">
      <div className="relative aspect-video overflow-hidden">
        {post.image ? (
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-secondary flex items-center justify-center text-muted-foreground">
            No Image
          </div>
        )}
        <div className="absolute inset-0 bg-linear-to-t from-background/80 to-transparent" />
      </div>
      
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">
            {post.title}
          </CardTitle>
        </div>
        <CardDescription className="flex items-center gap-2 text-xs">
          <span className="text-primary font-semibold">{post.name}</span>
          <span className="text-muted-foreground">•</span>
          <span>{post.created_at}</span>
        </CardDescription>
      </CardHeader>
      
      <CardContent className="grow">
        <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed italic">
          &quot;{post.description}&quot;
        </p>
      </CardContent>
    </Card>
  );
}

export default PostCard;
