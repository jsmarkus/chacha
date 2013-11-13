var D = require('dual');

require('dcl-bootstrap');

module.exports = D.Widget.extend({
    ATTRS: {
        name: {
            textAsset: 'name'
        },
        isEdit: {
            init: false
        }
    },
    initStructure: function() {
        this.$ = D.fromJSON([
            'li', [
                ['p', [
                    ['strong', ['Name:']],
                    ' ', ['span', {
                        'ui:asset': 'name'
                    }]
                ]]
            ]
        ]);
    },

    applyAttribute_isEdit: function(value) {
        if(value) {
            this.assets.name.addClass('hidden');
            return;
        }
        this.assets.name.removeClass('hidden');
    },

    ready: function() {
        this.assets.name.listenTo('click');
        this.assets.name.on('dom.click', function () {
            this.setIsEdit(true);
        }.bind(this));
    }
});