var P = require('./pouchdb');
var ListWidget = require('./list-widget');
var async = require('async');
var ItemCollection = require('./item-collection');
var CollectionAdapter = require('./collection-adapter');
var DualBackboneCollectionAdapter = require('dual/lib/adapter/BackboneCollection');

// var trans = new P('transactions');

var db,
    collAdapter,
    itemCollection = new ItemCollection(),
    listView = new ListWidget(),
    listAdapter = new DualBackboneCollectionAdapter(itemCollection, listView);

listView.on('delete', function (id) {
    itemCollection.get(id).destroy({wait:true});
});

window.debug = {};
window.debug.col = itemCollection;

document.body.appendChild(listView.domify());

async.series([
    function(next) {
        P.destroy('transactions', next)
    },
    function(next) {
        db = new P('transactions');
        collAdapter = new CollectionAdapter(db, itemCollection);
        db.info(next);
    },
    function(next) {
        db.bulkDocs({
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
        }, next);
    }
], function(err) {
    if (!err) {
        return;
    }
    console.log('Error:', err);
});