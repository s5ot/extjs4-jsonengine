Ext.define('Contacts.view.contact.List', {
    extend: 'Ext.Panel',

    alias: 'widget.contactlist',

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
                    {xtype: 'contactgrid'}
                ]
            }]
            
        });

        this.callParent(arguments);
    }

});
