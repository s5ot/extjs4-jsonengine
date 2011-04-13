Ext.define('app.views.ContactsList', {

    extend: 'Ext.Panel',

    alias: 'widget.contactslist',

    layout: 'border',

    defaults: {
        border: false
    },

    initComponent: function() {
        var me = this;

        Ext.apply(me, {
            items: [{
                region: 'north',
                height: 50
            },
            {
                region: 'west',
                width: 200
            },
            {
                region: 'south',
                height: 200
            },
            {
                region: 'center',
                items: [
                    {xtype: 'contactslistgridpanel'}
                ]
            }]
            
        });

        app.views.ContactsList.superclass.initComponent.apply(me, arguments);
    }

});
