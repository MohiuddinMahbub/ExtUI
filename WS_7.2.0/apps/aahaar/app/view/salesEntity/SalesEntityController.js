Ext.define('Admin.view.salesEntity.SalesEntityController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.salesentity-salesentity',
	requires: [
		'Admin.view.salesEntity.Details'
	],

	/**
	* On main view render function
	* @author: Md. Mahbub Hasan Mohiuddin
	* @since 2021-01-17
	*/
	onRender: function(){
		var me = this;		
		me.onLoadSeType();
	},

	/**
	* @author: Md. Mahbub Hasan Mohiuddin
	* Send request to server for getting initial data for sales entities
	* @since 2021-01-17
	*/
	onSearchSe: function(){
		var me = this;
		var jsonString = null;
		Ext.getBody().mask('Loading...');
		
		var phone 				= me.lookupReference('sePhone').value;
		var salesEntityAlias	= me.lookupReference('seAlias').value;
		var salesEntityIdentity = me.lookupReference('seIdntt').value;
		
		var header = {
			actionName 		: appActionType.ACTION_TYPE_SELECT,
			serviceName 	: appContentType.CONTENT_TYPE_SALES_ENTITY
		};

		var payload = {
			userModifiedId 		: gUserId,
			phone				: isEmpty(phone),
			salesEntityAlias	: isEmpty(salesEntityAlias),
			salesEntityIdentity	: isEmpty(salesEntityIdentity),
			actionName 			: appActionType.ACTION_TYPE_SELECT
		};
		
		jsonString = mPromise.createJson(header, payload);
		mPromise.sendRequestDeffered(SERVER_URL, jsonString, mMask)
		.then(function (response) {
			
			var items = response.payload;

			var store = Ext.data.StoreManager.lookup('EntityStore');
			store.removeAll();
			store.add(items);
		})
		.otherwise(function(reason){
			me.onFailed(reason);
		})
		.always(function(){			
			Ext.getBody().unmask();
		})
		.done();
	},

	/**
	* @author: Md. Mahbub Hasan Mohiuddin
	* Send request to server for getting initial data for sales entities
	* @since 2021-01-17
	*/
	onLoadSeType: function(){
		var me = this;
		var jsonString = null;
		
		Ext.getBody().mask('Loading...');

		var header = {
			actionName: appActionType.ACTION_TYPE_SELECT_TYPE,
			serviceName: appContentType.CONTENT_TYPE_SALES_ENTITY
		};

		var payload = {
			userModifiedId	: gUserId,
			actionName 		: appActionType.ACTION_TYPE_SELECT_TYPE
		};
		
		jsonString = mPromise.createJson(header, payload);
		
		var header1 = {
			actionName: appActionType.ACTION_TYPE_SELECT,
			serviceName: appContentType.CONTENT_TYPE_SALES_ENTITY
		};

		var payload1 = {
			userModifiedId 	: gUserId,
			actionName 		: appActionType.ACTION_TYPE_SELECT,
			validFrom		: Ext.Date.format(new Date(), 'Ymd'),
			validTo			: Ext.Date.format(new Date(), 'Ymd'),
		};

		jsonString1 = mPromise.createJson(header1, payload1);

		var promises = [
			mPromise.sendRequestDeffered(SERVER_URL, jsonString)
			, mPromise.sendRequestDeffered(SERVER_URL, jsonString1)
		];
		
		Ext.Promise.all(promises).then(function(values){

			var store = Ext.data.StoreManager.lookup('SeTypes');
			store.removeAll();
			store.add(values[0].payload);

			//console.log(items);
			var store = Ext.data.StoreManager.lookup('EntityStore');
			store.removeAll();
			store.add(values[1].payload);
			
			/*var items = [].concat(values[0], values[1]);
			console.log(items);*/
			Ext.getBody().unmask();
		});
	},

	/**
	* Double clicking on the sales entity grid to shows details form
	* @author: mahbub.hasan
	* @since 18 Jan 2021
	*/
	onSegDblClck: function (view, rec, item, index, e) {

		var win = Ext.create('Admin.view.salesEntity.Details');
		
		win.lookupReference('newSe').setHidden(true);
		win.lookupReference('updSe').setHidden(false);
		win.lookupReference('entryDate').setDisabled(true);
		
		/*Load record in form*/
		var form = win.lookupReference('sEnttForm').getForm();

		form.loadRecord(rec);

		win.show();
	},

	/**
	* Create button click
	* @author: mahbub.hasan
	* @since 18 Jan 2021
	*/
	onSeAdd: function (view, rec, item, index, e) {

		var win = Ext.create('Admin.view.salesEntity.Details');
		
		/*Load record in form*/
		win.title = 'New Entity';
		win.lookupReference('exitDate').setDisabled(true);
		win.lookupReference('updSe').setHidden(true);
		win.lookupReference('newSe').setHidden(false);

		win.show();
	},

	/**
	* Close Sales Entity Form button click
	* @author: mahbub.hasan
	* @since 18 Jan 2021
	*/
	onCloseSeFrm: function (view, e) {

		var me = this;
		me.getView().destroy();
	},

	/**
	* Create new Sales Entity function
	* @author: mahbub.hasan
	* @since 18 Jan 2021
	*/
	onSaveEntity: function (button, action, e) {

		var me = this;
		var jsonString = null;
		
		var firstName 			= me.lookupReference('firstName').value;
		var lastName 			= me.lookupReference('lastName').value;
		var salesEntityName 	= me.lookupReference('salesEntityName').value;
		var salesEntityAlias	= me.lookupReference('salesEntityAlias').value;
		var salesEntityIdentity = me.lookupReference('salesEntityIdentity').value;
		var email 				= me.lookupReference('email').value;
		var phone 				= me.lookupReference('phone').value;
		var address 			= me.lookupReference('address').value;
		var other 				= me.lookupReference('other').value;
		var dob 				= me.lookupReference('dob').value;
		var entryDate 			= me.lookupReference('entryDate').value;
		var exitDate 			= me.lookupReference('exitDate').value;
		var description			= me.lookupReference('description').value;
		var typeValueId 		= me.lookupReference('salesEntityType').value;
		var salesEntityType 	= me.lookupReference('salesEntityType').rawValue;
		
		var salesEntityId 	= me.lookupReference('salesEntityId').value;
		var salesEntityVer 	= me.lookupReference('salesEntityVer').value;

		var header = {
			actionName: appActionType.ACTION_TYPE_NEW,
			serviceName: appContentType.CONTENT_TYPE_SALES_ENTITY
		};

		var payload = {
			firstName 			: isEmpty(firstName),
			lastName 			: isEmpty(lastName),
			salesEntityName 	: isEmpty(salesEntityName),
			salesEntityAlias	: isEmpty(salesEntityAlias),
			salesEntityIdentity : isEmpty(salesEntityIdentity),
			email 				: isEmpty(email),
			phone 				: isEmpty(phone),
			address 			: isEmpty(address),
			other 				: isEmpty(other),
			dob 				: isEmpty(dob),
			entryDate 			: isEmpty(entryDate),
			exitDate 			: isEmpty(exitDate),
			description 		: isEmpty(description),
			typeValueId 		: isEmpty(typeValueId),
			salesEntityType		: isEmpty(salesEntityType),
			salesEntityId		: isEmpty(salesEntityId),
			salesEntityVer		: isEmpty(salesEntityVer),
			userModifiedId		: gUserId
		};

		Ext.MessageBox.confirm('Confirm', 'Are you sure?', function(btn) {

			if (btn == 'yes') {
				
				if(button.reference == 'updSe'){
					header.actionName = appActionType.ACTION_TYPE_UPDATE;
				}
				else if(button.reference == 'newSe'){
					payload.salesEntityId = null;
					payload.salesEntityVer = null;
				}

				Ext.getBody().mask('Please wait...');
				
				me.getView().doClose();
				
				jsonString = mPromise.createJson(header, payload);

				mPromise.sendRequestDeffered(SERVER_URL, jsonString, mMask)
				.then(function (response) {
					
					var items = response.payload;

					//console.log(items);
					var header = {
						actionName 		: appActionType.ACTION_TYPE_SELECT,
						serviceName 	: appContentType.CONTENT_TYPE_SALES_ENTITY
					};

					var payload = {
						userModifiedId 		: gUserId,
						salesEntityIdentity : items.salesEntityIdentity
					};

					jsonString = mPromise.createJson(header, payload);
					return mPromise.sendRequestDeffered(SERVER_URL, jsonString);				
				})
				.then(function (response2){
					var items = response2.payload;
					//console.log(items);
					var store = Ext.data.StoreManager.lookup('EntityStore');
					store.removeAll();
					store.add(items);
				})
				.otherwise(function(reason){
					me.onFailed(reason);
				})
				.always(function(){			
					Ext.getBody().unmask();
				})
				.done();
			}
		});
	},

	/**
	* @author: mahbub.hasan
	* Filtering Sales Entity Grid data
	* @since 21 Jan 2021
	*/
	onSeGridFltr: function (component, newValue, oldValue, eOpts) {
		var me = this;
		
		var grid = me.lookupReference('entityGrd');
		grid.store.clearFilter();
		
		var fields = new Array(
			'salesEntityId',
			'salesEntityVer',
			'typeValueId',
			'firstName',
			'lastName',
			'salesEntityName',
			'salesEntityAlias',
			'salesEntityIdentity',
			'salesEntityType',
			'email',
			'phone',
			'address',
			'description',
			'dob',
			'entryDate',
			'exitDate'
		);

		if (newValue) {
			var matcher = new RegExp(Ext.String.escapeRegex(newValue), "i");
			grid.store.filter({
				filterFn: function (record) {
					var match = false;
					Ext.Object.each(record.data, function (property, value) {
						if (fields.indexOf(property) > -1) {
							match = match || matcher.test(String(value));
						}
					});
					return match;
				}
			});
		}
	},

	onFailed: function(status) {
		try {
			if (status == 500) {
				console.log(status);
				Ext.MessageBox.alert('An unexpected error occurred', 'Please try again later');
			}
			else{
				Ext.MessageBox.alert('Sorry!', status);
			}
		} catch(err){
			console.log(err.message);
		}
	}
});
