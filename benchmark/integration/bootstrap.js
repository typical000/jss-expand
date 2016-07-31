import jss from 'jss'
import jssExpand from './../../src'
import styles from '../fixtures/bootstrap.json'

suite('Bootstrap unnamed JSS test', () => {
  benchmark('Pure JSS', () => {
    jss.createStyleSheet(styles, {named: false}).toString()
  })

  benchmark('JSS + Plugin', () => {
    jss.use(jssExpand())
    jss.createStyleSheet(styles, {named: false}).toString()
  })
})