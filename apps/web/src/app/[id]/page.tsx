"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { PostType } from "@/types/post";
import AddReply from "@/components/modals/AddReply";
import PostReplyCard from "@/components/PostReplyCard/PostReplyCard";
import { useParams, useRouter } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import Image from "next/image";
import { ArrowLeft, MessageSquare, Calendar, User, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ThreeHero from "@/components/ThreeHero";

function PostPage() {
  const [isAddReplyOpen, setIsAddReplyOpen] = useState(false);
  const [post, setPost] = useState<PostType>();
  const [isLoading, setIsLoading] = useState(true);
  const [imgSrc, setImgSrc] = useState<string>("");
  const params = useParams();
  const router = useRouter();

  const getPost = useCallback(async () => {
    try {
      setIsLoading(true);
      const resp = await fetch(`/api/posts/${params.id}`);
      const data = await resp.json();
      setPost(data.data);
      if (data.data?.image) setImgSrc(data.data.image);
    } catch (error) {
      console.error("Failed to fetch post", error);
    } finally {
      setIsLoading(false);
    }
  }, [params.id]);

  useEffect(() => {
    const t = setTimeout(() => {
      getPost();
    }, 0);
    return () => clearTimeout(t);
  }, [getPost]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 pt-32 space-y-8">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="aspect-video w-full rounded-3xl" />
          <div className="space-y-4">
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-32 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Quest Not Found</h1>
          <Button onClick={() => router.push("/")}>Return to Garden</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20 relative overflow-hidden">
      <Navbar />
      <ThreeHero />
      
      <AddReply
        isOpen={isAddReplyOpen}
        onClose={() => setIsAddReplyOpen(false)}
        refresh={getPost}
        postId={post.id}
      />

      <motion.main 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-4xl mx-auto px-4 pt-32 space-y-12 relative z-10"
      >
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => router.push("/")}
          className="hover:text-primary gap-2 p-0 h-auto group"
        >
          <motion.div
            whileHover={{ x: -5 }}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            BACK TO DISCOVERIES
          </motion.div>
        </Button>

        {/* Hero Image */}
        <motion.div 
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="relative aspect-video rounded-3xl overflow-hidden glass border-primary/20 gold-glow shadow-2xl"
        >
          {imgSrc && (imgSrc.startsWith("http://") || imgSrc.startsWith("https://")) ? (
            <Image 
              src={imgSrc} 
              alt={post.title} 
              fill 
              className="object-cover"
              priority
              unoptimized
              onError={() => setImgSrc("")}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground bg-secondary/50">
              NO IMAGE PROVIDED
            </div>
          )}
          <div className="absolute inset-0 bg-linear-to-t from-background/90 via-transparent to-transparent" />
          
          <div className="absolute bottom-8 left-8 right-8 space-y-2">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary text-[10px] font-bold uppercase tracking-widest"
            >
              Active Quest
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="text-4xl md:text-5xl font-black tracking-tighter text-white drop-shadow-lg"
            >
              {post.title}
            </motion.h1>
          </div>
        </motion.div>

        {/* Content Section */}
        <div className="grid md:grid-cols-[1fr_300px] gap-12">
          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="space-y-4"
            >
              <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                DESCRIPTION
              </h2>
              <p className="text-lg leading-relaxed text-muted-foreground italic">
                &quot;{post.description}&quot;
              </p>
            </motion.div>

            {post.links && post.links.length > 0 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="space-y-4"
              >
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <ExternalLink className="w-5 h-5" />
                  RESOURCES
                </h2>
                <div className="flex flex-wrap gap-2">
                  {post.links.split(",").map((link, i) => (
                    <motion.a 
                      key={i} 
                      href={link.trim()} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="glass px-4 py-2 rounded-xl text-sm hover:text-primary hover:border-primary/40 transition-all flex items-center gap-2"
                    >
                      Source Link {i + 1}
                      <ExternalLink className="w-3 h-3" />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          <motion.aside 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            className="space-y-6"
          >
            <div className="glass p-6 rounded-3xl border-primary/10 space-y-6 sticky top-32">
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Hunter</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <p className="font-bold">{post.name}</p>
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Requested On</p>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-primary" />
                  {post.created_at}
                </div>
              </div>

              <Button 
                onClick={() => setIsAddReplyOpen(true)}
                className="w-full bg-primary hover:bg-primary/80 text-primary-foreground font-black gold-glow py-6 text-sm tracking-tighter"
              >
                HELP THIS HUNTER
              </Button>
            </div>
          </motion.aside>
        </div>

        {/* Replies Section */}
        <section className="space-y-8 pt-12 border-t border-primary/10">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-black tracking-tight flex items-center gap-3">
              GUILD RESPONSES
              <span className="text-sm font-normal text-muted-foreground bg-secondary px-2 py-0.5 rounded">
                {post.replies ? post.replies.length : 0}
              </span>
            </h2>
          </div>

          <div className="grid gap-6">
            <AnimatePresence mode="popLayout">
              {post.replies && post.replies.length > 0 ? (
                post.replies.map((reply, index) => (
                  <motion.div
                    key={reply.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 + index * 0.1 }}
                  >
                    <PostReplyCard reply={reply} />
                  </motion.div>
                ))
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-20 glass rounded-3xl border-dashed border-primary/10"
                >
                  <p className="text-muted-foreground">No answers yet. Share your wisdom!</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>
      </motion.main>
    </div>
  );
}

export default PostPage;
