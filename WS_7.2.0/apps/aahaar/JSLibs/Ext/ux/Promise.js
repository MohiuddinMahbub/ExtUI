
// compatibility with ES6 Promise
//Ext.promise.Promise.prototype.catch = Ext.promise.Promise.prototype.otherwise;

/**
 * This is original `Ext.Promise` but without fallback to browser implementation.
 * https://www.sencha.com/blog/asynchronous-javascript-promises/
 * Original:
 * ext-6.2.1\packages\core\src\Promise.js
 */
Ext.define('Ext.ux.Promise', {
	alias: 'mPromise',
	alternateClassName: 'mPromise',
	requires: [],
	
	statics: {

		/**
		* Create/serializing objects to JSON strings
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

		/**
		* Send ajax request
		* @author: mahbub.hasan
		* @since: 2021-01-12
		*/
		sendRequest: function  (url, message) {
			// The function passed to Ext.Promise() is called immediately to start
			// the asynchronous action.

			return new Ext.Promise(function (resolve, reject) {
				Ext.Ajax.request({
					url: 		url,
					method: 	appConstants.HTTP_METHOD,
					jsonData: 	message,
					success: function (response) {
						var data = Ext.decode(response.responseText);
						// Use the provided "resolve" method to deliver the result.
						resolve(data);
					},
					failure: function (response) {
						// Use the provided "reject" method to deliver error message.
						reject(response.status);
					}
				});
			});
		},

		/**
		* Send ajax request with Ext deffered
		* @author: mahbub.hasan
		* @since: 2021-01-12
		*/
		sendRequestDeffered: function (url, message){
			var deferred = new Ext.Deferred();
			Ext.Ajax.request({
				url 		: url,
				method 		: appConstants.HTTP_METHOD,
				jsonData 	: message,
				success : function(response){
					deferred.resolve(Ext.decode(response.responseText));
				},
				failure : function(response){
					deferred.reject(response.status);
				}
			});

			return deferred.promise; // will return underlying promise
		 },

		/*
		//Chaining request
		 function loadAchievements(){
			 var achievements = [];
			 getAchievements(2013)
			 .then(function(data1){
				 achievements = achievements.concat(data1);
				 return getAchievements(2014); //will return a promise so "Queueing asynchronous Actions" will take place
			 })
			 .then(function(data2){
				 achievements = achievements.concat(data2);
				 return getAchievements(2015); //will return a promise so "Queueing asynchronous Actions" will take place
			 })
			 .then(function(data3){
				 achievements = achievements.concat(data3);
				 console.log(achievements);
			 })
			 .otherwise(handleError)
			 .done();
		 }
		//Chaining request more compact
		function loadAchievements(){
		    var promises = [getAchievements(2013), getAchievements(2014), getAchievements(2015)];
		    Ext.Promise.all(promises).then(function(values){
		        // the values we be a array
		        //values[0] will be the resolved value of promise 1
		        //values[1] will be the resolved value of promise 2
		        //values[2] will be the resolved value of promise 3
		 
		        var achievements = [].concat(values[0], values[1], values[2]);
		        console.log(achievements);
		    })
		    .otherwise(handleError)
		    .done();
		}*/
	}

});