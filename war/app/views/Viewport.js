Ext.define('app.views.Viewport', {

    extend: 'Ext.container.Viewport',

    layout: 'card',

    activeitem: 0,

    initComponent: function() {
        var me = this;

        Ext.apply(app.views, {
            contactsList: new app.views.ContactsList(),
            contactDetail: new app.views.ContactDetail(),
            contactForm: new app.views.ContactForm()
        });

        Ext.apply(me, {
            items: [
                app.views.contactsList,
                app.views.contactDetail,
                app.views.contactForm
            ]
        });

        me.addEvents('loadcontact');

        me.on('loadcontact', function(_docId) {
            this.loadContact(_docId);
        });

        app.views.Viewport.superclass.initComponent.apply(me, arguments);
    },

    loadContact: function(_docId) {
        var form = app.views.contactForm.items.items[3].items.items[0].getForm();

        form.load({
            url: '/_je/myDoc/'+_docId,
            success: function() {
                console.log('success');
            },
            failure: function(form, action) {
                if (action.failureType === Ext.form.action.Action.LOAD_FAILURE) {
                    //LOAD_FAILUREはJSONレスポンスにsuccessプロパティがないエラーなのでOKとする。
                    form.setValues(action.result);
                    form.url = '/_je/myDoc'+_docId+'?_method=put'
                } else {
                    console.log('failure');
                    console.log(action);
                }
            }
        });
    }
});
