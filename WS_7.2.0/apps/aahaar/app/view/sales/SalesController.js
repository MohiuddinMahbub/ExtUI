Ext.define('Admin.view.sales.SalesController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sales-sales',

	getSalesRpt: function(button, e, eOpts){

		var me = this, identityNo = null;
		var fromDate    = Ext.Date.format(new Date(), 'Y-m-d');
		var toDate      = Ext.Date.format(new Date(), 'Y-m-d');
		
		var reportPanel = me.lookupReference('salesReport');

		var urlReq='<iframe style="overflow:auto;width:100%;height:100%;" frameborder="0" src="'
		+REPORT_URL+'?destination=agentRpt&identityNo='
		+identityNo+'&fromDate='+fromDate+'&toDate='+toDate+'"></iframe>';
		
		reportPanel.body.update(urlReq);    
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
	}

});
