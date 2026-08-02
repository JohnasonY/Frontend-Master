# Web Development Final Project - *SpltHub*

Submitted by: **Jiaxing Rong**

SpltHub is a Splatoon-themed community posting app where users can create posts, browse the feed, search and sort posts, comment on discussions, upvote posts, and manage posts they created. The app uses Supabase for persistent post and comment data.

Time spent: **11** hours spent in total

## Libraries

- UI Library: [shadcn](https://ui.shadcn.com/)
- Icon Library: [lucide](https://lucide.dev/)

## Required Features

The following **required** functionality is completed:

- [x] **Web app includes a create form that allows the user to create posts**
  - Form requires users to add a post title
  - Form allows optional text content
  - Form allows an optional external image URL
- [x] **Web app includes a home feed displaying previously created posts**
  - Home feed displays previously created posts
  - Each post preview shows creation time, title, and upvote count
  - Clicking a post opens that post's detail page
- [x] **Users can view posts in different ways**
  - Users can sort posts by creation time or upvote count
  - Users can search for posts by title
- [x] **Users can interact with each post in different ways**
  - Post detail pages show additional content, image, and comments
  - Users can leave comments underneath a post
  - Each post includes an upvote button on the post page
  - Each click increases the post's upvote count by one
  - Users can upvote any post any number of times
- [x] **A post that a user previously created can be edited or deleted from its post page**
  - Users can edit existing posts
  - Users can delete existing posts

## Optional Features

The following **optional** features are implemented:

- [ ] Web app implements pseudo-authentication
  - Users can only edit and delete posts or delete comments by entering the secret key, which is set by the user during post creation
  - **or** upon launching the web app, the user is assigned a random user ID. It will be associated with all posts and comments that they make and displayed on them
  - For both options, only the original user author of a post can update or delete it
- [ ] Users can repost a previous post by referencing its post ID. On the post page of the new post
  - Users can repost a previous post by referencing its post ID
  - On the post page of the new post, the referenced post is displayed and linked, creating a thread
- [ ] Users can customize the interface
  - e.g., selecting the color scheme or showing the content and image of each post on the home feed
- [ ] Users can add more characterics to their posts
  - Users can share and view web videos
  - Users can set flags such as "Question" or "Opinion" while creating a post
  - Users can filter posts by flags on the home feed
  - Users can upload images directly from their local machine as an image file
- [ ] Web app displays a loading animation whenever data is being fetched

## Additional Features

- [x] Styled search and sort controls with a custom dropdown menu
- [x] Switch 2 style button animation for New Post
- [x] Different border colors for posts feed

## Video Walkthrough

Here's a walkthrough of implemented user stories:

<img src='./public/demo/demo.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

GIF created with ScreenToGif.

## Notes

One challenge was balancing image display behavior: images should not be cropped, but they also should not dominate the entire post detail page. The current implementation preserves the full image aspect ratio while applying a maximum display height.

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
