Ext.regApplication({
    name: 'app',

    //これがないとエラーになる
    autoInitViewport: false,

    defaultUrl: 'contacts',

    launch: function() {
        console.log('launch')
        app.addEvents('loadcontactslist');
        app.addEvents('loadcontact');
    }
});

Ext.Router.draw(function(map) {
    map.connect("contacts", {controller: "contacts", action: "index"});
    map.connect("new", {controller: "contacts", action: "new"});
});
