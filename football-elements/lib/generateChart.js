"use strict";

var readAttributes = require('./readAttributes');

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
