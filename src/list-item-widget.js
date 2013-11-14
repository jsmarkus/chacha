var D = require('dual');

require('dcl-bootstrap');

module.exports = D.Widget.extend({
    ATTRS: {
        name: {
            textAsset: 'name',
            htmlAttribute: 'value',
            htmlAttributeAsset: 'editName'
        },
        isEdit: {
            init: false
        },
        _id: {}
    },
    initStructure: function() {
        this.$ = D.fromJSON([
            'div', {
                'class': 'col-md-2'
            },
            [
                ['p', [
                    ['a', {
                        'ui:asset': 'name'
                    }],
                    ['input', {
                        type: 'text',
                        class: 'hidden',
                        'ui:asset': 'editName'
                    }],
                    ' ', ['a', {
                            'ui:asset': 'deleteAction',
                            'href': 'javascript:void(0)'
                        },
                        ['delete']
                    ]
                ]]
            ]
        ]);
    },

    applyAttribute__id: function(value) {
        var href = '#items/' + value;
        this.assets.name.setAttribute('href', href);
    },

    ready: function() {
        this.assets.deleteAction.listenTo('click');
        this.assets.deleteAction.on('dom.click', function() {
            var id = this.get_id();
            if (id) {
                this.emit('delete', id);
            }
        }.bind(this));
    }
});