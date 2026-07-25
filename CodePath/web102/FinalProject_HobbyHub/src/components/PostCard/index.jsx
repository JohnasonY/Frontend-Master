import { ArrowUpIcon, ClockIcon, MessageCircleIcon } from "lucide-react";
import { Link } from "react-router-dom";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

function formatCreatedAt(value) {
  if (!value) return "Unknown time";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Unknown time";

  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

export default function PostCard({ post, className }) {
  const title = post?.title?.trim() || "Untitled post";
  const postUrl = post?.id ? `/posts/${post.id}` : "#";
  const upvotes = Number(post?.upvotes ?? post?.upvotes_count ?? 0);
  const commentCount = Array.isArray(post?.comments) ? post.comments.length : null;

  return (
    <Link
      to={postUrl}
      className={cn(
        "group block rounded-md outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
        className
      )}
      aria-label={`View ${title}`}
    >
      <Card
        size="sm"
        className="rounded-md transition-colors group-hover:bg-muted/45 group-focus-visible:bg-muted/45"
      >
        <CardHeader className="gap-3">
          <CardTitle className="line-clamp-2 text-lg leading-snug">
            {title}
          </CardTitle>

          <CardDescription className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="inline-flex items-center gap-1.5">
              <ClockIcon className="size-3.5" aria-hidden="true" />
              {formatCreatedAt(post?.created_at)}
            </span>

            {commentCount !== null && (
              <span className="inline-flex items-center gap-1.5">
                <MessageCircleIcon className="size-3.5" aria-hidden="true" />
                {commentCount} {commentCount === 1 ? "comment" : "comments"}
              </span>
            )}
          </CardDescription>

          <CardAction>
            <Badge variant="secondary" className="h-7 rounded-md px-2.5">
              <ArrowUpIcon className="size-3.5" aria-hidden="true" />
              {upvotes}
            </Badge>
          </CardAction>
        </CardHeader>
      </Card>
    </Link>
  );
}
