'use strict';
var BB = require('backbone');

module.exports = BB.Model.extend({
    idAttribute: '_id',

    setDb: function(db) {
        this.db = db;
        return this;
    },

    sync: function(method, model, options) {
        if (this.collection) {
            return this.collection.sync.apply(this, arguments);
        }
        this['_sync_' + method].apply(this, arguments);
    },

    _sync_update: function(method, model, options) {
        var data = options.attrs || model.toJSON(options);
        this.db.put(data);
    },
    _sync_read: function(method, model, options) {
        var id = this.id;

        if (!id) {
            throw new Error('NO_ID');
        }
        this.db.get(id, {

        }, function(err, res) {
            if(err) {
                return options.error(err);
            }
            model.set(res);
            options.success();
        });
    }
});