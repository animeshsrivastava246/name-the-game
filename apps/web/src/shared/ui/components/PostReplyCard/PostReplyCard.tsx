import { PostReplyType } from "@/types/reply";
import { Card, CardContent } from "@/components/ui/card";

function PostReplyCard({ reply }: { reply: PostReplyType }) {
  return (
    <Card className="glass border-primary/5 hover:border-primary/20 transition-colors">
      <CardContent className="pt-6 space-y-3">
        <p className="text-foreground leading-relaxed italic">
          &quot;{reply.description}&quot;
        </p>
        <div className="flex justify-between items-center text-[10px] uppercase tracking-wider font-bold">
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">From</span>
            <span className="text-primary">{reply.name}</span>
          </div>
          <span className="text-muted-foreground/50">{reply.created_at}</span>
        </div>
      </CardContent>
    </Card>
  );
}

export default PostReplyCard;
