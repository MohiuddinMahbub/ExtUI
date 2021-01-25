Ext.define('Admin.view.main.Main', {
	extend: 'Ext.container.Viewport',

	requires: [
		'Ext.button.Segmented',
		'Ext.list.Tree'
	],
	
	xtype: 'app-main',
	
	controller: 'main',
	viewModel: 'main',

	cls: 'sencha-dash-viewport',
	itemId: 'mainView',

	layout: {
		type: 'vbox',
		align: 'stretch'
	},

	listeners: {
		render: 'onMainViewRender'
	},

	items: [
		{
			xtype: 'toolbar',
			cls: 'sencha-dash-dash-headerbar shadow',
			height: 64,
			itemId: 'headerBar',
			items: [
				{
					xtype: 'component',
					reference: 'senchaLogo',
					cls: 'sencha-logo',
					html: '<div class="main-logo"><img src="resources/images/logo.png"></div>',
					width: 250
				},
				{
					margin: '0 0 0 8',
					ui: 'header',
					iconCls:'x-fa fa-bars',
					id: 'main-navigation-btn',
					handler: 'onToggleNavigationSize'
				},
				'->',
				{
					xtype: 'tbtext',
					cls: 'top-user-name',
					listeners: {
						afterrender: 'onTbTextRender'
					}
				},
				{
					xtype: 'image',
					cls: 'header-right-profile-image',
					height: 35,
					width: 35,
					id: 'hdrImg',
					alt:'current user image',
					src: 'resources/images/profile-icon.png'
				}
			]
		},
		{
			xtype: 'maincontainerwrap',
			id: 'main-view-detail-wrap',
			reference: 'mainContainerWrap',
			flex: 1,
			items: [
				{
					xtype: 'treelist',
					reference: 'navigationTreeList',
					itemId: 'navigationTreeList',
					ui: 'nav',
					store: 'NavigationTree',
					width: 250,
					expanderFirst: false,
					expanderOnly: false,
					listeners: {
						selectionchange: 'onNavigationTreeSelectionChange'
					}
				},
				{
					xtype: 'container',
					flex: 1,
					reference: 'mainCardPanel',
					cls: 'sencha-dash-right-main-container',
					itemId: 'contentPanel',
					layout: {
						type: 'card',
						anchor: '100%'
					}
				}
			]
		}
	]
});
