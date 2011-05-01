Ext.define('Contacts.controller.Contacts', {
    extend: 'Ext.app.Controller',

    requires: [
        'Ext.layout.container.Card',
        'Ext.layout.container.Border',
        'Ext.data.proxy.Rest',
        'Ext.form.field.Hidden'
    ],

    views: [
        'contact.List',
        'contact.Grid',
        'contact.New',
        'contact.Edit',
        'contact.Form'
    ],

    stores: [
        'Contacts'
    ],

    models: [
        'Contact'
    ],

    init: function() {
        this.control({
            'contactgrid > toolbar > button[action=new]': {
                click: function(button) {
                    button.up('viewport').getLayout().setActiveItem(1); 
                }
            },

            'contactgrid > toolbar > button[action=edit]': {
                click: function(button) {
                    var grid = button.up('contactgrid');

                    if (!grid.getSelectionModel().selected.items[0]) {
                        Ext.MessageBox.alert('確認', '編集する行を選択してください');
                        return;
                    }

                    var _docId = grid.getSelectionModel().selected.items[0].data._docId;

                    var form = grid.up('viewport').down('contactedit').down('contactform').getForm();

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
                                console.log('FAILURE!!!');
                                console.log(action);
                            }
                        }
                    });

                    grid.up('viewport').getLayout().setActiveItem(2);
                }
            },

            'contactgrid > toolbar > button[action=destroy]': {
                click: function(button) {
                    var grid = button.up('contactgrid');

                    if (!grid.getSelectionModel().selected.items[0]) {
                        Ext.MessageBox.alert('確認', '削除する行を選択してください');
                        return;
                    }

                    Ext.MessageBox.confirm("確認", "本当に削除しますか?", function(btn) {
                        if (btn == "yes") {
                            console.log(grid.getSelectionModel().selected.items[0]);

                            Ext.Ajax.request({
                                url: '/_je/myDoc/'+ grid.getSelectionModel().selected.items[0].data._docId + '?_method=delete',
                                method: 'POST',
                                success: function(response) {
                                    grid.up('viewport').down('contactgrid').getStore().load();
                                    grid.up('viewport').getLayout().setActiveItem(0); 
                                },
                                failure: function(response) {
                                    console.log(response);
                                    Ext.Msg.alert('Failure!!!');
                                }
                            });
                        } else {
                        }
                    });
                }
            },

            'contactform > toolbar > button[action=save]': {
                click: function(button) {
                    var form = button.up('contactform').getForm();

                    var values = form.getValues();

                    if (values._docId === '') {
                        delete values._docId;
                    }

                    Ext.Ajax.request({
                        url: '/_je/myDoc',

                        params: values,

                        success: function(form, action) {
                            me.up('viewport').down('contactgrid').getStore().load();
                            me.up('viewport').getLayout().setActiveItem(0); 
                        },

                        failure: function(form, action) {
                            if (action.failureType === Ext.form.action.Action.SERVER_INVALID) {
                                //SERVER_INVALIDはJSONレスポンスにsuccessプロパティがないエラーなのでOKとする。
                                console.log(action);
                                me.afterSuccess();
                            } else {
                                console.log('FAILURE!!!');
                                console.log(action);
                            }
                        }
                    });

                    form.reset();
                }
            },

            'contactform > toolbar > button[action=clear]': {
                click: function(button) {
                    button.up('panel').getForm().reset();
                }
            },

            'contactform > toolbar > button[action=back]': {
                click: function(button) {
                    button.up('viewport').getLayout().setActiveItem(0);
                }
            }
        })
    }
});
