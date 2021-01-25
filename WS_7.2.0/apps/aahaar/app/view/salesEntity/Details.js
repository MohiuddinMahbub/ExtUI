var screenWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
var screenHeight = (window.innerHeight > 0) ? window.innerHeight : screen.height;

Ext.define('Admin.view.salesEntity.Details', {
	extend : 'Ext.window.Window',
	alias: 'widget.details',
	reference: 'salesEntityDetails',
	requires: [
		'Ext.Img',
		'Ext.form.*',
		'Ext.layout.container.Card',
		'Ext.layout.container.Column'
	],

	controller: 'salesentity-salesentity',
	viewModel: {
		type: 'salesentity-salesentity'
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
	
    width : 0.55*screenWidth,
    height: 0.85*screenHeight,
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
					reference: 'sEnttForm',
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
									reference:'updSe',
									iconCls: 'update',
									hidden: true,
									listeners: {
										click: 'onSaveEntity'
									}
								},
								{
									xtype: 'button',
									margin: '0 0 0 10',
									text: 'Save',
									style: 'border: groove',
									reference:'newSe',
									iconCls: 'update',
									hidden: true,
									listeners: {
										click: 'onSaveEntity'
									}
								},
								{
									xtype: 'button',
									margin: '0 0 0 10',
									text: 'Cancel',
									style: 'border: groove',
									reference:'closeSe',
									iconCls: 'cancel_button',
									listeners: {
										click: 'onCloseSeFrm'
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
									columnWidth : .5,
									fieldLabel: '',
									padding: 15,
									items: [
										{
											xtype: 'textfield',
											reference: 'firstName',
											labelWidth: 100,
											width : '100%',
											fieldLabel: 'First Name',
											name: 'firstName',
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
											reference: 'lastName',
											labelWidth: 100,
											width : '100%',
											fieldLabel: 'Last Name',
											name: 'lastName',
											allowBlank: false,
											afterLabelTextTpl: [
												'<span style="color:red;font-weight:bold" data-qtip="Required">*</span>'
											],
											validator:function(text){
												return (text.length==0 || Ext.util.Format.trim(text).length!=0);
											} 
										}
									]
								},
								{
									xtype: 'fieldcontainer',
									columnWidth : .5,
									fieldLabel: '',
									padding: 15,
									items: [
										{
											xtype: 'textfield',
											reference: 'salesEntityName',
											labelWidth: 100,
											width : '100%',
											fieldLabel: 'Name',
											name: 'salesEntityName'
										},
										{
											xtype: 'textfield',
											reference: 'salesEntityAlias',
											labelWidth: 100,
											width : '100%',
											fieldLabel: 'Alias',
											name: 'salesEntityAlias'
										}
									]
								}
							]
						},
						{
							xtype: 'fieldset',
							flex: 1,
							collapsible: 'true',
							title: 'Personal',   
							layout: {
								type: 'column',
								align: 'stretch'
							},
							items: [
								{
									xtype: 'fieldcontainer',
									columnWidth : .5,
									fieldLabel: '',
									padding: 15,
									items: [
										{
											xtype: 'textfield',
											reference: 'phone',
											name: 'phone',
											minLength: 10,
											maxLength: 14,
											labelWidth: 100,
											width : '100%',
											allowBlank: false,
											emptyText: '+8801.........',
											fieldLabel: 'Mobile',
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
											fieldLabel: 'Email',
											width : '100%',
											reference: 'email',
											emptyText: 'example@domain.com',
											maxLength : 50,
											regex:/^[a-z0-9_\-\.]{2,}@[a-z0-9_\-\.]{2,}\.[a-z]{2,}$/i,
											regexText:'The email address format is not valid. Please try with a well formed email address.',
											blankText :  ' example@domain.com',
											name: 'email'
										}
									]
								},
								{
									xtype: 'fieldcontainer',
									columnWidth : .5,
									fieldLabel: '',
									padding: 15,
									items: [
										{
											xtype: 'textfield',
											reference: 'other',
											name: 'other',
											emptyText: 'Skype-Facebook-Others',
											labelWidth: 100,
											width : '100%',
											fieldLabel: 'Others'
										},
										{
											xtype: 'datefield',
											reference: 'dob',
											allowBlank: false,
											width : '100%',
											name: 'dob',
											labelWidth: 100,
											fieldLabel: 'Date of Birth',
											format: 'd/m/Y',
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
							title: 'Work',   
							layout: {
								type: 'column',
								align: 'stretch'
							},
							items: [
								{
									xtype: 'fieldcontainer',
									columnWidth : .5,
									fieldLabel: '',
									padding: 15,
									items: [
										{
											xtype: 'textfield',
											reference: 'salesEntityIdentity',
											labelWidth: 100,
											width : '100%',
											//disabled: true,
											readOnly: true,
											fieldStyle: 'background-color: #999; background-image: none;',
											fieldLabel: 'Identity',
											name: 'salesEntityIdentity'
										},
										{
											xtype: 'textareafield',
											reference: 'address',
											labelWidth: 100,
											width : '100%',
											fieldLabel: 'Address',
											name: 'address',
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
											fieldLabel: 'Comments',
											name: 'description'
										}
									]
								},
								{
									xtype: 'fieldcontainer',
									columnWidth : .5,
									fieldLabel: '',
									padding: 15,
									items: [
										{
											xtype: 'datefield',
											reference: 'entryDate',
											allowBlank: false,
											width : '100%',
											name: 'entryDate',
											labelWidth: 100,
											fieldLabel: 'Entry Date',
											format: 'd/m/Y'
										},
										{
											xtype: 'datefield',
											reference: 'exitDate',
											allowBlank: false,
											width : '100%',
											name: 'exitDate',
											labelWidth: 100,
											fieldLabel: 'Exit Date',
											format: 'd/m/Y'
										},
										{
											xtype: 'combobox',
											labelWidth: 100,
											width : '100%',
											reference: 'salesEntityType',
											fieldLabel: 'Entity Type',
											displayField: 'salesEntityType',
											valueField: 'typeValueId',
											editable: true,
											name: 'typeValueId',
											queryMode: 'local',
											triggerAction: 'all',
											allowBlank: false,
											emptyText: 'Agent or Vendor',
											afterLabelTextTpl: [
												'<span style="color:red;font-weight:bold" data-qtip="Required">*</span>'
											],
											validator:function(text){
												return (text.length==0 || Ext.util.Format.trim(text).length!=0);
											},
											bind: {
												store: 'SeTypes'
											}
										},
										{
											xtype: 'textfield',
											reference: 'salesEntityId',
											name: 'salesEntityId',
											hidden: true
										},
										{
											xtype: 'textfield',
											reference: 'salesEntityVer',
											name: 'salesEntityVer',
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