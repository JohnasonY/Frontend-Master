import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpIcon,
  ClockIcon,
  PencilIcon,
  ThumbsUpIcon,
  Trash2Icon,
} from "lucide-react";

import CommentForm from "@/components/CommentForm";
import CommentList from "@/components/CommentList";
import PostCard from "@/components/PostCard";
import PostForm from "@/components/PostForm";
import SortSearchBar from "@/components/SortSearchBar";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const samplePosts = [
  {
    id: "demo-1",
    title: "What hobby are you spending too much time on this week?",
    created_at: new Date().toISOString(),
    upvotes: 18,
    comments: [{ id: 1 }, { id: 2 }, { id: 3 }],
  },
  {
    id: "demo-2",
    title:
      "Looking for beginner-friendly mechanical keyboard kits with a soft typing sound",
    created_at: "2026-07-24T18:45:00.000Z",
    upvotes_count: 42,
    comments: [{ id: 1 }],
  },
  {
    id: "demo-3",
    title: "Share your latest painting, build, recipe, or collection update",
    created_at: "2026-07-23T12:15:00.000Z",
    upvotes: 7,
  },
];

const sampleDetailPost = {
  id: "detail-demo",
  title: "How do you organize supplies for a tiny workspace?",
  content:
    "I am trying to keep painting tools, keyboard parts, and sketchbooks in one desk area. Any clever setup ideas?",
  image_url:
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
  created_at: "2026-07-25T14:20:00.000Z",
  upvotes: 5,
  comments: [
    {
      id: "detail-comment-1",
      content: "Clear bins and labels helped me more than I expected.",
      created_at: "2026-07-25T15:05:00.000Z",
    },
  ],
};

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

export default function Test() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [postPreview, setPostPreview] = useState(null);
  const [createdPostRoute, setCreatedPostRoute] = useState("");
  const [isCreatingPreview, setIsCreatingPreview] = useState(false);
  const [detailPost, setDetailPost] = useState(sampleDetailPost);
  const [comments, setComments] = useState([
    {
      id: "comment-1",
      content: "I just started learning crochet. The first scarf is fighting back.",
      created_at: "2026-07-25T10:30:00.000Z",
    },
    {
      id: "comment-2",
      content: "Mechanical keyboards, always. I said it would be one build.",
      created_at: "2026-07-25T12:05:00.000Z",
    },
  ]);

  const visiblePosts = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return samplePosts
      .filter((post) => post.title.toLowerCase().includes(normalizedQuery))
      .sort((firstPost, secondPost) => {
        if (sortBy === "upvotes") {
          const firstUpvotes = firstPost.upvotes ?? firstPost.upvotes_count ?? 0;
          const secondUpvotes =
            secondPost.upvotes ?? secondPost.upvotes_count ?? 0;

          return secondUpvotes - firstUpvotes;
        }

        return new Date(secondPost.created_at) - new Date(firstPost.created_at);
      });
  }, [searchQuery, sortBy]);

  async function handleCreatePostPreview(post) {
    setIsCreatingPreview(true);

    const createdPost = {
      ...post,
      id: crypto.randomUUID(),
      created_at: new Date().toISOString(),
      upvotes: 0,
    };

    await new Promise((resolve) => {
      setTimeout(resolve, 250);
    });

    setPostPreview(createdPost);
    setCreatedPostRoute(`/posts/${createdPost.id}`);
    setIsCreatingPreview(false);
  }

  function handleDetailUpvote() {
    setDetailPost((currentPost) => ({
      ...currentPost,
      upvotes: Number(currentPost.upvotes ?? 0) + 1,
    }));
  }

  function handleDetailComment(content) {
    setDetailPost((currentPost) => ({
      ...currentPost,
      comments: [
        ...(currentPost.comments ?? []),
        {
          id: crypto.randomUUID(),
          content,
          created_at: new Date().toISOString(),
        },
      ],
    }));
  }

  return (
    <section className="mx-auto max-w-2xl space-y-5">
      <div className="space-y-1">
        <p className="text-sm font-medium text-muted-foreground">
          Component preview
        </p>
        <h1 className="text-3xl font-semibold tracking-normal">Feed controls</h1>
      </div>

      <SortSearchBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      <div className="space-y-3">
        {visiblePosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      <div className="space-y-3 pt-4">
        <h2 className="text-xl font-semibold tracking-normal">
          Create post flow
        </h2>
        <PostForm
          onSubmit={handleCreatePostPreview}
          isSubmitting={isCreatingPreview}
          submitLabel="Create test post"
        />
        {postPreview && (
          <div className="space-y-3 rounded-md bg-muted p-3 text-sm text-muted-foreground">
            <div>
              <p className="font-medium text-foreground">{postPreview.title}</p>
              {postPreview.content && (
                <p className="mt-1 whitespace-pre-wrap">{postPreview.content}</p>
              )}
            </div>
            {postPreview.imageUrl && (
              <p className="mt-1 break-all">{postPreview.imageUrl}</p>
            )}
            <p className="text-xs">
              Create page would navigate to{" "}
              <span className="font-medium text-foreground">
                {createdPostRoute}
              </span>
              .
            </p>
          </div>
        )}
      </div>

      <div className="space-y-3 pt-4">
        <h2 className="text-xl font-semibold tracking-normal">
          Post detail flow
        </h2>

        {detailPost ? (
          <>
            <div className="flex flex-wrap gap-2">
              <Link
                to={`/posts/${detailPost.id}/edit`}
                className={buttonVariants({ variant: "outline", size: "sm" })}
              >
                <PencilIcon className="size-4" aria-hidden="true" />
                Edit
              </Link>
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => setDetailPost(null)}
              >
                <Trash2Icon className="size-4" aria-hidden="true" />
                Delete
              </Button>
            </div>

            <Card className="rounded-md">
              {detailPost.image_url && (
                <img
                  src={detailPost.image_url}
                  alt="Post attachment"
                  className="aspect-video w-full object-cover"
                />
              )}

              <CardHeader className="gap-3">
                <CardTitle className="text-2xl font-semibold leading-tight tracking-normal">
                  {detailPost.title}
                </CardTitle>
                <CardDescription className="flex flex-wrap items-center gap-x-3 gap-y-2">
                  <span className="inline-flex items-center gap-1.5">
                    <ClockIcon className="size-3.5" aria-hidden="true" />
                    {formatCreatedAt(detailPost.created_at)}
                  </span>
                  <Badge variant="secondary" className="h-7 rounded-md px-2.5">
                    <ArrowUpIcon className="size-3.5" aria-hidden="true" />
                    {detailPost.upvotes}
                  </Badge>
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-5">
                <p className="whitespace-pre-wrap leading-7">
                  {detailPost.content}
                </p>

                <Button
                  type="button"
                  size="icon"
                  onClick={handleDetailUpvote}
                  aria-label="Upvote post"
                >
                  <ThumbsUpIcon className="size-4" aria-hidden="true" />
                </Button>
              </CardContent>
            </Card>

            <CommentForm onSubmit={handleDetailComment} />
            <CommentList comments={detailPost.comments} />
          </>
        ) : (
          <div className="rounded-md border border-dashed bg-card p-5 text-sm text-muted-foreground">
            Test detail post deleted.
          </div>
        )}
      </div>

      <div className="space-y-3 pt-4">
        <h2 className="text-xl font-semibold tracking-normal">Comment form</h2>
        <CommentForm
          onSubmit={(content) =>
            setComments((currentComments) => [
              {
                id: crypto.randomUUID(),
                content,
                created_at: new Date().toISOString(),
              },
              ...currentComments,
            ])
          }
        />
        <CommentList comments={comments} />
      </div>
    </section>
  );
}
