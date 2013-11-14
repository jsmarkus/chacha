'use strict';
var D = require('dual');

module.exports = D.Widget.extend({
    initStructure: function() {
        this.$ = D.fromJSON([
            'div', {
                'ui:asset': 'root'
            }
        ]);
    },

    show: function (child) {
        var container = this.getContainer();
        while (container.children[0]) {
            container.detachChild(container.children[0]);
        }
        container.appendChild(child);
    },

    getContainer: function() {
        return this.assets.root;
    }
});