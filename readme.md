![JSS logo](https://avatars1.githubusercontent.com/u/9503099?v=3&s=60)

### JSS plugin that gives you a better syntax than CSS.

Can you remember what each of those values mean `box-shadow: 2px 2px 2px 1px gold;` and in which order they have to be used? Me neither. CSS values are sometimes cryptic. This plugin makes them easy to read and to remember.

Make sure you read [how to use
plugins](https://github.com/cssinjs/jss/blob/master/docs/setup.md#setup-with-plugins)
in general.

[Get full documentation.](https://github.com/cssinjs/jss-expand/blob/master/docs/index.md)

## Usage example
```javascript
const sheet = jss.createStyleSheet({
  container: {
    padding: [20, 10],
    background: {
      color: 'green',
      image: 'url(image.jpg)',
      position: [0, 0],
      repeat: 'no-repeat'
    },
    boxShadow: {x: 10, y: 10, blur: 5, spread: 5, color: 'black'}
    transition: [
      {
        property: 'opacity',
        duration: '200ms'
      },
      {
        property: 'width',
        duration: '300ms'
      }
    ]
  }
})
```
```css
.container-3kjh2 {
  padding: 20px 10px;
  background: green url(image.jpg) 0 0 no-repeat;
  box-shadow: 10px 10px 5px 5px black;
  transition: opacity 200ms, width 300ms;
}
```
## Features

1. Array notation for properties like `margin`, `padding` and others.

  ```javascript
  padding: [20, 10],
  borderRadius: ['50%', '10%'],
  transition: [['opacity', '200ms'], ['width', '300ms']]
  ```

2. Expanded object notation for all properties.

  ```javascript
  border: {
    width: '1px',
    style: 'solid',
    color: 'red'
  }
  ```

  will be converted to

  ```css
  border: 1px solid red;
  ```

3. Expanded arrays for multi value properties.

  ```javascript
  transition: [{
    property: 'opacity',
    duration: '200ms'
  }, {
    property: 'width',
    duration: '300ms'
  }]
  ```

  will be converted to

  ```css
  transition: opacity 200ms, width 300ms;
  ```

## Order does matter
This plugin **MUST BE** used **AFTER** [jss-camel-case](https://github.com/jsstyles/jss-camel-case) and [jss-extend](https://github.com/jsstyles/jss-extend) and [jss-default-unit](https://github.com/jsstyles/jss-default-unit) and [jss-nested](https://github.com/jsstyles/jss-nested)

## Issues

File a bug against [cssinjs/jss prefixed with \[jss-expand\]](https://github.com/cssinjs/jss/issues/new?title=[jss-expand]%20).


## Run tests
```bash
npm i
npm run test
```


## Run benchmark tests
```bash
npm i
npm run bench
```

### Licence
MIT
