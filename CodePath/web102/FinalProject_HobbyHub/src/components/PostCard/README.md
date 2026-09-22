# PostCard

`PostCard` displays a single post preview for the home feed. It links to the post detail page and shows the title, created time, upvote count, and comment count when comments are available.

## Usage

```jsx
import PostCard from "@/components/PostCard";

const post = {
  id: "123",
  title: "My latest hobby project",
  created_at: "2026-07-25T12:00:00.000Z",
  upvotes: 8,
  comments: [{ id: "comment-1" }],
};

export default function FeedItem() {
  return <PostCard post={post} />;
}
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `post` | `object` | none | Post data to display. |
| `className` | `string` | none | Extra classes for the outer link wrapper. |

## Expected Post Fields

| Field | Required | Description |
| --- | --- | --- |
| `id` | Recommended | Used to link to `/posts/:id`. If missing, the card links to `#`. |
| `title` | Recommended | Displayed as the card title. Empty titles show `Untitled post`. |
| `created_at` | Recommended | Displayed as a formatted date/time. |
| `upvotes` or `upvotes_count` | Optional | Displayed in the upvote badge. Defaults to `0`. |
| `comments` | Optional | If this is an array, its length is displayed as the comment count. |

## Notes

- `PostCard` is presentational. It does not fetch or mutate data.
- Because it renders a `Link`, it must be used inside a router.
