Ext.define('Contacts.view.Viewport', {
    extend: 'Ext.container.Viewport',

    layout: 'card',

    activeitem: 0,

    initComponent: function() {
        var me = this;

        this.callParent(arguments);
    }
});
