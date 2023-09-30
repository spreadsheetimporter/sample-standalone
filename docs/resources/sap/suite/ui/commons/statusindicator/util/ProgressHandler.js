sap.ui.define([],function(){"use strict";var s=function(s){var e=this;this._fnResolveCallback=null;this._oPromise=null;this._bInProgress=false;this._fnProgress=s;this._oInnerProgressHandler={finish:function(){e.finish()},stop:function(s){e.stop(s)},isCanceled:function(){return e.isCanceled()}}};s.prototype.start=function(){var s=this;if(this._oPromise){return this._oPromise}this._oPromise=new Promise(function(e,n){s._fnResolveCallback=e;s._bInProgress=true;s._fnProgress(s._oInnerProgressHandler)});return this._oPromise};s.prototype.finish=function(){this._bInProgress=false;if(this._fnResolveCallback){this._fnResolveCallback();this._fnResolveCallback=null}};s.prototype.stop=function(s){this._bInProgress=false;if(this._fnResolveCallback){this._fnResolveCallback(s);this._fnResolveCallback=null}};s.prototype.cancel=function(){this._bCancelled=true};s.prototype.isCanceled=function(){return this._bCancelled};s.prototype.isInProgress=function(){return this._bInProgress};return s},true);
//# sourceMappingURL=ProgressHandler.js.map