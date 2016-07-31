import jss from 'jss'
import jssExpand from '../../src'
import stylesWithoutPlugin from '../fixtures/sheet-without-plugin.json'
import stylesWithPlugin from '../fixtures/sheet-with-plugin.json'

suite('General test with DIFFERENT sheets', () => {
  benchmark('Pure JSS', () => {
    jss.createStyleSheet(stylesWithoutPlugin).toString()
  })

  benchmark('JSS + Plugin', () => {
    jss.use(jssExpand())
    jss.createStyleSheet(stylesWithPlugin).toString()
  })
})

suite('General test with SAME sheet)', () => {
  benchmark('Pure JSS', () => {
    jss.createStyleSheet(stylesWithoutPlugin).toString()
  })

  benchmark('JSS + Plugin', () => {
    jss.use(jssExpand())
    jss.createStyleSheet(stylesWithoutPlugin).toString()
  })
})
