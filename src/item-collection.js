var BB  = require('backbone');
var Model  = require('./item-model');

module.exports = BB.Collection.extend({
    model : Model
});