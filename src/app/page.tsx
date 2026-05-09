"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import PostCard from "../components/PostCard/PostCard";
import { PostType } from "../types/post";
import AddPost from "../components/modals/AddPost";
import { Navbar } from "../components/Navbar";
import { Search, Sparkles, Plus, Loader2 } from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const Home = () => {
  const [isAddPostOpen, setIsAddPostOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState<PostType[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAISearching, setIsAISearching] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);

  const getPosts = useCallback(async () => {
    try {
      setIsLoading(true);
      const resp = await fetch("/api/posts");
      if (!resp.ok) throw new Error(`HTTP error! status: ${resp.status}`);
      const data = await resp.json();
      setPosts(data.data || []);
    } catch (error) {
      console.error("Failed to fetch posts", error);
      setPosts([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const t = setTimeout(() => {
      getPosts();
    }, 0);
    return () => clearTimeout(t);
  }, [getPosts]);

  const filteredPosts = useMemo(() => {
    return posts.filter(post =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [posts, searchQuery]);

  const handleAISearch = async () => {
    if (!searchQuery) return;
    setIsAISearching(true);
    setAiResponse(null);
    try {
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `Based on this video game description or question: "${searchQuery}", can you identify the game? If you're not sure, give a few possibilities. Keep it concise. Current community posts for context: ${posts.map(p => p.title).join(", ")}`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      setAiResponse(response.text());
    } catch (error) {
      console.error("AI Search failed", error);
      setAiResponse("AI Search failed. Please check your API key.");
    } finally {
      setIsAISearching(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <AddPost
        isOpen={isAddPostOpen}
        onClose={() => setIsAddPostOpen(false)}
        refresh={getPosts}
      />

      <main className="max-w-7xl mx-auto px-4 pt-32 pb-20">
        {/* Hero Section */}
        <section className="text-center space-y-6 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest animate-pulse">
            <Sparkles className="w-3 h-3" />
            Ever-Bloom Sanctuary
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter">
            YOUR COMMUNITY FOR <br />
            <span className="text-primary italic">EVERY GAME.</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Identify games from images or descriptions. Join the elite guild of hunters in our immersive digital garden.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative group mt-10">
            <div className="absolute inset-0 bg-primary/20 blur-2xl group-hover:bg-primary/30 transition-all rounded-full" />
            <div className="relative flex items-center gap-2 glass p-2 rounded-2xl border-primary/20">
              <div className="grow relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search games, descriptions, discussions..."
                  className="pl-10 bg-transparent border-none focus-visible:ring-0 text-lg h-12"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button
                onClick={handleAISearch}
                disabled={isAISearching || !searchQuery}
                className="bg-primary hover:bg-primary/80 text-primary-foreground font-bold h-12 px-6 gap-2"
              >
                {isAISearching ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
                <span className="hidden sm:inline">AI SEARCH</span>
              </Button>
            </div>
          </div>

          {aiResponse && (
            <div className="max-w-2xl mx-auto mt-4 p-4 glass rounded-xl border-primary/30 text-left animate-in fade-in slide-in-from-top-4">
              <div className="flex items-center gap-2 text-primary font-bold text-sm mb-2 uppercase tracking-tight">
                <Sparkles className="w-4 h-4" />
                Gemini Insight
              </div>
              <p className="text-sm leading-relaxed text-foreground">{aiResponse}</p>
            </div>
          )}
        </section>

        {/* Posts Grid */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-4 mb-8">
          <div className="space-y-1">
            <h2 className="text-3xl font-black tracking-tight flex items-center gap-3">
              RECENT DISCOVERIES
              <span className="text-sm font-normal text-muted-foreground bg-secondary px-2 py-0.5 rounded">
                {filteredPosts.length}
              </span>
            </h2>
            <p className="text-muted-foreground">The latest questions from the community garden.</p>
          </div>
          <Button
            onClick={() => setIsAddPostOpen(true)}
            className="bg-foreground text-background hover:bg-foreground/90 font-bold gap-2 gold-glow"
          >
            <Plus className="w-5 h-5" />
            START A HUNT
          </Button>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="aspect-video w-full rounded-xl" />
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-20 w-full" />
              </div>
            ))}
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-20 glass rounded-3xl border-dashed border-primary/20">
            <p className="text-xl text-muted-foreground">No matches found in the garden. Be the first to start a hunt!</p>
            <Button variant="link" onClick={() => setSearchQuery("")} className="text-primary mt-2">Clear Search</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </main>

      <footer className="border-t border-primary/10 py-10 glass">
        <div className="max-w-7xl mx-auto px-4 text-center text-muted-foreground text-sm">
          <p>© 2024 NAMETHEGAME. ALL RIGHTS RESERVED. <span className="text-primary/50">GARDEN ELITE.</span></p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
