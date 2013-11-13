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

    // applyAttribute_isEdit: function(value) {
    //     if (value) {
    //         this.assets.name.addClass('hidden');
    //         this.assets.editName.removeClass('hidden');
    //         return;
    //     }
    //     this.assets.editName.addClass('hidden');
    //     this.assets.name.removeClass('hidden');
    // },

    applyAttribute__id: function(value) {
        var href = '#items/' + value;
        this.assets.name.setAttribute('href', href);
    },

    ready: function() {
        // this.assets.editName.listenTo('blur');
        // this.assets.name.listenTo('click');
        // this.assets.name.on('dom.click', function() {
        //     this.setIsEdit(true);
        // }.bind(this));
        // this.assets.editName.on('dom.blur', function() {
        //     this.setIsEdit(false);
        // }.bind(this));

        this.assets.deleteAction.listenTo('click');
        this.assets.deleteAction.on('dom.click', function() {
            var id = this.get_id();
            if (id) {
                this.emit('delete', id);
            }
        }.bind(this));
    }
});