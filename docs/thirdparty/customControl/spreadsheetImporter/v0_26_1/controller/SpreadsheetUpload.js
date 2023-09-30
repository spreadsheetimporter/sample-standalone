"use strict";sap.ui.define(["sap/ui/base/ManagedObject","./odata/ODataV2","./odata/ODataV4","./Util","./MessageHandler","sap/base/Log","./dialog/SpreadsheetUploadDialog","../enums"],function(e,t,a,s,i,n,o,r){"use strict";function d(e){return e&&e.__esModule&&typeof e.default!=="undefined"?e.default:e}const h=d(t);const l=d(a);const p=d(s);const c=d(i);const g=d(o);const u=r["CustomMessageTypes"];const f=e.extend("cc.spreadsheetimporter.v0_26_1.SpreadsheetUpload",{constructor:function t(a,s){e.prototype.constructor.call(this);this.errorState=false;this.UI5MinorVersion=sap.ui.version.split(".")[1];this.component=a;this.componentI18n=s;this.util=new p(s.getResourceBundle());this.messageHandler=new c(this);this.spreadsheetUploadDialogHandler=new g(this,a,s,this.messageHandler);this.isOpenUI5=sap.ui.generic?true:false;n.debug("constructor",undefined,"SpreadsheetUpload: SpreadsheetUpload",()=>this.component.logger.returnObject({ui5version:this.UI5MinorVersion,isOpenUI5:this.isOpenUI5}))},initialSetup:async function e(){await this.spreadsheetUploadDialogHandler.createSpreadsheetUploadDialog();if(!this.component.getStandalone()){try{await this.setContext();this.errorState=false}catch(e){this.errorMessage=e;this.errorState=true;n.error("Error setting 'setContext'",e,"SpreadsheetUpload: SpreadsheetUpload",()=>this.component.logger.returnObject({error:e}))}}},setContext:async function e(){this.context=this.component.getContext();if(this.context.base){this.context=this.context.base}this.isODataV4=this._checkIfODataIsV4();this.odataHandler=this.createODataHandler(this.UI5MinorVersion,this);this.view=this.odataHandler.getView(this.context);this.controller=this.view.getController();n.debug("View",undefined,"SpreadsheetUpload: SpreadsheetUpload",()=>this.component.logger.returnObject({view:this.view}));this.view.addDependent(this.spreadsheetUploadDialogHandler.getDialog());this.tableObject=await this.odataHandler.getTableObject(this.component.getTableId(),this.view,this);n.debug("tableObject",undefined,"SpreadsheetUpload: SpreadsheetUpload",()=>this.component.logger.returnObject({tableObject:this.tableObject}));this.component.setTableId(this.tableObject.getId());n.debug("table Id",undefined,"SpreadsheetUpload: SpreadsheetUpload",()=>this.component.logger.returnObject({tableID:this.tableObject.getId()}));this.binding=this.odataHandler.getBinding(this.tableObject);if(!this.binding){throw new Error(this.util.geti18nText("bindingError"))}this._odataType=await this.odataHandler.getOdataType(this.binding,this.tableObject,this.component.getOdataType());n.debug("odataType",undefined,"SpreadsheetUpload: SpreadsheetUpload",()=>this.component.logger.returnObject({odataType:this._odataType}));this.odataKeyList=await this.odataHandler.getKeyList(this._odataType,this.tableObject);n.debug("odataKeyList",undefined,"SpreadsheetUpload: SpreadsheetUpload",()=>this.component.logger.returnObject({odataKeyList:this.odataKeyList}));this.typeLabelList=await this.odataHandler.getLabelList(this.component.getColumns(),this._odataType,this.tableObject);n.debug("typeLabelList",undefined,"SpreadsheetUpload: SpreadsheetUpload",()=>this.component.logger.returnObject({typeLabelList:this.typeLabelList}));this.model=this.tableObject.getModel();n.debug("model",undefined,"SpreadsheetUpload: SpreadsheetUpload",()=>this.component.logger.returnObject({model:this.model}));this.odataHandler.createCustomBinding(this.binding);try{const e=await this._loadDraftController();this.odataHandler.draftController=new e(this.model,undefined)}catch(e){n.error("Error setting the draft controller",e,"SpreadsheetUpload: SpreadsheetUpload")}},createODataHandler:function e(t,a){if(this.isODataV4){return new l(t,a)}else{return new h(t,a)}},openSpreadsheetUploadDialog:async function e(t){if(t){this.setComponentOptions(t);this.initialSetupPromise=this.initialSetup()}else{this.initialSetupPromise=this.initialSetup()}await this.initialSetupPromise;if(!this.errorState){this.spreadsheetUploadDialogHandler.getDialog().getContent()[0].getItems()[1].clear();this.spreadsheetUploadDialogHandler.openSpreadsheetUploadDialog()}else{p.showError(this.errorMessage,"SpreadsheetUpload.ts","initialSetup");n.error("Error opening the dialog",undefined,"SpreadsheetUpload: SpreadsheetUpload")}},setComponentOptions:function e(t){if(t.hasOwnProperty("spreadsheetFileName")){this.component.setSpreadsheetFileName(t.spreadsheetFileName)}if(t.hasOwnProperty("context")){this.component.setContext(t.context)}if(t.hasOwnProperty("columns")){this.component.setColumns(t.columns)}if(t.hasOwnProperty("tableId")){this.component.setTableId(t.tableId)}if(t.hasOwnProperty("odataType")){this.component.setOdataType(t.odataType)}if(t.hasOwnProperty("mandatoryFields")){this.component.setMandatoryFields(t.mandatoryFields)}if(t.hasOwnProperty("fieldMatchType")){this.component.setFieldMatchType(t.fieldMatchType)}if(t.hasOwnProperty("activateDraft")){this.component.setActivateDraft(t.activateDraft)}if(t.hasOwnProperty("batchSize")){this.component.setBatchSize(t.batchSize)}if(t.hasOwnProperty("standalone")){this.component.setStandalone(t.standalone)}if(t.hasOwnProperty("strict")){this.component.setStrict(t.strict)}if(t.hasOwnProperty("decimalSeparator")){this.component.setDecimalSeparator(t.decimalSeparator)}if(t.hasOwnProperty("hidePreview")){this.component.setHidePreview(t.hidePreview)}if(t.hasOwnProperty("skipMandatoryFieldCheck")){this.component.setSkipMandatoryFieldCheck(t.skipMandatoryFieldCheck)}if(t.hasOwnProperty("showBackendErrorMessages")){this.component.setShowBackendErrorMessages(t.showBackendErrorMessages)}if(t.hasOwnProperty("showOptions")){this.component.setShowOptions(t.showOptions)}if(t.hasOwnProperty("debug")){this.component.setDebug(t.debug)}if(t.hasOwnProperty("availableOptions")){this.component.setAvailableOptions(t.availableOptions)}if(t.hasOwnProperty("sampleData")){this.component.setSampleData(t.sampleData)}if(t.hasOwnProperty("hideSampleData")){this.component.setHideSampleData(t.hideSampleData)}if(t.availableOptions&&t.availableOptions.length>0){this.component.setShowOptions(true)}},_checkIfODataIsV4:function e(){try{let e;if(this.component.getContext().base){e=this.component.getContext().base.getModel()}else{e=this.component.getContext().getModel()}if(e.getODataVersion()==="4.0"){return true}else{return false}}catch(e){return false}},_setPayload:function e(t){this.payloadArray=t},refreshBinding:function e(t,a,s){if(t._controller?.getExtensionAPI()){try{t._controller.getExtensionAPI().refresh(a.getPath())}catch(e){n.error("Failed to refresh binding in V4 FE context: "+e)}}else if(t.extensionAPI){if(t.extensionAPI.refresh){try{t.extensionAPI.refresh(a.getPath(s))}catch(e){n.error("Failed to refresh binding in Object Page V2 FE context: "+e)}}if(t.extensionAPI.refreshTable){try{t.extensionAPI.refreshTable(s)}catch(e){n.error("Failed to refresh binding in List Report V2 FE context: "+e)}}}try{a.refresh(true)}catch(e){n.error("Failed to refresh binding in other contexts: "+e)}},_loadDraftController:async function e(){return new Promise(function(e,t){sap.ui.require(["sap/ui/generic/app/transaction/DraftController"],function(t){e(t)},function(e){t(e)})})},resetContent:function e(){this.payloadArray=[];this.payload=[];this.odataHandler.resetContexts();this.spreadsheetUploadDialogHandler.resetContent()},getMessages:function e(){return this.messageHandler.getMessages()},addToMessages:function e(t){t.forEach(e=>{if(e.group){e.type=u.CustomErrorGroup}else{e.type=u.CustomError}e.counter=1});this.messageHandler.addArrayToMessages(t)},getSpreadsheetUploadDialog:function e(){return this.spreadsheetUploadDialogHandler.getDialog()},getPayloadArray:function e(){return this.payloadArray},getODataHandler:function e(){return this.odataHandler},get isODataV4(){return this._isODataV4},set isODataV4(e){this._isODataV4=e},get tableObject(){return this._tableObject},set tableObject(e){this._tableObject=e},get binding(){return this._binding},set binding(e){this._binding=e},get spreadsheetUploadDialogHandler(){return this._spreadsheetUploadDialogHandler},set spreadsheetUploadDialogHandler(e){this._spreadsheetUploadDialogHandler=e},get controller(){return this._controller},get view(){return this._view},getOdataType:function e(){return this._odataType}});return f});
//# sourceMappingURL=SpreadsheetUpload.js.map