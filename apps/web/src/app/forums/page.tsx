"use client";

import { Navbar } from "@/components/Navbar";
import { MessageCircle, Users, Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function ForumsPage() {
  const dummyCategories = [
    { title: "General Discussion", topics: 1245, desc: "Talk about anything related to gaming." },
    { title: "Game Identification Help", topics: 893, desc: "Need more help finding a game? Ask the community." },
    { title: "Hardware & Setups", topics: 432, desc: "Show off your rig or get advice on builds." },
    { title: "Retro Gaming", topics: 671, desc: "Discussions on classics and nostalgic gems." }
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 pt-32 space-y-12">
        <div className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest animate-pulse">
            <Users className="w-3 h-3" />
            The Guild
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter font-serif">
            COMMUNITY <span className="text-primary italic">FORUMS.</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-sans">
            Join the conversation. Share your wisdom and seek knowledge.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          {dummyCategories.map((cat, i) => (
            <Card key={i} className="glass border-primary/10 hover:border-primary/40 transition-colors group cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl font-bold font-serif group-hover:text-primary transition-colors">{cat.title}</CardTitle>
                <MessageCircle className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm text-muted-foreground mt-2 font-sans">{cat.desc}</CardDescription>
                <div className="flex items-center gap-2 mt-4 text-xs font-medium text-primary bg-primary/10 w-max px-2 py-1 rounded">
                  <Activity className="w-3 h-3" />
                  {cat.topics} Topics
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
