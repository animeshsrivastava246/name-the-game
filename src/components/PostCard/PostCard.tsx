import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PostType } from "@/types/post";

function PostCard({ post }: { post: PostType }) {
  const [imgSrc, setImgSrc] = useState(post.image);
  const isValidUrl = post.image && (post.image.startsWith("http://") || post.image.startsWith("https://"));

  return (
    <Link href={`/${post.id}`} className="block h-full">
      <Card className="h-full flex flex-col glass overflow-hidden transition-all duration-300 hover:gold-glow group cursor-pointer">
        <div className="relative aspect-video overflow-hidden">
          {isValidUrl ? (
            <Image
              src={imgSrc}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              onError={() => setImgSrc("")}
              unoptimized
            />
          ) : (
            <div className="w-full h-full bg-secondary flex items-center justify-center text-muted-foreground uppercase text-[10px] font-bold tracking-widest">
              No Visual Recon
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
    </Link>
  );
}

export default PostCard;
