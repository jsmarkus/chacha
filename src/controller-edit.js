'use strict';
var Controller = require('./controller');
var DualBackboneModelAdapter = require('dual/lib/adapter/BackboneModel');


module.exports = Controller.extend({

    ready: function() {
        // this.subscriptions.push(['view', 'delete', 'onViewDelete']);
        this.subscriptions.push(['this', 'start', 'onStart']);
        this.subscriptions.push(['this', 'edit', 'onEdit']);
        this.subscriptions.push(['model', 'change', 'onModelChange']);
        this.subscriptions.push(['view', 'submit', 'onViewSubmit']);
        this.subscriptions.push(['this', 'firstStart', 'onFirstStart']);
    },

    onViewSubmit: function (data) {
        this.model.save(data);
    },

    onModelChange: function () {
        console.log('MODEL CHANGE', arguments);
    },

    onFirstStart: function () {
        new DualBackboneModelAdapter(this.model, this.view);
    },

    onEdit: function (id) {
        console.log('trying to edit id:', id);
        this.model.clear();
        this.model.set({_id:id});
        this.model.fetch();
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

    setModel: function(value) {
        this.model = value;
        return this;
    },

    setId: function(value) {
        this.emit('edit', value);
        return this;
    }
});