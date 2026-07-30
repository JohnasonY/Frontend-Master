import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeftIcon,
  ArrowUpIcon,
  ClockIcon,
  PencilIcon,
  ThumbsUpIcon,
  Trash2Icon,
} from "lucide-react";

import CommentForm from "@/components/CommentForm";
import CommentList from "@/components/CommentList";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  addComment,
  deletePost,
  getPostById,
  upvotePost,
} from "@/services/posts";

function formatCreatedAt(value) {
  if (!value) return "Unknown time";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Unknown time";

  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

function sortComments(comments = []) {
  return [...comments].sort(
    (firstComment, secondComment) =>
      new Date(firstComment.created_at ?? 0).getTime() -
      new Date(secondComment.created_at ?? 0).getTime()
  );
}

export default function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpvoting, setIsUpvoting] = useState(false);
  const [isCommenting, setIsCommenting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let ignore = false;

    async function loadPost() {
      try {
        setIsLoading(true);
        setErrorMessage("");

        const data = await getPostById(id);

        if (!ignore) {
          setPost(data);
        }
      } catch (error) {
        if (!ignore) {
          setErrorMessage(error.message || "Unable to load post.");
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    loadPost();

    return () => {
      ignore = true;
    };
  }, [id]);

  const comments = useMemo(() => sortComments(post?.comments), [post?.comments]);
  const upvotes = Number(post?.upvotes ?? post?.upvotes_count ?? 0);

  async function handleUpvote() {
    if (!post || isUpvoting) return;

    try {
      setIsUpvoting(true);
      setErrorMessage("");

      const updatedPost = await upvotePost(post.id, upvotes);

      setPost((currentPost) => ({
        ...currentPost,
        ...updatedPost,
        comments: currentPost?.comments ?? [],
      }));
    } catch (error) {
      setErrorMessage(error.message || "Unable to upvote post.");
    } finally {
      setIsUpvoting(false);
    }
  }

  async function handleCommentSubmit(content) {
    if (!post || isCommenting) return;

    try {
      setIsCommenting(true);
      setErrorMessage("");

      const createdComment = await addComment(post.id, content);

      setPost((currentPost) => ({
        ...currentPost,
        comments: [...(currentPost?.comments ?? []), createdComment],
      }));
    } catch (error) {
      setErrorMessage(error.message || "Unable to add comment.");
    } finally {
      setIsCommenting(false);
    }
  }

  async function handleDelete() {
    if (!post || isDeleting) return;

    const shouldDelete = window.confirm(
      "Delete this post? This cannot be undone."
    );

    if (!shouldDelete) return;

    try {
      setIsDeleting(true);
      setErrorMessage("");

      await deletePost(post.id);
      navigate("/");
    } catch (error) {
      setErrorMessage(error.message || "Unable to delete post.");
      setIsDeleting(false);
    }
  }

  if (isLoading) {
    return (
      <section className="mx-auto max-w-2xl space-y-4">
        <div className="h-8 w-32 animate-pulse rounded-md bg-muted" />
        <div className="h-72 animate-pulse rounded-md border bg-card" />
        <div className="h-40 animate-pulse rounded-md border bg-card" />
      </section>
    );
  }

  if (errorMessage && !post) {
    return (
      <section className="mx-auto max-w-2xl space-y-5">
        <Link
          to="/"
          className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "pl-1")}
        >
          <ArrowLeftIcon className="size-4" aria-hidden="true" />
          Back to feed
        </Link>

        <div className="rounded-md border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
          {errorMessage}
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-2xl space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Link
          to="/"
          className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "pl-1")}
        >
          <ArrowLeftIcon className="size-4" aria-hidden="true" />
          Back to feed
        </Link>

        <div className="flex gap-2">
          <Link
            to={`/posts/${post.id}/edit`}
            className={buttonVariants({ variant: "outline", size: "sm" })}
          >
            <PencilIcon className="size-4" aria-hidden="true" />
            Edit
          </Link>
          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            <Trash2Icon className="size-4" aria-hidden="true" />
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </div>

      {errorMessage && (
        <div className="rounded-md border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
          {errorMessage}
        </div>
      )}

      <Card className="rounded-md">
        {post.image_url && (
          <img
            src={post.image_url}
            alt="Post attachment"
            className="aspect-video w-full object-cover"
          />
        )}

        <CardHeader className="gap-3">
          <CardTitle className="text-3xl font-semibold leading-tight tracking-normal">
            {post.title}
          </CardTitle>
          <CardDescription className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="inline-flex items-center gap-1.5">
              <ClockIcon className="size-3.5" aria-hidden="true" />
              {formatCreatedAt(post.created_at)}
            </span>
            <Badge variant="secondary" className="h-7 rounded-md px-2.5">
              <ArrowUpIcon className="size-3.5" aria-hidden="true" />
              {upvotes}
            </Badge>
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-5">
          {post.content ? (
            <p className="whitespace-pre-wrap leading-7">{post.content}</p>
          ) : (
            <p className="text-sm text-muted-foreground">
              No additional content was added.
            </p>
          )}

          <Button
            type="button"
            size="icon"
            onClick={handleUpvote}
            disabled={isUpvoting}
            aria-label="Upvote post"
          >
            <ThumbsUpIcon className="size-4" aria-hidden="true" />
          </Button>
        </CardContent>
      </Card>

      <CommentForm
        onSubmit={handleCommentSubmit}
        isSubmitting={isCommenting}
      />

      <CommentList comments={comments} />
    </section>
  );
}
