Ext.define('Contacts.view.contact.Form', {
    extend: 'Ext.form.Panel',

    alias: 'widget.contactform',

    title: '連絡先',

    url: '/_je/myDoc',

    width: 400,

    height: 300,

    initComponent: function() {
        var me = this;

        Ext.apply(me, {

            fieldDefaults: {
                padding: '10 0 0 5',
                labelWidth: 100,
                anchor: '100%'
            },

            items: [{
                fieldLabel: '名字',
                xtype: 'textfield',
                name: 'familyName'
            },
            {
                fieldLabel: '名前',
                xtype: 'textfield',
                name: 'givenName'
            },
            {
                fieldLabel: '電話番号',
                xtype: 'textfield',
                name: 'phoneNumbers'
            },
            {
                fieldLabel: 'email',
                xtype: 'textfield',
                name: 'emails'
            },
            {
                xtype: 'hidden',
                name: '_docId',
                value: ''
            }],

            buttons: [{
                text: '保存',

                action: 'save'
            },
            {
                text: 'クリア',

                action: 'clear'
            },
            {
                text: '戻る',

                action: 'back'
            }]
        });

        this.callParent(arguments);
    }
});
