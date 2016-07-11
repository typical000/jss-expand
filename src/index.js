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
function arrayToString(value, prop, sheme) {
  let convertedString
  for (const neededProp in sheme) {
    if (prop === neededProp) {
      // If is object - transform values to string
      if (value[0].constructor === Object) {
        value = mapValuesByProp(value, prop)
      }
      if (sheme[neededProp]) {
        // If there are simple array like 'margin' or 'padding' - use whitespace
        convertedString = value.join(' ')
      }
      else {
        // Otherwise make them comma-separated
        convertedString = value.join(', ')
      }
      break
    }
  }
  return convertedString
}

/**
 * Helper function for converting object to string
 *
 * @param {Object} object of values
 * @param {String} original property
 * @return {String} converted string
 */
function objectToString(value, prop) {
  let tpl

  for (const neededProp in propObj) {
    if (prop === neededProp) {
      tpl = propObj[neededProp].template
      // Evaluate properies one by one more deeply
      for (const baseProp in propObj[neededProp].prop) {
        let isExistant = false
        for (const valueProp in value) {
          if (baseProp === valueProp) {
            isExistant = true
            // Check if value inside is an array
            if (value[valueProp].constructor === Array) {
              value[valueProp] = arrayToString(value[valueProp], valueProp, propArrayInObj)
            }
            tpl = tpl.replace(new RegExp(valueProp, 'g'), value[valueProp])
            break
          }
        }
        // If there is no matches - set empty value
        if (!isExistant) {
          tpl = tpl.replace(new RegExp(baseProp, 'g'), propObj[neededProp].prop[baseProp])
        }
      }
      // Remove extra whitespaces from resulting string
      return tpl.replace(/\s+/g, ' ').trim()
    }
  }
  return tpl
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

    if (value.constructor === Array) {
      if (prop !== 'fallbacks') {
        style[prop] = arrayToString(value, prop, propArray)
      }
      else {
        for (let index = 0; index < style[prop].length; index ++) {
          style[prop][index] = styleDetector(style[prop][index])
        }
      }
    }
    if (value.constructor === Object) {
      if (prop !== 'fallbacks') {
        style[prop] = objectToString(value, prop)
      }
      else {
        style[prop] = styleDetector(style[prop])
      }
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
