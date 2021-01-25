
Ext.define('Admin.view.login.Login',{
	extend: 'Ext.Container',
	requires: [
		'appConstants',
		'Ext.window.MessageBox',
		'Admin.view.login.LoginController',
		'Admin.view.login.LoginModel',
		'Ext.form.field.plugin.CapsDetector'
	],

	cls: 'auth-login',
	xtype: 'login',
	reference:'dashLogin',

	controller: 'login-login',
	viewModel: {
		type: 'login-login'
	},

	listeners: {
		beforerender: 'loadCaptcha'
	},

	layout: {
		type: 'vbox',
		align: 'middle',
		pack: 'center'
	},
	bodyStyle: "background-color: transparent;body-background-color: transparentize(#123d40, 0.75);body-color: white;body-padding: 24px",
	
	items: [
		{
			xtype: 'panel',
			bodyStyle:"background-color: #3a567e;",
			items: [
				{
					xtype: 'form',
					reference: 'login',
					bodyPadding: 10,
					border: false,
					cls: 'auth-header',
					title: '<span class="logo x-fa fa-circle-notch"></span>'+
							'</br></br>'+
							'<div class="title">nREMIT</div>',
					titleAlign: 'center',
					items: [
						{
							reference: 'uid',
							xtype: 'textfield',
							emptyText : 'User Name',
							name: 'uid',
							width: 300,
							allowBlank: false,
							listeners: {
								specialkey: 'onKeyPress'
							}
						},
						{
							reference: 'pass',
							xtype: 'textfield',
							emptyText : 'Password',
							name: 'pass',
							width: 300,
							inputType: 'password',
							allowBlank: false,
							listeners: {
								specialkey: 'onKeyPress'
							},
							plugins: [
								{
									ptype: 'capslockdetector',
									title: '<span style="color : red">Caps lock is on</span>',
									message: 'Having caps lock on may cause you to enter your password incorrectly.'
								}
							]
						},
						{
							xtype: 'fieldcontainer',
							layout: 'hbox',
							items: [
								{
									xtype: 'displayfield',
									reference: 'captchaText',
									readOnly: true,
									width: 275
								},
								{
									xtype: 'button',
									iconCls: 'resetbtn',
									tooltip: 'Reload Captcha',
									listeners: {
										click: 'onCaptchaRefreshBtnClick'
									}
								}
							]
						},
						{
							reference: 'captcha',
							xtype: 'textfield',
							emptyText : 'Captcha',
							width: 300,
							align: 'right',
							allowBlank: false,
							listeners: {
								specialkey: 'onKeyPress',
								paste: {
									element: 'inputEl',
									fn: function(event, inputEl) {
										event.preventDefault();
										return false;
									}
								}
							}
						},
						{
							xtype: 'fieldcontainer',
							layout: 'hbox',
							items: [
								{
									xtype: 'checkboxfield',
									boxLabel: 'Remember Me',
									reference: 'rmbrMe'
								},
								{
									xtype: 'component',
									align: 'right',
									html: '<a href="#passwordreset" style="color:#35baf6">Forgot Password</a>',
									margin: '5 0 0 95'
								}
							]
						},
						{
							xtype: 'button',
							reference: 'loginBtn',
							formBind: true,
							iconAlign: 'right',
							iconCls: 'x-fa fa-angle-right',
							text: 'LOG IN',
							width: 300,
							listeners: {
								click: 'onLoginButtonClick'
							}
						}						
					]
				}
			]
		}
	]
});
