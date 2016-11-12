import {propArray, propArrayInObj, propObj, customPropObj} from './props'

/**
 * Map values by given prop.
 *
 * @param {Array} array of values
 * @param {String} original property
 * @param {String} original rule
 * @return {String} mapped values
 */
function mapValuesByProp(value, prop, rule) {
  return value.map((item) => objectToString(item, prop, rule))
}

/**
 * Convert array to string.
 *
 * @param {Array} array of values
 * @param {String} original property
 * @param {Object} sheme, for converting arrays in strings
 * @param {Object} original rule
 * @return {String} converted string
 */
function arrayToString(value, prop, scheme, rule) {
  if (value[0].constructor === Object) return mapValuesByProp(value, prop, rule)
  if (scheme[prop] == null) return value.join(',')
  if (value[0].constructor === Array) return arrayToString(value[0], prop, scheme)
  return value.join(' ')
}

/**
 * Convert object to string.
 *
 * @param {Object} object of values
 * @param {String} original property
 * @param {Object} original rule
 * @return {String} converted string
 */
function objectToString(value, prop, rule) {
  if (!(propObj[prop] || customPropObj[prop])) return ''

  const result = []

  // Check if exists any non-standart property
  if (customPropObj[prop]) {
    for (const baseProp in customPropObj[prop]) {
      const propName = customPropObj[prop][baseProp]
      // If current property doesn't exist alerady in rule - add new one
      if (value[baseProp] && !rule.prop(propName)) {
        rule.prop(propName, styleDetector({
          [propName]: value[baseProp]
        }, rule)[propName])
      }
      delete value[baseProp]
    }
  }

  // Pass throught all standart props
  if (Object.keys(value).length !== 0) {
    for (const baseProp in propObj[prop]) {
      if (value[baseProp]) {
        if (value[baseProp].constructor === Array) {
          result.push(arrayToString(value[baseProp], baseProp, propArrayInObj))
        }
        else result.push(value[baseProp])
        continue
      }

      // Add default value from props config.
      if (propObj[prop][baseProp] != null) {
        result.push(propObj[prop][baseProp])
      }
    }
  }

  return result.join(' ')
}

/**
 * Detect if a style needs to be converted.
 *
 * @param {Object} style
 * @param {Object} rule
 * @return {Object} convertedStyle
 */
function styleDetector(style, rule) {
  for (const prop in style) {
    const value = style[prop]

    if (value.constructor === Object) {
      if (prop === 'fallbacks') style[prop] = styleDetector(style[prop])
      else {
        style[prop] = objectToString(value, prop, rule)
        // Avoid creating properties with empty values
        if (!style[prop]) delete style[prop]
      }
      continue
    }

    // Check double arrays to avoid recursion.
    if (value.constructor === Array && value[0].constructor !== Array) {
      if (prop === 'fallbacks') {
        for (let index = 0; index < style[prop].length; index ++) {
          style[prop][index] = styleDetector(style[prop][index])
        }
        continue
      }

      style[prop] = arrayToString(value, prop, propArray)
    }
  }
  return style
}

/**
 * Adds possibility to write expanded styles.
 *
 * @param {Rule} rule
 * @api public
 */
export default function jssExpand() {
  return (rule) => {
    const {style, type} = rule
    if (!style || type !== 'regular') return

    if (Array.isArray(style)) {
      // Pass rules one by one and reformat them
      for (let index = 0; index < style.length; index++) {
        style[index] = styleDetector(style[index], rule)
      }
      return
    }

    rule.style = styleDetector(style, rule)
  }
}
