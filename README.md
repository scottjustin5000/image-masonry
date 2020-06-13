# React Image Masonry


### props

* images      - array of image urls (required)
* breakPoints - array of breakPoints (optional) defaults to [350, 500, 750]


### Usage 

```js

const images = getImageUrl()


return (
  <Container>
  <Masonry 
   breakPoints={[300,500,700]}
   images={image} />
  <Container>
)


```

