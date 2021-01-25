var screenWidthO = (window.innerWidth > 0) ? window.innerWidth : screen.width;
var screenHeightO = (window.innerHeight > 0) ? window.innerHeight : screen.height;

Ext.define('Admin.view.product.OrderDetails', {
	extend : 'Ext.window.Window',
	alias: 'widget.orderDetails',
	reference: 'orderDetails',
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
	
    width : 0.30 * screenWidthO,
    height: 0.60 * screenHeightO,
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
					reference: 'orderForm',
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
									reference:'updOrder',
									iconCls: 'update',
									hidden: true,
									listeners: {
										click: 'onSaveOrder'
									}
								},
								{
									xtype: 'button',
									margin: '0 0 0 10',
									text: 'Save',
									style: 'border: groove',
									reference:'newOrder',
									iconCls: 'update',
									hidden: true,
									listeners: {
										click: 'onSaveOrder'
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
											xtype: 'combobox',
											labelWidth: 100,
											width : '100%',
											reference: 'productName',
											fieldLabel: 'Product',
											displayField: 'productName',
											valueField: 'productId',
											editable: true,
											name: 'productId',
											queryMode: 'local',
											triggerAction: 'all',
											allowBlank: false,
											emptyText: 'Product',
											afterLabelTextTpl: [
												'<span style="color:red;font-weight:bold" data-qtip="Required">*</span>'
											],
											validator:function(text){
												return (text.length==0 || Ext.util.Format.trim(text).length!=0);
											},
											bind: {
												store: 'ProductStore'
											}
										},
										{
											xtype: 'combobox',
											labelWidth: 100,
											width : '100%',
											reference: 'salesEntityName',
											fieldLabel: 'Entity',
											displayField: 'salesEntityName',
											valueField: 'salesEntityId',
											editable: true,
											name: 'salesEntityId',
											queryMode: 'local',
											triggerAction: 'all',
											allowBlank: false,
											emptyText: 'Entity',
											afterLabelTextTpl: [
												'<span style="color:red;font-weight:bold" data-qtip="Required">*</span>'
											],
											validator:function(text){
												return (text.length==0 || Ext.util.Format.trim(text).length!=0);
											},
											bind: {
												store: 'EntityStore'
											}
										},
										{
											xtype: 'textfield',
											reference: 'quantity',
											name: 'quantity',
											labelWidth: 100,
											width : '100%',
											allowBlank: false,
											fieldLabel: 'Quantity',
											afterLabelTextTpl: [
												'<span style="color:red;font-weight:bold" data-qtip="Required">*</span>'
											],
											validator:function(text){
												return (text.length==0 || Ext.util.Format.trim(text).length!=0);
											}
										},
										{
											xtype: 'textfield',
											labelWidth: 100,
											fieldLabel: 'Stock',
											width : '100%',
											reference: 'stock',
											name: 'stock',
											afterLabelTextTpl: [
												'<span style="color:red;font-weight:bold" data-qtip="Required">*</span>'
											],
											validator:function(text){
												return (text.length==0 || Ext.util.Format.trim(text).length!=0);
											}
										},
										{
											xtype: 'numberfield',
											labelWidth: 100,
											fieldLabel: 'U. Price',
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
											reference: 'orderDate',
											allowBlank: false,
											width : '100%',
											name: 'orderDate',
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
											xtype: 'textareafield',
											reference: 'description',
											labelWidth: 100,
											width : '100%',
											fieldLabel: 'Description',
											name: 'description'
										},
										{
											xtype: 'textfield',
											reference: 'orderId',
											name: 'orderId',
											hidden: true
										},
										{
											xtype: 'textfield',
											reference: 'orderVer',
											name: 'orderVer',
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