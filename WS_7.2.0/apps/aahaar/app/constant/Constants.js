Ext.define('aahaar.constant.Constants', {
	alias: 'appConstants',
	alternateClassName: 'appConstants',
	requires: [
		'aahaar.constant.ActionType',
		'aahaar.constant.ContentType',
		'aahaar.constant.StatusType',
		'aahaar.constant.Type'
	],
	statics: {
  		APP_NAME: 'aahaar-server',
		APP_VER: '1.0.0.0',
		SERVER_URL: 'http://127.0.0.1:8081/aahaar-server/jsonRequest',
		SOURCE: 'client',
		DESTINATION: 'aahaar-server',
		UNIQUE_ID:'ac93b389-dc61-4b2b-bae2-a1f52d4d8f1b',
		HTTP_METHOD: "POST"
	}
});