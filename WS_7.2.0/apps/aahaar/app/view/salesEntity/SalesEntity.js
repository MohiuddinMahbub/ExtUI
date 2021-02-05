
Ext.define('Admin.view.salesEntity.SalesEntity',{
	extend: 'Ext.panel.Panel',
	xtype: 'salesentity',

	requires: [
		'Admin.view.salesEntity.SalesEntityController',
		'Admin.view.salesEntity.SalesEntityModel',
		'Ext.Img',
		'Ext.grid.Panel',
		'Ext.form.field.Date',
		'Ext.grid.column.Date',
		'Ext.layout.container.Card'
	],

	controller: 'salesentity-salesentity',
	viewModel: {
		type: 'salesentity-salesentity'
	},

	cls: 'shadow',
	//activeTab: 0,
	margin: 10,
	listeners: {
		render: 'onRender'
	},

	items: [
		{
			title: 'Entities',
			tools: [
				{
					type:'refresh',
					tooltip: 'Refresh',
					listeners : {
						click : 'onRender'
					}
				}
			],
			dockedItems: [
				{
					xtype: 'toolbar',
					dock: 'top',
					items: [
						{
							xtype: 'textfield',
							reference:'sePhone',
							emptyText: 'Phone',
							margin : '0 0 0 10',
							width: 200
						},
						{
							xtype: 'textfield',
							reference:'seIdntt',
							emptyText: 'Identity',
							margin : '0 0 0 10',
							width: 200
						},
						{
							xtype: 'textfield',
							reference:'seAlias',
							emptyText: 'Alias',
							margin : '0 0 0 10',
							width: 200
						},
						'->',
						{
							xtype: 'button',
							padding: 2,
							margin : '0 0 0 10',
							text: 'Search',
							style: 'border: groove',
							iconCls: 'fa fa-search',
							reference: 'enttSrcBtn',
							listeners: {
								click: 'onSearchSe'
							}
						},
						{
							xtype: 'button',
							margin: '0 0 0 10',
							text: 'Add New',
							style: 'border: groove',
							reference:'addSe',
							iconCls: 'fa fa-plus-circle',
							listeners: {
								click: 'onSeAdd'
							}
						}
					]
				},
				{
					xtype: 'toolbar',
					dock: 'top',
					items: [
						{
							xtype: 'textfield',
							reference:'grdFilter',
							iconCls: 'fa fa-search',
							emptyText: 'Find in Grid',
							padding: 3,
							left: '6px',
							width: 200,
							margin : '0 0 0 10',
							listeners: {
								change:  'onSeGridFltr'
							}
						}
					]
				}
			],
			xtype: 'gridpanel',
			height: 0.87 * (window.innerHeight),
			reference: 'entityGrd',
			listeners: {
				itemdblclick: 'onSegDblClck'
			},
			bind: {
				// Bind Store that refers data store data model
				store: 'EntityStore'
			},
			columns: [
				{
					xtype: 'gridcolumn',
					text: 'Name',
					dataIndex: 'salesEntityName',
					filter: {
						type: 'string'
					}
				},
				{
					xtype: 'gridcolumn',
					text: 'Alias',
					dataIndex: 'salesEntityAlias',
					filter: {
						type: 'string'
					}
				},
				{
					xtype: 'gridcolumn',
					text: 'Phone',
					width: 200,
					dataIndex: 'phone',
					filter: {
						type: 'string'
					}
				},
				{
					xtype: 'gridcolumn',
					text: 'Email',
					dataIndex: 'email',
					width: 220,
					filter: {
						type: 'string'
					}
				},
				{
					xtype: 'gridcolumn',
					text: 'Identity',
					width: 160,
					dataIndex: 'salesEntityIdentity',
					filter: {
						type: 'string'
					}
				},
				{
					xtype: 'gridcolumn',
					text: 'First Name',
					dataIndex: 'firstName',
					hidden: true,
					filter: {
						type: 'string'
					}
				},
				{
					xtype: 'gridcolumn',
					text: 'Last Name',
					dataIndex: 'lastName',
					hidden: true,
					filter: {
						type: 'string'
					}
				},
				{
					xtype: 'datecolumn',
					text: 'DoB.',
					width: 130,
					dataIndex: 'dob',
					renderer: Ext.util.Format.dateRenderer('d-M-y'),
					filter: {
						type: 'date'
					}
				},
				{
					xtype: 'datecolumn',
					text: 'Entry Date',
					dataIndex: 'entryDate',
					renderer: Ext.util.Format.dateRenderer('d-M-y'),
					filter: {
						type: 'date'
					}
				},
				{
					xtype: 'gridcolumn',
					text: 'Address',
					width: 300,
					dataIndex: 'address',
					filter: {
						type: 'string'
					}
				},
				{
					xtype: 'gridcolumn',
					text: 'Comments',
					width: 300,
					dataIndex: 'description',
					filter: {
						type: 'string'
					}
				},
				{
					xtype: 'datecolumn',
					text: 'Exit Date',
					dataIndex: 'exitDate',
					renderer: Ext.util.Format.dateRenderer('d-M-y'),
					hidden: true,
					filter: {
						type: 'date'
					}
				},
				{
					xtype: 'gridcolumn',
					text: 'Id',
					dataIndex: 'salesEntityId',
					hidden: true,
					filter: {
						type: 'string'
					}
				},
				{
					xtype: 'gridcolumn',
					text: 'Ver',
					dataIndex: 'salesEntityVer',
					hidden: true,
					filter: {
						type: 'string'
					}
				}
			],
			plugins: [
				{
					ptype: 'gridfilters'
				}
			],
			viewConfig: {
				enableTextSelection : true,
				getRowClass: function(record, rowIndex, rowParams, store) { 
					if(record.get('salesEntityIdentity').includes('AGENT')){
						return 'x-cell-bold';
					}
					else{
						return 'x-row-no-color';
					}
				}
			}
		}
	]
});
