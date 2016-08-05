/* eslint-disable */

/*
 * Scheme for converting properties from array to nomral style.
 * All properties listed below will be transformed to string with 'space' separation
 */
export const propArray = {
  'margin': true,
  'padding': true,
  'border-radius': true,
  'background-size': true,
  'background-position': true
}

/**
 * Scheme for converting arrays to normal styles inside objects
 * e.g: "{ position: [0, 0] }" => "background-position: 0 0;"
 */
export const propArrayInObj = {
  'position': true, // background-position
}

/**
 * Sheme for parsing and building right styles from passed objects
 */
export const propObj = {
  padding: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },
  margin: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },
  background: {
    attachment: null,
    color: null,
    image: null,
    position: null,
    repeat: null
  },
  border: {
    width: null,
    style: null,
    color: null
  },
  'border-top': {
    width: null,
    style: null,
    color: null
  },
  'border-right': {
    width: null,
    style: null,
    color: null
  },
  'border-bottom': {
    width: null,
    style: null,
    color: null
  },
  'border-left': {
    width: null,
    style: null,
    color: null
  },
  outline: {
    width: null,
    style: null,
    color: null
  },
  'list-style': {
    type: null,
    position: null,
    image: null
  },
  'transition': {
    property: null,
    duration: null,
    'timing-function': null,
    delay: null
  },
  'animation': {
    name: null,
    duration: null,
    'timing-function': null,
    delay: null,
    'iteration-count': null,
    direction: null,
    'fill-mode': null,
    'play-state': null
  },
  'box-shadow': {
    x: 0,
    y: 0,
    blur: null,
    spread: null,
    color: null,
    inset: null
  },
  'text-shadow': {
    x: 0,
    y: 0,
    blur: null,
    color: null
  },
  'flex': {
    grow: null,
    shrink: null,
    basis: null
  }
}