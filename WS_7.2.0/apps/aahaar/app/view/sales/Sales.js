
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
			title: 'Sales',
			iconCls: 'x-fa fa-balance-scale',
			dockedItems: [
				{
					xtype: 'toolbar',
					dock: 'top',
					items: [
						{
							xtype: 'textfield',
							reference:'sProduct',
							emptyText: 'Product',
							margin : '0 0 0 10',
							width: 150
						},
						{
							xtype: 'textfield',
							reference:'sEntity',
							emptyText: 'Entity Id',
							margin : '0 0 0 10',
							width: 150
						},
						{
							xtype: 'datefield',
							format: 'd/m/Y',
							fieldLabel: 'Date',
							margin : '0 0 0 10',
							labelWidth: 40,
							width: 150,
							reference: 'orderDate',
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
							text: 'Clear',
							style: 'border: groove',
							iconCls: 'fa fa-eraser',
							reference: 'orderClrBtn',
							listeners: {
								click: 'onClear'
							}
						},
						{
							xtype: 'button',
							text: 'Search',
							margin : '0 0 0 10',
							style: 'border: groove',
							iconCls: 'fa fa-search',
							reference: 'salesSrcBtn',
							listeners: {
								click: 'onSearchSales'
							}
						},
						{
							xtype: 'button',
							text: 'Report',
							margin: '0 0 0 10',
							style: 'border: groove',
							iconCls: 'fa fa-file-pdf',
							reference: 'salesRpt',
							listeners: {
								click: 'getSalesRpt'
							}
						},
						{
							xtype: 'button',
							margin: '0 0 0 10',
							text: 'Add',
							style: 'border: groove',
							reference:'addExpense',
							iconCls: 'fa fa-plus-circle',
							listeners: {
								click: 'onAddExpense'
							}
						}
					]
				}
			],
			xtype: 'gridpanel',
			height: 0.87 * (window.innerHeight),
			reference: 'salesGrd',
			bind: {
				store: 'SalesStore'
			},
			columns: [
				{
					xtype: 'gridcolumn',
					text: 'Product',
					dataIndex: 'productName',
					filter: {
						type: 'string'
					}
				},
				{
					xtype: 'gridcolumn',
					text: 'Category',
					dataIndex: 'categoryName',
					filter: {
						type: 'string'
					}
				},
				{
					xtype: 'gridcolumn',
					text: 'Quantity',
					dataIndex: 'quantity',
					filter: {
						type: 'number'
					}
				},
				{
					xtype: 'gridcolumn',
					text: 'Entity Id',
					dataIndex: 'salesEntityIdentity',
					filter: {
						type: 'string'
					}
				},
				{
					xtype: 'gridcolumn',
					text: 'Returned',
					dataIndex: 'itemReturned',
					filter: {
						type: 'number'
					}
				},
				{
					xtype: 'gridcolumn',
					text: 'Unit Price',
					dataIndex: 'unitPrice',
					filter: {
						type: 'number'
					}
				},
				{
					xtype: 'gridcolumn',
					text: 'Total',
					dataIndex: 'totalAmount',
					filter: {
						type: 'number'
					}
				},
				{
					xtype: 'datecolumn',
					text: 'Date',
					dataIndex: 'orderDate',
					renderer: Ext.util.Format.dateRenderer('d-M-y'),
					filter: {
						type: 'date'
					}
				},
				{
					xtype: 'gridcolumn',
					text: 'Location',
					dataIndex: 'description',
					filter: {
						type: 'string'
					}
				},
				{
					xtype: 'gridcolumn',
					text: 'Id',
					dataIndex: 'salesId',
					hidden: true
				},
				{
					xtype: 'gridcolumn',
					text: 'Ver',
					dataIndex: 'salesVer',
					hidden: true
				},
				{
					xtype: 'gridcolumn',
					text: 'P. Id',
					dataIndex: 'productId',
					hidden: true
				},
				{
					xtype: 'gridcolumn',
					text: 'E. Id',
					dataIndex: 'salesEntityId',
					hidden: true
				}
			],
			plugins: [
				{
					ptype: 'gridfilters'
				}
			],
			viewConfig: {
				enableTextSelection : true
			}
		},
		{
			xtype: 'panel',
			title: 'Entity Report',
			reference: 'entityReport',
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
