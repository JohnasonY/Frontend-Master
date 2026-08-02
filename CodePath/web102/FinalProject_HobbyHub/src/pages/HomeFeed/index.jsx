import { useEffect, useMemo, useState } from "react";
import PostCard from "@/components/PostCard";
import SortSearchBar from "@/components/SortSearchBar";
import { getPosts } from "@/services/posts";

export default function HomeFeed() {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let ignore = false;

    async function loadPosts() {
      try {
        setIsLoading(true);
        setErrorMessage("");

        const data = await getPosts();

        if (!ignore) {
          setPosts(data ?? []);
        }
      } catch (error) {
        if (!ignore) {
          setErrorMessage(error.message || "Unable to load posts.");
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    loadPosts();

    return () => {
      ignore = true;
    };
  }, []);

  const visiblePosts = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return posts
      .filter((post) =>
        (post.title ?? "").toLowerCase().includes(normalizedQuery),
      )
      .sort((firstPost, secondPost) => {
        if (sortBy === "upvotes") {
          const firstUpvotes =
            firstPost.upvotes ?? firstPost.upvotes_count ?? 0;
          const secondUpvotes =
            secondPost.upvotes ?? secondPost.upvotes_count ?? 0;

          return secondUpvotes - firstUpvotes;
        }

        return (
          new Date(secondPost.created_at).getTime() -
          new Date(firstPost.created_at).getTime()
        );
      });
  }, [posts, searchQuery, sortBy]);

  return (
    <section className="mx-auto max-w-2xl space-y-5">
      <h1 className="text-3xl font-semibold tracking-normal">
        Share Anything about Splatoon!
      </h1>

      <SortSearchBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      {isLoading && (
        <div className="space-y-3">
          {[0, 1, 2].map((item) => (
            <div
              key={item}
              className="h-28 animate-pulse rounded-md border bg-card"
            />
          ))}
        </div>
      )}

      {!isLoading && errorMessage && (
        <div className="rounded-md border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
          {errorMessage}
        </div>
      )}

      {!isLoading && !errorMessage && visiblePosts.length === 0 && (
        <div className="rounded-md border border-dashed bg-card p-6 text-center">
          <h2 className="text-lg font-semibold tracking-normal">
            No posts found
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Try a different search or create the first post.
          </p>
        </div>
      )}

      {!isLoading && !errorMessage && visiblePosts.length > 0 && (
        <div className="space-y-3">
          {visiblePosts.map((post, index) => (
            <PostCard key={post.id} post={post} colorIndex={index} />
          ))}
        </div>
      )}
    </section>
  );
}
