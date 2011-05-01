Ext.define('Contacts.view.contact.Grid', {

    extend: 'Ext.grid.Panel',

    alias: 'widget.contactgrid',

    store: 'Contacts',

    width: 400,

    height: 300,

    title: '連絡先一覧',

    initComponent: function() {
        me = this;

        Ext.apply(me, {
            columnLines: true,

            columns: [{
                text: '名字',

                flex: 1,

                dataIndex: 'familyName'
            }, 
            {
                text: '名前',

                flex: 1,

                dataIndex: 'givenName'
            },
            {
                text: '電話番号',

                flex: 1,

                dataIndex: 'phoneNumbers'
            },
            {
                text: 'email',

                flex: 1,

                dataIndex: 'emails'
            }],

            tbar: [{
                text: '追加',

                action: 'new',

                iconCls: 'silk-add',

                scope: me,

                handler: function() {
                    me.up('viewport').getLayout().setActiveItem(2); 
                }

            }, '-', {
                text: '編集',

                action: 'edit',

                iconCls: 'silk-edit',

                scope: me,

                handler: function() {
                    console.log(me.getSelectionModel().selected.items[0]);

                    if (!me.getSelectionModel().selected.items[0]) {
                        Ext.MessageBox.alert('確認', '編集する行を選択してください');
                        return;
                    }

                    var _docId = me.getSelectionModel().selected.items[0].data._docId;

                    var form = me.up('viewport').down('contactformpanel').getForm();

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

                    me.up('viewport').getLayout().setActiveItem(1);
                }

            }, '-', {
                text: '削除',

                action: 'destroy',

                iconCls: 'silk-delete',

                scope: me,

                handler: function() {
                    if (!me.getSelectionModel().selected.items[0]) {
                        Ext.MessageBox.alert('確認', '削除する行を選択してください');
                        return;
                    }

                    Ext.MessageBox.confirm("確認", "本当に削除しますか?", function(btn) {
                        if (btn == "yes") {
                            console.log(me.getSelectionModel().selected.items[0]);

                            Ext.Ajax.request({
                                url: '/_je/myDoc/'+ me.getSelectionModel().selected.items[0].data._docId + '?_method=delete',
                                method: 'POST',
                                success: function(response) {
                                    me.up('viewport').down('contactgrid').getStore().load();
                                    me.up('viewport').getLayout().setActiveItem(0); 
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
            }]
        });

        this.callParent(arguments);
    }
});            
