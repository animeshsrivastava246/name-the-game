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
import { AddPostRequestType } from "@/types/apiTypes";

function AddPost({
  isOpen,
  onClose,
  refresh,
}: {
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
      const body: AddPostRequestType = {
        title: formRef.current.post_title.value,
        name: formRef.current.author_name.value,
        email: formRef.current.author_email.value,
        image: formRef.current.image_link.value,
        links: formRef.current.other_links.value,
        description: formRef.current.post_description.value,
      };

      const resp = await fetch("/api/posts", {
        method: "POST",
        body: JSON.stringify(body),
      }).then((res) => res.json());
      
      if (resp) {
        refresh();
        onClose();
        setDescription("");
      }
    } catch (error) {
      console.error("Failed to add post", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDescriptionChange = (value: string): void => {
    setDescription(value.slice(0, 500));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass border-primary/20 sm:max-w-[525px]">
        <form ref={formRef} onSubmit={handlePostSubmit} className="space-y-4">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-primary">Ask Your Question</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Provide details about the game you&apos;re looking for.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="post_title">Post Title</Label>
              <Input id="post_title" name="post_title" placeholder="e.g. 2D Platformer with a blue robot" required className="bg-background/50 border-primary/10 focus:border-primary" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="author_name">Your Name</Label>
                <Input id="author_name" name="author_name" placeholder="Gamer123" required className="bg-background/50 border-primary/10 focus:border-primary" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="author_email">Your Email</Label>
                <Input id="author_email" name="author_email" type="email" placeholder="gamer@example.com" required className="bg-background/50 border-primary/10 focus:border-primary" />
              </div>
            </div>

            <div className="grid gap-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="image_link">Game Image Link</Label>
                <span className="text-[9px] text-muted-foreground uppercase font-bold tracking-tighter">Direct URL required</span>
              </div>
              <Input id="image_link" name="image_link" placeholder="https://example.com/image.jpg" className="bg-background/50 border-primary/10 focus:border-primary" />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="post_description">Description</Label>
              <Textarea 
                id="post_description" 
                name="post_description" 
                placeholder="Describe the gameplay, art style, platform..." 
                required 
                value={description}
                onChange={(e) => handleDescriptionChange(e.target.value)}
                className="bg-background/50 border-primary/10 focus:border-primary min-h-[100px]"
              />
              <p className="text-[10px] text-right text-muted-foreground">{description.length}/500</p>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} className="border-primary/20 hover:bg-primary/10">
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} className="bg-primary hover:bg-primary/80 text-primary-foreground font-bold">
              {isSubmitting ? "Posting..." : "Let's Find Your Game!"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddPost;
