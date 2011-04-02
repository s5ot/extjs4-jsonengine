app.models.Contact = Ext.regModel("app.models.Contact", {
    fields: [
        {name: "_docId", type: "string" },
        {name: "givenName", type: "string" },
        {name: "familyName", type: "string" },
        {name: "emails", type: "auto" },
        {name: "phoneNumbers", type: "auto" }
    ]
});
