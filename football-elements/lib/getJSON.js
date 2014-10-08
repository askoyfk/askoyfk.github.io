"use strict";

function getJSON(url) {
    return new Promise(function (resolve, reject) {
        var req = new XMLHttpRequest();
        req.open('GET', url);

        req.onload = function() {
            if (req.status === 200) {
                resolve(req.response);
            } else {
                reject(Error(req.statusText));
            }
        }

      //   req.onprogress = function(event) {
      //       console.log('progress:', event);
      //   }

        req.onerror = function() {
            reject(Error('Network error'));
        }

        req.send();
    }).then(JSON.parse)
};

module.exports = getJSON;
