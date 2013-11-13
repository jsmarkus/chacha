var P = require('./pouchdb');
var ListWidget = require('./list-widget');
var async = require('async');
var ItemCollection = require('./item-collection');
var CollectionAdapter = require('./collection-adapter');

// var trans = new P('transactions');

var db, collAdapter, itemCollection = new ItemCollection();

window.debug = {};
window.debug.col = itemCollection;

var view = new ListWidget();
document.body.appendChild(view.domify());

function showAllObjects() {
    var opts = {
        include_docs: true
    };
    db.allDocs(opts, function(err, res) {
        view.clear();
        res.rows.forEach(function(row) {
            var doc = row.doc;
            console.log(doc);
            view.add(doc);
        });
    });
}


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
                name: 'Book'
            }, {
                type: 'item',
                name: 'Table'
            }]
        }, next);
    },
    function(next) {
        showAllObjects();
    }
], function (err) {
    if(!err) {
        return;
    }
    console.log('Error:', err);
});