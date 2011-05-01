Ext.define('Contacts.view.contact.Edit', {
    extend: 'Ext.Panel',

    alias: 'widget.contactedit',

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
                    {xtype: 'contactform'}
                ]
            }]
        });

        this.callParent(arguments);
    }
});
