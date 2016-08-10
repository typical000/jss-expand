![JSS logo](https://avatars1.githubusercontent.com/u/9503099?v=3&s=60)

## JSS plugin that adds possibility to write styles in more expanded way

### Usage example
```javascript
import jss from 'jss'
import jssExpand from 'jss-expand'

jss.use(jssExpand())

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

More expanded documentation is available [here](https://github.com/typical000/jss-expand/blob/master/docs/index.md)

### Order does matter
This plugin **MUST BE** used **AFTER** [jss-camel-case](https://github.com/jsstyles/jss-camel-case) and [jss-extend](https://github.com/jsstyles/jss-extend) and [jss-default-unit](https://github.com/jsstyles/jss-default-unit)

### Known issues
This plugin doesn't support `font` property written in expanded way. This is because plugin must have maximum performance, and all exceptions like in `font` way of writing (joining of `font-size` and `line-height` joining with `\` symbol) is forbidden.

### Run tests
```bash
npm i
npm run test
```


### Run benchmark tests
```bash
npm i
npm run bench
```

### Licence
MIT
