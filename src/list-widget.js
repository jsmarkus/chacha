var D = require('dual');
var Li = require('./list-item-widget');

module.exports = D.List.extend({
    setupItem : function () {
        return new Li();
    }
});