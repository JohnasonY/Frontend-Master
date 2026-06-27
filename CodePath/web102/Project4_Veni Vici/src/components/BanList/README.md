# BanList

**Serves as the right panel of the project**

Props:

```js
{
  header = "Ban List",
  description = "Select an attribute in your listing to ban it",
  banned = {
    amiiboSeries: [],
    character: [],
    gameSeries: [],
    type: [],
  },
  onUnban,  // callback when an attribute is clicked on the ban list
}
```

Example of usage:

```js
<BanList
  header = "Ban List"
  description = "Select an attribute in your listing to ban it"
  banned = {
    amiiboSeries: [],
    character: [],
    gameSeries: [],
    type: [],
  }
  onUnban={handleUnban} />
```
