Ext.define('Admin.view.salesEntity.SalesEntityModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.salesentity-salesentity',
    data: {
        name: 'Admin'
    },
	requires: [
		'Ext.data.Store',
		'Admin.model.SalesEntity'
	],

	stores: {
		salesEntityStore: {
			model: 'Admin.model.SalesEntity'
		}
	}
});
