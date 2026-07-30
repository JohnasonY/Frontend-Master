import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "lucide-react";

import PostForm from "@/components/PostForm";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { createPost } from "@/services/posts";

export default function CreatePost() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleCreatePost(post) {
    try {
      setIsSubmitting(true);
      setErrorMessage("");

      const createdPost = await createPost(post);

      navigate(`/posts/${createdPost.id}`);
    } catch (error) {
      setErrorMessage(error.message || "Unable to create post.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="mx-auto max-w-2xl space-y-5">
      <div className="space-y-4">
        <Link
          to="/"
          className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "pl-1")}
        >
          <ArrowLeftIcon className="size-4" aria-hidden="true" />
          Back to feed
        </Link>

        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">
            New community post
          </p>
          <h1 className="text-3xl font-semibold tracking-normal">
            Create a post
          </h1>
        </div>
      </div>

      {errorMessage && (
        <div className="rounded-md border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
          {errorMessage}
        </div>
      )}

      <PostForm
        onSubmit={handleCreatePost}
        isSubmitting={isSubmitting}
        submitLabel="Create post"
      />
    </section>
  );
}
