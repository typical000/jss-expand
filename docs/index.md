## JSS-EXPAND

1. [Features](#features)
    1. ['space-separated' properties writing](#user-content-writing-space-separated-properties)
    2. ['space-separated' properties inside arrays](#user-content-space-separated-properties-inside-arrays)
    3. [Writing properties in expanded way](#user-content-writing-properties-in-expanded-way)
    4. [Writing properties in expanded way inside arrays](#user-content-writing-properties-in-expanded-way-inside-arrays)
    5. [Writing expanded properties inside fallbacks](#user-content-writing-expanded-properties-inside-fallbacks)
    6. [jss-camel-case integration](#user-content-jss-camel-case-integration)

2. [Properties](#properties)

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
    1. `margin`
    2. `padding`
    3. `border-radius`
    4. `background-size`
    5. `background-position`

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