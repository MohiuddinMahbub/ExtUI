Ext.define('Admin.Application', {
	extend: 'Ext.app.Application',
	
	name: 'Admin',

	stores: [
		'SeTypes',
		'OrderStore',
		'SalesStore',
		'EntityStore',
		'ProductStore',
		'CategoryStore',
		'NavigationTree'
	],

	//defaultToken : 'salesentity',
	defaultToken : 'login',

	// The name of the initial view to create. This class will gain a "viewport" plugin
	// if it does not extend Ext.Viewport.
	//
	mainView: 'Admin.view.login.Login',
	//mainView: 'Admin.view.main.Main',

	launch: function () {
		
		Ext.require('Ext.form.field.Display');
		Ext.require('Ext.form.FieldContainer');
		Ext.require('Ext.layout.container.Form');
		
		Ext.Ajax.setTimeout(1800000);
		
		Ext.ariaWarn = Ext.emptyFn;
		this.redirectTo("login");
	},

	onAppUpdate: function () {
		Ext.Msg.confirm('Application Update', 'This application has an update, reload?',
			function (choice) {
				if (choice === 'yes') {
					window.location.reload();
				}
			}
		);
	}
});
