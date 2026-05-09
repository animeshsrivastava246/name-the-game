"use client";

import { Navbar } from "@/components/Navbar";
import { Gamepad2, Compass } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function DiscoverPage() {
  const dummyGames = [
    { title: "Hollow Knight", genre: "Metroidvania", desc: "A beautifully hand-drawn 2D action-adventure." },
    { title: "Elden Ring", genre: "Action RPG", desc: "A vast open-world fantasy action RPG." },
    { title: "Stardew Valley", genre: "Simulation", desc: "An open-ended country-life RPG." },
    { title: "Celeste", genre: "Platformer", desc: "Help Madeline survive her inner demons." },
    { title: "Hades", genre: "Roguelike", desc: "Defy the god of the dead in this rogue-like dungeon crawler." },
    { title: "Outer Wilds", genre: "Exploration", desc: "An open world mystery about a solar system trapped in an endless time loop." }
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 pt-32 space-y-12">
        <div className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest animate-pulse">
            <Compass className="w-3 h-3" />
            Discover
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter font-serif">
            EXPLORE THE <span className="text-primary italic">UNKNOWN.</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-sans">
            Find new gems curated by our community. Step into uncharted territories.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {dummyGames.map((game, i) => (
            <Card key={i} className="glass border-primary/10 hover:gold-glow transition-all duration-300 group cursor-pointer">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Gamepad2 className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-2xl font-bold group-hover:text-primary transition-colors font-serif">{game.title}</CardTitle>
                <CardDescription className="text-primary font-medium text-xs uppercase tracking-wider">{game.genre}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground italic font-sans">{game.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
