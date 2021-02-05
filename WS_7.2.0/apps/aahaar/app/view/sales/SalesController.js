Ext.define('Admin.view.sales.SalesController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sales-sales',

	/**
	* Close Form button click
	* @author: mahbub.hasan
	* @since 18 Jan 2021
	*/
	onCloseFrm: function (view, e) {
		var me = this;
		me.getView().destroy();
	},

	onClear: function (view, rec, item, index, e) {
		this.lookupReference('sProduct').reset();
		this.lookupReference('sEntity').reset();
		this.lookupReference('orderDate').reset();
	},

	/**
	* Send request to server for getting Sales data
	* @author: Md. Mahbub Hasan Mohiuddin
	* @since 2021-01-17
	*/
	onSearchSales: function(){
		var me = this;
		var jsonString = null;
		
		var orderDate 			= me.lookupReference('orderDate').value;
		var productName 		= me.lookupReference('sProduct').value;
		var salesEntityIdentity = me.lookupReference('sEntity').value;

		if (Ext.isEmpty(orderDate)) {
			//orderDate = null;
			icon = Ext.MessageBox['error'.toUpperCase()];

			Ext.MessageBox.show({
				title: 'Error',
				msg: "Date is required",
				buttons: Ext.MessageBox.OK,
				animateTarget: this.lookupReference('salesGrd'),
				scope: this,
				fn: this.showResult,
				icon: icon
			});

			return false;
		}
		else{
			orderDate = Ext.Date.format(orderDate, 'Ymd');
		}
		
		Ext.getBody().mask('Loading...');
		
		var header = {
			actionName 		: appActionType.ACTION_TYPE_SELECT_SALES,
			serviceName 	: appContentType.CONTENT_TYPE_SALES
		};

		var payload = {
			userModifiedId 		: gUserId,
			orderDate 			: orderDate,
			productName 		: isEmpty(productName),
			salesEntityIdentity	: isEmpty(salesEntityIdentity),
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

	getSalesRpt: function(button, e, eOpts){

		var me = this;
		var fromDate  = Ext.Date.format(me.lookupReference('orderDate').value, 'Y-m-d');
		
		if (Ext.isEmpty(fromDate)) {
			icon = Ext.MessageBox['error'.toUpperCase()];

			Ext.MessageBox.show({
				title: 'Error',
				msg: "Date is required",
				buttons: Ext.MessageBox.OK,
				animateTarget: this.lookupReference('salesGrd'),
				scope: this,
				fn: this.showResult,
				icon: icon
			});

			return false;
		}

		var pdfPanel = Ext.create('Ext.panel.Panel', {
			title : "Daily Sales Report",
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
		+REPORT_URL+'?destination=getSalesRpt&fromDate='+fromDate+'"></iframe>';
		
		pdfPanel.body.update(urlReq);    
	},

	getEntityRpt: function(button, e, eOpts){

		var me = this;
		var destination = 'getEntityRpt';
		var reportPanel = me.lookupReference('entityReport');

		var fromDate    = Ext.Date.format(me.lookupReference('entityFromDate').value, 'Y-m-d');
		var toDate      = Ext.Date.format(me.lookupReference('entityToDate').value, 'Y-m-d');

		var identityNo 	= Ext.isEmpty(me.lookupReference('identityNo').value) ? "" : me.lookupReference('identityNo').value;
		var typeValue 	= Ext.isEmpty(me.lookupReference('salesEntityType').value) ? "" : me.lookupReference('salesEntityType').value;
		var identityType= Ext.isEmpty(me.lookupReference('salesEntityType').rawValue) ? "" : me.lookupReference('salesEntityType').rawValue;
			
		var urlReq='<iframe style="overflow:auto;width:100%;height:100%;" frameborder="0" src="'
		+REPORT_URL+'?destination=' + destination + '&identityNo='
		+identityNo+'&fromDate='+fromDate+'&toDate='+toDate+'&typeValue='+typeValue+'&identityType='+identityType+'"></iframe>';
		
		reportPanel.body.update(urlReq);    
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
