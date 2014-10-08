"use strict";

var getJSON = require('./getJSON');
var readAttributes = require('./readAttributes');
var createUrl = require('./createUrl');
var buildHTML = require('./buildHTML');
// var generateChart = require('./generateChart');

function init() {
    console.log('initializing');
    readAttributes.bind(this)()
       .then(createUrl)
       .then(getJSON)
       .then(buildHTML.bind(this))
    //   .then(generateChart.bind(this))
      .catch(function (e) {
          console.error(e.message);
      })

};

module.exports = init;
