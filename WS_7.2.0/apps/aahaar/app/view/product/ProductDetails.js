var screenWidthP = (window.innerWidth > 0) ? window.innerWidth : screen.width;
var screenHeightP = (window.innerHeight > 0) ? window.innerHeight : screen.height;

Ext.define('Admin.view.product.ProductDetails', {
	extend : 'Ext.window.Window',
	alias: 'widget.productDetails',
	reference: 'productDetails',
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
	
    width : 0.30 * screenWidthP,
    height: 0.70 * screenHeightP,
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
					reference: 'productForm',
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
									reference:'updProduct',
									iconCls: 'update',
									hidden: true,
									listeners: {
										click: 'onSaveProduct'
									}
								},
								{
									xtype: 'button',
									margin: '0 0 0 10',
									text: 'Save',
									style: 'border: groove',
									reference:'newProduct',
									iconCls: 'update',
									hidden: true,
									listeners: {
										click: 'onSaveProduct'
									}
								},
								{
									xtype: 'button',
									margin: '0 0 0 10',
									text: 'Cancel',
									style: 'border: groove',
									//reference:'closeCat',
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
											reference: 'categoryName',
											fieldLabel: 'Category',
											displayField: 'categoryName',
											valueField: 'categoryId',
											editable: true,
											name: 'categoryId',
											queryMode: 'local',
											triggerAction: 'all',
											allowBlank: false,
											emptyText: 'Category',
											afterLabelTextTpl: [
												'<span style="color:red;font-weight:bold" data-qtip="Required">*</span>'
											],
											validator:function(text){
												return (text.length==0 || Ext.util.Format.trim(text).length!=0);
											},
											bind: {
												store: 'CategoryStore'
											}
										},
										{
											xtype: 'textfield',
											reference: 'productName',
											labelWidth: 100,
											width : '100%',
											fieldLabel: 'Name',
											name: 'productName',
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
											reference: 'productBrand',
											labelWidth: 100,
											width : '100%',
											fieldLabel: 'Brand',
											name: 'productBrand',
											allowBlank: false,
											afterLabelTextTpl: [
												'<span style="color:red;font-weight:bold" data-qtip="Required">*</span>'
											],
											validator:function(text){
												return (text.length==0 || Ext.util.Format.trim(text).length!=0);
											} 
										}
									]
								}
							]
						},
						{
							xtype: 'fieldset',
							flex: 1,
							collapsible: 'true',
							title: 'Others',   
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
											fieldLabel: 'Number',
											width : '100%',
											reference: 'amount',
											name: 'amount',
											allowBlank: false,
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
											fieldLabel: 'Price',
											width : '100%',
											reference: 'price',
											name: 'price',
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
											reference: 'productId',
											name: 'productId',
											hidden: true
										},
										{
											xtype: 'textfield',
											reference: 'productVer',
											name: 'productVer',
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