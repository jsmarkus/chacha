'use strict';
var Controller = require('./controller');


module.exports = Controller.extend({

    ready: function() {
        this.subscriptions.push(['this', 'firstStart', 'onFirstStart']);
    },

    onFirstStart: function () {
        var self = this;
        this.db.bulkDocs({
            docs: [{
                type: 'item',
                name: 'Alice Passport'
            }, {
                type: 'item',
                name: 'Bob Passport'
            }, {
                type: 'item',
                name: 'Alice Driving License'
            }, {
                type: 'item',
                name: 'Bob Driving License'
            }]
        }, function () {
            self.trigger('ready');
        });
    },

    setDb: function(value) {
        this.db = value;
        return this;
    },
});