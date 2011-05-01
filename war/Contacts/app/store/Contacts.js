Ext.define('Contacts.store.Contacts', {
    extend: 'Ext.data.Store',

    model: 'Contact',

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

        reader: 'json'
    },

    autoLoad: true
});
