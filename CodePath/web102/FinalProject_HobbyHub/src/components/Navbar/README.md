# Navbar

`Navbar` renders the sticky top navigation used across the app. It includes the brand link, a feed link, and a `New Post` action.

## Usage

```jsx
import Navbar from "@/components/Navbar";

export default function PageFrame() {
  return (
    <>
      <Navbar />
      <main>Page content</main>
    </>
  );
}
```

In this project, `Navbar` is already rendered by `Layout`, so most pages should not import it directly.

## Props

`Navbar` does not accept props.

## Behavior

- Uses `NavLink` from `react-router-dom` to style active routes.
- Brand link goes to `/`.
- Feed link goes to `/`.
- New Post link goes to `/create`.
- The brand text currently displays `SpltHub`.

## Notes

- Because it uses `NavLink`, `Navbar` must be rendered inside a `BrowserRouter`.
