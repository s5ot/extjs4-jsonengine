Ext.define('app.views.ContactsList', {

    extend: 'Ext.Panel',

    layout: 'border',

    defaults: {
        border: false
    },

    initComponent: function() {
        var me = this;

        Ext.apply(app.views, {
            contactsListGridPanel: new app.views.ContactListGridPanel()
        });

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
                    app.views.contactsListGridPanel
                ]
            }]
            
        });

        app.views.ContactsList.superclass.initComponent.apply(me, arguments);
    }

});
