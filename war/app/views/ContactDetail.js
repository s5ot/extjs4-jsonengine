Ext.define('app.views.ContactDetail', {
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
                items: Ext.create('Ext.form.FormPanel', {
                    title: '連絡先',

                    width: 400,

                    height: 300,

                    fieldDefaults: {
                        labelWidth: 100,
                        anchor: '100%'
                    },

                    items: [{
                        fieldLabel: '名字',
                        xtype: 'textfield'
                    },
                    {
                        fieldLabel: '名前',
                        xtype: 'textfield'
                    },
                    {
                        fieldLabel: '電話番号',
                        xtype: 'textfield'
                    },
                    {
                        fieldLabel: 'email',
                        xtype: 'textfield'
                    }],

                    buttons: [{
                        text: '編集',
                        handler: function() {
                            Ext.dispatch({
                                controller: app.controllers.contacts,
                                action: 'edit'
                            })
                        }
                    }]
                })
            }]
        });

        app.views.ContactDetail.superclass.initComponent.apply(me, arguments);
    }

});
