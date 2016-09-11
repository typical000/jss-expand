// This file for jss main tests runner.
var context = require.context('./lib', true, /\.test\.js$/)
context.keys().forEach(context)
