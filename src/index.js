'use strict';
var D = require('dual');
var BB = require('backbone');
var $ = require('br-jquery');
var P = require('./pouchdb');
var ListWidget = require('./list-widget');
var FormWidget = require('./form-widget');
var Region = require('./region');
var async = require('async');
var ItemCollection = require('./item-collection');
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



var FeatureEdit = require('./feature-edit');
var featureEdit = new FeatureEdit();
featureEdit
    .setRegion(regions.main)
    .setView(new FormWidget())
    .start();


var FeatureList = require('./feature-list');
var featureList = new FeatureList();
featureList
    .setRegion(regions.main)
    .setView(new ListWidget())
    .setCollection(itemCollection)
    .start();

var FeatureFakeData = require('./feature-fake-data');
var featureFakeData = new FeatureFakeData();



P.destroy('transactions', function () {
    db = new P('transactions');
    collAdapter = new CollectionAdapter(db, itemCollection);
    featureFakeData.setDb(db).start();
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
    featureEdit.start();
    featureEdit.setId(id);
});

router.on('route:itemList', function() {
    featureList.start();
});

BB.history.start();

document.body.appendChild(layoutView.domify());