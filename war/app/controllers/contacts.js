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
