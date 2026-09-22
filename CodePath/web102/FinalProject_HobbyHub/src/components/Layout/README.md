# Layout

`Layout` provides the shared page frame for the app. It wraps route content with the app background, centered max-width container, `Navbar`, main content area, and optional footer.

## Usage

```jsx
import Layout from "@/components/Layout";

export default function AppShell() {
  return (
    <Layout>
      <HomeFeed />
    </Layout>
  );
}
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `ReactNode` | none | Page content rendered inside the main area. |
| `className` | `string` | none | Extra classes for the outer page wrapper. |
| `contentClassName` | `string` | none | Extra classes for the `<main>` element. |
| `footer` | `string` or `ReactNode` | `"SpltHub"` | Footer content. Pass `null` or `false` to hide the footer. |

## Notes

- `Layout` already includes `Navbar`, so route pages do not need to render it.
- Use `contentClassName` when one page needs different spacing or layout constraints.
