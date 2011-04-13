Ext.define('app.views.ContactFormPanel', {
    extend: 'Ext.form.FormPanel',

    alias: 'widget.contactformpanel',

    title: '連絡先',

    width: 400,

    height: 300,

    url: '/_je/myDoc',

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
                handler: function() {
                    var form = this.up('panel').getForm();
                    var values = form.getValues();
                    if (values._docId === '') {
                        delete values._docId;
                    }

                    Ext.Ajax.request({
                        url: '/_je/myDoc',
                        params: values,
                        success: function(form, action) {
                            me.afterSuccess();
                        },
                        failure: function(form, action) {
                            if (action.failureType === Ext.form.action.Action.SERVER_INVALID) {
                                //SERVER_INVALIDはJSONレスポンスにsuccessプロパティがないエラーなのでOKとする。
                                console.log(action);
                                me.afterSuccess();
                            } else {
                                console.log(action);
                                Ext.Msg.alert('failed', action.result.msg);
                            }
                        }
                    });

                    form.reset();
                }
            },
            {
                text: 'クリア',
                handler: function() {
                    this.up('panel').getForm().reset();
                }
            },
            {
                text: '戻る',
                handler: function() {
                    me.afterSuccess();
                }
            }]
        });

        app.views.ContactFormPanel.superclass.initComponent.apply(me, arguments);
    },

    afterSuccess: function() {
        this.getForm().reset();
        Ext.dispatch({
            controller: app.controllers.contacts,
            action: 'index'
        })
    }
});
