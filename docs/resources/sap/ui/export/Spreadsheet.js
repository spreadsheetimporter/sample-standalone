/*!
 * SAPUI5
 * (c) Copyright 2009-2022 SAP SE. All rights reserved.
 */
sap.ui.define(["sap/ui/core/Core","./ExportDialog","sap/ui/export/ExportBase","sap/ui/Device","sap/ui/export/SpreadsheetExport","sap/base/Log","sap/ui/export/ExportUtils"],function(e,t,r,o,i,s,n){"use strict";var a="sap.ui.export.Spreadsheet";var u=r.extend(a,{constructor:function(e){r.call(this,e);this._mSettings.customizing={};this._mSettings.showProgress=true;this._mSettings.worker=true;["showProgress","worker"].forEach(function(t){if(typeof e[t]!=="undefined"){this._mSettings[t]=e[t]}}.bind(this));this.codeListsPromise=this.codeListsPromise instanceof Promise?this.codeListsPromise:Promise.resolve()}});function c(e,t,r){if(!(r[e]instanceof Object)){r[e]={}}if(!isNaN(t.digits)){r[e].scale=t.digits}if(!isNaN(t.UnitSpecificScale)){r[e].scale=t.UnitSpecificScale}if(isNaN(r[e].scale)){delete r[e]}}u.prototype.setDefaultExportSettings=function(t){var r,o,i;o=t.customizing.currency={};var s=e.getConfiguration().getFormatSettings().getCustomCurrencies();if(s){for(r in s){c(r,s[r],o)}}return this.codeListsPromise.then(function(e){var r,s,n;if(!Array.isArray(e)){return}i=t.customizing.unit={};r=e[0];s=e[1];for(n in r){c(n,r[n],o)}for(n in s){c(n,s[n],i)}}).then(function(){return e.getLibraryResourceBundle("sap.ui.export",true)}).then(function(e){var r=t.workbook.context;if(!(r instanceof Object)){r=t.workbook.context={}}if(!r.title){r.title=e.getText("XLSX_DEFAULT_TITLE")}if(!r.sheetName){r.sheetName=e.getText("XLSX_DEFAULT_SHEETNAME")}})};u.requestCodeLists=function(e){if(!e.isA(["sap.ui.model.odata.ODataMetaModel","sap.ui.model.odata.v4.ODataMetaModel"])){return Promise.resolve([null,null])}return Promise.all([e.requestCurrencyCodes(),e.requestUnitsOfMeasure()]).catch(function(e){s.warning(a+": Code lists cannot be processed due to the following error - "+e);return Promise.resolve([null,null])})};u.prototype.attachBeforeSave=function(e,t,r){return this.attachEvent("beforeSave",e,t,r)};u.prototype.detachBeforeSave=function(e,t){return this.detachEvent("beforeSave",e,t)};u.prototype.cancel=function(){if(this.process){this.process.cancel();this.process=null}return this};u.prototype.getMimeType=function(){return"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"};u.prototype.onprogress=function(e,t){var r;if(isNaN(e)||isNaN(t)){return}r=Math.round(e/t*100);s.debug("Spreadsheet export: "+r+"% loaded.")};u.prototype.createDataSourceFromBinding=function(e){var t=[];if(e.isA("sap.ui.model.ClientListBinding")){var r=e.getModel().getProperty(e.getPath());t={data:r instanceof Array?r:[],type:"array"}}if(e.isA("sap.ui.model.ClientTreeBinding")){s.error("Unable to create dataSource configuration due to not supported Binding: "+e.getMetadata().getName())}if(typeof e.getDownloadUrl==="function"){var o=e.getModel(),i=e.getDownloadUrl("json"),a=o.sServiceUrl,c=o.isA("sap.ui.model.odata.v4.ODataModel");i=n.interceptUrl(i);a=n.interceptUrl(a);t={type:"odata",dataUrl:i,serviceUrl:a,headers:c?o.getHttpHeaders(true):o.getHeaders(),count:n.getCountFromBinding(e),useBatch:c||o.bUseBatch};if(o.getMetaModel()&&typeof o.getMetaModel().requestCurrencyCodes==="function"&&typeof o.getMetaModel().requestUnitsOfMeasure==="function"){this.codeListsPromise=u.requestCodeLists(o.getMetaModel(),this._mSettings)}}return t};u.prototype.processDataSource=function(e){var t=null;var r=typeof e;if(!e){return null}if(r=="string"){return{count:this._mSettings.count,dataUrl:e,type:"odata",useBatch:false}}if(r!="object"){s.error("Spreadsheet#processDataSource: Unable to apply data source of type "+r);return null}if(e instanceof Array){t={data:e,type:"array"}}if(e.dataUrl){t=e}if(e.isA&&e.isA(["sap.ui.model.ListBinding","sap.ui.model.TreeBinding"])){t=this.createDataSourceFromBinding(e)}return t};u.prototype.createBuildPromise=function(e){var r=this;return new Promise(function(s,a){var u;var c=1048576;var p=o.system.desktop?2e6:1e5;var f=e.dataSource.type=="array"?e.dataSource.data.length:e.dataSource.count;var l=e.workbook.columns.length;function d(o){if(o.progress){if(u){u.updateStatus(o.fetched,o.total)}r.onprogress(o.fetched,o.total)}if(o.finished&&r.process!==null){r.process=null;if(!o.spreadsheet){a();return}var i=r.fireEvent("beforeSave",{data:o.spreadsheet,exportDialog:u},true,true);if(i){if(u){window.setTimeout(u.finish,1e3)}n.saveAsFile(new Blob([o.spreadsheet],{type:r.getMimeType()}),e.fileName)}s()}if(typeof o.error!="undefined"){var c=o.error.message||o.error;r.process=null;if(u){u.finish()}a(c);t.showErrorMessage(c)}}function g(){if(!e.showProgress){if(r.process){a("Cannot start export: the process is already running");return}r.process=i.execute(e,d);return}t.getProgressDialog().then(function(t){u=t;if(r.process){a("Cannot start export: the process is already running");return}u.oncancel=function(){return r.process&&r.process.cancel()};u.open();u.updateStatus(0,e.dataSource.count);r.process=i.execute(e,d)})}if(l<=0){a("No columns to export.")}else if(f*l>p||!f||f>=c){var h={rows:f,columns:l,sizeLimit:f*l>p,cutOff:f>=c};t.showWarningDialog(h).then(g).catch(function(){a("Export cancelled by the user.")})}else{g()}})};return u});
//# sourceMappingURL=Spreadsheet.js.map