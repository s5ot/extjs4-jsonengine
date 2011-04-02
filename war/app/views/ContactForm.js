Ext.define('app.views.ContactForm', {
    extend: 'Ext.Panel',

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
                items: new app.views.ContactFormPanel()
            }]
        });

        app.views.ContactForm.superclass.initComponent.apply(me, arguments);
    }

});
