'use strict';
var D = require('dual');

require('dcl-bootstrap');

module.exports = D.Widget.extend({
    ATTRS: {
        name: {}
    },

    initStructure: function() {
        this.$ = D.fromJSON(['form', [
            ['p', [
                ['input', {type:'text', 'ui:asset':'name'}],
            ]],
            ['p', [
                ['input', {type:'submit', 'ui:asset':'submit'}]
            ]]
        ]]);
    },

    applyAttribute_name: function (value) {
        this.assets.name.setProperty('value', value);
    },

    ready: function() {
    }
});