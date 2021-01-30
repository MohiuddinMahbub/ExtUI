
Ext.define('Admin.view.sales.Sales',{
	extend: 'Ext.tab.Panel',
	xtype: 'sales',

	requires: [
		'Admin.view.sales.SalesController',
		'Admin.view.sales.SalesModel'
	],

	controller: 'sales-sales',
	viewModel: {
		type: 'sales-sales'
	},

	margin: 10,

	items: [
		{
			xtype: 'panel',
			reference: 'salesReport',
			title: 'Sales',
			iconCls: 'x-fa fa-balance-scale',
			width : '100%',
			dockedItems: [
				{
					xtype: 'toolbar',
					dock: 'top',
					items : [
						
						{
							xtype: 'datefield',
							format: 'd/m/Y',
							fieldLabel: 'Date',
							margin : '0 0 0 10',
							labelWidth: 40,
							width: 150,
							reference: 'salesDate',
							maxValue: new Date(),
							listeners: {
								render: function(datefield) {
									datefield.setValue(new Date());
								}
							}
						},
						'->',
						{
							xtype: 'button',
							padding: 2,
							text: 'Report',
							iconCls: 'fa fa-file-pdf',
							reference: 'salesRpt',
							listeners: {
								click: 'getSalesRpt'
							}
						}						
					]
				}
			]
		},
		{
			xtype: 'panel',
			reference: 'entityReport',
			title: 'Entity Report',
			iconCls: 'x-fa fa-paper-plane',
			width : '100%',
			dockedItems: [
				{
					xtype: 'toolbar',
					dock: 'top',
					items : [
						{
							xtype: 'textfield',
							emptyText: 'Identity',
							reference: 'identityNo',
							margin : '0 0 0 10',
							width: 150
						},
						{
							xtype: 'combobox',
							width : '100%',
							margin : '0 0 0 10',
							width: 120,
							reference: 'salesEntityType',
							emptyText: 'Entity Type',
							displayField: 'salesEntityType',
							valueField: 'typeValueId',
							editable: true,
							name: 'typeValueId',
							queryMode: 'local',
							triggerAction: 'all',
							emptyText: 'Agent or Vendor',
							bind: {
								store: 'SeTypes'
							}
						},
						{
							xtype: 'datefield',
							format: 'd/m/Y',
							fieldLabel: 'From',
							margin : '0 0 0 10',
							labelWidth: 40,
							width: 150,
							reference: 'entityFromDate',
							blankText : 'From date is require.',
							listeners : {
								render : function(datefield) {
									datefield.setValue(new Date());
								}
							}
						},
						{
							xtype: 'datefield',
							fieldLabel: 'To',
							format: 'd/m/Y',
							margin : '0 0 0 10',
							labelWidth: 20,
							width: 150,
							reference: 'entityToDate',
							blankText: 'To date is require.',
							maxValue: new Date(),
							listeners: {
								render: function(datefield) {
									datefield.setValue(new Date());
								}
							}
						},
						'->',
						{
							xtype: 'button',
							padding: 2,
							text: 'Report',
							iconCls: 'fa fa-file-pdf',
							reference: 'entityRpt',
							listeners: {
								click: 'getEntityRpt'
							}
						}						
					]
				}
			]
		}
	]
});
