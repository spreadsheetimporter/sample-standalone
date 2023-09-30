// Copyright (c) 2009-2022 SAP SE, All Rights Reserved
sap.ui.define(["sap/ui/base/EventProvider","sap/ui/thirdparty/hasher","sap/base/util/isPlainObject","sap/base/util/Version","sap/base/Log","sap/ushell/utils/UrlParsing"],function(e,t,n,r,i,a){"use strict";return function(o){var s=o.serviceRegistry,c=o.serviceFactory,l=o.service;var u;var h=new e;var d={hierarchyChanged:"hierarchyChanged",relatedAppsChanged:"relatedAppsChanged",titleChanged:"titleChanged",backNavigationChanged:"backNavigationChanged"};var p;var v=l.extend("sap.ushell.ui5service.ShellUIService",{init:function(){var e=this,t=this.getInterface();t.init=function(){e._amendPublicServiceInstance.call(e,this)};s.register("sap.ushell.ui5service.ShellUIService",new c(t))},_setActiveComponentId:function(e){p=e},_getActiveComponentId:function(){return p},_shouldEnableAutoHierarchy:function(e){return typeof e.getManifestEntry==="function"&&e.getManifestEntry("/sap.ui5/services/ShellUIService/settings/setHierarchy")==="auto"},_shouldEnableAutoTitle:function(e){return typeof e.getManifestEntry==="function"&&e.getManifestEntry("/sap.ui5/services/ShellUIService/settings/setTitle")==="auto"},_enableAutoHierarchy:function(e){var t=this;var n=e.getRouter&&e.getRouter();if(!n){i.error("Could not enable automatic setHierarchy on the current app","Router could not be obtained on the app root component via getRouter","sap.ushell.ui5service.ShellUIService");return}n.attachTitleChanged(function(e){var n=e.getParameter("history");t.setHierarchy(n.reverse().map(function(e){var n=t._getCurrentShellHashWithoutAppRoute();return{title:e.title,intent:n+"&/"+e.hash}}))})},_enableAutoTitle:function(e){var t=this;var n=e.getRouter&&e.getRouter();if(!n){i.error("Could not enable automatic setTitle on the current app","Router could not be obtained on the app root component via getRouter","sap.ushell.ui5service.ShellUIService");return}var r=n.getTitleHistory()[0];if(r&&r.title){setTimeout(function(){t.setTitle(r.title)},0)}n.attachTitleChanged(function(e){var n=e.getParameter("title");t.setTitle(n)})},_getCurrentShellHashWithoutAppRoute:function(){var e="#"+t.getHash();var n=a.getShellHash(e);if(!n){i.error("Cannot get the current shell hash","UrlParsing service returned a falsy value for "+e,"sap.ushell.ui5service.ShellUIService");return""}return"#"+n},_getEventProvider:function(){return h},_getLastSetTitle:function(){return u},_ensureArrayOfObjectOfStrings:function(e,t){var r=Array.isArray(e)&&e.every(function(e){return n(e)&&Object.keys(e).length>0&&Object.keys(e).every(function(t){return typeof e[t]==="string"})});if(!r){i.error("'"+t+"' was called with invalid parameters","An array of non-empty objects with string values is expected","sap.ushell.ui5service.ShellUIService")}return r},_ensureFunction:function(e,t){var n=typeof e;if(n!=="function"){i.error("'"+t+"' was called with invalid arguments","the parameter should be a function, got '"+n+"' instead","sap.ushell.ui5service.ShellUIService");return false}return true},_ensureString:function(e,t){var n=typeof e;if(n!=="string"){i.error("'"+t+"' was called with invalid arguments","the parameter should be a string, got '"+n+"' instead","sap.ushell.ui5service.ShellUIService");return false}return true},_addCallAllowedCheck:function(e,t){var n=this;e[t]=function(){var r=e.getContext();if(!r||r.scopeObject.getId()!==p){i.warning("Call to "+t+" is not allowed","This may be caused by an app component other than the active '"+p+"' that tries to call the method","sap.ushell.ui5service.ShellUIService");return undefined}if(t==="setHierarchy"&&r.scopeType==="component"&&r.scopeObject&&n._shouldEnableAutoHierarchy(r.scopeObject)){i.warning("Call to "+t+" is not allowed","The app defines that setHierarchy should be called automatically","sap.ushell.ui5service.ShellUIService");return undefined}if(t==="setTitle"&&r.scopeType==="component"&&r.scopeObject&&n._shouldEnableAutoTitle(r.scopeObject)){i.warning("Call to "+t+" is not allowed","The app defines that setTitle should be called automatically","sap.ushell.ui5service.ShellUIService");return undefined}return n[t].apply(e,arguments)}},_amendPublicServiceInstance:function(e){var t=this,n;n=e.getContext();if(typeof n==="undefined"){return}["setTitle","setHierarchy","setRelatedApps","setBackNavigation"].forEach(function(n){t._addCallAllowedCheck(e,n)});var r=n.scopeObject;if(n.scopeType==="component"&&r){this._setActiveComponentId(r.getId());if(this._shouldEnableAutoHierarchy(r)){this._enableAutoHierarchy(r)}if(this._shouldEnableAutoTitle(r)){this._enableAutoTitle(r)}return}i.error("Invalid context for ShellUIService interface","The context must be empty or an object like { scopeType: ..., scopeObject: ... }","sap.ushell.ui5service.ShellUIService")},setHierarchy:function(e){if(typeof e!=="undefined"&&!v.prototype._ensureArrayOfObjectOfStrings(e,"setHierarchy")){return}var t=this.getContext().scopeObject;h.fireEvent(d.hierarchyChanged,{data:e,component:t})},setTitle:function(e){if(typeof e!=="undefined"&&!v.prototype._ensureString(e,"setTitle")){return}var t=this.getContext().scopeObject;u=e;h.fireEvent(d.titleChanged,{data:e,component:t})},setBackNavigation:function(e){if(typeof e!=="undefined"&&!v.prototype._ensureFunction(e,"setBackNavigation")){return}var t=this.getContext().scopeObject;h.fireEvent(d.backNavigationChanged,{data:e,component:t})},getTitle:function(){return this._getLastSetTitle()},setRelatedApps:function(e){if(typeof e!=="undefined"&&!v.prototype._ensureArrayOfObjectOfStrings(e,"setRelatedApps")){return}var t=this.getContext().scopeObject;h.fireEvent(d.relatedAppsChanged,{data:e,component:t})},getUxdVersion:function(){if(new r(sap.ui.version).compareTo("1.37.0")>=0){return 2}return 1},_attachHierarchyChanged:function(e){this._getEventProvider().attachEvent(d.hierarchyChanged,e)},_detachHierarchyChanged:function(e){this._getEventProvider().detachEvent(d.hierarchyChanged,e)},_attachTitleChanged:function(e){this._getEventProvider().attachEvent(d.titleChanged,e)},_attachBackNavigationChanged:function(e){this._getEventProvider().attachEvent(d.backNavigationChanged,e)},_detachBackNavigationChanged:function(e){this._getEventProvider().detachEvent(d.backNavigationChanged,e)},_detachTitleChanged:function(e){this._getEventProvider().detachEvent(d.titleChanged,e)},_attachRelatedAppsChanged:function(e){this._getEventProvider().attachEvent(d.relatedAppsChanged,e)},_detachRelatedAppsChanged:function(e){this._getEventProvider().detachEvent(d.relatedAppsChanged,e)}});return v}});
//# sourceMappingURL=shelluiservice.class.factory.js.map