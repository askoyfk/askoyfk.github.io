"use strict";

var readAttributes = require('./readAttributes');
var init = require('./init');
// var resizeElement = require('./resizeElement');

document.registerElement('football-panel', {
    prototype: Object.create( HTMLElement.prototype, {
        createdCallback : {
            value: function () {
                //console.log('this in createdCallback points to', this);
                this.innerHTML = 'Laster inn fotballdata…';

                // readAttributes.bind(this)()
                //     .then(resizeElement.bind(this));
            }
        },
        attachedCallback : {
            value: function () {
                //console.log('this in attachedCallback points to', this);
                init.bind(this)();
            }
        },
        attributeChangedCallback : {
            value: function (attribute, oldValue, newValue) {
                if (attribute === 'key') {
                    init.bind(this)();
                }
            }
        }
    })
});
