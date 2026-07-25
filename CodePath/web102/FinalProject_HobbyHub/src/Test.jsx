import { useMemo, useState } from "react";

import CommentForm from "@/components/CommentForm";
import CommentList from "@/components/CommentList";
import PostCard from "@/components/PostCard";
import SortSearchBar from "@/components/SortSearchBar";

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

export default function Test() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
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
