"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useRef, useState } from "react";
import { AddReplyRequestType } from "@/types/apiTypes";

function AddReply({
  postId,
  isOpen,
  onClose,
  refresh,
}: {
  postId: string;
  isOpen: boolean;
  onClose: () => void;
  refresh: () => void;
}) {
  const [description, setDescription] = useState("");
  const formRef = useRef<HTMLFormElement>(null!);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePostSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const body: AddReplyRequestType = {
        name: formRef.current.author_name.value,
        email: formRef.current.author_email.value,
        description: formRef.current.reply_description.value,
      };
      
      const resp = await fetch(`/api/posts/${postId}/replies`, {
        method: "POST",
        body: JSON.stringify(body),
      }).then((res) => res.json());
      
      if (resp) {
        refresh();
        onClose();
        setDescription("");
      }
    } catch (error) {
      console.error("Failed to add reply", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDescriptionChange = (value: string): void => {
    setDescription(value.slice(0, 200));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass border-primary/20 sm:max-w-[425px]">
        <form ref={formRef} onSubmit={handlePostSubmit} className="space-y-4">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-primary">Give Answer</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Help your fellow gamer identify this game!
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="author_name">Your Name</Label>
                <Input id="author_name" name="author_name" placeholder="Gamer123" required className="bg-background/50 border-primary/10" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="author_email">Your Email</Label>
                <Input id="author_email" name="author_email" type="email" placeholder="gamer@example.com" required className="bg-background/50 border-primary/10" />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="reply_description">Your Answer / Description</Label>
              <Textarea 
                id="reply_description" 
                name="reply_description" 
                placeholder="I think this is..." 
                required 
                value={description}
                onChange={(e) => handleDescriptionChange(e.target.value)}
                className="bg-background/50 border-primary/10 min-h-[120px]"
              />
              <p className="text-[10px] text-right text-muted-foreground">{description.length}/200</p>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} className="border-primary/20">
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} className="bg-primary hover:bg-primary/80 text-primary-foreground font-bold gold-glow">
              {isSubmitting ? "Sending..." : "Help The Fellow Gamer!"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddReply;
