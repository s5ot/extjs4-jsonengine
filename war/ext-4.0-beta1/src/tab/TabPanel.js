/**
 * @author Ed Spencer, Tommy Maintz, Brian Moeskau
 * @class Ext.tab.TabPanel
 * @extends Ext.panel.Panel

A basic tab container. TabPanels can be used exactly like a standard {@link Ext.panel.Panel} for layout purposes, but also 
have special support for containing child Components (`{@link Ext.container.Container#items items}`) that are managed 
using a {@link Ext.layout.container.Card CardLayout layout manager}, and displayed as separate tabs.

__Note:__

By default, a tab's close tool _destroys_ the child tab Component and all its descendants. This makes the child tab 
Component, and all its descendants __unusable__. To enable re-use of a tab, configure the TabPanel with `{@link #autoDestroy autoDestroy: false}`.

__TabPanel's layout:__

TabPanels use a Dock layout to position the {@link Ext.tab.TabBar TabBar} at the top of the widget. Panels added to the TabPanel will have their 
header hidden by default because the Tab will automatically take the Panel's configured title and icon.

TabPanels use their {@link Ext.panel.Panel#header header} or {@link Ext.panel.Panel#footer footer} element (depending on the {@link #tabPosition} 
configuration) to accommodate the tab selector buttons. This means that a TabPanel will not display any configured title, and will not display any 
configured header {@link Ext.panel.Panel#tools tools}.

To display a header, embed the TabPanel in a {@link Ext.panel.Panel Panel} which uses `{@link Ext.container.Container#layout layout:'fit'}`.

__Examples:__

Here is a basic TabPanel rendered to the body. This also shows the useful configuration {@link #activeTab}, which allows you to set the active tab on render. 
If you do not set an {@link #activeTab}, no tabs will be active by default.

Example usage:

    var tabs = new Ext.TabPanel({
        renderTo : Ext.getBody(),
        activeTab: 0,
        items: [
            {
                title: 'Tab 1',
                html : 'A simple tab'
            },
            {
                title: 'Tab 2',
                html : 'Another one'
            }
        ]
    });

You can remove the background of the TabBar by setting the {@link #plain} property to `false`.

Example usage:

var tabs = new Ext.TabPanel({
    renderTo : Ext.getBody(),
    activeTab: 0,
    plain    : true,
    items: [
        {
            title: 'Tab 1',
            html : 'A simple tab'
        },
        {
            title: 'Tab 2',
            html : 'Another one'
        }
    ]
});

Another useful configuration of TabPanel is {@link #tabPosition}. This allows you to change the position where the tabs are displayed. The available 
options for this are `'top'` (default) and `'bottom'`.

Example usage:

    var tabs = new Ext.TabPanel({
        renderTo : Ext.getBody(),
        activeTab: 0,
        tabPosition: 'bottom',
        items: [
            {
                title: 'Tab 1',
                html : 'A simple tab'
            },
            {
                title: 'Tab 2',
                html : 'Another one'
            }
        ]
    });

The {@link #setActiveTab} is a very useful method in TabPanel which will allow you to change the current active tab. You can either give it an index or 
an instance of a tab.

Example usage:

    var tabs = new Ext.TabPanel({
        renderTo : Ext.getBody(),
        items: [
            {
                id   : 'my-tab',
                title: 'Tab 1',
                html : 'A simple tab'
            },
            {
                title: 'Tab 2',
                html : 'Another one'
            }
        ]
    });
    
    var tab = Ext.getCmp('my-tab');
    
    new Ext.button.Button({
        renderTo: Ext.getBody(),
        text    : 'Select the first tab',
        scope   : this,
        handler : function() {
            tabs.setActiveTab(tab);
        }
    });
    
    new Ext.button.Button({
        renderTo: Ext.getBody(),
        text    : 'Select the second tab',
        scope   : this,
        handler : function() {
            tabs.setActiveTab(1);
        }
    });

The {@link #getActiveTab} is a another useful method in TabPanel which will return the current active tab.

Example usage:

    var tabs = new Ext.TabPanel({
        renderTo : Ext.getBody(),
        items: [
            {
                title: 'Tab 1',
                html : 'A simple tab'
            },
            {
                title: 'Tab 2',
                html : 'Another one'
            }
        ]
    });
    
    new Ext.button.Button({
        renderTo: Ext.getBody(),
        text    : 'Get active tab',
        scope   : this,
        handler : function() {
            var tab = tabs.getActiveTab();
            alert('Current tab: ' + tab.title);
        }
    });

Adding a new tab is very simple with a TabPanel. You simple call the {@link #add} method with an config object for a panel.

Example usage:

    var tabs = new Ext.TabPanel({
        renderTo : Ext.getBody(),
        items: [
            {
                title: 'Tab 1',
                html : 'A simple tab'
            },
            {
                title: 'Tab 2',
                html : 'Another one'
            }
        ]
    });
    
    new Ext.button.Button({
        renderTo: Ext.getBody(),
        text    : 'New tab',
        scope   : this,
        handler : function() {
            var tab = tabs.add({
                title: 'Tab ' + (tabs.items.length + 1), //we use the tabs.items property to get the length of current items/tabs
                html : 'Another one'
            });
            
            tabs.setActiveTab(tab);
        }
    });

Additionally, removing a tab is very also simple with a TabPanel. You simple call the {@link #remove} method with an config object for a panel.

Example usage:

    var tabs = new Ext.TabPanel({
        renderTo : Ext.getBody(),
        items: [
            {
                title: 'Tab 1',
                html : 'A simple tab'
            },
            {
                id   : 'remove-this-tab',
                title: 'Tab 2',
                html : 'Another one'
            }
        ]
    });
    
    new Ext.button.Button({
        renderTo: Ext.getBody(),
        text    : 'Remove tab',
        scope   : this,
        handler : function() {
            var tab = Ext.getCmp('remove-this-tab');
            tabs.remove(tab);
        }
    });

 * @extends Ext.Panel
 * @constructor
 * @param {Object} config The configuration options
 * @xtype tabpanel
 */
Ext.define('Ext.tab.TabPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.tabpanel',
    alternateClassName: ['Ext.TabPanel'],

    requires: ['Ext.layout.container.Card', 'Ext.tab.TabBar'],

    /**
     * @cfg {String} tabPosition The position where the tab strip should be rendered (defaults to <code>'top'</code>).
     * In 4.0, The only other supported value is <code>'bottom'</code>.
     */
    tabPosition : 'top',
    
    /**
     * @cfg {Object} tabBar Optional configuration object for the internal {@link Ext.tab.TabBar}. If present, this is 
     * passed straight through to the TabBar's constructor
     */

    /**
     * @cfg {Object} layout Optional configuration object for the internal {@link Ext.layout.container.Card card layout}.
     * If present, this is passed straight through to the layout's constructor
     */

    /**
     * @cfg {Boolean} removePanelHeader True to instruct each Panel added to the TabContainer to not render its header 
     * element. This is to ensure that the title of the panel does not appear twice. Defaults to true.
     */
    removePanelHeader: true,

    /**
     * @cfg Boolean plain
     * True to not show the full background on the TabBar
     */
    plain: false,

    /**
     * @cfg {String} itemCls The class added to each child item of this TabPanel. Defaults to 'x-tabpanel-child'.
     */
    itemCls: 'x-tabpanel-child',

    /**
     * @cfg {Number} minTabWidth The minimum width for a tab in the {@link #tabBar}. Defaults to <code>30</code>.
     */

    /**
     * @cfg {Boolean} deferredRender
     * <p><tt>true</tt> by default to defer the rendering of child <tt>{@link Ext.Container#items items}</tt>
     * to the browsers DOM until a tab is activated. <tt>false</tt> will render all contained
     * <tt>{@link Ext.Container#items items}</tt> as soon as the {@link Ext.layout.container.Card layout}
     * is rendered. If there is a significant amount of content or a lot of heavy controls being
     * rendered into panels that are not displayed by default, setting this to <tt>true</tt> might
     * improve performance.</p>
     * <br><p>The <tt>deferredRender</tt> property is internally passed to the layout manager for
     * TabPanels ({@link Ext.layout.container.Card}) as its {@link Ext.layout.container.Card#deferredRender}
     * configuration value.</p>
     * <br><p><b>Note</b>: leaving <tt>deferredRender</tt> as <tt>true</tt> means that the content
     * within an unactivated tab will not be available</p>
     */
    deferredRender : true,

    //inherit docs
    initComponent: function() {
        var me = this,
            dockedItems = me.dockedItems || [],
            activeTab = me.activeTab || 0;

        me.layout = Ext.create('Ext.layout.container.Card', Ext.apply({
            owner: me,
            deferredRender: me.deferredRender,
            itemCls: me.itemCls
        }, me.layout));

        /**
         * @property tabBar
         * @type Ext.TabBar
         * Internal reference to the docked TabBar
         */
        me.tabBar = Ext.create('Ext.tab.TabBar', Ext.apply({}, me.tabBar, {
            dock: me.tabPosition,
            plain: me.plain,
            cardLayout: me.layout,
            tabPanel: me
        }));

        if (dockedItems && !Ext.isArray(dockedItems)) {
            dockedItems = [dockedItems];
        }

        dockedItems.push(me.tabBar);
        me.dockedItems = dockedItems;

        me.addEvents(
            /**
             * @event beforetabchange
             * Fires before a tab change (activated by {@link #setActiveTab}). Return false in any listener to cancel
             * the tabchange
             * @param {Ext.tab.TabPanel} tabPanel The TabPanel
             * @param {Ext.Component} newCard The card that is about to be activated
             * @param {Ext.Component} oldCard The card that is currently active
             */
            'beforetabchange',

            /**
             * @event tabchange
             * Fires when a new tab has been activated (activated by {@link #setActiveTab}).
             * @param {Ext.tab.TabPanel} tabPanel The TabPanel
             * @param {Ext.Component} newCard The newly activated item
             * @param {Ext.Component} oldCard The previously active item
             */
            'tabchange'
        );
        me.callParent(arguments);

        //set the active tab
        me.setActiveTab(activeTab);
        //set the active tab after initial layout
        me.on('afterlayout', me.afterInitialLayout, me, {single: true});
    },

    /**
     * @private
     * We have to wait until after the initial layout to visually activate the activeTab (if set).
     * The active tab has different margins than normal tabs, so if the initial layout happens with
     * a tab active, its layout will be offset improperly due to the active margin style. Waiting
     * until after the initial layout avoids this issue.
     */
    afterInitialLayout: function() {
        this.setActiveTab(this.activeTab);
    },

    /**
     * Makes the given card active (makes it the visible card in the TabPanel's CardLayout and highlights the Tab)
     * @param {Ext.Component} card The card to make active
     */
    setActiveTab: function(card) {
        var me = this,
            previous;

        card = me.getComponent(card);
        if (card) {
            previous = me.getActiveTab();
            if (me.fireEvent('beforetabchange', me, card, previous) !== false) {
                me.tabBar.setActiveTab(card.tab);
                me.activeTab = card;
                if (me.rendered) {
                    me.layout.setActiveItem(card);
                }
                me.fireEvent('tabchange', me, card, previous);
            }
        }
    },

    /**
     * Returns the item that is currently active inside this TabPanel. Note that before the TabPanel first activates a
     * child component this will return whatever was configured in the {@link #activeTab} config option 
     * @return {Ext.Component/Integer} The currently active item
     */
    getActiveTab: function() {
        return this.activeTab;
    },

    /**
     * Returns the {@link Ext.tab.TabBar} currently used in this TabPanel
     * @return {Ext.TabBar} The TabBar
     */
    getTabBar: function() {
        return this.tabBar;
    },

    /**
     * @ignore
     * Makes sure we have a Tab for each item added to the TabPanel
     */
    onAdd: function(item, index) {
        var me = this;

        item.tab = me.tabBar.insert(index, {
            xtype: 'tab',
            card: item,
            disabled: item.disabled,
            closable: item.closable,
            tabBar: me.tabBar
        });

        if (item.isPanel) {
            if (me.removePanelHeader) {
                item.preventHeader = true;
                if (item.rendered) {
                    item.updateHeader();
                }
            }
            if (item.border !== true) {
                item.hideBorders();
            }
        }

        // ensure that there is at least one active tab
        if (this.rendered && me.items.getCount() === 1) {
            me.setActiveTab(0);
        }
    },

    /**
     * @ignore
     * If we're removing the currently active tab, activate the nearest one. The item is removed when we call super,
     * so we can do preprocessing before then to find the card's index
     */
    doRemove: function(item, autoDestroy) {
        var me = this,
            items = me.items,
            /**
             * At this point the item hasn't been removed from the items collection.
             * As such, if we want to check if there are no more tabs left, we have to
             * check for one, as opposed to 0.
             */
            hasItemsLeft = items.getCount() > 1;

        if (me.destroying || !hasItemsLeft) {
            me.activeTab = null;
        } else if (item === me.activeTab) {
             me.setActiveTab(item.next() || items.getAt(0)); 
        }
        me.callParent(arguments);

        // Remove the two references
        delete item.tab.card;
        delete item.tab;
    },

    /**
     * @ignore
     * Makes sure we remove the corresponding Tab when an item is removed
     */
    onRemove: function(item, autoDestroy) {
        if (!this.destroying && item.tab.ownerCt == this.tabBar) {
            this.tabBar.remove(item.tab);
        }
    }
});
