var D = require('dual');
var Li = require('./list-item-widget');

module.exports = D.List.extend({
    setupItem : function () {
        var item = new Li();
        item.on('delete', this._onItemDelete.bind(this));
        return item;
    },

    _onItemDelete : function (id) {
        this.emit('delete', id);
    }
});