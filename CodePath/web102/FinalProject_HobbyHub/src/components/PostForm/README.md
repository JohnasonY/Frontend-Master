# PostForm

`PostForm` is the shared form for creating and editing posts. It collects a required title, optional content, and optional external image URL.

## Usage

```jsx
import PostForm from "@/components/PostForm";

export default function CreatePostPage() {
  async function handleSubmit(postValues) {
    // postValues = { title, content, imageUrl }
  }

  return <PostForm onSubmit={handleSubmit} submitLabel="Create post" />;
}
```

For edit pages:

```jsx
<PostForm
  initialValues={post}
  onSubmit={handleUpdate}
  submitLabel="Save changes"
/>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `initialValues` | `object` | empty post | Starting values for edit mode. Supports `imageUrl` or `image_url`. |
| `onSubmit` | `function` | none | Called with `{ title, content, imageUrl }` after validation. |
| `isSubmitting` | `boolean` | `false` | Disables fields and shows `Saving...` while a request is in progress. |
| `submitLabel` | `string` | `"Publish post"` | Text shown on the submit button when not submitting. |
| `className` | `string` | none | Extra classes for the form wrapper. |

## Validation

- `title` is required.
- `content` is optional.
- `imageUrl` is optional.

## Notes

- `PostForm` owns its input state internally.
- For edit mode, render `PostForm` after the existing post has loaded so `initialValues` are ready on mount.
