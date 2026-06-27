# Discover

**Serves as the middle panel of the project**

Prop:

```js
(
    header, // header of the discovery panel
    description, // description
    // current Amiibo info
    currentInfo: {
        image: the image url of the Amiibo,
        name: the name of the Amiibo
        attributes: {
            amiiboSeries: "the series of the Amiibo",
            character: "Amiibo character",
            gameSeries: "game series",
            type: "type"
        }
    },
    onDiscover, // function to be called when discover button is clicked,
    onBan, // function to called when an attribute is clicked
)
```

Example of usage:

```js
<Discover
  header="Amiibo Showcase"
  description="Enjoy a radom Amiibo that you have never seen before"
  currentInfo={{
    image:
      "https://raw.githubusercontent.com/8bitDream/AmiiboAPI/master/images/icon_09d00301-02bb0e02.png",
    name: "Metal Mario - Tennis",
    attributes: {
      amiiboSeries: "Mario Sports Superstars",
      character: "Metal Mario",
      gameSeries: "Mario Sports Superstars",
      type: "Card",
    },
  }}
  onDiscover={handleDiscover}
  onBan={handleBan(key, value)}
/>
```
