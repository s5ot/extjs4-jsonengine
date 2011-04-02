Ext.regApplication({
    name: 'app',

    //これがないとエラーになる
    autoInitViewport: false,

    defaultUrl: 'contacts',

    launch: function() {
        console.log('launch')
    }
});

Ext.Router.draw(function(map) {
    map.connect("contacts", {controller: "contacts", action: "index"});
    map.connect("new", {controller: "contacts", action: "new"});
});
