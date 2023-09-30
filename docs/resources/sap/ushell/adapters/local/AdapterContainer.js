// Copyright (c) 2009-2022 SAP SE, All Rights Reserved
sap.ui.define(["sap/ushell/utils","sap/ui/thirdparty/jquery"],function(e,jQuery){"use strict";var t;function r(){var e=sap.ui.requireSync("sap/ui/util/Storage");return new e(e.Type.local,"com.sap.ushell.adapters.sandbox.Personalization")}function n(e){try{return JSON.parse(e)}catch(e){return undefined}}function o(e){return JSON.stringify(e)}function s(e){if(e===undefined){return undefined}try{return JSON.parse(JSON.stringify(e))}catch(e){return undefined}}var a=function(r,n,o){t=o;this._sContainerKey=r;this._sStorageType=n;this._oItemMap=new e.Map};a.prototype.load=function(){var e=new jQuery.Deferred,o,a,i=this;var u=sap.ui.require("sap/ushell/adapters/local/PersonalizationAdapter");switch(this._sStorageType){case u.prototype.constants.storage.LOCAL_STORAGE:o=r();setTimeout(function(){a=o.get(i._sContainerKey);i._oItemMap.entries=n(a)||{};e.resolve(i)},0);break;case u.prototype.constants.storage.MEMORY:setTimeout(function(){i._oItemMap.entries=s(t[i._sContainerKey])||{};e.resolve(i)},0);break;default:setTimeout(function(){e.reject("unknown storage type")},0)}return e.promise()};a.prototype.save=function(){var e=new jQuery.Deferred,n,a,i=this;var u=sap.ui.require("sap/ushell/adapters/local/PersonalizationAdapter");switch(this._sStorageType){case u.prototype.constants.storage.LOCAL_STORAGE:n=r();setTimeout(function(){a=o(i._oItemMap.entries);n.put(i._sContainerKey,a);e.resolve()},0);break;case u.prototype.constants.storage.MEMORY:setTimeout(function(){t[i._sContainerKey]=s(i._oItemMap.entries);e.resolve()},0);break;default:setTimeout(function(){e.reject("unknown storage type")},0)}return e.promise()};a.prototype.del=function(){var e=new jQuery.Deferred,n,o=this;var s=sap.ui.require("sap/ushell/adapters/local/PersonalizationAdapter");switch(this._sStorageType){case s.prototype.constants.storage.LOCAL_STORAGE:n=r();setTimeout(function(){n.remove(o._sContainerKey);o._oItemMap.entries={};e.resolve()},0);break;case s.prototype.constants.storage.MEMORY:setTimeout(function(){if(t&&t[o._sContainerKey]){delete t[o._sContainerKey]}o._oItemMap.entries={};e.resolve()},0);break;default:setTimeout(function(){e.reject("unknown storage type")},0)}return e.promise()};a.prototype.getItemKeys=function(){return this._oItemMap.keys()};a.prototype.containsItem=function(e){return this._oItemMap.containsKey(e)};a.prototype.getItemValue=function(e){return this._oItemMap.get(e)};a.prototype.setItemValue=function(e,t){this._oItemMap.put(e,t)};a.prototype.delItem=function(e){this._oItemMap.remove(e)};return a},false);
//# sourceMappingURL=AdapterContainer.js.map