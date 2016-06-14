![JSS logo](https://avatars1.githubusercontent.com/u/9503099?v=3&s=60)

## JSS plugin that makes using of css shorthands in more nicer way
This plugin

### Usage example
```javascript
import jss from 'jss'
import jssShorthand from 'jss-shorthand'

jss.use(jssShorthand())

let sheet = jss.createStyleSheet({
  container: {
    padding: ['20px', '10px'],
    background: {
        color: '#000',
        image: 'url(image.jpg)',
        position: [0, 0],
        repeat: 'no-repeat'
    },
    transition: [{
        property: 'opacity',
        duration: '200ms'
      }, {
        property: 'width',
        duration: '300ms'
      }
    ]
  }
})
console.log(sheet.toString())
```
```css
.jss-0-0 {
  padding: 20px 10px;
  background: #000 url(image.jpg) 0 0 no-repeat;
  transition: opacity 200ms, width 300ms;
}
```
### Features
- Writing values as array of numbers for `margin, padding, border-radius, background-position, transform, transition, animation, box-shadow, text-shadow`:
```javascript
padding: [20, 10],
border-radius: ['50%', '10%'],
box-shadow: [ '0 0 10px 0 rgba(0, 0, 0, 0.5)', 'inset 0 0 10px 0 rgba(0, 0, 0, 0.5)']
```
- Writing values as object for `padding, margin, background, border, border-top, border-bottom, border-left, border-right, outline, list-style, transition, animation, box-shadow, text-shadow, flex`
```javascript
border: {
  width: '1px',
  style: 'solid',
  color: '#f00'
}
```
- Writing values as array of objects
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

### Order does matter
This plugin **MUST BE** used **AFTER**:
1. [jss-camel-case](https://github.com/jsstyles/jss-camel-case)
2. [jss-extend](https://github.com/jsstyles/jss-extend)


### Issues
This plugin breaks 'fallback' functionality described [here](https://github.com/jsstyles/jss/blob/master/docs/json-api.md). So your code:
```javascript
export default {
  container: {
    background: [
      'red',
      'linear-gradient(to right, red 0%, green 100%)'
    ]
  }
}
```
Will be converted to:
```css
/* With jss-shorthand plugin */
.container--jss-0-0 {
  background: red, linear-gradient(to right, red 0%, green 100%);
}

/* Without jss-shorthand plugin */
.container--jss-0-0 {
  background: red;
  background: linear-gradient(to right, red 0%, green 100%);
}
```

### Run tests
```bash
npm i
npm run test
```
### Licence
MIT
