var BB  = require('backbone');

module.exports = BB.Model.extend({
    idAttribute : '_id',
    sync : function () {
        return this.collection.sync.apply(this, arguments);
    }
});