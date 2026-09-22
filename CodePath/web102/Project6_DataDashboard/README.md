# Web Development Project 6 - PokeDashboard

Submitted by: **Jiaxing Rong**

This web app: **A Pokemon data dashboard that fetches data from PokeAPI and lets users search, filter, compare, visualize, and open direct detail pages for individual Pokemon.**

Time spent: **5** hours spent in total

## Required Features

The following **required** functionality is completed:

- [x] **Clicking on an item in the list view displays more details about it**
  - Clicking on a Pokemon in the dashboard list navigates to a detail view for that Pokemon.
  - Detail view includes extra information not included in the dashboard view, including abilities, base experience, known moves, and base stats.
  - The same sidebar is displayed in detail view as in dashboard view.
  - *To ensure an accurate grade, your sidebar **must** be viewable when showing the details view in your recording.*
- [x] **Each detail view of an item has a direct, unique URL link to that item's detail view page**
  - Each Pokemon detail page uses a route like `/pokemon/1`, `/pokemon/25`, etc.
  - The detail page uses `useParams()` to read the Pokemon ID from the URL.
  - *To ensure an accurate grade, the URL/address bar of your web browser **must** be viewable in your recording.*
- [x] **The app includes at least two unique charts developed using the fetched data that tell an interesting story**
  - The dashboard includes a chart showing the most common Pokemon types in the fetched dataset.
  - The dashboard includes a chart showing the heaviest type groups by average weight.
  - Each chart describes a different aspect of the dataset.

The following **optional** features are implemented:

- [x] The site's customized dashboard contains more content that explains what is interesting about the data
  - The app includes an About page explaining the purpose of this project and that it uses PokeAPI.
  - The dashboard chart headings describe what each visualization is showing.
- [x] The site allows users to toggle between different data visualizations
  - Users can switch between viewing all charts, type count visualization, or average weight by type visualization.

The following **additional** features are implemented:

- [x] Responsive layout for dashboard, sidebar, charts, and detail pages

## Video Walkthrough

Here's a walkthrough of implemented user stories:

<img src="./public/demo/demo.gif" title="PokeDashboard Video Walkthrough" width="" alt="Video Walkthrough" />

GIF created with **ScreenToGif**.

## Notes

One challenge was adding direct detail pages while keeping the shared sidebar visible across the dashboard, About page, and individual Pokemon routes. This was handled by keeping the sidebar in the top-level app layout and rendering page content with React Router.

## License

    Copyright 2026 Jiaxing Rong

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
