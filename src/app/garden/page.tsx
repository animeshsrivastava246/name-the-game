"use client";

import { Navbar } from "@/components/Navbar";
import { Sprout, Trophy, Target } from "lucide-react";


export default function GardenPage() {
  const dummyHunters = [
    { name: "PixelSeeker", points: 4250, rank: "Grandmaster", solves: 142 },
    { name: "RetroFind", points: 3890, rank: "Master", solves: 98 },
    { name: "GameSleuth", points: 3100, rank: "Expert", solves: 76 },
    { name: "ArcadeOracle", points: 2850, rank: "Expert", solves: 64 },
    { name: "ConsoleScout", points: 2100, rank: "Hunter", solves: 45 }
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 pt-32 space-y-12">
        <div className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest animate-pulse">
            <Sprout className="w-3 h-3" />
            The Inner Sanctum
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter font-serif">
            HUNTER&apos;S <span className="text-primary italic">GARDEN.</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-sans">
            The leaderboard of our most prestigious game identifiers. Prove your worth to climb the ranks.
          </p>
        </div>

        <div className="max-w-4xl mx-auto mt-12 space-y-4">
          <div className="grid grid-cols-12 gap-4 px-6 py-3 text-xs font-bold text-muted-foreground uppercase tracking-wider font-sans">
            <div className="col-span-1 text-center">Rank</div>
            <div className="col-span-5">Hunter</div>
            <div className="col-span-3 text-center">Title</div>
            <div className="col-span-3 text-right">Points</div>
          </div>
          
          {dummyHunters.map((hunter, i) => (
            <div 
              key={i} 
              className="glass p-4 rounded-2xl border-primary/10 flex items-center hover:bg-white/10 transition-colors group"
            >
              <div className="grid grid-cols-12 gap-4 w-full items-center">
                <div className="col-span-1 flex justify-center">
                  {i < 3 ? (
                    <Trophy className={`w-6 h-6 ${i === 0 ? "text-yellow-400" : i === 1 ? "text-gray-300" : "text-amber-600"}`} />
                  ) : (
                    <span className="text-lg font-bold text-muted-foreground">#{i + 1}</span>
                  )}
                </div>
                <div className="col-span-5 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary border border-primary/30">
                    {hunter.name.charAt(0)}
                  </div>
                  <span className="font-bold text-lg group-hover:text-primary transition-colors font-serif">{hunter.name}</span>
                </div>
                <div className="col-span-3 text-center">
                  <span className="px-3 py-1 rounded-full bg-secondary/50 text-xs font-medium border border-white/5">
                    {hunter.rank}
                  </span>
                </div>
                <div className="col-span-3 text-right flex flex-col items-end">
                  <span className="font-black text-xl text-primary">{hunter.points}</span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Target className="w-3 h-3" /> {hunter.solves} solves
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
