var boop = require('boop');

module.exports = boop.extend({
    initialize: function(pDb, bbCollection) {
        this._db = pDb;
        this._coll = bbCollection;
        this._bind();
    },

    _bind: function() {
        this._db.changes({
            continuous: true,
            include_docs: true,
            onChange: this._onPouchChange.bind(this)
        });

        this._coll.on('all', this._onCollAll.bind(this))

        this._addSync();
    },

    _addSync : function () {
        var self = this;
        this._coll.sync = function (method, collection, options) {
            // console.log('sync:', method, collection, options);
            self['_sync_' + method].apply(self, arguments);
        }
    },

    _sync_delete: function(method, model, options) {
        var _db = this._db;
        if(model.id) {
            _db.get(model.id, function (err, doc) {
                if(!err) {
                    _db.remove(doc);
                }
            });
        }
    },

    _onPouchChange: function(change) {
        console.log('change:', change);
        if(change.deleted) {
            console.log('removing');
            var model = this._coll.get(change.id);
            if(model) {
                this._coll.remove(model);
            }
            return;
        }
        console.log('changing');
        this._coll.add([change.doc], {
            merge: true
        });
    },

    _onCollAll: function() {
        console.log('collection event:', arguments);
    }
});