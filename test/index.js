'use strict'

var jss = jss.create()

QUnit.module('Expand plugin', {
  beforeEach: function () {
    jss.use(jssExpand.default())
  },
  afterEach: function () {
    jss.plugins.registry = []
  }
})

QUnit.test('Space-separated values as arrays', function (assert) {
  var ss = jss.createStyleSheet({
    a: {
      padding: [ 20, 10 ],
      'background-size': [ 10, 'auto' ],
      'border-radius': [ 10, 15, 20, 20 ],
    }
  }, {named: false})
  assert.equal(ss.toString(), 'a {\n  padding: 20 10;\n  background-size: 10 auto;\n  border-radius: 10 15 20 20;\n}', 'is number')
})

QUnit.test('Comma-separated values as arrays', function (assert) {
  var ss = jss.createStyleSheet({
    a: {
      transition: [ 'opacity 1s linear', 'transform 300ms ease' ]
    }
  }, {named: false})
  assert.equal(ss.toString(), 'a {\n  transition: opacity 1s linear,transform 300ms ease;\n}', 'is number')
})

QUnit.test('Simple expanded rules', function (assert) {
  var ss = jss.createStyleSheet({
    a: {
      border: {
        width: '1px',
        style: 'solid',
        color: '#f00'
      }
    }
  }, {named: false})
  assert.equal(ss.toString(), 'a {\n  border: 1px solid #f00;\n}', 'is number')
})

QUnit.test('Expanded rules as object (without some styles)', function (assert) {
  var ss = jss.createStyleSheet({
    a: {
      background: {
        color: '#000',
        image: 'url(test.jpg)',
        position: [[ 0, 0 ]],
        repeat: 'no-repeat'
      }
    }
  }, {named: false})
  assert.equal(ss.toString(), 'a {\n  background: #000 url(test.jpg) 0 0 no-repeat;\n}', 'is number')
})

QUnit.test('Array of expanded objects', function (assert) {
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
  assert.equal(ss.toString(), 'a {\n  transition: opacity 200ms, width 300ms;\n}', 'is number')
})

QUnit.test('Array of arrays', function (assert) {
  var ss = jss.createStyleSheet({
    a: {
      transition: [
        ['opacity', '200ms'],
        ['width', '300ms']
      ]
    }
  }, {named: false})
  assert.equal(ss.toString(), 'a {\n  transition: opacity 200ms, width 300ms;\n}', 'is number')
})

QUnit.test('Expand with fallbacks', function (assert) {
  var ss = jss.createStyleSheet({
    'a': {
      background: {
        image: 'linear-gradient(red 0%, green 100%)',
      },
      padding: 50,
      fallbacks: {
        background: {
          color: 'url(test.png)',
          repeat: 'no-repeat',
          position: [ 0, 0 ]
        },
        padding: 20
      }
    },
  }, {named: false})
  assert.equal(ss.toString(), 'a {\n  background: url(test.png) 0 0 no-repeat;\n  padding: 20;\n  background: linear-gradient(red 0%, green 100%);\n  padding: 50;\n}', 'is number')
})

QUnit.test('Expand with many same fallbacks', function (assert) {
  var ss = jss.createStyleSheet({
    'a': {
      background: 'linear-gradient(red 0%, green 100%)',
      fallbacks: [
        { background: 'red' },
        {
          background: {
            color: 'url(test.png)',
            repeat: 'no-repeat',
            position: [0, 0]
          }
        }
      ]
    }
  }, {named: false})
  assert.equal(ss.toString(), 'a {\n  background: red;\n  background: url(test.png) 0 0 no-repeat;\n  background: linear-gradient(red 0%, green 100%);\n}', 'is number')
})

QUnit.test('Integration with jss-camel-case', function (assert) {
  var ss = jss.createStyleSheet({
    a: {
      transition: {
        timingFunction: 'linear',
        delay: '300ms',
        property: 'opacity',
        duration: '200ms'
      }
    }
  }, {named: false})
  assert.equal(ss.toString(), 'a {\n  transition: opacity 200ms linear 300ms;\n}', 'is number')
})
