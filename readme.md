![JSS logo](https://avatars1.githubusercontent.com/u/9503099?v=3&s=60)

### JSS plugin that gives you a better syntax than CSS.

Can you remember what each of those values mean `box-shadow: 2px 2px 2px 1px gold;` and in which order they have to be used? Me neither. CSS values are sometimes cryptic. This plugin makes them easy to read and to remember.

Make sure you read [how to use
plugins](https://github.com/cssinjs/jss/blob/master/docs/setup.md#setup-with-plugins)
in general.

## Usage example
```javascript
const sheet = jss.createStyleSheet({
  container: {
    padding: [20, 10],
    background: {
        color: '#000',
        image: 'url(image.jpg)',
        position: [0, 0],
        repeat: 'no-repeat'
    },
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
.jss-0-0 {
  padding: 20px 10px;
  background: #000 url(image.jpg) 0 0 no-repeat;
  transition: opacity 200ms, width 300ms;
}
```
## Features
1. One syntax for arrays. This plugin simplifies writing values as array of numbers for `margin, padding, border-radius, background-position, transform, transition, animation, box-shadow, text-shadow`:
  ```javascript
  padding: [20, 10],
  border-radius: ['50%', '10%'],
  transition: [['opacity', '200ms'], ['width', '300ms']]
  ```
  instead of comma and space separated syntax from jss:
  ```javascript
  padding: [[20, 10]],
  border-radius: [['50%', '10%']],
  transition: [[['opacity', '200ms']], [['width', '300ms']]]
  ```

2. Writing values as object for `padding, margin, background, border, border-top, border-bottom, border-left, border-right, outline, list-style, transition, animation, box-shadow, text-shadow, flex`
  ```javascript
  border: {
    width: '1px',
    style: 'solid',
    color: '#f00'
  }
  ```
  will be converted to
  ```css
  border: 1px solid #f00;
  ```

3. Writing values as array of objects
  ```javascript
  transition: [{
      property: 'opacity',
      duration: '200ms'
    }, {
      property: 'width',
      duration: '300ms'
    }
  ]
  ```
  will be converted to
  ```css
  transition: opacity 200ms, width 300ms;
  ```

More expanded documentation is available [here](https://github.com/cssinjs/jss-expand/blob/master/docs/index.md)

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
