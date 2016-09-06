// This file for jss main tests runner.
const context = require.context('./lib', true, /\.test\.js$/)
context.keys().forEach(context)