Ext.define('Admin.model.SalesEntity', {
	extend: 'Admin.model.Base',

	fields: [
		{
			type: 'int',
			name: 'salesEntityId'
		},
		{
			type: 'int',
			name: 'salesEntityVer'
		},
		{
			type: 'int',
			name: 'typeValueId'
		},
		{
			type: 'string',
			name: 'firstName'
		},
		{
			type: 'string',
			name: 'lastName'
		},
		{
			type: 'string',
			name: 'salesEntityName'
		},
		{
			type: 'string',
			name: 'salesEntityAlias'
		},
		{
			type: 'string',
			name: 'salesEntityIdentity'
		},
		{
			type: 'string',
			name: 'salesEntityType'
		},
		{
			type: 'string',
			name: 'email'
		},
		{
			type: 'string',
			name: 'phone'
		},
		{
			type: 'string',
			name: 'address'
		},
		{
			type: 'string',
			name: 'description'
		},
		{
			type: 'date',
			name: 'dob',
			convert: function(v, record ) {
				return new Date(record.get('dob'))
			}
		},
		{
			type: 'date',
			name: 'entryDate',
			convert: function(v, record ) {
				return new Date(record.get('entryDate'))
			}
		},
		{
			type: 'date',
			name: 'exitDate',
			convert: function(v, record ) {
				return new Date(record.get('exitDate'))
			}
		}
	]
});
