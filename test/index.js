'use strict'

QUnit.module('Shorthand plugin', {
  setup: function () {
    jss.use(jssShorthand.default())
  },
  teardown: function () {
    jss.plugins.registry = []
  }
})

test('Space-separated array shorthands', function () {
  var ss = jss.createStyleSheet({
    a: {
      padding: [ 20, 10 ],
      'border-radius': [ 10, 15, 20, 20 ]
    }
  }, {named: false})
  equal(ss.toString(), 'a {\n  padding: 20 10;\n  border-radius: 10 15 20 20;\n}', 'is number')
})

test('Comma-separated array shorthands', function () {
  var ss = jss.createStyleSheet({
    a: {
      transition: [ 'opacity 1s linear', 'transform 300ms ease' ]
    }
  }, {named: false})
  equal(ss.toString(), 'a {\n  transition: opacity 1s linear, transform 300ms ease;\n}', 'is number')
})

test('Simple shorthands as objects', function () {
  var ss = jss.createStyleSheet({
    a: {
      border: {
        width: '1px',
        style: 'solid',
        color: '#f00'
      }
    }
  }, {named: false})
  equal(ss.toString(), 'a {\n  border: 1px solid #f00;\n}', 'is number')
})

test('Shorthands as object (without some styles)', function () {
  var ss = jss.createStyleSheet({
    a: {
      background: {
        color: '#000',
        image: 'url(test.jpg)',
        position: [ 0, 0 ],
        repeat: 'no-repeat'
      }
    }
  }, {named: false})
  equal(ss.toString(), 'a {\n  background: #000 url(test.jpg) 0 0 no-repeat;\n}', 'is number')
})

test('Shorthands as object (default values)', function () {
  var ss = jss.createStyleSheet({
    a: {
      font: {
        family: 'Arial, sans-serif'
      }
    }
  }, {named: false})
  equal(ss.toString(), 'a {\n  font: medium/normal Arial, sans-serif;\n}', 'is number')
})

test('Array of shorthand objects', function () {
  var ss = jss.createStyleSheet({
    a: {
      transition: [{
        property: 'opacity',
        duration: '200ms'
      }, {
        property: 'width',
        duration: '300ms'
      }]
    }
  }, {named: false})
  equal(ss.toString(), 'a {\n  transition: opacity 200ms, width 300ms;\n}', 'is number')
})
