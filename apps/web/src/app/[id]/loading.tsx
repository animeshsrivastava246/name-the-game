import { Skeleton } from "@/components/ui/skeleton";
import { Navbar } from "@/components/Navbar";

export default function Loading() {
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
