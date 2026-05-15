"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Bell, LogOut, LogIn, Loader2 } from "lucide-react";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";

export function Navbar() {
  const { user, loading, login, logout } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-primary/10">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center gold-glow">
            <span className="text-primary-foreground font-bold">N</span>
          </div>
          <span className="text-xl font-black tracking-tighter text-foreground group-hover:text-primary transition-colors">
            NAMETHEGAME
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <Link href="/discover" className="hover:text-primary transition-colors">Discover</Link>
          <Link href="/forums" className="hover:text-primary transition-colors">Forums</Link>
          <Link href="/garden" className="hover:text-primary transition-colors text-primary font-bold">Garden</Link>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="hover:text-primary">
            <Bell className="w-5 h-5" />
          </Button>
          
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
          ) : user ? (
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex flex-col items-end">
                <span className="text-[10px] font-bold text-primary uppercase leading-none">Hunter</span>
                <span className="text-sm font-bold text-foreground leading-tight">{user.displayName}</span>
              </div>
              <Button variant="ghost" size="icon" onClick={logout} className="hover:text-destructive">
                <LogOut className="w-5 h-5" />
              </Button>
              <div className="w-10 h-10 rounded-full border-2 border-primary/20 p-0.5 overflow-hidden">
                <Image 
                  src={user.photoURL || ""} 
                  alt={user.displayName || ""} 
                  width={40} 
                  height={40} 
                  className="w-full h-full rounded-full object-cover" 
                  unoptimized
                />
              </div>
            </div>
          ) : (
            <Button 
              onClick={login}
              className="bg-primary hover:bg-primary/80 text-primary-foreground font-bold shadow-lg shadow-primary/20 gap-2"
            >
              <LogIn className="w-4 h-4" />
              Sign In
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
