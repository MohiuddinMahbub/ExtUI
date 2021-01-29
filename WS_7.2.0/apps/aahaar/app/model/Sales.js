Ext.define('Admin.model.Sales', {
	extend: 'Admin.model.Base',

	fields: [
		{
			type: 'int',
			name: 'orderId'
		},
		{
			type: 'int',
			name: 'orderVer'
		},
		{
			type: 'int',
			name: 'salesId'
		},
		{
			type: 'int',
			name: 'salesVer'
		},
		{
			type: 'int',
			name: 'productId'
		},
		{
			type: 'int',
			name: 'salesEntityId'
		},
		{
			type: 'string',
			name: 'productName'
		},
		{
			type: 'string',
			name: 'salesEntityName'
		},
		{
			type: 'string',
			name: 'salesEntityIdentity'
		},
		{
			type: 'string',
			name: 'quantity'
		},
		{
			type: 'string',
			name: 'stock'
		},
		{
			type: 'string',
			name: 'categoryName'
		},
		{
			type: 'string',
			name: 'itemReturned'
		},
		{
			type: 'float',
			name: 'unitPrice'
		},
		{
			type: 'float',
			name: 'totalAmount'
		},
		{
			type: 'date',
			name: 'orderDate',
			convert: function(v, record ) {
				return new Date(record.get('orderDate'))
			}
		},
		{
			type: 'string',
			name: 'description'
		},
		{
			type: 'date',
			name: 'salesDate'
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
