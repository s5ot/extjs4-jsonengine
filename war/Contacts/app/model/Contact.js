Ext.define('Contacts.model.Contact', {

    extend: 'Ext.data.Model',

    fields: [
        "_docId",
        "givenName",
        "familyName",
        "emails",
        "phoneNumbers",
    ]
});
