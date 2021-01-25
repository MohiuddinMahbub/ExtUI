var screenWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
var screenHeight = (window.innerHeight > 0) ? window.innerHeight : screen.height;

Ext.define('Admin.view.product.CatDetails', {
	extend : 'Ext.window.Window',
	alias: 'widget.catDetails',
	reference: 'catDetails',
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
	
    width : 0.25*screenWidth,
    height: 0.40*screenHeight,
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
					reference: 'catForm',
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
									reference:'updCat',
									iconCls: 'update',
									hidden: true,
									listeners: {
										click: 'onSaveCategory'
									}
								},
								{
									xtype: 'button',
									margin: '0 0 0 10',
									text: 'Save',
									style: 'border: groove',
									reference:'newCat',
									iconCls: 'update',
									hidden: true,
									listeners: {
										click: 'onSaveCategory'
									}
								},
								{
									xtype: 'button',
									margin: '0 0 0 10',
									text: 'Cancel',
									style: 'border: groove',
									reference:'closeCat',
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
									padding: 5,
									items: [
										{
											xtype: 'textfield',
											reference: 'categoryName',
											labelWidth: 100,
											width : '100%',
											fieldLabel: 'Name',
											name: 'categoryName',
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
											name: 'description',
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
											reference: 'categoryId',
											name: 'categoryId',
											hidden: true
										},
										{
											xtype: 'textfield',
											reference: 'categoryVer',
											name: 'categoryVer',
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