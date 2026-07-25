# SortSearchBar

`SortSearchBar` provides feed controls for searching posts by title and sorting posts by newest or top/upvotes.

## Usage

```jsx
import { useState } from "react";
import SortSearchBar from "@/components/SortSearchBar";

export default function HomeFeedControls() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  return (
    <SortSearchBar
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
      sortBy={sortBy}
      onSortChange={setSortBy}
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `searchQuery` | `string` | required | Current search input value. |
| `onSearchChange` | `function` | required | Called with the next search string. |
| `sortBy` | `string` | required | Current sort value. Expected values: `newest` or `upvotes`. |
| `onSortChange` | `function` | required | Called with the next sort value. |
| `className` | `string` | none | Extra classes for the wrapper. |

## Notes

- This component is controlled. The parent component owns search and sort state.
- It does not filter or sort data by itself; it only collects user input.
