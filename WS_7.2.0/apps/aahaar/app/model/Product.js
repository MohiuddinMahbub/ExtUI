Ext.define('Admin.model.Product', {
	extend: 'Admin.model.Base',

	fields: [
		{
			type: 'int',
			name: 'categoryId'
		},
		{
			type: 'int',
			name: 'categoryVer'
		},
		{
			type: 'int',
			name: 'productId'
		},
		{
			type: 'int',
			name: 'productVer'
		},
		{
			type: 'string',
			name: 'categoryName'
		},
		{
			type: 'string',
			name: 'quantity'
		},
		{
			type: 'string',
			name: 'isAvailable'
		},
		{
			type: 'string',
			name: 'productName'
		},
		{
			type: 'string',
			name: 'productBrand'
		},
		{
			type: 'string',
			name: 'description'
		},
		{
			type: 'float',
			name: 'price'
		},
		{
			type: 'date',
			name: 'modifiedOn',
			convert: function(v, record ) {
				return new Date(record.get('modifiedOn'))
			}
		}
	]
});
