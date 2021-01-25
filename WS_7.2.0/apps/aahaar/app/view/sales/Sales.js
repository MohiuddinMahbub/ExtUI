
Ext.define('Admin.view.sales.Sales',{
    extend: 'Ext.panel.Panel',
    xtype: 'sales',

    requires: [
        'Admin.view.sales.SalesController',
        'Admin.view.sales.SalesModel'
    ],

    controller: 'sales-sales',
    viewModel: {
        type: 'sales-sales'
    },

    html: 'Hello, World!!'
});
