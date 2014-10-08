(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var readAttributes = require('lib/readAttributes');
var buildGraph = require('lib/buildGraph');
var resizeElement = require('lib/resizeElement');

document.registerElement('am-graph', {
    prototype: Object.create( HTMLElement.prototype, {
        createdCallback : {
            value: function () {
                // console.log('this in createdCallback points to', this);
                this.innerHTML = 'Just hanging around';
                
                readAttributes.bind(this)()
                    .then(resizeElement.bind(this));
            }
        },
        attachedCallback : {
            value: function () {
                // console.log('this in attachedCallback points to', this);
            }
        },
        attributeChangedCallback : {
            value: function (attribute, oldValue, newValue) {
                if (attribute === 'key') {
                    buildGraph.bind(this)();
                };
                if (attribute === 'width' || attribute === 'height') {
                    readAttributes.bind(this)().then(resizeElement.bind(this));
                }
            }
        }
    })
});

},{"lib/buildGraph":2,"lib/readAttributes":6,"lib/resizeElement":7}],2:[function(require,module,exports){
"use strict";

var getJSON = require('lib/getJSON');
var readAttributes = require('lib/readAttributes');
var createUrl = require('lib/createUrl');
var generateChart = require('lib/generateChart');

function buildGraph() {

    readAttributes.bind(this)()
      .then(createUrl)
      .then(getJSON)
      .then(generateChart.bind(this))
      .catch(function (e) {
          console.error(e.message);
      })

};

module.exports = buildGraph;

},{"lib/createUrl":3,"lib/generateChart":4,"lib/getJSON":5,"lib/readAttributes":6}],3:[function(require,module,exports){
"use strict";

function createUrl (attributes) {
    return new Promise(function (resolve, reject) {
      if (!!attributes.key && !!attributes.serverpath) {
        resolve('http://' + attributes.serverpath + '/get/' + attributes.key);
      } else {
        reject(Error('missing key and/or serverpath attributes'));
      }
  });
};

module.exports = createUrl;

},{}],4:[function(require,module,exports){
"use strict";

var readAttributes = require('lib/readAttributes');

function generateChart(data) {

    return readAttributes.bind(this)()
        .then(function(attributes) {

            return c3.generate({
                bindto: this,
                data: {
                    x: data.data[0][0],
                    columns: data.data,
                    type: attributes.type || 'line'
                },
                legend: {
                    position: attributes['legend-position'] || 'bottom'
                }
            });
        }.bind(this)
    );
};

module.exports = generateChart;

},{"lib/readAttributes":6}],5:[function(require,module,exports){
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

},{}],6:[function(require,module,exports){
"use strict";

function readAttributes() {

    var elementAttributes = this.attributes;

    console.log('attributes', elementAttributes);

    return new Promise(function (resolve, reject) {
      if (!!elementAttributes) {

          var attributes = {};

          [].slice.call(elementAttributes).forEach(function (attribute) {
              attributes[attribute.name] = attribute.value;
          });

        resolve(attributes);

      } else {
        reject(Error('element has no attributes'));
      }
    });
};

module.exports = readAttributes;

},{}],7:[function(require,module,exports){
"use strict";

function resizeElement(attributes) {
    if (!!attributes.width) {
        this.style.width = attributes.width + 'px';
    };
    if (!!attributes.height) {
        this.style.height = attributes.height + 'px';
    }
};

module.exports = resizeElement;

},{}]},{},[1]);
