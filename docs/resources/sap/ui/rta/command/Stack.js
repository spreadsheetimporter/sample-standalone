/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/ManagedObject","sap/ui/fl/write/api/PersistenceWriteAPI","sap/ui/fl/Utils","sap/ui/rta/command/Settings","sap/ui/rta/command/CompositeCommand","sap/ui/core/util/reflection/JsControlTreeModifier","sap/ui/rta/util/showMessageBox","sap/ui/core/Core"],function(e,t,n,o,i,r,a,s){"use strict";function u(e,t,n){var o=e[n];if(o){t.push(o)}return t}function d(e,t,n,a){var s=a.getSelector&&a.getSelector();var u=new o({selector:s,changeType:a.getChangeType(),element:r.bySelector(s,e)});u._oPreparedChange=a;var d=a.getSupportInformation().compositeCommand;if(d){if(!t[d]){t[d]=new i;n.pushExecutedCommand(t[d])}t[d].addCommand(u)}else{n.pushExecutedCommand(u)}}var m=e.extend("sap.ui.rta.command.Stack",{metadata:{library:"sap.ui.rta",properties:{},aggregations:{commands:{type:"sap.ui.rta.command.BaseCommand",multiple:true}},events:{modified:{},commandExecuted:{parameters:{command:{type:"object"},undo:{type:"boolean"}}}}}});m.initializeWithChanges=function(e,o){var i=new m;i._aPersistedChanges=o;if(o&&o.length>0){var r=n.getAppComponentForControl(e);var a={selector:r,invalidateCache:false};return t._getUIChanges(a).then(function(e){var t={};var n={};e.forEach(function(e){n[e.getId()]=e});o.reduce(u.bind(null,n),[]).forEach(d.bind(null,r,t,i));return i})}return Promise.resolve(i)};m.prototype.addCommandExecutionHandler=function(e){this._aCommandExecutionHandler.push(e)};m.prototype.removeCommandExecutionHandler=function(e){var t=this._aCommandExecutionHandler.indexOf(e);if(t>-1){this._aCommandExecutionHandler.splice(t,1)}};m.prototype.init=function(){this._aCommandExecutionHandler=[];this._toBeExecuted=-1;this._oLastCommand=Promise.resolve()};m.prototype._waitForCommandExecutionHandler=function(e){return Promise.all(this._aCommandExecutionHandler.map(function(t){return t(e)}))};m.prototype._getCommandToBeExecuted=function(){return this.getCommands()[this._toBeExecuted]};m.prototype.pushExecutedCommand=function(e){this.push(e,true);this.fireModified()};m.prototype.push=function(e,t){if(this._bUndoneCommands){this._bUndoneCommands=false;while(this._toBeExecuted>-1){this.pop()}}this.insertCommand(e,0);if(!t){this._toBeExecuted++}};m.prototype.top=function(){return this.getCommands()[0]};m.prototype.pop=function(){if(this._toBeExecuted>-1){this._toBeExecuted--}return this.removeCommand(0)};m.prototype.removeCommand=function(e,t){var n=this.removeAggregation("commands",e,t);return n};m.prototype.removeAllCommands=function(e){var t=this.removeAllAggregation("commands",e);this._toBeExecuted=-1;this.fireModified();return t};m.prototype.isEmpty=function(){return this.getCommands().length===0};m.prototype.execute=function(){this._oLastCommand=this._oLastCommand.catch(function(){}).then(function(){var e=this._getCommandToBeExecuted();if(e){var t={command:e,undo:false};return e.execute().then(this._waitForCommandExecutionHandler.bind(this,t)).then(function(){this._toBeExecuted--;this.fireCommandExecuted(t);this.fireModified()}.bind(this)).catch(function(e){e=e||new Error("Executing of the change failed.");e.index=this._toBeExecuted;e.command=this.removeCommand(this._toBeExecuted);this._toBeExecuted--;var t=s.getLibraryResourceBundle("sap.ui.rta");a(t.getText("MSG_GENERIC_ERROR_MESSAGE",e.message),{title:t.getText("HEADER_ERROR")},"error");return Promise.reject(e)}.bind(this))}return undefined}.bind(this));return this._oLastCommand};m.prototype._unExecute=function(){if(this.canUndo()){this._bUndoneCommands=true;this._toBeExecuted++;var e=this._getCommandToBeExecuted();if(e){var t={command:e,undo:true};return e.undo().then(this._waitForCommandExecutionHandler.bind(this,t)).then(function(){this.fireCommandExecuted(t);this.fireModified()}.bind(this))}return Promise.resolve()}return Promise.resolve()};m.prototype.canUndo=function(){return this._toBeExecuted+1<this.getCommands().length};m.prototype.undo=function(){return this._unExecute()};m.prototype.canRedo=function(){return!!this._getCommandToBeExecuted()};m.prototype.redo=function(){return this.execute()};m.prototype.pushAndExecute=function(e){this.push(e);return this.execute()};m.prototype.getAllExecutedCommands=function(){var e=[];var t=this.getCommands();for(var n=t.length-1;n>this._toBeExecuted;n--){var o=this.getSubCommands(t[n]);e=e.concat(o)}return e};m.prototype.getSubCommands=function(e){var t=[];if(e.getCommands){e.getCommands().forEach(function(e){var n=this.getSubCommands(e);t=t.concat(n)},this)}else{t.push(e)}return t};return m});
//# sourceMappingURL=Stack.js.map