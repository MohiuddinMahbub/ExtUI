Ext.define('Admin.view.product.ProductController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.product-product',
	
	/**
	* On Product view render function
	* @author: Md. Mahbub Hasan Mohiuddin
	* @since 2021-01-17
	*/
	onRender: function(){
		var me = this;		
		me.onLoad();
	},

	/**
	* Close Form button click
	* @author: mahbub.hasan
	* @since 18 Jan 2021
	*/
	onCloseFrm: function (view, e) {
		var me = this;
		me.getView().destroy();
	},

	/**
	* @author: Md. Mahbub Hasan Mohiuddin
	* Send request to server for getting initial data for sales entities
	* @since 2021-01-17
	*/
	onLoad: function(){
		var me = this;
		var jsonString = null, jsonString1 = null;
		Ext.getBody().mask('Loading...');
		
		var header = {
			actionName 		: appActionType.ACTION_TYPE_SELECT_CATEGORY,
			serviceName 	: appContentType.CONTENT_TYPE_PRODUCT
		};

		var payload = {
			userModifiedId 		: gUserId,
			actionName 			: appActionType.ACTION_TYPE_SELECT_CATEGORY
		};
		
		var header1 = {
			actionName 		: appActionType.ACTION_TYPE_SELECT_PRODUCT,
			serviceName 	: appContentType.CONTENT_TYPE_PRODUCT
		};

		var payload1 = {
			userModifiedId 		: gUserId,
			actionName 			: appActionType.ACTION_TYPE_SELECT_PRODUCT
		};
		
		jsonString = mPromise.createJson(header, payload);		
		jsonString1 = mPromise.createJson(header1, payload1);

		var promises = [
			mPromise.sendRequestDeffered(SERVER_URL, jsonString)
			, mPromise.sendRequestDeffered(SERVER_URL, jsonString1)
		];
		
		Ext.Promise.all(promises).then(function(values){

			var catStore = Ext.data.StoreManager.lookup('CategoryStore');
			catStore.removeAll();
			catStore.add(values[0].payload);

			var pStore = Ext.data.StoreManager.lookup('ProductStore');
			pStore.removeAll();
			pStore.add(values[1].payload);
			
			Ext.getBody().unmask();
		});
	},

	/**
	* @author: Md. Mahbub Hasan Mohiuddin
	* Send request to server for getting initial data for sales entities
	* @since 2021-01-17
	*/
	onSearchCat: function(){
		var me = this;
		var jsonString = null;
		Ext.getBody().mask('Loading...');
		
		var header = {
			actionName 		: appActionType.ACTION_TYPE_SELECT_CATEGORY,
			serviceName 	: appContentType.CONTENT_TYPE_PRODUCT
		};

		var payload = {
			userModifiedId 		: gUserId,
			actionName 			: appActionType.ACTION_TYPE_SELECT_CATEGORY
		};
		
		jsonString = mPromise.createJson(header, payload);
		mPromise.sendRequestDeffered(SERVER_URL, jsonString, mMask)
		.then(function (response) {
			
			var items = response.payload;

			var store = Ext.data.StoreManager.lookup('CategoryStore');
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
	* Double clicking on the Category grid to shows details form
	* @author: mahbub.hasan
	* @since 18 Jan 2021
	*/
	onCatDblClck: function (view, rec, item, index, e) {

		var win = Ext.create('Admin.view.product.CatDetails');
		
		win.lookupReference('newCat').setHidden(true);
		win.lookupReference('updCat').setHidden(false);
		
		/*Load record in form*/
		var form = win.lookupReference('catForm').getForm();
		form.loadRecord(rec);

		win.show();
	},

	/**
	* Create Category button click
	* @author: mahbub.hasan
	* @since 18 Jan 2021
	*/
	onCatAdd: function (view, rec, item, index, e) {

		var win = Ext.create('Admin.view.product.CatDetails');
		
		/*Load record in form*/
		win.title = 'New Category';
		win.lookupReference('updCat').setHidden(true);
		win.lookupReference('newCat').setHidden(false);

		win.show();
	},

	/**
	* Create new Category function
	* @author: mahbub.hasan
	* @since 18 Jan 2021
	*/
	onSaveCategory: function (button, action, e) {

		var me = this;
		var jsonString = null;
		
		var categoryName 	= me.lookupReference('categoryName').value;
		var description 	= me.lookupReference('description').value;
		
		var categoryId 	= me.lookupReference('categoryId').value;
		var categoryVer 	= me.lookupReference('categoryVer').value;

		var header = {
			actionName: appActionType.ACTION_TYPE_NEW_CATEGORY,
			serviceName: appContentType.CONTENT_TYPE_PRODUCT
		};

		var payload = {
			userModifiedId	: gUserId,
			categoryId		: isEmpty(categoryId),
			categoryVer		: isEmpty(categoryVer),
			description 	: isEmpty(description),
			categoryName 	: isEmpty(categoryName)
		};

		Ext.MessageBox.confirm('Confirm', 'Are you sure?', function(btn) {

			if (btn == 'yes') {
				
				if(button.reference == 'updCat'){
					header.actionName = appActionType.ACTION_TYPE_UPDATE_CATEGORY;
				}
				else if(button.reference == 'newCat'){
					payload.categoryId = null;
					payload.categoryVer = null;
				}

				Ext.getBody().mask('Please wait...');
				
				me.getView().doClose();
				
				jsonString = mPromise.createJson(header, payload);

				mPromise.sendRequestDeffered(SERVER_URL, jsonString, mMask)
				.then(function (response) {
					
					var items = response.payload;

					//console.log(items);
					var header = {
						actionName 		: appActionType.ACTION_TYPE_SELECT_CATEGORY,
						serviceName 	: appContentType.CONTENT_TYPE_PRODUCT
					};

					var payload = {
						userModifiedId 		: gUserId
					};

					jsonString = mPromise.createJson(header, payload);
					return mPromise.sendRequestDeffered(SERVER_URL, jsonString);				
				})
				.then(function (response2){
					var items = response2.payload;
					//console.log(items);
					var store = Ext.data.StoreManager.lookup('CategoryStore');
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
	* Send request to server for getting data for Products
	* @author: Md. Mahbub Hasan Mohiuddin
	* @since 2021-01-17
	*/
	onSearchProduct: function(){
		var me = this;
		var jsonString = null;
		Ext.getBody().mask('Loading...');
		
		var productName = me.lookupReference('pName').value;

		var header = {
			actionName 		: appActionType.ACTION_TYPE_SELECT_PRODUCT,
			serviceName 	: appContentType.CONTENT_TYPE_PRODUCT
		};

		var payload = {
			userModifiedId 		: gUserId,
			productName 		: productName,
			actionName 			: appActionType.ACTION_TYPE_SELECT_PRODUCT
		};
		
		jsonString = mPromise.createJson(header, payload);
		mPromise.sendRequestDeffered(SERVER_URL, jsonString, mMask)
		.then(function (response) {
			
			var items = response.payload;

			var store = Ext.data.StoreManager.lookup('ProductStore');
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
	* Double clicking on the Product grid to shows details form
	* @author: mahbub.hasan
	* @since 18 Jan 2021
	*/
	onProductDblClck: function (view, rec, item, index, e) {

		var win = Ext.create('Admin.view.product.ProductDetails');
		
		win.lookupReference('newProduct').setHidden(true);
		win.lookupReference('updProduct').setHidden(false);
		
		if (rec.data.isAvailable == 1) {
			rec.data.isAvailable = "YES";
		}
		else{
			rec.data.isAvailable = "NO";
		}

		/*Load record in form*/
		var form = win.lookupReference('productForm').getForm();
		form.loadRecord(rec);

		win.show();
	},

	/**
	* Add Product button click
	* @author: mahbub.hasan
	* @since 18 Jan 2021
	*/
	onAddProduct: function (view, rec, item, index, e) {

		var win = Ext.create('Admin.view.product.ProductDetails');
		
		/*Load record in form*/
		win.title = 'New Product';
		win.lookupReference('updProduct').setHidden(true);
		win.lookupReference('newProduct').setHidden(false);

		win.show();
	},

	/**
	* Create new Product function
	* @author: mahbub.hasan
	* @since 18 Jan 2021
	*/
	onSaveProduct: function (button, action, e) {

		var me = this;
		var jsonString = null;
		
		var price 			= me.lookupReference('price').value;
		var isAvailable 	= me.lookupReference('isAvailable').value;
		var quantity 		= me.lookupReference('quantity').value;
		var productId 		= me.lookupReference('productId').value;
		var productVer 		= me.lookupReference('productVer').value;
		var description 	= me.lookupReference('description').value;		
		var productName 	= me.lookupReference('productName').value;
		var productBrand 	= me.lookupReference('productBrand').value;		
		var categoryId 		= me.lookupReference('categoryName').value;
		var categoryName 	= me.lookupReference('categoryName').rawValue;

		if (isAvailable == "YES") {
			isAvailable = 1;
		}
		else{
			isAvailable = 0;
		}

		var header = {
			actionName: appActionType.ACTION_TYPE_NEW,
			serviceName: appContentType.CONTENT_TYPE_PRODUCT
		};

		var payload = {
			userModifiedId	: gUserId,
			price 			: isEmpty(price),
			isAvailable 	: isEmpty(isAvailable),
			quantity 		: isEmpty(quantity),
			productId		: isEmpty(productId),
			productVer		: isEmpty(productVer),
			categoryId		: isEmpty(categoryId),
			description 	: isEmpty(description),
			categoryName 	: isEmpty(categoryName),
			productName 	: isEmpty(productName),
			productBrand 	: isEmpty(productBrand),
			actionName 		: appActionType.ACTION_TYPE_NEW
		};

		Ext.MessageBox.confirm('Confirm', 'Are you sure?', function(btn) {

			if (btn == 'yes') {
				
				if(button.reference == 'updProduct'){
					header.actionName = appActionType.ACTION_TYPE_UPDATE;
				}
				else if(button.reference == 'newProduct'){
					payload.productId = null;
					payload.productVer = null;
				}

				Ext.getBody().mask('Please wait...');
				
				me.getView().doClose();
				
				jsonString = mPromise.createJson(header, payload);

				mPromise.sendRequestDeffered(SERVER_URL, jsonString, mMask)
				.then(function (response) {
					
					var items = response.payload;

					//console.log(items);
					var header = {
						actionName 	: appActionType.ACTION_TYPE_SELECT_PRODUCT,
						serviceName : appContentType.CONTENT_TYPE_PRODUCT
					};

					var payload = {
						userModifiedId 	: gUserId,
						actionName 		: appActionType.ACTION_TYPE_SELECT_PRODUCT
					};

					jsonString = mPromise.createJson(header, payload);
					return mPromise.sendRequestDeffered(SERVER_URL, jsonString);				
				})
				.then(function (response2){
					var items = response2.payload;
					//console.log(items);
					var store = Ext.data.StoreManager.lookup('ProductStore');
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
	* Send request to server for getting Sales data
	* @author: Md. Mahbub Hasan Mohiuddin
	* @since 2021-01-17
	*/
	onSearchSales: function(){
		var me = this;
		var jsonString = null;
		Ext.getBody().mask('Loading...');
		
		var productName = me.lookupReference('sProduct').value;
		var salesEntityName = me.lookupReference('sEntity').value;

		var header = {
			actionName 		: appActionType.ACTION_TYPE_SELECT_SALES,
			serviceName 	: appContentType.CONTENT_TYPE_SALES
		};

		var payload = {
			userModifiedId 		: gUserId,
			productName 		: productName,
			salesEntityName 	: salesEntityName,
			actionName 			: appActionType.ACTION_TYPE_SELECT_SALES
		};
		
		jsonString = mPromise.createJson(header, payload);
		mPromise.sendRequestDeffered(SERVER_URL, jsonString, mMask)
		.then(function (response) {
			
			var items = response.payload;

			var store = Ext.data.StoreManager.lookup('SalesStore');
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
	* Send request to server for getting Order data
	* @author: Md. Mahbub Hasan Mohiuddin
	* @since 2021-01-17
	*/
	onSearchOrder: function(){
		var me = this;
		var jsonString = null;
		Ext.getBody().mask('Loading...');
		
		var productName = me.lookupReference('oProduct').value;
		var salesEntityName = me.lookupReference('oEntity').value;

		var header = {
			actionName 		: appActionType.ACTION_TYPE_SELECT_ORDER,
			serviceName 	: appContentType.CONTENT_TYPE_SALES
		};

		var payload = {
			userModifiedId 		: gUserId,
			productName 		: productName,
			salesEntityName 	: salesEntityName,
			actionName 			: appActionType.ACTION_TYPE_SELECT_ORDER
		};
		
		jsonString = mPromise.createJson(header, payload);
		mPromise.sendRequestDeffered(SERVER_URL, jsonString, mMask)
		.then(function (response) {
			
			var items = response.payload;

			var store = Ext.data.StoreManager.lookup('OrderStore');
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
	* Double clicking on the Sales grid to shows details form
	* @author: mahbub.hasan
	* @since 18 Jan 2021
	*/
	onOrderDblClck: function (view, rec, item, index, e) {

		var win = Ext.create('Admin.view.product.OrderDetails');
		
		win.lookupReference('newOrder').setHidden(true);
		win.lookupReference('updOrder').setHidden(false);
		
		/*Load record in form*/
		var form = win.lookupReference('orderForm').getForm();
		form.loadRecord(rec);

		win.show();
	},

	/**
	* Add Sales button click
	* @author: mahbub.hasan
	* @since 18 Jan 2021
	*/
	onAddOrder: function (view, rec, item, index, e) {

		var win = Ext.create('Admin.view.product.OrderDetails');
		
		/*Load record in form*/
		win.title = 'New Order';
		win.lookupReference('updOrder').setHidden(true);
		win.lookupReference('newOrder').setHidden(false);

		win.show();
	},

	/**
	* Create new Order function
	* @author: mahbub.hasan
	* @since 18 Jan 2021
	*/
	onSaveOrder: function (button, action, e) {

		var me = this;
		var jsonString = null;
		
		var stock 			= me.lookupReference('stock').value;
		var quantity 		= me.lookupReference('quantity').value;
		var unitPrice 		= me.lookupReference('unitPrice').value;
		var itemReturned 	= me.lookupReference('itemReturned').value;
		
		var productId 		= me.lookupReference('productName').value;		
		var productName 	= me.lookupReference('productName').rawValue;
		var salesEntityId 	= me.lookupReference('salesEntityName').value;
		var salesEntityName = me.lookupReference('salesEntityName').rawValue;		
		
		var orderDate 		= me.lookupReference('orderDate').value;
		
		var orderId 		= me.lookupReference('orderId').value;
		var orderVer 		= me.lookupReference('orderVer').value;
		var description 	= me.lookupReference('description').value;		
		
		var header = {
			actionName: appActionType.ACTION_TYPE_NEW,
			serviceName: appContentType.CONTENT_TYPE_SALES
		};

		var payload = {
			userModifiedId	: gUserId,
			orderId 		: isEmpty(orderId),
			orderVer 		: isEmpty(orderVer),
			stock 			: isEmpty(stock),
			quantity 		: isEmpty(quantity),
			unitPrice 		: isEmpty(unitPrice),
			productId		: isEmpty(productId),
			itemReturned 	: isEmpty(itemReturned),
			salesEntityId	: isEmpty(salesEntityId),
			description 	: isEmpty(description),
			orderDate 		: isEmpty(orderDate),
			productName 	: isEmpty(productName),
			salesEntityName : isEmpty(salesEntityName),
			actionName 		: appActionType.ACTION_TYPE_NEW
		};

		Ext.MessageBox.confirm('Confirm', 'Are you sure?', function(btn) {

			if (btn == 'yes') {
				
				if(button.reference == 'updOrder'){
					header.actionName = appActionType.ACTION_TYPE_UPDATE;
				}
				else if(button.reference == 'newOrder'){
					payload.salesId = null;
					payload.salesVer = null;
				}

				Ext.getBody().mask('Please wait...');
				
				me.getView().doClose();
				
				jsonString = mPromise.createJson(header, payload);

				mPromise.sendRequestDeffered(SERVER_URL, jsonString, mMask)
				.then(function (response) {
					
					var items = response.payload;

					//console.log(items);
					var header = {
						actionName 	: appActionType.ACTION_TYPE_SELECT_ORDER,
						serviceName : appContentType.CONTENT_TYPE_SALES
					};

					var payload = {
						userModifiedId 	: gUserId,
						actionName 		: appActionType.ACTION_TYPE_SELECT_ORDER
					};

					jsonString = mPromise.createJson(header, payload);
					return mPromise.sendRequestDeffered(SERVER_URL, jsonString);				
				})
				.then(function (response2){
					var items = response2.payload;
					//console.log(items);
					var store = Ext.data.StoreManager.lookup('OrderStore');
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
	* Double clicking on the Expense grid to shows details form
	* @author: mahbub.hasan
	* @since 18 Jan 2021
	*/
	onExpenseDblClck: function (view, rec, item, index, e) {

		var win = Ext.create('Admin.view.product.ExpenseDetails');
		
		win.lookupReference('newExpense').setHidden(true);
		win.lookupReference('updExpense').setHidden(false);
		
		/*Load record in form*/
		var form = win.lookupReference('expenseForm').getForm();
		form.loadRecord(rec);

		win.show();
	},

	/**
	* Add Expense button click
	* @author: mahbub.hasan
	* @since 18 Jan 2021
	*/
	onAddExpense: function (view, rec, item, index, e) {

		var win = Ext.create('Admin.view.product.ExpenseDetails');
		
		/*Load record in form*/
		win.title = 'Expense Entry';
		win.lookupReference('updExpense').setHidden(true);
		win.lookupReference('newExpense').setHidden(false);

		win.show();
	},

	/**
	* Create new Sales function
	* @author: mahbub.hasan
	* @since 18 Jan 2021
	*/
	onSaveExpense: function (button, action, e) {

		var me = this;
		var jsonString = null;
		
		var salesId 		= me.lookupReference('salesId').value;
		var salesVer 		= me.lookupReference('salesVer').value;
		var unitPrice 		= me.lookupReference('unitPrice').value;		
		var salesDate 		= me.lookupReference('salesDate').value;		
		var description 	= me.lookupReference('description').value;		
		
		var header = {
			actionName: appActionType.ACTION_TYPE_NEW_EXPENSE,
			serviceName: appContentType.CONTENT_TYPE_SALES
		};

		var payload = {
			quantity 		: null,
			productName 	: null,
			salesEntityName : null,
			salesEntityId	: null,
			productId		: null,
			userModifiedId	: gUserId,
			salesId 		: isEmpty(salesId),
			salesVer 		: isEmpty(salesVer),
			unitPrice 		: isEmpty(unitPrice),
			description 	: isEmpty(description),
			salesDate 		: isEmpty(salesDate),
			actionName 		: appActionType.ACTION_TYPE_NEW
		};

		Ext.MessageBox.confirm('Confirm', 'Are you sure?', function(btn) {

			if (btn == 'yes') {
				
				if(button.reference == 'updExpense'){
					header.actionName = appActionType.ACTION_TYPE_UPDATE_EXPENSE;
				}
				else if(button.reference == 'newExpense'){
					payload.salesId = null;
					payload.salesVer = null;
				}

				Ext.getBody().mask('Please wait...');
				
				me.getView().doClose();
				
				jsonString = mPromise.createJson(header, payload);

				mPromise.sendRequestDeffered(SERVER_URL, jsonString, mMask)
				.then(function (response) {
					
					Ext.MessageBox.Alert("Added Expense", "Please Check Report");
					//var items = response.payload;

					//console.log(items);
					// var header = {
					// 	actionName 	: appActionType.ACTION_TYPE_SELECT_SALES,
					// 	serviceName : appContentType.CONTENT_TYPE_SALES
					// };

					// var payload = {
					// 	userModifiedId 	: gUserId,
					// 	actionName 		: appActionType.ACTION_TYPE_SELECT_SALES
					// };

					// jsonString = mPromise.createJson(header, payload);
					// return mPromise.sendRequestDeffered(SERVER_URL, jsonString);				
				})
				// .then(function (response2){
				// 	var items = response2.payload;
				// 	//console.log(items);
				// 	var store = Ext.data.StoreManager.lookup('SalesStore');
				// 	store.removeAll();
				// 	store.add(items);
				// })
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
	},

	getAgentRpt: function(button, e, eOpts){

		var me = this, identityNo = null;
		var fromDate    = Ext.Date.format(new Date(), 'Y-m-d');
		var toDate      = Ext.Date.format(new Date(), 'Y-m-d');
		
		
		var pdfPanel = Ext.create('Ext.panel.Panel', {
			title : "Agent Sales Report",
			reference :'asr',
			border : true,
			closable : true,
			floatable : true,
			floating : true,
			draggable : true,          
			width : (window.innerWidth)*0.8,
			height : (window.innerHeight)*0.9
		});

		pdfPanel.show();

		var urlReq='<iframe style="overflow:auto;width:100%;height:100%;" frameborder="0" src="'
		+REPORT_URL+'?destination=agentRpt&identityNo='
		+identityNo+'&fromDate='+fromDate+'&toDate='+toDate+'"></iframe>';
		
		pdfPanel.body.update(urlReq);    
	},
});
