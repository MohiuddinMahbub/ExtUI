Ext.define("mahbub.constants.LoadMask", {
    alias: "mMask",
    alternateClassName: "mMask",
    requires: [],
    statics: {
		loadMask: function(target){
			return new Ext.LoadMask({
				msg    : 'Please wait...',
				target : target
			});
		}
    }
});