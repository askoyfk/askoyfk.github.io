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
