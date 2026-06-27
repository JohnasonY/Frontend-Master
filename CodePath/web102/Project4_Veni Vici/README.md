# Web Development Project 4 - *Amiibo Showcase*

Submitted by: **Jiaxing Rong**

This web app: **lets users discover a random Amiibo, view its series, character, game series, and type, and filter future discoveries by adding or removing those attributes from a ban list. It also keeps a visual history of Amiibo discovered during the current session.**

Time spent: **6** hours spent in total

## Required Features

The following **required** functionality is completed:

- [x] **Application features a button that creates a new API fetch request on click and displays at least three attributes and an image obtained from the returned JSON data**
  - Each result consistently displays the Amiibo series, character, game series, type, name, and image.
- [x] **Only one item/data from API call response is viewable at a time and at least one image is displayed per API call**
  - A single Amiibo result is displayed at a time.
  - The displayed attributes and image come from the same Amiibo API result.
  - Each result includes an image.
- [x] **API call response results should appear random to the user**
  - Clicking the Discover button randomly selects an Amiibo from the available API results.
- [x] **Clicking on a displayed value for one attribute adds it to a displayed ban list**
  - All four displayed attribute types are clickable.
  - Clicking an attribute immediately adds it to the ban list.
  - Clicking an attribute in the ban list immediately removes it.
- [x] **Attributes on the ban list prevent further images/API results with that attribute from being displayed**
  - Results are filtered against banned Amiibo series, characters, game series, and types before a random Amiibo is selected.
  - [x] _To ensure an accurate grade, the recording must show that when clicked, an attribute in the ban list is immediately removed from the list of banned attributes._

The following **optional** features are implemented:

- [x] Multiple types of attributes are clickable and can be added to the ban list.
- [x] Users can see a stored history of their previously displayed results from this session.
  - A dedicated, scrollable section displays previously discovered Amiibo images and names.
  - The history updates with the newest result each time the Discover button is clicked.

The following **additional** features are implemented:

- [x] The app warns the user when no Amiibo remain after applying the current ban filters.
- [x] Duplicate values are prevented within each ban-list category.

## Video Walkthrough

Here's a walkthrough of implemented user stories:

<!-- Replace the placeholder below with the URL of your walkthrough GIF. -->
<img src='YOUR_GIF_URL_HERE' title='Video Walkthrough' width='' alt='Video Walkthrough' />

GIF created with **[Add the recording tool used]**.

<!-- Recommended tools:
[Kap](https://getkap.co/) for macOS
[ScreenToGif](https://www.screentogif.com/) for Windows
[peek](https://github.com/phw/peek) for Linux. -->

## Notes

One challenge was ensuring banned attributes apply across several categories while still returning a random result. The app handles this by filtering the complete Amiibo response against every ban-list category before choosing a random available item.

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
