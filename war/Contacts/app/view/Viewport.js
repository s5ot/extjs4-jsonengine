Ext.define('Contacts.view.Viewport', {
    extend: 'Ext.container.Viewport',

    layout: 'card',

    activeitem: 0,

    initComponent: function() {
        var me = this;

        /*
        Ext.apply(me, {
            items: [
                {xtype: 'contactslist'},
                {xtype: 'contactdetail'},
                {xtype: 'contactform'}
            ]
        });
        */

        this.callParent(arguments);
    },

});
