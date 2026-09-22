import { MessageCircleIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

function getCommentText(comment) {
  return comment?.content ?? comment?.text ?? comment?.body ?? "";
}

function formatCreatedAt(value) {
  if (!value) return "Just now";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Just now";

  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

export default function CommentList({ comments = [], className }) {
  const visibleComments = comments.filter((comment) =>
    getCommentText(comment).trim()
  );
  const commentCount = visibleComments.length;

  return (
    <section className={cn("space-y-3", className)}>
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-xl font-semibold tracking-normal">Comments</h2>
        <Badge variant="secondary" className="h-7 rounded-md px-2.5">
          <MessageCircleIcon className="size-3.5" aria-hidden="true" />
          {commentCount}
        </Badge>
      </div>

      {commentCount === 0 ? (
        <div className="rounded-md border border-dashed bg-card p-5 text-sm text-muted-foreground">
          No comments yet. Start the conversation.
        </div>
      ) : (
        <ul className="space-y-3">
          {visibleComments.map((comment, index) => {
            const text = getCommentText(comment).trim();

            return (
              <li
                key={comment.id ?? `${text}-${index}`}
                className="rounded-md border bg-card p-4 shadow-xs"
              >
                <p className="whitespace-pre-wrap text-sm leading-6">{text}</p>
                <p className="mt-3 text-xs text-muted-foreground">
                  {formatCreatedAt(comment.created_at)}
                </p>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
