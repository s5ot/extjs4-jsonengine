Ext.application({
    name: 'Contacts',

    appFolder: 'app',

    controllers: [
        'Contacts'
    ],

    launch: function() {
        Ext.create('Ext.container.Viewport', {

            layout: 'card',

            items: [
                { xtype: 'contactlist' },
                { xtype: 'contactnew' },
                { xtype: 'contactedit' }
            ]
        });
    }
});
