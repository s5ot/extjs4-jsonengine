Ext.define('app.views.ContactListGridPanel', {

    extend: 'Ext.grid.GridPanel',

    alias: 'widget.contactslistgridpanel',

    width: 400,

    height: 300,

    title: '連絡先一覧',

    initComponent: function() {
        me = this;

        Ext.apply(me, {
            store: Ext.create('Ext.data.Store', {
                model: 'app.models.Contact',

                proxy: {
                    type: 'rest',
                    
                    url: '/_je/myDoc',

                    reader: 'json'
                },

                autoLoad: true
            }),

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

                iconCls: 'silk-add',

                handler: function() {
                    Ext.dispatch({
                        controller: app.controllers.contacts,
                        action: 'new'
                    })
                },

                scope: me

            }, '-', {
                text: '編集',

                iconCls: 'silk-edit',

                handler: function() {
                    console.log(me.getSelectionModel().selected.items[0]);
                    if (!me.getSelectionModel().selected.items[0]) {
                        Ext.MessageBox.alert('確認', '編集する行を選択してください');
                        return;
                    }
                    Ext.dispatch({
                        controller: app.controllers.contacts,
                        action: 'edit',
                        _docId: me.getSelectionModel().selected.items[0].data._docId
                    })
                },

                scope: me

            }, '-', {
                text: '削除',

                iconCls: 'silk-delete',

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
                                    app.fireEvent('loadcontactslist');
                                },
                                failure: function(response) {
                                    console.log(response);
                                    Ext.Msg.alert('Failure!!!');
                                }
                            });
                        } else {
                        }
                    });
                },

                scope: me
            }]
        });

        app.views.ContactListGridPanel.superclass.initComponent.apply(me, arguments);

        app.on('loadcontactslist', function() {
            me.store.load();
        }, me);
    },
});            
