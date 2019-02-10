require('babel-register')({
    presets: [ 'env' ]
})

module.exports = require('./reader.js')