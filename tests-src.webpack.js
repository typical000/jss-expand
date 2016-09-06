// Local tests runner config
const context = require.context('./src', true, /\.test\.js$/)
context.keys().forEach(context)