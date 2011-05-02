Ext.define('Contacts.model.Contact', {
    extend: 'Ext.data.Model',

    fields: [
        "_docId",
        "givenName",
        "familyName",
        "emails",
        "phoneNumbers",
    ],

    proxy: {
        type: 'rest',

        url: '/_je/myDoc',

        reader: 'json',

        writer: 'json'
    }

});
