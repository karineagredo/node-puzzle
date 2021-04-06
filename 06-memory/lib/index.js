const fs = require('fs');
const es = require('event-stream');

(function () {
  exports.countryIpCounter = function (countryCode, cb) {
    if (!countryCode) {
      return cb();
    }
    var totalIPsRegion = 0;
    fs.createReadStream(__dirname + '/../data/geo.txt', { encoding: 'utf8' })
      .pipe(es.split())
      .pipe(
        es.mapSync(function (line) {
          const lineDetails = line.split('\t');
          if (lineDetails[3] === countryCode) {
            totalIPsRegion += +lineDetails[1] - +lineDetails[0];
          }
        })
      )
      .on('error', function (err) {
        return cb();
      })
      .on('end', function () {
        return cb(null, totalIPsRegion);
      });
  };
}.call(this));
