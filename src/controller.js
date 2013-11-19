'use strict';
var B = require('boop');
var events = require('events');
module.exports = B.extend({
    on : events.EventEmitter.prototype.on,
    off : events.EventEmitter.prototype.off,
    addListener : events.EventEmitter.prototype.addListener,
    removeListener : events.EventEmitter.prototype.removeListener,
    emit : events.EventEmitter.prototype.emit,

    initialize: function() {
        this.subscriptions = [];
        this._activeHandlers = [];
        this._started = false;
        this._neverStarted = true;
        this.ready();
    },
    isNeverStarted: function () {
        return this._neverStarted;
    },
    isStarted: function () {
        return this._started;
    },
    ready: function() {
        //Something like that:
        // this.subscriptions.push(['view', 'itemClick', 'onViewItemClick']);
        // this.subscriptions.push(['model', 'reset', 'onModelReset']);
    },
    _subscribe: function () {
        this._unsubscribe();
        var subs = this.subscriptions;
        var handlers = [];
        for (var i = 0; i < subs.length; i++) {
            var sub = subs[i];
            var componentName = sub[0];
            var eventName = sub[1];
            var handlerName = sub[2];
            if(!this[handlerName]) {
                console.warn('Unknown handler:', handlerName);
                return;
            }
            if(!this[componentName] && componentName !== 'this') {
                console.warn('Unknown component:', componentName);
                return;
            }
            var hdl = this[handlerName].bind(this);
            var comp = (componentName === 'this') ? this : this[componentName];
            if(comp.addListener) {
                comp.addListener(eventName, hdl);
            } else if(comp.on) {
                comp.on(eventName, hdl);
            }
            handlers.push([comp, eventName, hdl]);
        }
        this._activeHandlers = handlers;
    },
    _unsubscribe: function () {
        var handlers = this._activeHandlers;
        for (var i = 0; i < handlers.length; i++) {
            var handlerDef = handlers[i];
            var component = handlerDef[0];
            var eventName = handlerDef[1];
            var handler = handlerDef[2];
            if(component.removeListener) {
                component.removeListener(eventName, handler);
                continue;
            }
            if(component.off) {
                component.off(eventName, handler);
                continue;
            }
        }
        this._activeHandlers = [];
    },
    start: function() {
        this._subscribe();
        if(this.isNeverStarted()) {
            this.emit('firstStart');
        }
        this.emit('start');
        this._started = true;
        this._neverStarted = false;
    },
    stop: function() {
        this._unsubscribe();
        this.emit('stop');
        this._started = false;
    }
});