const { Transform } = require('stream');
const inherits = require('util').inherits;

// This is the initial approach to the challenge.
// The regex 'regExp' filters all special characters and returns the transformed words which is undesirable
// The file Approach2.js is the second attempt to solve the challenge
function WordCounter() {
  Transform.call(this, { objectMode: true });
}
var lines = 0;
var words = 0;
var regExp = /(")([^"]*(")+)|(\w+)/g;
inherits(WordCounter, Transform);

WordCounter.prototype._transform = function (chunk, enc, next) {
  lines = chunk.toString().split(/\r?\n/).length;
  words = chunk.toString().match(regExp).length;
  next();
};

WordCounter.prototype._flush = function (cb) {
  this.push({ words, lines });
  cb();
};

module.exports = WordCounter;
