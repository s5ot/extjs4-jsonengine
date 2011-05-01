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
        'contact.Detail',
        'contact.Form',
        'contact.FormPanel'
    ],

    stores: [
        'Contacts'
    ],

    models: [
        'Contact'
    ],

    init: function() {
        console.log('Initialized Users! This happens');

        this.control({
            'contactgrid > toolbar > button[action=edit]': {
                //click: this.onEditButtonClicked
            }
        })
    },

    onEditButtonClicked: function(button) {
        console.log('onEditButtonClicked');
        var viewport = button.up('viewport');
        var layout = viewport.getLayout();
        layout.setActiveItem(1);
    }
});

/*
app.controllers.contacts = new Ext.Controller({
   index: function() {
        console.log("contacts controller #index")
        if (!app.views.viewport) {
            app.views.viewport = Ext.create('app.views.Viewport');
        } else {
            app.fireEvent('loadcontactslist');
            app.views.viewport.layout.setActiveItem(0);
        }
    },

    new: function() {
        console.log("contacts controller #new")
        app.views.viewport.layout.setActiveItem(2);
    },

    show: function() {
        console.log("contacts controller #show")
        app.views.viewport.layout.setActiveItem(1);
    },

    edit: function(params) {
        console.log("contacts controller #edit")
        console.log("_docId: "+ params._docId)

        app.fireEvent('loadcontact', params._docId);
        app.views.viewport.layout.setActiveItem(2);
    }
});

Ext.regController("contacts", app.controllers.contacts);
*/
