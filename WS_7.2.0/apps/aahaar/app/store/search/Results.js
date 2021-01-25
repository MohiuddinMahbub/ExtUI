Ext.define('Admin.store.search.Results', {
    extend: 'Ext.data.Store',

/*    alias: 'store.recon',

    model: 'Admin.model.search.Result',

    proxy: {
        type: 'api',
        url: '~api/search/results'
    },*/

    autoLoad: 'true',

    sorters: {
        direction: 'ASC',
        property: 'title'
    }
});
