"use strict";

function createUrl (attributes) {
    return new Promise(function (resolve, reject) {
      if (!!attributes.key && !!attributes.operation) {
        resolve('http://api.fotballdata.no/v1/' + attributes.operation + '/' + attributes.key + (!!attributes.route ? '/' + attributes.route : '') + '.json')
      } else {
        reject(Error('missing key and/or operation attributes'));
      }
  });
};

module.exports = createUrl;
