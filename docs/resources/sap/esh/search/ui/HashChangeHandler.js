/*! 
 * SAPUI5

		(c) Copyright 2009-2021 SAP SE. All rights reserved
	 
 */
(function(){sap.ui.define(["sap/esh/search/ui/SearchHelper","./sinaNexTS/providers/abap_odata/UserEventLogger"],function(e,r){var i=r["UserEventType"];function t(e,r,i){if(i){return r?r(e):e}if(!e||!e.then){e=Promise.resolve(e)}return r?e.then(r):e}var s={handle:n(function(r){var s=this;if(!e.isLoggingEnabled()){return}s.sourceUrlArray=[];if(r.oldShellHash!==null){s.sourceUrlArray.push(r.oldShellHash)}if(r.oldAppSpecificRoute!==null){if(r.oldAppSpecificRoute.substring(0,2)==="&/"){s.sourceUrlArray.push(r.oldAppSpecificRoute.substring(2))}else{s.sourceUrlArray.push(r.oldAppSpecificRoute)}}s._createSearchModel().then(function(){var e={type:i.ITEM_NAVIGATE,sourceUrlArray:this.sourceUrlArray,targetUrl:"#"+r.newShellHash,systemAndClient:this._getSID()};if(e.targetUrl.indexOf("=")!==-1){this.searchModel.sinaNext.logUserEvent(e)}}.bind(s));return t()}),_createSearchModel:n(function(){var e=this;if(e.initializedPromise){return e.initializedPromise}e.searchModel=sap.esh.search.ui.getModelSingleton({},"flp");e.initializedPromise=e.searchModel.initBusinessObjSearch();return e.initializedPromise}),_getSID:function e(){var r={systemId:"",client:""};var i=window.location.href;var t=i.indexOf("sap-system=sid(");if(t!==-1){var s=i.substring(t).indexOf(")");if(s!==-1){var n=i.substring(t+15,t+s);if(n.split(".").length===2){r.systemId=n.split(".")[0];r.client=n.split(".")[1]}}}return r}};function n(e){return function(){for(var r=[],i=0;i<arguments.length;i++){r[i]=arguments[i]}try{return Promise.resolve(e.apply(this,r))}catch(e){return Promise.reject(e)}}}return s})})();
//# sourceMappingURL=HashChangeHandler.js.map