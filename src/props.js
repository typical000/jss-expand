/* eslint-disable */

/*
 * Scheme for converting properties from array to nomral style.
 * TRUE - indicates that styles will be joined with whitespace. E.g:
 *        "padding: [ 10, 20 ]" => "padding: 10 20;"
 * FALSE - indeicates that styles will be joined with comma. E.g:
 *         "box-shadow: [ '0 0 5px red', '0 0 2px green' ]" => "box-shadow: 0 0 5px red, 0 0 2px green"
 * WARNING - it will break 'fallback' styles in JSS :(
 */
export const propArray = {
  'margin': true,
  'padding': true,
  'border-radius': true,
  'background-size': true,
  'background-position': true,
  'background': false,
  'transform': false,
  'transition': false,
  'animation': false,
  'box-shadow': false,
  'text-shadow': false,
}

/**
 * Scheme for converting arrays to normal styles inside objects
 * e.g: "{ position: [0, 0] }" => "background-position: 0 0;"
 */
export const propArrayInObj = {
  'size': true, // background-size
  'position': true, // background-position
}

/**
 * Sheme for parsing and building right styles from passed objects
 */
export const propObj = {
  padding: {
    template: 'top right bottom left',
    prop: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    }
  },
  margin: {
    template: 'top right bottom left',
    prop: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    }
  },
  background: {
    template: 'attachment color image position repeat',
    prop: {
      attachment: '',
      color: '',
      image: '',
      position: '',
      repeat: '',
    }
  },
  border: {
    template: 'width style color',
    prop: {
      width: '',
      style: '',
      color: '',
    }
  },
  'border-top': {
    template: 'width style color',
    prop: {
      width: '',
      style: '',
      color: '',
    }
  },
  'border-right': {
    template: 'width style color',
    prop: {
      width: '',
      style: '',
      color: '',
    }
  },
  'border-bottom': {
    template: 'width style color',
    prop: {
      width: '',
      style: '',
      color: '',
    }
  },
  'border-left': {
    template: 'width style color',
    prop: {
      width: '',
      style: '',
      color: '',
    }
  },
  outline: {
    template: 'width style color',
    prop: {
      width: '',
      style: '',
      color: '',
    }
  },
  font: {
    template: 'style variant weight size/line-height family',
    prop: {
      style: '',
      variant: '',
      weight: '',
      size: 'medium', // See 'initial value' from https://developer.mozilla.org/en-US/docs/Web/CSS/font
      'line-height': 'normal',
      family: '',
    }
  },
  'list-style': {
    template: 'type position image',
    prop: {
      type: '',
      position: '',
      image: '',
    }
  },
  'transition': {
    template: 'property duration timing-function delay',
    prop: {
      property: '',
      duration: '',
      'timing-function': '',
      delay: '',
    }
  },
  'animation': {
    template: 'name duration timing-function delay iteration-count direction fill-mode play-state',
    prop: {
      name: '',
      duration: '',
      'timing-function': '',
      delay: '',
      'iteration-count': '',
      direction: '',
      'fill-mode': '',
      'play-state': '',
    }
  },
  'box-shadow': {
    template: 'x y blur spread color inset',
    prop: {
      x: 0,
      y: 0,
      blur: '',
      spread: '',
      color: '',
      inset: '',
    }
  },
  'text-shadow': {
    template: 'x y blur color',
    prop: {
      x: 0,
      y: 0,
      blur: '',
      color: '',
    }
  },
  'flex': {
    template: 'grow shrink basis',
    prop: {
      grow: '',
      shrink: '',
      basis: '',
    }
  }
}
