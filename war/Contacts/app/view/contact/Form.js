Ext.define('Contacts.view.contact.Form', {

    extend: 'Ext.Panel',

    alias: 'widget.contactform',

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
    },

    onLoadContact: function(_docId) {
        var form = this.items.items[3].items.items[0].getForm();

        form.load({
            url: '/_je/myDoc/'+_docId,

            success: function() {
                console.log('success');
            },

            failure: function(form, action) {
                if (action.failureType === Ext.form.action.Action.LOAD_FAILURE) {
                    //LOAD_FAILUREはJSONレスポンスにsuccessプロパティがないエラーなのでOKとする。
                    form.setValues(action.result);
                    form.url = '/_je/myDoc'+_docId+'?_method=put'
                } else {
                    console.log('failure');
                    console.log(action);
                }
            }
        });
    }
});
