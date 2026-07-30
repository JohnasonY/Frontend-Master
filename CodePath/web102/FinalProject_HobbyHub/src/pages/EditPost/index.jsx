import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeftIcon } from "lucide-react";

import PostForm from "@/components/PostForm";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getPostById, updatePost } from "@/services/posts";

export default function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  async function handleUpdatePost(updates) {
    try {
      setIsSubmitting(true);
      setErrorMessage("");

      await updatePost(id, updates);
      navigate(`/posts/${id}`);
    } catch (error) {
      setErrorMessage(error.message || "Unable to update post.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="mx-auto max-w-2xl space-y-5">
      <div className="space-y-4">
        <Link
          to={`/posts/${id}`}
          className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "pl-1")}
        >
          <ArrowLeftIcon className="size-4" aria-hidden="true" />
          Back to post
        </Link>

        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">
            Update community post
          </p>
          <h1 className="text-3xl font-semibold tracking-normal">Edit post</h1>
        </div>
      </div>

      {errorMessage && (
        <div className="rounded-md border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
          {errorMessage}
        </div>
      )}

      {isLoading && (
        <div className="h-80 animate-pulse rounded-md border bg-card" />
      )}

      {!isLoading && post && (
        <PostForm
          initialValues={post}
          onSubmit={handleUpdatePost}
          isSubmitting={isSubmitting}
          submitLabel="Save changes"
        />
      )}

      {!isLoading && !post && !errorMessage && (
        <div className="rounded-md border border-dashed bg-card p-6 text-center">
          <h2 className="text-lg font-semibold tracking-normal">
            Post not found
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            This post may have been deleted.
          </p>
        </div>
      )}
    </section>
  );
}
