/**
 * @class Ext.form.Picker
 * @extends Ext.form.Trigger
 * <p>An abstract class for fields that have a single trigger which opens a "picker" popup below
 * the field, e.g. a combobox menu list or a date picker. It provides a base implementation for
 * toggling the picker's visibility when the trigger is clicked, as well as keyboard navigation
 * and some basic events. Sizing and alignment of the picker can be controlled via the {@link #matchFieldWidth}
 * and {@link #pickerAlign}/{@link #pickerOffset} config properties respectively.</p>
 * <p>You would not normally use this class directly, but instead use it as the parent class for
 * a specific picker field implementation. Subclasses must implement the {@link #createPicker} method
 * to create a picker component appropriate for the field.</p>
 *
 * @xtype pickerfield
 * @constructor
 * Create a new picker field
 * @param {Object} config
 */
Ext.define('Ext.form.Picker', {
    extend: 'Ext.form.Trigger',
    alias: 'widget.pickerfield',
    requires: ['Ext.util.KeyNav'],

    /**
     * @cfg {Boolean} matchFieldWidth
     * Whether the picker dropdown's width should be explicitly set to match the width of the field.
     * Defaults to <tt>true</tt>.
     */
    matchFieldWidth: true,

    /**
     * @cfg {String} pickerAlign
     * The {@link Ext.core.Element#alignTo alignment position} with which to align the picker. Defaults
     * to <tt>"tl-bl?"</tt>
     */
    pickerAlign: 'tl-bl?',

    /**
     * @cfg {Array} pickerOffset
     * An offset [x,y] to use in addition to the {@link #pickerAlign} when positioning the picker.
     * Defaults to undefined.
     */

    /**
     * @cfg {String} openCls
     * A class to be added to the field's {@link #bodyEl} element when the picker is opened. Defaults
     * to 'x-pickerfield-open'.
     */
    openCls: Ext.baseCSSPrefix + 'pickerfield-open',

    /**
     * @property isExpanded
     * @type Boolean
     * True if the picker is currently expanded, false if not.
     */


    initComponent: function() {
        this.callParent();

        // Custom events
        this.addEvents(
            /**
             * @event expand
             * Fires when the field's picker is expanded.
             * @param {Ext.form.Picker} field This field instance
             */
            'expand',
            /**
             * @event collapse
             * Fires when the field's picker is collapsed.
             * @param {Ext.form.Picker} field This field instance
             */
            'collapse',
            /**
             * @event select
             * Fires when a value is selected via the picker.
             * @param {Ext.form.Picker} field This field instance
             * @param {Mixed} value The value that was selected. The exact type of this value is dependent on
             * the individual field and picker implementations.
             */
            'select'
        );
    },


    initEvents: function() {
        var me = this;
        me.callParent();

        // Add handlers for keys to expand/collapse the picker
        me.keyNav = new Ext.util.KeyNav(me.inputEl, {
            down: function() {
                if (!me.isExpanded) {
                    // Don't call expand() directly as there may be additional processing involved before
                    // expanding, e.g. in the case of a ComboBox query.
                    me.onTriggerClick();
                }
            },
            esc: me.collapse,
            scope: me,
            forceKeyDown: true
        });

        // Disable native browser autocomplete
        if (Ext.isGecko) {
            me.inputEl.dom.setAttribute('autocomplete', 'off');
        }
    },


    /**
     * Expand this field's picker dropdown.
     */
    expand: function() {
        var me = this,
            bodyEl, picker, collapseIf;

        if (me.rendered && !me.isExpanded && !me.isDestroyed) {
            bodyEl = me.bodyEl;
            picker = me.getPicker();
            collapseIf = me.collapseIf;

            // show the picker and set isExpanded flag
            picker.show();
            me.isExpanded = true;
            me.alignPicker();
            bodyEl.addCls(me.openCls);

            // monitor clicking and mousewheel
            me.mon(Ext.getDoc(), {
                mousewheel: collapseIf,
                mousedown: collapseIf,
                scope: me
            });

            me.fireEvent('expand', me);
            me.onExpand();
        }
    },

    onExpand: Ext.emptyFn,

    /**
     * @protected
     * Aligns the picker to the
     */
    alignPicker: function() {
        var me = this,
            picker, isAbove,
            aboveSfx = '-above';

        if (this.isExpanded) {
            picker = me.getPicker();
            if (me.matchFieldWidth) {
                picker.setSize(me.bodyEl.getWidth(), null);
            }
            if (picker.isFloating()) {
                picker.alignTo(me.inputEl, me.pickerAlign, me.pickerOffset);

                // add the {openCls}-above class if the picker was aligned above
                // the field due to hitting the bottom of the viewport
                isAbove = picker.el.getY() < me.inputEl.getY();
                me.bodyEl[isAbove ? 'addCls' : 'removeCls'](me.openCls + aboveSfx);
                picker.el[isAbove ? 'addCls' : 'removeCls'](picker.baseCls + aboveSfx);
            }
        }
    },

    /**
     * Collapse this field's picker dropdown.
     */
    collapse: function() {
        if (this.isExpanded && !this.isDestroyed) {
            var me = this,
                openCls = me.openCls,
                picker = me.picker,
                doc = Ext.getDoc(),
                collapseIf = me.collapseIf,
                aboveSfx = '-above';

            // hide the picker and set isExpanded flag
            picker.hide();
            me.isExpanded = false;

            // remove the openCls
            me.bodyEl.removeCls([openCls, openCls + aboveSfx]);
            picker.el.removeCls(picker.baseCls + aboveSfx);

            // remove event listeners
            doc.un('mousewheel', collapseIf, me);
            doc.un('mousedown', collapseIf, me);

            me.fireEvent('collapse', me);
            me.onCollapse();
        }
    },

    onCollapse: Ext.emptyFn,


    /**
     * @private
     * Runs on mousewheel and mousedown of doc to check to see if we should collapse the picker
     */
    collapseIf: function(e) {
        var me = this;
        if (!me.isDestroyed && !e.within(me.bodyEl, false, true) && !e.within(me.picker.el, false, true)) {
            me.collapse();
        }
    },

    /**
     * Return a reference to the picker component for this field, creating it if necessary by
     * calling {@link #createPicker}.
     * @return {Ext.Component} The picker component
     */
    getPicker: function() {
        var me = this;
        return me.picker || (me.picker = me.createPicker());
    },

    /**
     * Create and return the component to be used as this field's picker. Must be implemented
     * by subclasses of Picker.
     * @return {Ext.Component} The picker component
     */
    createPicker: Ext.emptyFn,

    /**
     * Handles the trigger click; by default toggles between expanding and collapsing the
     * picker component.
     */
    onTriggerClick: function() {
        var me = this;
        if (!me.readOnly && !me.disabled) {
            if (me.isExpanded) {
                me.collapse();
            } else {
                me.expand();
            }
            me.inputEl.focus();
        }
    },

    mimicBlur: function(e) {
        var me = this,
            picker = me.picker;
        // ignore mousedown events within the picker element
        if (!picker || !e.within(picker.el, false, true)) {
            me.callParent(arguments);
        }
    },

    onDestroy : function(){
        var me = this;
        Ext.destroy(me.picker, me.keyNav);
        me.callParent();
    }

});

