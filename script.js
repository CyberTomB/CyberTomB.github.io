console.log('hello')
var fs = require('fs');
var files = fs.readdirSync('/assets/photos/');
console.log(files)