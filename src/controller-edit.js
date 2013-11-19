'use strict';
var Controller = require('./controller');
// var DualBackboneCollectionAdapter = require('dual/lib/adapter/BackboneCollection');


module.exports = Controller.extend({

    ready: function() {
        // this.subscriptions.push(['view', 'delete', 'onViewDelete']);
        this.subscriptions.push(['this', 'start', 'onStart']);
        this.subscriptions.push(['this', 'edit', 'onEdit']);
        // this.subscriptions.push(['this', 'firstStart', 'onFirstStart']);
    },

    onFirstStart: function () {
        
    },

    onEdit: function (id) {
        console.log('trying to edit id:', id);
    },

    onStart: function () {
        this.region.show(this.view);
    },

    setRegion: function(value) {
        this.region = value;
        return this;
    },
    setView: function(value) {
        this.view = value;
        return this;
    },
    setId: function(value) {
        this.emit('edit', value);
        return this;
    }
});