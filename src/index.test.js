import expect from 'expect.js'
import expand from './index'
import {create} from 'jss'

describe('jss-expand', () => {
  const jss = create().use(expand())

  describe('space-separated values as arrays', () => {
    const sheet = jss.createStyleSheet({
      a: {
        padding: [20, 10],
        'background-size': [10, 'auto'],
        'border-radius': [10, 15, 20, 20],
      }
    }, {named: false})

    it('should add rules', () => {
      expect(sheet.getRule('a')).to.not.be(undefined)
    })

    it('should generate correct CSS', () => {
      expect(sheet.toString()).to.be(
        'a {\n' +
        '  padding: 20 10;\n' +
        '  background-size: 10 auto;\n' +
        '  border-radius: 10 15 20 20;\n' +
        '}'
      )
    })
  })

  describe('comma-separated values as arrays', () => {
    const sheet = jss.createStyleSheet({
      a: {
        transition: ['opacity 1s linear', 'transform 300ms ease']
      }
    }, {named: false})

    it('should add rules', () => {
      expect(sheet.getRule('a')).to.not.be(undefined)
    })

    it('should generate correct CSS', () => {
      expect(sheet.toString()).to.be(
        'a {\n' +
        '  transition: opacity 1s linear,transform 300ms ease;\n' +
        '}'
      )
    })
  })

  describe('simple expanded rules', () => {
    const sheet = jss.createStyleSheet({
      a: {
        border: {
          width: '1px',
          style: 'solid',
          color: '#f00'
        }
      }
    }, {named: false})

    it('should add rules', () => {
      expect(sheet.getRule('a')).to.not.be(undefined)
    })

    it('should generate correct CSS', () => {
      expect(sheet.toString()).to.be(
        'a {\n' +
        '  border: 1px solid #f00;\n' +
        '}'
      )
    })
  })

  describe('expanded rules as object (without some styles)', () => {
    const sheet = jss.createStyleSheet({
      a: {
        background: {
          color: '#000',
          image: 'url(test.jpg)',
          position: [[0, 0]],
          repeat: 'no-repeat'
        }
      }
    }, {named: false})

    it('should add rules', () => {
      expect(sheet.getRule('a')).to.not.be(undefined)
    })

    it('should generate correct CSS', () => {
      expect(sheet.toString()).to.be(
        'a {\n' +
        '  background: #000 url(test.jpg) 0 0 no-repeat;\n' +
        '}'
      )
    })
  })

  describe('array of arrays', () => {
    const sheet = jss.createStyleSheet({
      a: {
        transition: [
          ['opacity', '200ms'],
          ['width', '300ms']
        ]
      }
    }, {named: false})

    it('should add rules', () => {
      expect(sheet.getRule('a')).to.not.be(undefined)
    })

    it('should generate correct CSS', () => {
      expect(sheet.toString()).to.be(
        'a {\n' +
        '  transition: opacity 200ms, width 300ms;\n' +
        '}'
      )
    })
  })

  describe('expand with fallbacks', () => {
    const sheet = jss.createStyleSheet({
      a: {
        background: {
          image: 'linear-gradient(red 0%, green 100%)',
        },
        padding: 50,
        fallbacks: {
          background: {
            color: 'url(test.png)',
            repeat: 'no-repeat',
            position: [0, 0]
          },
          padding: 20
        }
      }
    }, {named: false})

    it('should add rules', () => {
      expect(sheet.getRule('a')).to.not.be(undefined)
    })

    it('should generate correct CSS', () => {
      expect(sheet.toString()).to.be(
        'a {\n' +
        '  background: url(test.png) 0 0 no-repeat;\n' +
        '  padding: 20;\n' +
        '  background: linear-gradient(red 0%, green 100%);\n' +
        '  padding: 50;\n' +
        '}'
      )
    })
  })

  describe('expand with many same fallbacks', () => {
    const sheet = jss.createStyleSheet({
      a: {
        background: 'linear-gradient(red 0%, green 100%)',
        fallbacks: [
          {
            background: 'red'
          }, {
            background: {
              color: 'url(test.png)',
              repeat: 'no-repeat',
              position: [0, 0]
            }
          }
        ]
      }
    }, {named: false})

    it('should add rules', () => {
      expect(sheet.getRule('a')).to.not.be(undefined)
    })

    it('should generate correct CSS', () => {
      expect(sheet.toString()).to.be(
        'a {\n' +
        '  background: red;\n' +
        '  background: url(test.png) 0 0 no-repeat;\n' +
        '  background: linear-gradient(red 0%, green 100%);\n' +
        '}'
      )
    })
  })

  describe('integration with jss-camel-case', () => {
    const sheet = jss.createStyleSheet({
      a: {
        transition: {
          timingFunction: 'linear',
          delay: '300ms',
          property: 'opacity',
          duration: '200ms'
        }
      }
    }, {named: false})

    it('should add rules', () => {
      expect(sheet.getRule('a')).to.not.be(undefined)
    })

    it('should generate correct CSS', () => {
      expect(sheet.toString()).to.be(
        'a {\n' +
        '  transition: opacity 200ms linear 300ms;\n' +
        '}'
      )
    })
  })
})
