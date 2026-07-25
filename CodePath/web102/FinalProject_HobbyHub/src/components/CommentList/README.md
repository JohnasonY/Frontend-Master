# CommentList

`CommentList` displays comments for a post, including a count badge, empty state, comment text, and formatted timestamp.

## Usage

```jsx
import CommentList from "@/components/CommentList";

const comments = [
  {
    id: "comment-1",
    content: "This is a comment.",
    created_at: "2026-07-25T12:00:00.000Z",
  },
];

export default function PostComments() {
  return <CommentList comments={comments} />;
}
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `comments` | `array` | `[]` | Comment records to display. |
| `className` | `string` | none | Extra classes for the section wrapper. |

## Expected Comment Fields

| Field | Required | Description |
| --- | --- | --- |
| `id` | Recommended | Used as the list key. |
| `content`, `text`, or `body` | Recommended | Comment text to display. Empty comments are filtered out. |
| `created_at` | Optional | Displayed as a formatted date/time. Missing or invalid values show `Just now`. |

## Notes

- `CommentList` is presentational. It does not fetch, create, edit, or delete comments.
