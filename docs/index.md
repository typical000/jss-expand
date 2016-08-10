## JSS-EXPAND

1. [Features](#features)
    1. ['space-separated' properties writing](#user-content-writing-space-separated-properties)
    2. ['space-separated' properties inside arrays](#user-content-space-separated-properties-inside-arrays)
    3. [Writing properties in expanded way](#user-content-writing-properties-in-expanded-way)
    4. [Writing properties in expanded way inside arrays](#user-content-writing-properties-in-expanded-way-inside-arrays)
    5. [Writing expanded properties inside fallbacks](#user-content-writing-expanded-properties-inside-fallbacks)
    6. [jss-camel-case integration](#user-content-jss-camel-case-integration)

2. [Properties](#properties)
    1. [padding](#padding)
    2. [margin](#margin)
    3. [background](#background)
    4. [border](#border)
    5. [border-top](#border-top)
    6. [border-right](#border-right)
    7. [border-bottom](#border-bottom)
    8. [border-left](#border-left)
    9. [outline](#outline)
    10. [list-style](#list-style)
    11. [transition](#transition)
    12. [animation](#animation)
    13. [box-shadow](#box-shadow)
    14. [text-shadow](#text-shadow)
    15. [flex](#flex)

## Features

1. #### writing space-separated properties

    Simplification in writing 'space-separated' properties. Now, in jss for defining `padding` we must write `padding: [[ 20, 30 ]]`
    Using **jss-expand** you can write properties with one bracket:

    ````````````````````js
    foo: {
      padding: [ 5, 10, 5 ]
    }
    ````````````````````
    and the output will be
    ````````````````````css
    foo { padding: 5 10 5; }
    ````````````````````
    Properties, that can be written with short syntax:
    * `margin`
    * `padding`
    * `border-radius`
    * `background-size`
    * `background-position`

2. #### space-separated properties inside arrays

    Simplified syntax for writing more complex constructions with arrays. In pure jss, if you want to write multi-values for e.g. `transition` you must write:

    ````````````````````js
    foo: {
      transition: [[['opacity', '200ms']], [['width', '300ms']]]
    }
    ````````````````````
    With **jss-expand**, syntax is simplified and you can write:
    ````````````````````js
    foo: {
      transition: [['opacity', '200ms'], ['width', '300ms']]
    }
    ````````````````````

3. #### Writing properties in expanded way
    
    You don't need to keep in mind writing order of 'partial' properties, plugin do it for you. So, you can write:
    
    ````````````````````js
    border: {
      color: '#f00', // You can write properties in any order
      width: '1px',
      style: 'solid'
    }
    ````````````````````
    and CSS output will be:
    ````````````````````css
    border: 1px solid #f00;
    ````````````````````
    Properties that supports 'expanded' syntax:
    * `padding`
    * `margin`
    * `background`
    * `border`
    * `border-top`
    * `border-right`
    * `border-bottom`
    * `border-left`
    * `outline`
    * `list-style`
    * `transition`
    * `animation`
    * `box-shadow`
    * `text-shadow`
    * `flex`
    
    For more information see [properties section](#properties)

4. #### Writing properties in expanded way inside arrays

    ````````````````````js
    transition: [{
        property: 'opacity',
        duration: '200ms'
      }, {
        property: 'width',
        duration: '300ms'
      }
    ]
    ````````````````````
    and CSS output will be:
    ````````````````````css
    transition: opacity 200ms, width 300ms;
    ````````````````````

5. #### Writing expanded properties inside fallbacks

    (more about jss fallback you can find [here](https://github.com/cssinjs/jss/blob/master/docs/json-api.md) (section 'Fallbacks')):
    ````````````````````js
    foo: {
      background: {
        image: 'linear-gradient(red, green)'
      },
      fallbacks: {
        background: {
          color: 'red',
          repeat: 'no-repeat',
          position: [ 0 , 0 ]
        }
      }
    }
    ````````````````````
    and CSS output will be:
    ````````````````````css
    foo {
      background: red no-repeat 0 0;
      background: linear-gradient(red, green);
    }
    ````````````````````

6. #### jss-camel-case integration

    Plugin have compatibility with [jss-camel-case](https://github.com/cssinjs/jss-camel-case) plugin. So you can write camelCased partial properties inside expanded syntax:
    ````````````````````js
    transition: {
      timingFunction: 'linear', // Camel cased property
      delay: '300ms',
      property: 'opacity',
      duration: '200ms'
    }
    ````````````````````
    and CSS output will be:
    ````````````````````css
    transition: opacity 200ms linear 300ms;
    ````````````````````

### Properties

Here are listed all CSS properties, that can be written in expanded way with all 'sub-properties'.
Values of those 'sub-properties' are **default values**. So, if you don't set them - this value will be added in output. So if you write:

````````````````````js
padding: {
  top: '10px' // Other default values are 0
}
````````````````````
The output will be:
````````````````````css
padding: 10px 0 0 0;
````````````````````

If default value is **NULL** - no default value will be written.
For better understanding what any 'sub-property' mean - all 'sub-properties' are 'property' and 'sub-property' names joined together e.g.:
````````````````````js
padding: {
  top: 0
}
// Is 'padding' + 'top' = 'padding-top'
````````````````````

1. #### padding

    ````````````````````js
    padding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    }
    ````````````````````

1. #### margin

    ````````````````````js
    margin: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    }
    ````````````````````

1. #### background

    ````````````````````js
    background: {
      attachment: null,
      color: null,
      image: null,
      position: null, // Can be written without double arrays, like [0, 0]
      repeat: null
    }
    ````````````````````

1. #### border

    ````````````````````js
    border: {
      width: null,
      style: null,
      color: null
    }
    ````````````````````

1. #### border-top

    ````````````````````js
    'border-top': {
      width: null,
      style: null,
      color: null
    }
    ````````````````````

1. #### border-right

    ````````````````````js
    'border-right': {
      width: null,
      style: null,
      color: null
    }
    ````````````````````

1. #### border-bottom

    ````````````````````js
    'border-bottom': {
      width: null,
      style: null,
      color: null
    }
    ````````````````````

1. #### border-left

    ````````````````````js
    'border-left': {
      width: null,
      style: null,
      color: null
    }
    ````````````````````

1. #### outline

    ````````````````````js
    outline: {
      width: null,
      style: null,
      color: null
    }
    ````````````````````

1. #### list-style

    ````````````````````js
    'list-style': {
      type: null,
      position: null,
      image: null
    }
    ````````````````````

1. #### transition

    ````````````````````js
    transition: {
      property: null,
      duration: null,
      'timing-function': null,
      timingFunction: null, // You can write 'camelCased' property
      delay: null
    }
    ````````````````````

1. #### animation

    ````````````````````js
    animation: {
      name: null,
      duration: null,
      'timing-function': null,
      timingFunction: null, // You can write 'camelCased' property
      delay: null,
      'iteration-count': null,
      iterationCount: null, // You can write 'camelCased' property
      direction: null,
      'fill-mode': null,
      fillMode: null, // You can write 'camelCased' property
      'play-state': null,
      playState: null // You can write 'camelCased' property
    }
    ````````````````````

1. #### box-shadow

    ````````````````````js
    'box-shadow': {
      x: 0, // X offset for shadow
      y: 0, // Y offset for shadow
      blur: null,
      spread: null,
      color: null,
      inset: null // If you want to add inset you need to write "inset: 'inset'"
    }
    ````````````````````

1. #### text-shadow

    ````````````````````js
    'text-shadow': {
      x: 0, // X offset for shadow
      y: 0, // Y offset for shadow
      blur: null,
      color: null
    }
    ````````````````````

1. #### flex

    ````````````````````js
    'flex': {
      grow: null,
      shrink: null,
      basis: null
    }
    ````````````````````
