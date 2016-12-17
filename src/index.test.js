import expect from 'expect.js'
import expand from './index'
import {create} from 'jss'

const settings = {
  generateClassName: (str, rule) => `${rule.name}-id`
}

describe('jss-expand', () => {
  let jss

  beforeEach(() => {
    jss = create(settings).use(expand())
  })

  describe('space-separated values as arrays', () => {
    let sheet

    beforeEach(() => {
      sheet = jss.createStyleSheet({
        a: {
          padding: [20, 10],
          'background-size': [10, 'auto'],
          'border-radius': [10, 15, 20, 20],
        }
      })
    })

    it('should add rules', () => {
      expect(sheet.getRule('a')).to.not.be(undefined)
    })

    it('should generate correct CSS', () => {
      expect(sheet.toString()).to.be(
        '.a-id {\n' +
        '  padding: 20 10;\n' +
        '  background-size: 10 auto;\n' +
        '  border-radius: 10 15 20 20;\n' +
        '}'
      )
    })
  })

  describe('comma-separated values as arrays (using double arrays)', () => {
    let sheet

    beforeEach(() => {
      sheet = jss.createStyleSheet({
        a: {
          transition: [['opacity', 1, 'linear'], ['transform', 300, 'ease']]
        }
      })
    })

    it('should add rules', () => {
      expect(sheet.getRule('a')).to.not.be(undefined)
    })

    it('should generate correct CSS', () => {
      expect(sheet.toString()).to.be(
        '.a-id {\n' +
        '  transition: opacity 1 linear, transform 300 ease;\n' +
        '}'
      )
    })
  })

  describe('simple expanded rules', () => {
    let sheet

    beforeEach(() => {
      sheet = jss.createStyleSheet({
        a: {
          border: {
            width: 1,
            style: 'solid',
            color: '#f00'
          }
        }
      })
    })

    it('should add rules', () => {
      expect(sheet.getRule('a')).to.not.be(undefined)
    })

    it('should generate correct CSS', () => {
      expect(sheet.toString()).to.be(
        '.a-id {\n' +
        '  border: 1 solid #f00;\n' +
        '}'
      )
    })
  })

  describe('expanded rules as an object (without some styles)', () => {
    let sheet

    beforeEach(() => {
      sheet = jss.createStyleSheet({
        a: {
          background: {
            color: '#000',
            image: 'url(test.jpg)',
            position: [[0, 0]],
            repeat: 'no-repeat'
          }
        }
      })
    })

    it('should add rules', () => {
      expect(sheet.getRule('a')).to.not.be(undefined)
    })

    it('should generate correct CSS', () => {
      expect(sheet.toString()).to.be(
        '.a-id {\n' +
        '  background: #000 url(test.jpg) 0 0 no-repeat;\n' +
        '}'
      )
    })
  })

  describe('array of arrays', () => {
    let sheet

    beforeEach(() => {
      sheet = jss.createStyleSheet({
        a: {
          transition: [
            ['opacity', '200ms'],
            ['width', '300ms']
          ]
        }
      })
    })

    it('should add rules', () => {
      expect(sheet.getRule('a')).to.not.be(undefined)
    })

    it('should generate correct CSS', () => {
      expect(sheet.toString()).to.be(
        '.a-id {\n' +
        '  transition: opacity 200ms, width 300ms;\n' +
        '}'
      )
    })
  })

  describe('expand with fallbacks', () => {
    let sheet

    beforeEach(() => {
      sheet = jss.createStyleSheet({
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
      })
    })

    it('should add rules', () => {
      expect(sheet.getRule('a')).to.not.be(undefined)
    })

    it('should generate correct CSS', () => {
      expect(sheet.toString()).to.be(
        '.a-id {\n' +
        '  background: url(test.png) 0 0 no-repeat;\n' +
        '  padding: 20;\n' +
        '  background: linear-gradient(red 0%, green 100%);\n' +
        '  padding: 50;\n' +
        '}'
      )
    })
  })

  describe('expand with multiple fallbacks for the same prop', () => {
    let sheet

    beforeEach(() => {
      sheet = jss.createStyleSheet({
        a: {
          background: 'linear-gradient(red 0%, green 100%)',
          fallbacks: [
            {
              background: 'red'
            },
            {
              background: {
                color: 'url(test.png)',
                repeat: 'no-repeat',
                position: [0, 0]
              }
            }
          ]
        }
      })
    })

    it('should add rules', () => {
      expect(sheet.getRule('a')).to.not.be(undefined)
    })

    it('should generate correct CSS', () => {
      expect(sheet.toString()).to.be(
        '.a-id {\n' +
        '  background: red;\n' +
        '  background: url(test.png) 0 0 no-repeat;\n' +
        '  background: linear-gradient(red 0%, green 100%);\n' +
        '}'
      )
    })
  })

  describe('integration with jss-camel-case', () => {
    let sheet

    beforeEach(() => {
      sheet = jss.createStyleSheet({
        a: {
          transition: {
            timingFunction: 'linear',
            delay: '300ms',
            property: 'opacity',
            duration: '200ms'
          }
        }
      })
    })

    it('should add rules', () => {
      expect(sheet.getRule('a')).to.not.be(undefined)
    })

    it('should generate correct CSS', () => {
      expect(sheet.toString()).to.be(
        '.a-id {\n' +
        '  transition: opacity 200ms linear 300ms;\n' +
        '}'
      )
    })
  })

  describe('non-standart properties support', () => {
    let sheet

    beforeEach(() => {
      sheet = jss.createStyleSheet({
        a: {
          border: {
            width: '2px',
            style: 'solid',
            color: 'black',
            radius: ['5px', '10px']
          }
        }
      })
    })

    it('should add rules', () => {
      expect(sheet.getRule('a')).to.not.be(undefined)
    })

    it('should generate correct CSS', () => {
      expect(sheet.toString()).to.be(
        '.a-id {\n' +
        '  border: 2px solid black;\n' +
        '  border-radius: 5px 10px;\n' +
        '}'
      )
    })
  })

  describe('non-standart properties should not overwrite standart properties notation', () => {
    let sheet

    beforeEach(() => {
      sheet = jss.createStyleSheet({
        a: {
          border: {
            radius: ['5px', '10px']
          },
          'border-radius': '10px'
        }
      })
    })

    it('should add rules', () => {
      expect(sheet.getRule('a')).to.not.be(undefined)
    })

    it('should generate correct CSS', () => {
      expect(sheet.toString()).to.be(
        '.a-id {\n' +
        '  border-radius: 10px;\n' +
        '}'
      )
    })
  })
})
