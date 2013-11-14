'use strict';
var Feature = require('./feature');
var DualBackboneCollectionAdapter = require('dual/lib/adapter/BackboneCollection');


module.exports = Feature.extend({

    ready: function() {
        this.subscriptions.push(['view', 'delete', 'onViewDelete']);
        this.subscriptions.push(['this', 'start', 'onStart']);
        this.subscriptions.push(['this', 'firstStart', 'onFirstStart']);
    },

    onFirstStart: function () {
        new DualBackboneCollectionAdapter(this.collection, this.view);
    },

    onStart: function () {
        this.region.show(this.view);
    },

    onViewDelete: function(id) {
        this.collection.get(id).destroy({
            wait: true
        });
    },

    setRegion: function(value) {
        this.region = value;
        return this;
    },
    setCollection: function(value) {
        this.collection = value;
        return this;
    },
    setView: function(value) {
        this.view = value;
        return this;
    }
});