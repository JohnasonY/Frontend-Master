import { useState } from "react";
import { SendIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export default function CommentForm({
  onSubmit,
  isSubmitting = false,
  placeholder = "Add your thoughts...",
  className,
}) {
  const [comment, setComment] = useState("");
  const trimmedComment = comment.trim();

  function handleSubmit(event) {
    event.preventDefault();

    if (!trimmedComment || isSubmitting) return;

    onSubmit?.(trimmedComment);
    setComment("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("space-y-3 rounded-md border bg-card p-4 shadow-xs", className)}
    >
      <div className="space-y-2">
        <Label htmlFor="comment">Leave a comment</Label>
        <Textarea
          id="comment"
          value={comment}
          onChange={(event) => setComment(event.target.value)}
          placeholder={placeholder}
          className="min-h-24 resize-y"
          disabled={isSubmitting}
        />
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={!trimmedComment || isSubmitting}>
          <SendIcon className="size-4" aria-hidden="true" />
          {isSubmitting ? "Posting..." : "Post comment"}
        </Button>
      </div>
    </form>
  );
}
