/**
 * @class Ext.form.Checkbox
 * @extends Ext.form.BaseField

Single checkbox field. Can be used as a direct replacement for traditional checkbox fields. Also serves as a
parent class for {@link Ext.form.Radio radio buttons}.

__Labeling:__ In addition to the {@link Ext.form.Labelable standard field labeling options}, checkboxes
may be given an optional {@link #boxLabel} which will be displayed immediately after checkbox. Also see 
{@link Ext.form.CheckboxGroup} for a convenient method of grouping related checkboxes.

__Values:__
The main value of a checkbox is a boolean, indicating whether or not the checkbox is checked.
The following values will check the checkbox:
* `true`
* `'true'`
* `'1'`
* `'on'`

Any other value will uncheck the checkbox.

In addition to the main boolean value, you may also specify a separate {@link #inputValue}. This will be
sent as the parameter value when the form is {@link Ext.form.Basic#submit submitted}. You will want to set
this value if you have multiple checkboxes with the same {@link #name}. If not specified, the value `on`
will be used.

__Example usage:__

    new Ext.form.FormPanel({
        renderTo   : Ext.getBody(),
        bodyPadding: 10,
        width      : 300,
        title      : 'Pizza Order',
        items: [
            {
                xtype      : 'fieldcontainer',
                fieldLabel : 'Toppings',
                defaultType: 'checkboxfield',
                items: [
                    {
                        boxLabel  : 'Anchovies',
                        name      : 'topping',
                        inputValue: '1',
                        id        : 'checkbox1'
                    }, {
                        boxLabel  : 'Artichoke Hearts',
                        name      : 'topping',
                        inputValue: '2',
                        checked   : true,
                        id        : 'checkbox2'
                    }, {
                        boxLabel  : 'Bacon',
                        name      : 'topping',
                        inputValue: '3',
                        id        : 'checkbox3'
                    }
                ]
            }
        ],
        bbar: [
            {
                text: 'Select Bacon',
                handler: function() {
                    var checkbox = Ext.getCmp('checkbox3');
                    checkbox.setValue(true);
                }
            },
            '-',
            {
                text: 'Select All',
                handler: function() {
                    var checkbox1 = Ext.getCmp('checkbox1'),
                        checkbox2 = Ext.getCmp('checkbox2'),
                        checkbox3 = Ext.getCmp('checkbox3');

                    checkbox1.setValue(true);
                    checkbox2.setValue(true);
                    checkbox3.setValue(true);
                }
            },
            {
                text: 'Deselect All',
                handler: function() {
                    var checkbox1 = Ext.getCmp('checkbox1'),
                        checkbox2 = Ext.getCmp('checkbox2'),
                        checkbox3 = Ext.getCmp('checkbox3');

                    checkbox1.setValue(false);
                    checkbox2.setValue(false);
                    checkbox3.setValue(false);
                }
            }
        ]
    });

 * @constructor
 * Creates a new Checkbox
 * @param {Object} config Configuration options
 * @xtype checkboxfield
 * @docauthor Robert Dougan <rob@sencha.com>
 * @markdown
 */
Ext.define('Ext.form.Checkbox', {
    extend: 'Ext.form.BaseField',
    alias: ['widget.checkboxfield', 'widget.checkbox'],
    requires: ['Ext.XTemplate', 'Ext.form.CheckboxManager'],

    isCheckbox: true,
    
    /**
     * @cfg {String} focusCls The CSS class to use when the checkbox receives focus
     * (defaults to <tt>'x-form-cb-focus'</tt>)
     */
    focusCls: Ext.baseCSSPrefix + 'form-cb-focus',

    /**
     * @cfg {String} fieldCls The default CSS class for the checkbox (defaults to <tt>'x-form-field'</tt>)
     */

    /**
     * @cfg {String} fieldBodyCls
     * An extra CSS class to be applied to the body content element in addition to {@link #fieldBodyCls}.
     * Defaults to 'x-form-cb-wrap.
     */
    fieldBodyCls: Ext.baseCSSPrefix + 'form-cb-wrap',

    /**
     * @cfg {Boolean} checked <tt>true</tt> if the checkbox should render initially checked (defaults to <tt>false</tt>)
     */
    checked: false,

    /**
     * @cfg {String} checkedCls The CSS class added to the component's main element when it is in the checked state.
     */
    checkedCls: Ext.baseCSSPrefix + 'form-cb-checked',

    /**
     * @cfg {String} boxLabel An optional text label that will appear next to the checkbox. Whether it appears before
     * or after the checkbox is determined by the {@link #boxLabelAlign} config (defaults to after).
     */

    /**
     * @cfg {String} boxLabelCls The CSS class to be applied to the {@link #boxLabel} element
     */
    boxLabelCls: Ext.baseCSSPrefix + 'form-cb-label',

    /**
     * @cfg {String} boxLabelAlign The position relative to the checkbox where the {@link #boxLabel} should
     * appear. Recognized values are <tt>'before'</tt> and <tt>'after'</tt>. Defaults to <tt>'after'</tt>.
     */
    boxLabelAlign: 'after',

    /**
     * @cfg {String} inputValue The value that should go into the generated input element's value attribute and
     * should be used as the parameter value when submitting as part of a form. Defaults to <tt>"on"</tt>.
     */
    inputValue: 'on',

    /**
     * @cfg {Function} handler A function called when the {@link #checked} value changes (can be used instead of
     * handling the {@link #change change event}). The handler is passed the following parameters:
     * <div class="mdetail-params"><ul>
     * <li><b>checkbox</b> : Ext.form.Checkbox<div class="sub-desc">The Checkbox being toggled.</div></li>
     * <li><b>checked</b> : Boolean<div class="sub-desc">The new checked state of the checkbox.</div></li>
     * </ul></div>
     */

    /**
     * @cfg {Object} scope An object to use as the scope ('this' reference) of the {@link #handler} function
     * (defaults to this Checkbox).
     */

    // private overrides
    checkChangeEvents: [],
    inputType: 'checkbox',
    ariaRole: 'checkbox',

    // private
    onRe: /^on$/i,

    initComponent: function(){
        this.callParent(arguments);
        this.getManager().add(this);
    },

    initValue: function() {
        var me = this,
            checked = !!me.checked;

        /**
         * The original value of the field as configured in the {@link #checked} configuration, or
         * as loaded by the last form load operation if the form's {@link Ext.form.Basic#trackResetOnLoad trackResetOnLoad}
         * setting is <code>true</code>.
         * @type Mixed
         * @property originalValue
         */
        me.originalValue = me.lastValue = checked;

        // Set the initial checked state
        me.setValue(checked);
    },

    // private
    onRender : function(ct, position) {
        var me = this;
        Ext.applyIf(me.renderSelectors, {
            /**
             * @property boxLabelEl
             * @type Ext.core.Element
             * A reference to the label element created for the {@link #boxLabel}. Only present if the
             * component has been rendered and has a boxLabel configured.
             */
            boxLabelEl: 'label.' + me.boxLabelCls
        });
        Ext.applyIf(me.subTplData, {
            boxLabel: me.boxLabel,
            boxLabelCls: me.boxLabelCls,
            boxLabelAlign: me.boxLabelAlign
        });
        
        me.callParent(arguments);
    },

    initEvents: function() {
        var me = this;
        me.callParent();
        me.mon(me.inputEl, 'click', me.onBoxClick, me);
    },

    /**
     * @private Handle click on the checkbox button
     */
    onBoxClick: function(e) {
        var me = this;
        if (!me.disabled && !me.readOnly) {
            this.setValue(!this.checked);
        }
    },

    /**
     * Returns the checked state of the checkbox.
     * @return {Boolean} True if checked, else false
     */
    getRawValue: function() {
        return this.checked;
    },

    /**
     * Returns the checked state of the checkbox.
     * @return {Boolean} True if checked, else false
     */
    getValue: function() {
        return this.checked;
    },
    
    /**
     * Returns the submit value for the checkbox which can be used when submitting forms.
     * @return {Boolean/null} True if checked, null if not.
     */
    getSubmitValue: function() {
        return this.checked ? this.inputValue : null;
    },

    /**
     * Sets the checked state of the checkbox.
     * @param {Boolean/String} value The following values will check the checkbox:
     * <code>true, 'true', '1', or 'on'</code>, as well as a String that matches the {@link #inputValue}.
     * Any other value will uncheck the checkbox.
     * @return {Boolean} the new checked state of the checkbox
     */
    setRawValue: function(value) {
        var me = this,
            inputEl = me.inputEl,
            inputValue = me.inputValue,
            checked = (value === true || value === 'true' || value === '1' ||
                      ((Ext.isString(value) && inputValue) ? value == inputValue : me.onRe.test(value)));

        if (inputEl) {
            inputEl.dom.setAttribute('aria-checked', checked);
            me[checked ? 'addCls' : 'removeCls'](me.checkedCls);
        }

        me.checked = me.rawValue = checked;
        return checked;
    },

    /**
     * Sets the checked state of the checkbox, and invokes change detection.
     * @param {Boolean/String} checked The following values will check the checkbox:
     * <code>true, 'true', '1', or 'on'</code>, as well as a String that matches the {@link #inputValue}.
     * Any other value will uncheck the checkbox.
     * @return {Ext.form.Checkbox} this
     */
    setValue: function(checked) {
        var me = this;

        // If an array of strings is passed, find all checkboxes in the group with the same name as this
        // one and check all those whose inputValue is in the array, unchecking all the others. This is to
        // facilitate setting values from Ext.form.Basic#setValues, but is not publicly documented as we
        // don't want users depending on this behavior.
        if (Ext.isArray(checked)) {
            me.getManager().getByName(me.name).each(function(cb) {
                cb.setValue(Ext.Array.contains(checked, cb.inputValue));
            });
        } else {
            me.callParent(arguments);
        }

        return me;
    },

    // private
    valueToRaw: function(value) {
        // No extra conversion for checkboxes
        return value;
    },

    /**
     * @private
     * Called when the checkbox's checked state changes. Invokes the {@link #handler} callback
     * function if specified.
     */
    onChange: function(newVal, oldVal) {
        var me = this,
            handler = me.handler;
        if (handler) {
            handler.call(me.scope || me, me, newVal);
        }
        me.callParent(arguments);
    },
    
    // inherit docs
    getManager: function() {
        return Ext.form.CheckboxManager;
    },

    onEnable: function() {
        var me = this,
            inputEl = me.inputEl;
        me.callParent();
        if (inputEl) {
            // Can still be disabled if the field is readOnly
            inputEl.dom.disabled = me.readOnly;
        }
    },

    setReadOnly: function(readOnly) {
        var me = this,
            inputEl = me.inputEl;
        if (inputEl) {
            // Set the button to disabled when readonly
            inputEl.dom.disabled = readOnly || me.disabled;
        }
        me.readOnly = readOnly;
    }

},
function() {
    var boxLabelTpl = '<label class="{boxLabelCls} {boxLabelCls}-{boxLabelAlign}" for="{id}">{boxLabel}</label>';

    this.prototype.fieldSubTpl = new Ext.XTemplate(
        '<tpl if="boxLabel && boxLabelAlign == \'before\'">',
            boxLabelTpl,
        '</tpl>',
        // Creates not an actual checkbox, but a button which is given aria role="checkbox" and
        // styled with a custom checkbox image. This allows greater control and consistency in
        // styling, and using a button allows it to gain focus and handle keyboard nav properly.
        '<input type="button" id="{id}" ',
            '<tpl if="tabIdx">tabIndex="{tabIdx}" </tpl>',
            'class="{fieldCls} {typeCls}" autocomplete="off" hidefocus="true" />',
        '<tpl if="boxLabel && boxLabelAlign == \'after\'">',
            boxLabelTpl,
        '</tpl>',
        {
            disableFormats: true,
            compiled: true
        }
    );
});
