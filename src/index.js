import {propArray, propArrayInObj, propObj} from './props'

/**
 * Map values by given prop
 *
 * @param {Array} array of values
 * @param {String} original property
 * @return {String} mapped values
 */
function mapValuesByProp(value, prop) {
  return value.map((item) => objectToString(item, prop))
}

/**
 * Helper function for converting array to string
 *
 * @param {Array} array of values
 * @param {String} original property
 * @param {Object} sheme, for converting arrays in strings
 * @return {String} converted string
 */
function arrayToString(value, prop, scheme) {
  if (value[0].constructor !== Object) {
    if (scheme.hasOwnProperty(prop)) {
      if (value[0].constructor === Array) {
        return arrayToString(value[0], prop, scheme)
      }
      return value.join(' ')
    }
    return value.join(',')
  }
  return mapValuesByProp(value, prop)
}

/**
 * Helper function for converting object to string
 *
 * @param {Object} object of values
 * @param {String} original property
 * @return {String} converted string
 */
function objectToString(value, prop) {
  const result = []
  if (propObj.hasOwnProperty(prop)) {
    for (const baseProp in propObj[prop]) {
      if (typeof value[baseProp] !== 'undefined') {
        if (value[baseProp].constructor === Array) {
          result.push(arrayToString(value[baseProp], baseProp, propArrayInObj))
        }
        else {
          result.push(value[baseProp])
        }
      }
      else {
        // Add default value from props config
        if (propObj[prop][baseProp] != null) {
          result.push(propObj[prop][baseProp])
        }
      }
    }
  }
  return result.join(' ')
}

/**
 * Detect if style need to convert or not
 *
 * @param {Object} style
 * @return {Object} convertedStyle
 */
function styleDetector(style) {
  for (const prop in style) {
    const value = style[prop]
    // Need to check double arrays to aboid recursion
    if (value.constructor === Array && value[0].constructor !== Array) {
      if (prop !== 'fallbacks') {
        style[prop] = arrayToString(value, prop, propArray)
      }
      else {
        for (let index = 0; index < style[prop].length; index ++) {
          style[prop][index] = styleDetector(style[prop][index])
        }
      }
      continue
    }
    if (value.constructor === Object) {
      if (prop !== 'fallbacks') {
        style[prop] = objectToString(value, prop)
      }
      else {
        style[prop] = styleDetector(style[prop])
      }
      continue
    }
  }
  return style
}

/**
 * Add possibility to write styles in more expanded (unfolded) way
 *
 * @param {Rule} rule
 * @api public
 */
export default function jssExpand() {
  return (rule) => {
    const {style, type} = rule
    if (!style) return
    if (type !== 'regular') return
    if (Array.isArray(style)) {
      // Pass rules one by one and reformat them
      for (let index = 0; index < style.length; index++) {
        style[index] = styleDetector(style[index])
      }
    }
    else {
      rule.style = styleDetector(style)
    }
  }
}
