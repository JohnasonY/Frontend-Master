# SeenList

**Serves as the left panel of the project**

Porps:
header: (string) the header of the seen list, by default is "What have we seen so far?"
seen: the array of the seen items need to be rendered, each item must be an object such that

```js
{
    image: the image url of the item
    description: the description of the item
}
```

Example of usage:

```js
<SeenList
  header="What have we seen?"
  seen={[
    {
      image:
        "https://raw.githubusercontent.com/8bitDream/AmiiboAPI/master/images/icon_09c00101-02690e02.png",
      description: "Mario - Soccer",
    },
    {
      image:
        "https://raw.githubusercontent.com/8bitDream/AmiiboAPI/master/images/icon_00000000-00340102.png",
      description: "Mario",
    },
  ]}
/>
```
