var screenWidthS = (window.innerWidth > 0) ? window.innerWidth : screen.width;
var screenHeightS = (window.innerHeight > 0) ? window.innerHeight : screen.height;

Ext.define('Admin.view.product.ExpenseDetails', {
	extend : 'Ext.window.Window',
	alias: 'widget.expenseDetails',
	reference: 'expenseDetails',
	requires: [
		'Ext.Img',
		'Ext.form.*',
		'Ext.layout.container.Card',
		'Ext.layout.container.Column'
	],

	controller: 'product-product',
	viewModel: {
		type: 'product-product'
	},
	
	layout: {
		type: 'fit',
		align: 'middle',
		pack: 'center'
	},
	title: 'Details',
	border : true,
	closable : false,
	scrollable: true,
	
    width : 0.30 * screenWidthS,
    height: 0.60 * screenHeightS,
    fullscreen: true,
    modal: true,
    centered: true,    
    hideOnMaskTap: true,

	initComponent: function() {

		var me = this;

		Ext.applyIf(me, {

			items: [
				{
					xtype: 'form',
					bodyPadding: 5,
					reference: 'expenseForm',
					border: 'true',
					dockedItems:[
						{
							xtype: 'toolbar',
							dock: 'bottom',
							items: [
								{
									xtype: 'button',
									margin: '0 0 0 10',
									text: 'Save',
									style: 'border: groove',
									reference:'updExpense',
									iconCls: 'update',
									hidden: true,
									listeners: {
										click: 'onSaveExpense'
									}
								},
								{
									xtype: 'button',
									margin: '0 0 0 10',
									text: 'Save',
									style: 'border: groove',
									reference:'newExpense',
									iconCls: 'update',
									hidden: true,
									listeners: {
										click: 'onSaveExpense'
									}
								},
								{
									xtype: 'button',
									margin: '0 0 0 10',
									text: 'Cancel',
									style: 'border: groove',
									iconCls: 'cancel_button',
									listeners: {
										click: 'onCloseFrm'
									}
								},
								'->'
							]
						}
					],
					items: [
						{
							xtype: 'fieldset',
							flex: 1,
							collapsible: 'true',
							title: 'General',   
							layout: {
								type: 'column',
								align: 'stretch'
							},
							items: [
								{
									xtype: 'fieldcontainer',
									columnWidth : 1,
									fieldLabel: '',
									padding: 15,
									items: [
										{
											xtype: 'textareafield',
											reference: 'description',
											labelWidth: 100,
											width : '100%',
											fieldLabel: 'Reason',
											name: 'description'
										},
										{
											xtype: 'numberfield',
											labelWidth: 100,
											fieldLabel: 'Amount',
											width : '100%',
											reference: 'unitPrice',
											name: 'unitPrice',
											afterLabelTextTpl: [
												'<span style="color:red;font-weight:bold" data-qtip="Required">*</span>'
											],
											validator:function(text){
												return (text.length==0 || Ext.util.Format.trim(text).length!=0);
											}
										},
										{
											xtype: 'datefield',
											reference: 'salesDate',
											allowBlank: false,
											width : '100%',
											name: 'salesDate',
											labelWidth: 100,
											fieldLabel: 'Date',
											format: 'd/m/Y',
											allowBlank: false,
											afterLabelTextTpl: [
												'<span style="color:red;font-weight:bold" data-qtip="Required">*</span>'
											],
											validator:function(text){
												return (text.length==0 || Ext.util.Format.trim(text).length!=0);
											}
										},
										{
											xtype: 'textfield',
											reference: 'salesId',
											name: 'salesId',
											hidden: true
										},
										{
											xtype: 'textfield',
											reference: 'salesVer',
											name: 'salesVer',
											hidden: true
										}
									]
								}
							]
						}
					]
				}
			]
		});
		me.callParent(arguments);
	}
});