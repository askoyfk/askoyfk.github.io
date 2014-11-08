"use strict";

var matches = require('../templates/matches.hbs');
var formatDate = require('../helpers/formatData');

function buildHTML(data) {
    this.innerHTML = matches(data.Matches);
};

module.exports = buildHTML;
