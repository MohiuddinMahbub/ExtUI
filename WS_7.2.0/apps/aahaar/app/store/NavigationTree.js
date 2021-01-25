Ext.define('Admin.store.NavigationTree', {
	extend: 'Ext.data.TreeStore',

	storeId: 'NavigationTree',

	fields: [{
		name: 'text'
	}],

	root: {
		expanded: true,
		children: [
			{
				text: 'Sales Entities',
				iconCls: 'x-fa fa-desktop',
				viewType: 'salesentity',
				leaf: true
			},
			{
				text: 'Sales',
				iconCls: 'x-fa fa-sitemap',
				viewType: 'product',
				leaf: true
			},
			{
				text: 'Reports',
				iconCls: 'x-fab fa-leanpub',
				viewType: 'sales',
				leaf: true
			}
		]
	}
});
