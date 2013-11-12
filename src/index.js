var P = require('./pouchdb');
var async = require('async');

// var trans = new P('transactions');

var db;

async.series([
    function(next) {
        P.destroy('transactions', next);
    },
    function(next) {
        db = new P('transactions');
        next();
    },
    function(next) {
        db.bulkDocs({
            docs: [{
                _id: '234324',
                from: '12',
                to: '500',
                quantity: 78,
                obj: 'pens'
            },{
                _id: '234325',
                from: '500',
                to: '17',
                quantity: 5,
                obj: 'pens'
            }]
        }, next);
    },
    function (next) {
        // db.replicate.to('_https://jsman.iriscouch.com/transactions/', {
        db.replicate.to('http://127.0.0.1:5984/transactions/', {
            onComplete : function () {
                console.log('complete', arguments);
                next();
            }
        });
    }
], function(err) {
    if (err) {
        console.log('error:', err);
        return;
    }
    console.log('ok');
});

// trans.put({
//     _id : '346329462934',
//     obj : 'doc111',
//     src : 'store',
//     dst : 'mark',
//     quantity : 234
// });