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
