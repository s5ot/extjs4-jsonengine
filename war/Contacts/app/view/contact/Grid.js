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

                iconCls: 'silk-add'

            }, '-', {
                text: '編集',

                action: 'edit',

                iconCls: 'silk-edit'

            }, '-', {
                text: '削除',

                action: 'destroy',

                iconCls: 'silk-delete'
            }]
        });

        this.callParent(arguments);
    }
});            
