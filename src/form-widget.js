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
                ['button', {'ui:asset':'submit'}]
            ]]
        ]]);
    },

    applyAttribute_name: function (value) {
        this.assets.name.setProperty('value', value);
    },

    serialize: function() {
        return {
            _id : this.getAttribute('_id'),
            name : this.assets.name.getProperty('value')
        };
    },

    ready: function() {
        this.assets.submit.listenTo('click');
        this.assets.submit.on('dom.click', function (e) {
            e.preventDefault();
            var data = this.serialize();
            this.emit('submit', data);
        }.bind(this));
    }
});