'use strict';
var D = require('dual');
var BB = require('backbone');
var $ = require('br-jquery');
var P = require('./pouchdb');
var ListWidget = require('./list-widget');
var FormWidget = require('./form-widget');
var Region = require('./region');
// var async = require('async');
var ItemCollection = require('./item-collection');
var ItemModel = require('./item-model');
var CollectionAdapter = require('./collection-adapter');
BB.$ = $;


var layoutView = D.fromJSON(['div', {
        'class': 'well'
    },
    [
        ['Region', {
            'region': 'main'
        }]
    ]
], {
    'Region': Region
});
// var assets = D.utils.indexBy(layoutView, false, 'ui:asset');
var regions = D.utils.indexBy(layoutView, false, 'region');

// regions.main.show(listView);



var db,
    collAdapter,
    itemCollection = new ItemCollection();



var ControllerEdit = require('./controller-edit');
var ctrEdit = new ControllerEdit();
ctrEdit
    .setRegion(regions.main)
    .setView(new FormWidget())
    .setModel(new ItemModel())
    .start();


var ControllerList = require('./controller-list');
var ctrList = new ControllerList();
ctrList
    .setRegion(regions.main)
    .setView(new ListWidget())
    .setCollection(itemCollection)
    .start();

var ControllerFakeData = require('./controller-fake-data');
var ctrFakeData = new ControllerFakeData();


ctrFakeData.on('ready', function() {
    BB.history.start();
});



P.destroy('transactions', function() {
    db = new P('transactions');
    collAdapter = new CollectionAdapter(db, itemCollection);
    ctrFakeData.setDb(db).start();
    ctrEdit.model.setDb(db);
});


var Router = BB.Router.extend({
    routes: {
        'items/:id': 'itemDetails',
        'items': 'itemList',
        '': 'itemList'
    }
});

var router = new Router();

router.on('all', function() {
    console.log('route', arguments);
});

router.on('route:itemDetails', function(id) {
    ctrEdit.start();
    ctrEdit.setId(id);
});

router.on('route:itemList', function() {
    ctrList.start();
});


document.body.appendChild(layoutView.domify());