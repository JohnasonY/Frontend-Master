# CommentForm

`CommentForm` renders the textarea and submit button used to add a comment to a post.

## Usage

```jsx
import CommentForm from "@/components/CommentForm";

export default function PostComments() {
  async function handleCommentSubmit(commentText) {
    // Save commentText to Supabase.
  }

  return <CommentForm onSubmit={handleCommentSubmit} />;
}
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `onSubmit` | `function` | none | Called with the trimmed comment text. |
| `isSubmitting` | `boolean` | `false` | Disables the form and shows `Posting...`. |
| `placeholder` | `string` | `"Add your thoughts..."` | Placeholder text for the textarea. |
| `className` | `string` | none | Extra classes for the form wrapper. |

## Behavior

- Empty comments cannot be submitted.
- Submitted comments are trimmed.
- The textarea clears after a successful submit callback is called.

## Notes

- `CommentForm` does not save data directly. The parent page should handle Supabase insert logic.
