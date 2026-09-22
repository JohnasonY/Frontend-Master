import { useState } from "react";
import { ImageIcon, SendIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const emptyPost = {
  title: "",
  content: "",
  imageUrl: "",
};

function normalizeInitialValues(initialValues) {
  return {
    title: initialValues?.title ?? "",
    content: initialValues?.content ?? "",
    imageUrl: initialValues?.imageUrl ?? initialValues?.image_url ?? "",
  };
}

export default function PostForm({
  initialValues = emptyPost,
  onSubmit,
  isSubmitting = false,
  submitLabel = "Publish post",
  className,
}) {
  const [formValues, setFormValues] = useState(() =>
    normalizeInitialValues(initialValues)
  );
  const [errorMessage, setErrorMessage] = useState("");

  function updateField(field, value) {
    setFormValues((currentValues) => ({
      ...currentValues,
      [field]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const title = formValues.title.trim();
    const content = formValues.content.trim();
    const imageUrl = formValues.imageUrl.trim();

    if (!title) {
      setErrorMessage("Title is required.");
      return;
    }

    setErrorMessage("");
    onSubmit?.({ title, content, imageUrl });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("space-y-5 rounded-md border bg-card p-4 shadow-xs", className)}
    >
      <div className="space-y-2">
        <Label htmlFor="post-title">Title</Label>
        <Input
          id="post-title"
          value={formValues.title}
          onChange={(event) => updateField("title", event.target.value)}
          placeholder="What do you want to share?"
          disabled={isSubmitting}
          aria-invalid={Boolean(errorMessage)}
        />
        {errorMessage && (
          <p className="text-sm text-destructive">{errorMessage}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="post-content">Content</Label>
        <Textarea
          id="post-content"
          value={formValues.content}
          onChange={(event) => updateField("content", event.target.value)}
          placeholder="Add details, context, or a question for the community."
          className="min-h-36 resize-y"
          disabled={isSubmitting}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="post-image-url">Image URL</Label>
        <div className="relative">
          <ImageIcon
            className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            id="post-image-url"
            type="url"
            value={formValues.imageUrl}
            onChange={(event) => updateField("imageUrl", event.target.value)}
            placeholder="https://example.com/image.jpg"
            className="pl-8"
            disabled={isSubmitting}
          />
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting}>
          <SendIcon className="size-4" aria-hidden="true" />
          {isSubmitting ? "Saving..." : submitLabel}
        </Button>
      </div>
    </form>
  );
}
