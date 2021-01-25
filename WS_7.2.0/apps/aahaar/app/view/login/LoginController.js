Ext.define('Admin.view.login.LoginController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.login-login',


	/**
	* Create/serializing objects to JSON strings4
	* @author: mahbub.hasan
	* @since: 2021-01-12
	*/
	createJson: function(header, payload) {

		var request = {
			header: header,
			payload: payload
		};
		
		return Ext.encode(request);
	},

	onKeyPress: function(field, e) {
		if (e.getKey() == e.ENTER) {
			this.onLoginButtonClick(field, e);
		}
	},

	/**
	*  Application access gateway. It sends user information to confirm them, 
	*  whether they have an authentication.If then so, user can do their task 
	*  as they should.
	*/
	onLoginButtonClick: function(button, e, eOpts) {
		
		var me = this;
		var jsonString = null;
		Ext.getBody().mask('Please wait...');

		/*Login config for dev and prod+uat*/
		//var isDev = false;
		var isDev = true;

		var loginForm 	= me.lookupReference('login');
		var userId 		= me.lookupReference('uid').value;
		var password 	= me.lookupReference('pass').value;
		var captcha 	= me.lookupReference('captcha').value;
		var captchaText = me.lookupReference('captchaText').value;
		
		loginForm.getForm().reset();		
		me.loadCaptcha();

		if(isDev){

			//testing purpose
			var userId = 'super@secl.com';
			var password = 'vftQ20s9C0EK';

			var header = {
				actionName: appActionType.ACTION_TYPE_LOGIN,
				serviceName: appContentType.CONTENT_TYPE_USER
			};

			var payload = {
				userName: userId,
				password: password,
				actionName: appActionType.ACTION_TYPE_LOGIN
			};
		}
		else{			
			var validCaptcha = ValidCaptcha(captchaText, captcha);
			
			if(loginForm.isValid()){

				if(validCaptcha){
					
					var header = {
						actionName: appActionType.ACTION_TYPE_LOGIN,
						serviceName: appContentType.CONTENT_TYPE_USER
					};

					var payload = {
						userName: userId,
						password: password,
						actionName: appActionType.ACTION_TYPE_LOGIN
					};
					
					me.lookupReference('pass').reset();
				}
				else{
					icon = Ext.MessageBox['error'.toUpperCase()];

					Ext.MessageBox.show({
						title: 'Error',
						msg: "Security ID didn't match!",
						buttons: Ext.MessageBox.OK,
						animateTarget: me.lookupReference('loginBtnD'),
						scope: me,
						fn: me.showResult,
						icon: icon
					});

					me.loadCaptcha();
				}
			}
		}

		jsonString = me.createJson(header, payload);
		mPromise.sendRequestDeffered(SERVER_URL, jsonString)
		.then(function (response) {
			
			var item = response.payload;			
			var user = item.users[0];

			if (item.errMsg == null) {
				gEnvId 				= user.envId;
				gUserId 			= user.userId;
				gUserVer 			= user.userVer;
				gLoginName 			= user.loginName;
				gUserAlias 			= user.userAlias;

				for (i = 0; i < item.roles.length; i++) {
					userRoles.add(item.roles[i].roleName, item.roles[i].roleName);
				}

				/*Remove Login Window*/
				me.getView().destroy();

				/*show the Desktop view*/
				// Add the main view to the viewport
				Ext.widget('app-main');

				/*call function for checking idle user*/
				//Ext.ux.ActivityMonitor.init({ verbose : true });
				//Ext.ux.ActivityMonitor.start();
			}
			else {
				icon = Ext.MessageBox['error'.toUpperCase()];

				Ext.MessageBox.show({
					title: 'Error',
					msg: items.errMsg,
					buttons: Ext.MessageBox.OK,
					animateTarget: this.lookupReference('loginBtn'),
					scope: this,
					fn: this.showResult,
					icon: icon
				});
			}
		})
		.otherwise(function(reason){
			me.onFailed(reason);
		})
		.always(function(){
			Ext.getBody().unmask();
		})
		.done();
	},

	loadCaptcha: function(button, e, eOpts) {
		var me = this;
		var text = Captcha();
		me.lookupReference('uid').setValue('as');
		me.lookupReference('pass').setValue('assd');
		me.lookupReference('captcha').setValue(text);
		me.lookupReference('captchaText').setValue(text);
	},

	onCaptchaRefreshBtnClick: function() {
		this.loadCaptcha();
	},

	onFailed: function(status) {
		try {
			Ext.MessageBox.alert('LOGIN FAILED', status);
		} catch(err){
			console.log(err.message);
		}
	}
});