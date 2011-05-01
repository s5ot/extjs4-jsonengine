Ext.define('Contacts.view.contact.Detail', {

    extend: 'Ext.Panel',

    alias: 'widget.contactdetail',

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
                    {xtype: 'contactformpanel'}
                ]
            }]
        });

        this.callParent(arguments);
    }
});
