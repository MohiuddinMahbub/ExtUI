
Ext.define('Admin.view.product.Product',{
	extend: 'Ext.tab.Panel',
	xtype: 'product',

	requires: [
		'Admin.view.product.ProductController',
		'Admin.view.product.ProductModel'
	],

	controller: 'product-product',
	viewModel: {
		type: 'product-product'
	},
	
	cls: 'shadow',
	margin: 10,
	listeners: {
		render: 'onRender'
	},

	items: [
		{
			title: 'Sales',
			iconCls: 'x-fa fa-home',
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
							width: 200
						},
						{
							xtype: 'textfield',
							reference:'sEntity',
							emptyText: 'Entity Id',
							margin : '0 0 0 10',
							width: 200
						},
						{
							xtype: 'button',
							padding: 2,
							margin : '0 0 0 10',
							text: 'Search',
							iconCls: 'fa fa-search',
							reference: 'salesSrcBtn',
							listeners: {
								click: 'onSearchSales'
							}
						},
						'->',
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
				// Bind Store that refers data store data model
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
			title: 'Orders',
			iconCls: 'x-fa fa-tasks',
			dockedItems: [
				{
					xtype: 'toolbar',
					dock: 'top',
					items: [
						{
							xtype: 'textfield',
							reference:'oProduct',
							emptyText: 'Product',
							margin : '0 0 0 10',
							width: 200
						},
						{
							xtype: 'textfield',
							reference:'oEntity',
							emptyText: 'Entity',
							margin : '0 0 0 10',
							width: 200
						},
						{
							xtype: 'button',
							padding: 2,
							margin : '0 0 0 10',
							text: 'Search',
							iconCls: 'fa fa-search',
							reference: 'orderSrcBtn',
							listeners: {
								click: 'onSearchOrder'
							}
						},
						'->',
						{
							xtype: 'button',
							margin: '0 0 0 10',
							text: 'Add',
							style: 'border: groove',
							reference:'addOrder',
							iconCls: 'fa fa-plus-circle',
							listeners: {
								click: 'onAddOrder'
							}
						}
					]
				}
			],
			xtype: 'gridpanel',
			height: 0.87 * (window.innerHeight),
			reference: 'orderGrd',
			listeners: {
				itemdblclick: 'onOrderDblClck'
			},
			bind: {
				// Bind Store that refers data store data model
				store: 'OrderStore'
			},
			columns: [
				{
					xtype: 'gridcolumn',
					text: 'Entity',
					dataIndex: 'salesEntityName',
					filter: {
						type: 'string'
					}
				},
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
					text: 'Unit Price',
					dataIndex: 'unitPrice',
					filter: {
						type: 'number'
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
					text: 'Returned',
					dataIndex: 'itemReturned',
					filter: {
						type: 'number'
					}
				},
				{
					xtype: 'gridcolumn',
					text: 'Stock',
					dataIndex: 'stock',
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
					width: 500,
					dataIndex: 'description',
					filter: {
						type: 'string'
					}
				},
				{
					xtype: 'datecolumn',
					text: 'Modified On',
					dataIndex: 'modifiedOn',
					renderer: Ext.util.Format.dateRenderer('d-M-y'),
					hidden: true,
					filter: {
						type: 'date'
					}
				},
				{
					xtype: 'gridcolumn',
					text: 'Id',
					dataIndex: 'orderId',
					hidden: true
				},
				{
					xtype: 'gridcolumn',
					text: 'Ver',
					dataIndex: 'orderVer',
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
			title: 'Categories',
			iconCls: 'x-fa fa-tag',
			dockedItems: [
				{
					xtype: 'toolbar',
					dock: 'top',
					items: [
						{
							xtype: 'textfield',
							reference:'pCategory',
							emptyText: 'Category',
							margin : '0 0 0 10',
							width: 200
						},
						{
							xtype: 'button',
							padding: 2,
							margin : '0 0 0 10',
							text: 'Search',
							iconCls: 'fa fa-search',
							reference: 'catSrcBtn',
							listeners: {
								click: 'onSearchCat'
							}
						},
						'->',
						{
							xtype: 'button',
							margin: '0 0 0 10',
							text: 'Add',
							style: 'border: groove',
							reference:'addCat',
							iconCls: 'fa fa-plus-circle',
							listeners: {
								click: 'onCatAdd'
							}
						}
					]
				}
			],
			xtype: 'gridpanel',
			height: 0.87 * (window.innerHeight),
			reference: 'catGrd',
			listeners: {
				itemdblclick: 'onCatDblClck'
			},
			bind: {
				// Bind Store that refers data store data model
				store: 'CategoryStore'
			},
			columns: [
				{
					xtype: 'gridcolumn',
					text: 'Name',
					dataIndex: 'categoryName',
					filter: {
						type: 'string'
					}
				},
				{
					xtype: 'gridcolumn',
					text: 'Desc.',
					width: 500,
					dataIndex: 'description',
					filter: {
						type: 'string'
					}
				},
				{
					xtype: 'datecolumn',
					text: 'Date',
					dataIndex: 'modifiedOn',
					renderer: Ext.util.Format.dateRenderer('d-M-y'),
					hidden: true,
					filter: {
						type: 'date'
					}
				},
				{
					xtype: 'gridcolumn',
					text: 'Id',
					dataIndex: 'categoryId',
					hidden: true
				},
				{
					xtype: 'gridcolumn',
					text: 'Ver',
					dataIndex: 'categoryVer',
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
			title: 'Products',
			iconCls: 'x-fa fa-binoculars',
			dockedItems: [
				{
					xtype: 'toolbar',
					dock: 'top',
					items: [
						{
							xtype: 'textfield',
							reference:'pName',
							emptyText: 'Name',
							margin : '0 0 0 10',
							width: 200
						},
						{
							xtype: 'button',
							padding: 2,
							margin : '0 0 0 10',
							text: 'Search',
							iconCls: 'fa fa-search',
							reference: 'productSrcBtn',
							listeners: {
								click: 'onSearchProduct'
							}
						},
						'->',
						{
							xtype: 'button',
							margin: '0 0 0 10',
							text: 'Add',
							style: 'border: groove',
							reference:'addProduct',
							iconCls: 'fa fa-plus-circle',
							listeners: {
								click: 'onAddProduct'
							}
						}
					]
				}
			],
			xtype: 'gridpanel',
			height: 0.87 * (window.innerHeight),
			reference: 'productGrd',
			listeners: {
				itemdblclick: 'onProductDblClck'
			},
			bind: {
				// Bind Store that refers data store data model
				store: 'ProductStore'
			},
			columns: [
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
					text: 'Name',
					dataIndex: 'productName',
					filter: {
						type: 'string'
					}
				},
				{
					xtype: 'gridcolumn',
					text: 'Brand',
					dataIndex: 'productBrand',
					filter: {
						type: 'string'
					}
				},
				{
					xtype: 'gridcolumn',
					text: 'Price',
					dataIndex: 'price',
					filter: {
						type: 'number'
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
					text: 'Available',
					dataIndex: 'isAvailable',
					filter: {
						type: 'string'
					},
					renderer : function(value){
						if(value == 1){
							return 'Yes';
						}
						else{
							return 'No';
						}
					}
				},
				{
					xtype: 'gridcolumn',
					text: 'Desc.',
					width: 500,
					dataIndex: 'description',
					filter: {
						type: 'string'
					}
				},
				{
					xtype: 'datecolumn',
					text: 'Date',
					dataIndex: 'modifiedOn',
					renderer: Ext.util.Format.dateRenderer('d-M-y'),
					hidden: true,
					filter: {
						type: 'date'
					}
				},
				{
					xtype: 'gridcolumn',
					text: 'Id',
					dataIndex: 'productId',
					hidden: true
				},
				{
					xtype: 'gridcolumn',
					text: 'Ver',
					dataIndex: 'productVer',
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
		}
	]
});
