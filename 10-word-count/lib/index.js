const { Transform } = require('stream');
const inherits = require('util').inherits;

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
